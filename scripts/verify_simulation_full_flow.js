const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('Testing Green Factory Brain AI — Simulation Full Flow & Bi-Directional Sync...');

// ----------------------------------------------------------------------------
// 1. Test simulation.html engine mechanics
// ----------------------------------------------------------------------------
const simHtml = fs.readFileSync('preview/simulation.html', 'utf8');

// Verify floating dock is outside script and inside body
assert.ok(simHtml.includes('id="gfb-sim-floating-orb-dock"'), 'Floating dock must be present');
const scriptEndIdx = simHtml.lastIndexOf('</script>');
const dockIdx = simHtml.indexOf('id="gfb-sim-floating-orb-dock"');
assert.ok(dockIdx > scriptEndIdx, 'Floating dock must be outside <script> tag');

// Check that script contains no syntax errors
const scriptMatch = simHtml.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/i);
assert.ok(scriptMatch, 'Script tag found in simulation.html');

let storedData = {};
const simSandbox = {
  console: console,
  document: {
    documentElement: { classList: { contains: () => true } },
    getElementById: (id) => ({
      id,
      innerHTML: '',
      value: '1',
      textContent: '',
      classList: { add: () => {}, remove: () => {}, toggle: () => {} },
      appendChild: () => {},
      removeChild: () => {},
      setAttribute: () => {},
      style: {},
      addEventListener: () => {},
      querySelector: () => null,
      querySelectorAll: () => [],
      children: [],
      prepend: () => {}
    }),
    querySelectorAll: () => [],
    createElement: (tag) => ({
      className: '',
      innerHTML: '',
      appendChild: () => {},
      prepend: () => {},
      removeChild: () => {},
      querySelector: () => ({ addEventListener: () => {}, classList: { toggle: () => {} } }),
      querySelectorAll: () => [],
      style: {}
    }),
    addEventListener: () => {},
    body: { appendChild: () => {} }
  },
  window: {
    addEventListener: () => {},
    location: { hash: '' },
    parent: null
  },
  localStorage: {
    setItem: (k, v) => { storedData[k] = v; },
    getItem: (k) => storedData[k]
  },
  Blob: function(parts, opts) { this.parts = parts; this.opts = opts; },
  URL: {
    createObjectURL: () => 'blob:mock-url',
    revokeObjectURL: () => {}
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => typeof fn === 'function' && fn(),
  clearTimeout: () => {},
  navigator: { userAgent: 'test' }
};

simSandbox.window.document = simSandbox.document;
simSandbox.window.localStorage = simSandbox.localStorage;
simSandbox.global = simSandbox;

vm.createContext(simSandbox);
vm.runInContext(scriptMatch[1], simSandbox);

console.log('✓ simulation.html executed cleanly in VM sandbox');

// Verify initial state
assert.ok(typeof simSandbox.setScenario === 'function', 'setScenario must be defined');
assert.ok(typeof simSandbox.tick === 'function', 'tick must be defined');
assert.ok(typeof simSandbox.push === 'function', 'push must be defined');
assert.ok(typeof simSandbox.syncSharedStorage === 'function', 'syncSharedStorage must be defined');
assert.ok(typeof simSandbox.handleExternalAction === 'function', 'handleExternalAction must be defined');

// Trigger tick and push
simSandbox.tick(10);
simSandbox.push();
assert.ok(storedData['gfb_simulation_state'], 'gfb_simulation_state must be saved to localStorage');

let parsedState = JSON.parse(storedData['gfb_simulation_state']);
assert.ok(typeof parsedState.energy === 'number', 'energy must be numeric in shared state');
assert.ok(typeof parsedState.bill === 'number', 'bill must be numeric in shared state');
assert.ok(typeof parsedState.carbon === 'number', 'carbon must be numeric in shared state');
assert.ok(typeof parsedState.totalKw === 'number', 'totalKw must be numeric in shared state');
assert.ok(Array.isArray(parsedState.machines), 'machines telemetry array must be in shared state');
assert.ok(Array.isArray(parsedState.alerts), 'alerts telemetry array must be in shared state');
assert.ok(typeof parsedState.clock === 'string', 'clock string must be in shared state');
assert.ok(typeof parsedState.scope1 === 'number', 'scope1 must be in shared state');
assert.ok(typeof parsedState.scope2 === 'number', 'scope2 must be in shared state');

console.log('✓ simulation.html telemetry broadcast verified:', {
  energy: parsedState.energy,
  bill: parsedState.bill,
  carbon: parsedState.carbon,
  scope1: parsedState.scope1,
  scope2: parsedState.scope2,
  totalKw: parsedState.totalKw,
  machinesMonitored: parsedState.machines.length
});

// Test inbound commands to simulation.html
simSandbox.handleExternalAction({ action: 'setTariff', tariff: 14.88 });
simSandbox.syncSharedStorage();
parsedState = JSON.parse(storedData['gfb_simulation_state']);
assert.strictEqual(parsedState.tariff, 14.88, 'Tariff must update to 14.88 via external action');
console.log('✓ Inbound command: setTariff verified');

simSandbox.handleExternalAction({ action: 'setFault', machineId: 'boiler', fault: true });
simSandbox.syncSharedStorage();
parsedState = JSON.parse(storedData['gfb_simulation_state']);
const boilerMach = parsedState.machines.find(m => m.id === 'boiler');
assert.ok(boilerMach && boilerMach.fault, 'Boiler must be faulted via setFault action');
console.log('✓ Inbound command: setFault verified');

simSandbox.handleExternalAction({ action: 'applyFix', fixId: 'f1' });
simSandbox.syncSharedStorage();
parsedState = JSON.parse(storedData['gfb_simulation_state']);
assert.ok(parsedState.fixesApplied && parsedState.fixesApplied.f1, 'Fix f1 must be applied via external action');
console.log('✓ Inbound command: applyFix verified');

// ----------------------------------------------------------------------------
// 2. Test preview/index.html router, controls, and telemetry ingestion
// ----------------------------------------------------------------------------
const indexHtml = fs.readFileSync('preview/index.html', 'utf8');

// Verify simulation iframe is embedded in index.html
assert.ok(indexHtml.includes('id="sim-engine-iframe"'), 'sim-engine-iframe must be embedded in index.html');
assert.ok(indexHtml.includes('src="simulation.html"'), 'sim-engine-iframe must point to simulation.html');
assert.ok(indexHtml.includes('ingestSimulationEngineTelemetry'), 'ingestSimulationEngineTelemetry must be defined in index.html');
assert.ok(indexHtml.includes('broadcastActionToSimulation'), 'broadcastActionToSimulation must be defined in index.html');

// Verify unique KPI strip IDs for zero-reload updates
assert.ok(indexHtml.includes('id="sim-kpi-substation"'), 'sim-kpi-substation ID must exist');
assert.ok(indexHtml.includes('id="sim-kpi-fleet-power"'), 'sim-kpi-fleet-power ID must exist');
assert.ok(indexHtml.includes('id="sim-kpi-avail"'), 'sim-kpi-avail ID must exist');
assert.ok(indexHtml.includes('id="sim-kpi-clock"'), 'sim-kpi-clock ID must exist');
assert.ok(indexHtml.includes('id="sim-kpi-savings"'), 'sim-kpi-savings ID must exist');
assert.ok(indexHtml.includes('id="sim-kpi-carbon"'), 'sim-kpi-carbon ID must exist');

console.log('✓ index.html embedded simulation iframe, element IDs, and bi-directional handlers verified');

// ----------------------------------------------------------------------------
// 3. Test index.html JS execution in sandbox to verify real-time ingestion
// ----------------------------------------------------------------------------
const scriptStart = indexHtml.indexOf('<script>\n    // ============================================================================');
assert.ok(scriptStart > 0, 'Main script block start found');
const codeStart = indexHtml.indexOf('>', scriptStart) + 1;
const codeEnd = indexHtml.indexOf('</script>', codeStart);
const appScript = indexHtml.substring(codeStart, codeEnd);

const domElements = {};
function getOrCreateDomElement(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      innerHTML: '',
      value: '',
      textContent: '',
      classList: { add: () => {}, remove: () => {}, toggle: () => {} },
      appendChild: () => {},
      removeChild: () => {},
      setAttribute: () => {},
      style: {},
      addEventListener: () => {}
    };
  }
  return domElements[id];
}

