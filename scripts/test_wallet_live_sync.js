const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Extract script 3
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;
let mainScript = '';
while ((match = scriptRegex.exec(html)) !== null) {
  scriptIndex++;
  if (scriptIndex === 3) {
    mainScript = match[1];
    break;
  }
}

// Setup sandbox
const domMock = {
  getElementById: (id) => ({
    textContent: '',
    innerHTML: '',
    value: '',
    classList: { add: () => {}, remove: () => {} },
    setAttribute: () => {},
    getAttribute: () => null
  }),
  querySelectorAll: () => [],
  activeElement: null
};

const sandbox = {
  console: console,
  document: domMock,
  window: {
    addEventListener: () => {},
    sessionStorage: { getItem: () => null, setItem: () => {} },
    location: { hash: '#carboniq-report' },
    onload: null
  },
  sessionStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: () => {},
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {}
};

vm.createContext(sandbox);
vm.runInContext(mainScript, sandbox);

console.log('--- Testing Wallet Cards Live Simulation Sync ---');

// 1. Initial State (Baseline)
let m1 = sandbox.getDerivedMetrics();
console.log('1. Baseline metrics:');
console.log('   simPotentialCredits:', m1.simPotentialCredits);
console.log('   base cc.available:', sandbox.AppState.carbonCredits.available);

let htmlView1 = sandbox.renderCarbonIqReportView(m1);

// Verify Card 1 reflects live available credits
const expectedLiveAvail1 = Number((sandbox.AppState.carbonCredits.available + m1.simPotentialCredits).toFixed(2));
console.log('   Expected liveAvailableCredits:', expectedLiveAvail1);

if (!htmlView1.includes(expectedLiveAvail1.toFixed(2))) {
  throw new Error(`Card 1 does not contain expected live available credits: ${expectedLiveAvail1}`);
}
if (!htmlView1.includes(`(Base: ${sandbox.AppState.carbonCredits.available.toFixed(2)} + Sim: +${m1.simPotentialCredits.toFixed(2)})`)) {
  throw new Error('Card 1 missing Base + Sim breakdown badge');
}
console.log('   ✓ Card 1 accurately displays live available credits:', expectedLiveAvail1);

// 2. Change Scenario to Energy Intervention
console.log('2. Switching scenario to energy_intervention:');
sandbox.applyScenarioState('energy_intervention', 'Energy Intervention');
let m2 = sandbox.getDerivedMetrics();
console.log('   New simPotentialCredits:', m2.simPotentialCredits);

let htmlView2 = sandbox.renderCarbonIqReportView(m2);
const expectedLiveAvail2 = Number((sandbox.AppState.carbonCredits.available + m2.simPotentialCredits).toFixed(2));
console.log('   New Expected liveAvailableCredits:', expectedLiveAvail2);

if (!htmlView2.includes(expectedLiveAvail2.toFixed(2))) {
  throw new Error(`Card 1 did not dynamically update to: ${expectedLiveAvail2}`);
}
console.log('   ✓ Card 1 dynamically updated to:', expectedLiveAvail2);

// 3. Step simulation forward (+10 ticks)
console.log('3. Stepping simulation forward 10 ticks:');
for (let i = 0; i < 10; i++) {
  sandbox.stepSimulationForward(true);
}
let m3 = sandbox.getDerivedMetrics();
console.log('   Sim tick count:', sandbox.AppState.simTickCount);
console.log('   simAvoidedKwh:', m3.simAvoidedKwh);
console.log('   simPotentialCredits after ticks:', m3.simPotentialCredits);

let htmlView3 = sandbox.renderCarbonIqReportView(m3);
const expectedLiveAvail3 = Number((sandbox.AppState.carbonCredits.available + m3.simPotentialCredits).toFixed(2));

if (!htmlView3.includes(expectedLiveAvail3.toFixed(2))) {
  throw new Error(`Card 1 did not reflect tick progression: ${expectedLiveAvail3}`);
}
console.log('   ✓ Card 1 dynamically reflects tick progression:', expectedLiveAvail3);

// 4. Test Cryptographic Ledger table dynamic live row
if (!htmlView3.includes('VCS-BD-2026-SIM-LIVE')) {
  throw new Error('Ledger table missing VCS-BD-2026-SIM-LIVE dynamic simulation batch');
}
console.log('   ✓ Cryptographic ledger table contains VCS-BD-2026-SIM-LIVE dynamic simulation batch');

console.log('\n✓ ALL WALLET LIVE SIMULATION SYNC TESTS PASSED PERFECTLY (100%)');
