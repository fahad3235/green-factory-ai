const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('preview/index.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let match, mainCode = '';
while ((match = scriptRegex.exec(html)) !== null) {
  if (match[1].includes('const AppState = {')) {
    mainCode = match[1];
    break;
  }
}

const context = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  Date, Math, Number, String, Array, Object, JSON,
  addEventListener: () => {}, removeEventListener: () => {},
  matchMedia: () => ({ matches: false, addEventListener: () => {} }),
  window: null,
  document: {
    documentElement: { classList: { contains: () => true, add: () => {}, remove: () => {} } },
    getElementById: () => ({ value: '', textContent: '', innerHTML: '', classList: { add: () => {}, remove: () => {} } }),
    querySelectorAll: () => []
  },
  location: { hash: '#/carboniq-report' },
  sessionStorage: { getItem: () => null, setItem: () => {} }
};
context.window = context;
vm.createContext(context);
vm.runInContext(mainCode, context);

const AppState = vm.runInContext('AppState', context);
const getDerivedMetrics = vm.runInContext('getDerivedMetrics', context);
const stepSimulationForward = vm.runInContext('stepSimulationForward', context);

console.log('=== 30-Tick Strict Monotonic Increase Test ===');
let prevCredits = -1;
let prevAvailableWallet = -1;

for (let tick = 0; tick <= 30; tick++) {
  if (tick > 0) {
    stepSimulationForward(true);
  }
  const m = getDerivedMetrics();
  const liveAvailable = Number((AppState.carbonCredits.available + m.simPotentialCredits).toFixed(2));
  
  console.log(`Tick #${AppState.simTickCount}: Credits = +${m.simPotentialCredits.toFixed(2)} tCO2e | Available Wallet = ${liveAvailable.toFixed(2)} tCO2e | Avoided = ${m.simAvoidedKwh.toFixed(1)} kWh`);
  
  if (tick > 0) {
    assert.ok(m.simPotentialCredits >= prevCredits, `Regression! Credit decreased at tick #${tick}: ${m.simPotentialCredits} < ${prevCredits}`);
    assert.ok(liveAvailable >= prevAvailableWallet, `Regression! Wallet decreased at tick #${tick}: ${liveAvailable} < ${prevAvailableWallet}`);
  }
  
  prevCredits = m.simPotentialCredits;
  prevAvailableWallet = liveAvailable;
}

console.log('✓ SUCCESS: All 30 ticks strictly increased or held with ZERO decrease!');
