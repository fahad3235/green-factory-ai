const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Extract the main script block
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let mainCode = '';
while ((match = scriptRegex.exec(html)) !== null) {
  if (match[1].includes('const AppState = {')) {
    mainCode = match[1];
    break;
  }
}

if (!mainCode) {
  console.error('Failed to extract main app script');
  process.exit(1);
}

// Mock window, document, etc. for headless Node test
const context = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  Date,
  Math,
  Number,
  String,
  Array,
  Object,
  JSON,
  addEventListener: () => {},
  removeEventListener: () => {},
  matchMedia: () => ({ matches: false, addEventListener: () => {} }),
  window: null,
  document: {
    documentElement: { classList: { contains: () => true, add: () => {}, remove: () => {} } },
    getElementById: (id) => ({
      value: '',
      textContent: '',
      innerHTML: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      focus: () => {},
      appendChild: () => {}
    }),
    querySelectorAll: () => [],
    createElement: () => ({
      className: '',
      innerHTML: '',
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {}
    }),
    addEventListener: () => {},
    removeEventListener: () => {},
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  navigator: { userAgent: 'test' },
  location: { hash: '#/carboniq-report' },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }
};
context.window = context;

vm.createContext(context);
vm.runInContext(mainCode, context);

const AppState = vm.runInContext('AppState', context);
const getDerivedMetrics = vm.runInContext('getDerivedMetrics', context);
const stepSimulationForward = vm.runInContext('stepSimulationForward', context);
const applyScenarioState = vm.runInContext('applyScenarioState', context);
const mintSimulatedCarbonCredits = vm.runInContext('mintSimulatedCarbonCredits', context);
const generateGroundedCopilotReply = vm.runInContext('generateGroundedCopilotReply', context);
const renderCarbonIqReportView = vm.runInContext('renderCarbonIqReportView', context);

console.log('Testing Simulation Carbon Credit System...');

// 1. Initial Baseline
const mBaseline = getDerivedMetrics();
console.log('1. Baseline Simulation Abatement:', mBaseline.simTotalAbatementTons, 'tCO2e | Credits:', mBaseline.simPotentialCredits, '| Revenue:', '৳' + mBaseline.simRevenueBdt);
assert.ok(typeof mBaseline.simPotentialCredits === 'number', 'simPotentialCredits must be a number');
assert.ok(typeof mBaseline.simRevenueBdt === 'number', 'simRevenueBdt must be a number');

// 2. Apply Energy Intervention Scenario
console.log('2. Applying Energy Efficiency Intervention Scenario...');
applyScenarioState('energy_intervention', 'Energy Efficiency Optimization');
const mIntervention = getDerivedMetrics();
console.log('Intervention Simulation Abatement:', mIntervention.simTotalAbatementTons, 'tCO2e | Credits:', mIntervention.simPotentialCredits, '| Revenue:', '৳' + mIntervention.simRevenueBdt);
assert.ok(mIntervention.simTotalAbatementTons > mBaseline.simTotalAbatementTons, 'Intervention scenario must increase simulated carbon abatement');
assert.ok(mIntervention.simRevenueBdt > mBaseline.simRevenueBdt, 'Intervention scenario must increase projected BDT revenue');

// 3. Step Simulation Forward by ticks
console.log('3. Stepping Simulation Forward (+5 ticks)...');
const prevTicks = AppState.simTickCount;
const prevAvoidedKwh = AppState.simAvoidedKwh || 0;
for (let i = 0; i < 5; i++) {
  stepSimulationForward(true);
}
const mStepped = getDerivedMetrics();
console.log(`After 5 ticks (Tick #${AppState.simTickCount}): Avoided kWh:`, AppState.simAvoidedKwh, 'Avoided CO2:', mStepped.simLiveAvoidedCo2Tons, 'tCO2e');
assert.equal(AppState.simTickCount, prevTicks + 5, 'Tick count must increment by 5');
assert.ok(AppState.simAvoidedKwh >= prevAvoidedKwh, 'simAvoidedKwh must accumulate');

// 4. Test Minting Simulated Carbon Credits
console.log('4. Minting Simulated Carbon Credits...');
const prevAvailable = AppState.carbonCredits.available;
const prevTotalMinted = AppState.carbonCredits.totalMinted;
const prevLedgerCount = AppState.carbonCredits.ledger.length;

