import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(__dirname, '../../../preview/index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

console.log('[TEST] Extracted script content from preview/index.html (' + scriptContent.length + ' chars)');

let renderedViewportHtml = '';
let elementMap = {};

function getOrCreateElement(id) {
  if (!elementMap[id]) {
    elementMap[id] = {
      id,
      innerHTML: '',
      textContent: '',
      value: '',
      classList: {
        classes: new Set(),
        add: function(c) { this.classes.add(c); },
        remove: function(c) { this.classes.delete(c); },
        contains: function(c) { return this.classes.has(c); }
      },
      setAttribute: (k, v) => {},
      getAttribute: (k) => null,
      style: {}
    };
  }
  return elementMap[id];
}

const viewportElement = {
  id: 'main-viewport',
  get innerHTML() { return renderedViewportHtml; },
  set innerHTML(val) { renderedViewportHtml = val; },
  textContent: '',
  classList: {
    classes: new Set(),
    add: function(c) { this.classes.add(c); },
    remove: function(c) { this.classes.delete(c); },
    contains: function(c) { return this.classes.has(c); }
  },
  setAttribute: () => {},
  style: {}
};

elementMap['main-viewport'] = viewportElement;

// Mock DOM
const mockListeners = {};
const mockWindowListeners = {};

class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
    this.listeners = [];
    MockBroadcastChannel.instances.push(this);
  }
  addEventListener(event, fn) {
    if (event === 'message') this.listeners.push(fn);
  }
  postMessage(data) {
    MockBroadcastChannel.instances.forEach(inst => {
      if (inst.name === this.name) {
        inst.listeners.forEach(fn => fn({ data }));
      }
    });
  }
}
MockBroadcastChannel.instances = [];

const domMocks = {
  document: {
    documentElement: { classList: { contains: () => false } },
    getElementById: (id) => {
      if (id === 'main-viewport') return viewportElement;
      return getOrCreateElement(id);
    },
    querySelectorAll: (sel) => {
      if (sel === '.nav-btn') {
        return [
          {
            getAttribute: (k) => k === 'data-route' ? 'dashboard' : null,
            classList: { add: () => {}, remove: () => {} }
          },
          {
            getAttribute: (k) => k === 'data-route' ? 'simulation' : null,
            classList: {
              add: function(c) { this.active = true; },
              remove: function(c) { this.active = false; },
              active: false
            }
          }
        ];
      }
      if (sel.includes('.mobile-nav-btn')) {
        return [
          {
            getAttribute: (k) => k === 'data-mobile-route' ? 'simulation' : null,
            classList: {
              add: function(c) { this.active = true; },
              remove: function(c) { this.active = false; },
              active: false
            }
          }
        ];
      }
      return [];
    },
    createElement: (tag) => getOrCreateElement('created_' + Math.random()),
    body: { appendChild: () => {}, removeChild: () => {} },
    hidden: false
  },
  window: {
    location: { hash: '#/simulation-control' },
    addEventListener: (evt, fn) => {
      mockWindowListeners[evt] = mockWindowListeners[evt] || [];
      mockWindowListeners[evt].push(fn);
    },
    sessionStorage: {
      getItem: (k) => {
        if (k === 'gfb_authenticated') return 'true';
        if (k === 'gfb_operator_role') return 'manager';
        return null;
      },
      setItem: () => {}
    },
    history: {
      pushState: (s, t, url) => {}
    },
    BroadcastChannel: MockBroadcastChannel
  },
  sessionStorage: {
    getItem: (k) => {
      if (k === 'gfb_authenticated') return 'true';
      if (k === 'gfb_operator_role') return 'manager';
      return null;
    },
    setItem: () => {}
  },
  BroadcastChannel: MockBroadcastChannel,
  setTimeout: (fn) => setTimeout(fn, 0),
  setInterval: () => 123,
  clearInterval: () => {},
  console: console
};

const context = vm.createContext(domMocks);
vm.runInContext(scriptContent, context);

console.log('[TEST] Context initialized successfully. Running adversarial assertions...');

const testResults = [];

// Test 1: Check VALID_ROUTES array
{
  const validRoutes = vm.runInContext('VALID_ROUTES', context);
  const hasSimControl = validRoutes.includes('simulation-control');
  testResults.push({
    name: 'VALID_ROUTES contains "simulation-control"',
    pass: hasSimControl
  });
}

// Test 2: Navigate to 'simulation-control'
{
  vm.runInContext("AppState.isLoggedIn = true; navigateTo('simulation-control');", context);
  const activeRoute = vm.runInContext('AppState.activeRoute', context);
  const isCorrectRoute = activeRoute === 'simulation-control';
  const containsNotFound = renderedViewportHtml.includes('Route Not Found');
  const containsSimIframe = renderedViewportHtml.includes('sim-engine-iframe') || renderedViewportHtml.includes('simulation.html');
  const containsSimCenter = renderedViewportHtml.toLowerCase().includes('simulation control');

  testResults.push({
    name: 'navigateTo("simulation-control") sets AppState.activeRoute to "simulation-control"',
    pass: isCorrectRoute,
    activeRoute
  });
  testResults.push({
    name: 'navigateTo("simulation-control") DOES NOT render "Route Not Found"',
    pass: !containsNotFound
  });
  testResults.push({
    name: 'navigateTo("simulation-control") renders full Simulation Control Center View',
    pass: containsSimIframe && containsSimCenter
  });
}