const indexSandbox = {
  console: console,
  document: {
    documentElement: { classList: { contains: () => true } },
    getElementById: (id) => getOrCreateDomElement(id),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => ({
      className: '',
      innerHTML: '',
      appendChild: () => {},
      prepend: () => {},
      removeChild: () => {},
      querySelector: () => null,
      querySelectorAll: () => [],
      style: {}
    }),
    addEventListener: () => {},
    body: { appendChild: () => {} },
    activeElement: null
  },
  window: {
    addEventListener: () => {},
    location: { hash: '#/simulation' },
    onload: null
  },
  sessionStorage: {
    getItem: (k) => (k === 'gfb_authenticated' ? 'true' : k === 'gfb_operator_role' ? 'manager' : null),
    setItem: () => {}
  },
  localStorage: {
    getItem: (k) => storedData[k] || null,
    setItem: (k, v) => { storedData[k] = v; }
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => typeof fn === 'function' && fn(),
  clearTimeout: () => {},
  Chart: function() { this.destroy = () => {}; },
  tailwind: { config: {} },
  THREE: {}
};

indexSandbox.window.document = indexSandbox.document;
indexSandbox.window.localStorage = indexSandbox.localStorage;
indexSandbox.window.sessionStorage = indexSandbox.sessionStorage;
indexSandbox.global = indexSandbox;

vm.createContext(indexSandbox);
vm.runInContext(appScript, indexSandbox);

console.log('✓ index.html script executed cleanly in VM sandbox');

// Verify AppState and functions
const AppState = vm.runInContext('AppState', indexSandbox);
const ingestSimulationEngineTelemetry = vm.runInContext('ingestSimulationEngineTelemetry', indexSandbox);
assert.ok(AppState, 'AppState must be defined');
assert.ok(Array.isArray(AppState.fleet), 'AppState.fleet must be an array of 18 machines');
assert.strictEqual(AppState.fleet.length, 18, 'AppState.fleet must have exactly 18 machines');

// Ingest telemetry from simulation engine
const simTelemetry = {
  simMin: 180,
  tick: 12,
  clock: '07:45',
  running: true,
  speed: 2,
  tariff: 12.40,
  target: 95000,
  prodToday: 12450,
  totalKw: 195.4,
  energy: 52500,
  savings: 72000,
  wasteLoss: 1200,
  avoidedKwh: 340,
  wasteActive: true,
  fixesApplied: { f1: true },
  alerts: [
    { id: 'waste', sev: 'crit', title: 'Machine 3 is wasting energy', body: '38 kW idle draw', time: '07:45' }
  ],
  machines: [
    { id: 'm3', name: 'Machine 3 · Sewing', kw: 38.0, today: 180, month: 4100, health: 80, fault: false },
    { id: 'boiler', name: 'Boiler · Aux & Steam', kw: 6.0, today: 70, month: 1650, health: 31, fault: true },
    { id: 'comp', name: 'Compressor · 55 kW', kw: 22.0, today: 190, month: 3000, health: 75, fault: false }
  ]
};

AppState.activeRoute = 'simulation';
ingestSimulationEngineTelemetry(simTelemetry);

// Verify AppState updates
assert.strictEqual(AppState.simTickCount, 12, 'simTickCount must be updated to 12');
assert.strictEqual(AppState.simSavingsAccruedBdt, 72000, 'simSavingsAccruedBdt must be 72000');
assert.strictEqual(AppState.activeScenario, 'night_idle', 'activeScenario must be night_idle when wasteActive');

const rec1 = AppState.recommendations.find(r => r.id === 'REC-01');
assert.ok(rec1 && rec1.status === 'Applied in simulation', 'REC-01 must be marked as Applied in simulation');

const mch3 = AppState.fleet.find(m => m.id === 'MCH-SEW-03');
assert.ok(mch3, 'MCH-SEW-03 must exist in fleet');
assert.strictEqual(mch3.currentKw, 38.0, 'MCH-SEW-03 currentKw must be 38.0 from simulation');

const boiler = AppState.fleet.find(m => m.id === 'BOIL-01');
assert.ok(boiler && boiler.status === 'Fault', 'BOIL-01 status must be Fault');

const simWasteAlert = AppState.alerts.find(a => a.id === 'SIM-waste');
assert.ok(simWasteAlert, 'SIM-waste alert must be present in AppState.alerts');
assert.strictEqual(simWasteAlert.severity, 'High', 'Severity must map from crit to High');

// Check that KPI elements on simulation route were updated directly
const fleetPowerEl = domElements['sim-kpi-fleet-power'];
assert.ok(fleetPowerEl && fleetPowerEl.textContent.includes('kW'), 'sim-kpi-fleet-power must be updated with live kW');

const savingsEl = domElements['sim-kpi-savings'];
assert.ok(savingsEl && savingsEl.textContent.includes('৳'), 'sim-kpi-savings must be updated with live ৳');

console.log('✓ index.html telemetry ingestion, fleet proportional scaling, alert sync, and zero-reload KPI updates verified');

console.log('\n======================================================');
console.log('ALL SIMULATION INTEGRATION TESTS PASSED WITH 0 ERRORS');
console.log('======================================================\n');