mintSimulatedCarbonCredits();

console.log('New Available:', AppState.carbonCredits.available, 'New Total Minted:', AppState.carbonCredits.totalMinted, 'New Ledger Batches:', AppState.carbonCredits.ledger.length);
assert.ok(AppState.carbonCredits.available > prevAvailable, 'Available balance must increase after minting');
assert.ok(AppState.carbonCredits.totalMinted > prevTotalMinted, 'Total minted must increase after minting');
assert.equal(AppState.carbonCredits.ledger.length, prevLedgerCount + 1, 'Ledger must have 1 new batch');
assert.equal(AppState.carbonCredits.ledger[0].status, 'Active', 'New batch must be Active');

// 5. Test CarbonIQ Report View rendering with simulation hub
console.log('5. Rendering CarbonIQ Report View...');
const viewHtml = renderCarbonIqReportView(mStepped);
assert.ok(viewHtml.includes('LIVE SIMULATION CARBON IMPACT'), 'Must contain Live Simulation Carbon Impact hub');
assert.ok(viewHtml.includes('Simulation Carbon Credit Yield:'), 'Must display Simulation Carbon Credit Yield');
assert.ok(viewHtml.includes('mintSimulatedCarbonCredits()'), 'Must contain mintSimulatedCarbonCredits() button');
assert.ok(viewHtml.includes('Max Abatement (+18.4 tCO₂e)'), 'Must contain 1-click test scenario button');

// 6. Test AI Copilot Grounded Reply
console.log('6. Testing AI Copilot Grounded Responses...');
const replyEn = generateGroundedCopilotReply('How do simulation changes affect our carbon credits?', mStepped);
console.log('AI Copilot EN reply snippet:', replyEn.slice(0, 160).replace(/\n/g, ' '));
assert.ok(replyEn.includes('Simulation Carbon Credit Yield') || replyEn.includes('Live Simulation Carbon Yield'), 'Copilot must quote simulation carbon yield');

AppState.language = 'bn';
const replyBn = generateGroundedCopilotReply('সিমুলেশন পরিবর্তন কীভাবে আমাদের কার্বন ক্রেডিট প্রভাবিত করে?', mStepped);
console.log('AI Copilot BN reply snippet:', replyBn.slice(0, 160).replace(/\n/g, ' '));
assert.ok(replyBn.includes('সিমুলেশন কার্বন ফলন') || replyBn.includes('সিমুলেশন'), 'Copilot must quote simulation carbon in Bangla');

// 7. Test Wallet Cards Live Simulation Sync
console.log('7. Testing Wallet Cards Live Simulation Sync...');
const liveAvailExpected = Number((AppState.carbonCredits.available + mStepped.simPotentialCredits).toFixed(2));
const liveMintedExpected = Number((AppState.carbonCredits.totalMinted + mStepped.simPotentialCredits).toFixed(2));
assert.ok(viewHtml.includes(liveAvailExpected.toFixed(2)), `Card 1 must include live available credits ${liveAvailExpected.toFixed(2)}`);
assert.ok(viewHtml.includes(`(Base: ${AppState.carbonCredits.available.toFixed(2)} + Sim: +${mStepped.simPotentialCredits.toFixed(2)})`), 'Card 1 must show Base + Sim breakdown badge');
assert.ok(viewHtml.includes(liveMintedExpected.toFixed(2)), `Card 3 must include live total minted ${liveMintedExpected.toFixed(2)}`);
assert.ok(viewHtml.includes('VCS-BD-2026-SIM-LIVE'), 'Cryptographic Ledger table must include VCS-BD-2026-SIM-LIVE dynamic simulation batch');
console.log(`   ✓ Card 1 live available credits: ${liveAvailExpected} tCO₂e (Base: ${AppState.carbonCredits.available} + Sim: ${mStepped.simPotentialCredits})`);
console.log(`   ✓ Card 3 live total minted: ${liveMintedExpected} tCO₂e`);
console.log('   ✓ Cryptographic ledger contains VCS-BD-2026-SIM-LIVE live simulation batch');

console.log('========================================================');
console.log('✓ ALL SIMULATION CARBON CREDIT SCENARIO TESTS PASSED 100%');
console.log('========================================================');