// Test 3: Navigate to unknown route should render Route Not Found
{
  vm.runInContext("navigateTo('unknown-route-foobar');", context);
  const activeRoute = vm.runInContext('AppState.activeRoute', context);
  const isNotFoundRoute = activeRoute === 'not-found';
  const containsNotFound = renderedViewportHtml.includes('Route Not Found');
  testResults.push({
    name: 'navigateTo("unknown-route-foobar") correctly falls back to not-found view',
    pass: isNotFoundRoute && containsNotFound
  });
}

// Test 4: Navigate back to simulation-control and test BroadcastChannel telemetry ingestion
{
  vm.runInContext("navigateTo('simulation-control');", context);

  // Send telemetry via BroadcastChannel
  const senderChannel = new MockBroadcastChannel('gfb_simulation_sync');
  senderChannel.postMessage({
    type: 'GFB_SIM_SYNC',
    payload: {
      clock: '14:35:00',
      totalKw: 850.5,
      energy: 45000,
      machines: [
        { id: 'loom1', kw: 4.8, pf: 0.92, temp: 42.0, health: 96, fault: 0 },
        { id: 'boiler1', kw: 110.0, pf: 0.88, temp: 85.0, health: 89, fault: 0 }
      ],
      alerts: [
        { id: 'surge', sev: 'crit', time: '14:34', title: 'Power Surge Spike', body: 'Substation #1 surge detected.' }
      ]
    }
  });

  const lastUpdate = vm.runInContext('AppState.lastUpdateTimestamp', context);
  const alerts = vm.runInContext('AppState.alerts', context);
  const simAlert = alerts.find(a => a.id === 'SIM-surge');

  testResults.push({
    name: 'BroadcastChannel sync updates AppState.lastUpdateTimestamp with payload clock',
    pass: lastUpdate.includes('14:35:00'),
    lastUpdate
  });
  testResults.push({
    name: 'BroadcastChannel sync ingests and maps payload alert with SIM- prefix',
    pass: !!simAlert && simAlert.title === 'Power Surge Spike' && simAlert.severity === 'High',
    simAlert
  });
}

// Test 5: Storage event sync
{
  const storageListeners = mockWindowListeners['storage'] || [];
  const testStorageData = {
    clock: '15:10:00',
    totalKw: 920.0,
    energy: 48000,
    machines: [
      { id: 'loom1', kw: 5.1, pf: 0.93, temp: 43.0, health: 95, fault: 0 }
    ],
    alerts: []
  };

  storageListeners.forEach(fn => fn({
    key: 'gfb_simulation_state',
    newValue: JSON.stringify(testStorageData)
  }));

  const lastUpdateStorage = vm.runInContext('AppState.lastUpdateTimestamp', context);
  testResults.push({
    name: 'window "storage" event with key "gfb_simulation_state" updates AppState cleanly',
    pass: lastUpdateStorage.includes('15:10:00'),
    lastUpdateStorage
  });
}

// Test 6: Malformed / adversarial payloads do not crash the engine
{
  let crashed = false;
  try {
    const senderChannel = new MockBroadcastChannel('gfb_simulation_sync');
    // Send completely empty / corrupted / null objects
    senderChannel.postMessage(null);
    senderChannel.postMessage({});
    senderChannel.postMessage({ payload: null });
    senderChannel.postMessage({ payload: { alerts: [null, undefined, {}, { id: null }] } });
    senderChannel.postMessage({ payload: { totalKw: 'invalid', energy: null } });

    // window storage corrupted json
    const storageListeners = mockWindowListeners['storage'] || [];
    storageListeners.forEach(fn => fn({ key: 'gfb_simulation_state', newValue: '{malformed json...}' }));
  } catch(e) {
    crashed = true;
    console.error('Crash during malformed payload injection:', e);
  }

  testResults.push({
    name: 'Malformed / null / corrupted telemetry payloads handled cleanly without crash',
    pass: !crashed
  });
}

// Summary
console.log('\n--- ADVERSARIAL SIMULATION-CONTROL & SYNC RESULTS ---');
let allPassed = true;
for (const r of testResults) {
  console.log(`${r.pass ? '✓ PASS' : '✗ FAIL'}: ${r.name}`);
  if (!r.pass) {
    allPassed = false;
    console.log('   Details:', r);
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nAll adversarial simulation-control and sync tests PASSED (7/7)!');
}
