const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

const domMocks = {
  document: {
    documentElement: { classList: { contains: () => false } },
    getElementById: () => null,
    querySelectorAll: () => []
  },
  window: {
    location: { hash: '' },
    addEventListener: () => {},
    sessionStorage: { getItem: () => 'true' }
  },
  sessionStorage: { getItem: () => 'true' },
  console: console
};

const context = vm.createContext(domMocks);
vm.runInContext(scriptContent, context);

console.log('--- Initial State ---');
const m0 = context.getDerivedMetrics();
console.log('m0 availabilityPct:', m0.availabilityPct);
console.log('m0 estimatedSavingsBdt:', m0.estimatedSavingsBdt);
console.log('m0 totalPeriodKwh:', m0.totalPeriodKwh);

const rows0 = context.getDashboardMachineRows(m0);
console.log('Rows 0 preview:\n', rows0.substring(0, 200));

console.log('\n--- Step Forward 1 Tick ---');
context.stepSimulationForward(true);
const m1 = context.getDerivedMetrics();
console.log('m1 availabilityPct:', m1.availabilityPct);
console.log('m1 estimatedSavingsBdt:', m1.estimatedSavingsBdt);
console.log('m1 totalPeriodKwh:', m1.totalPeriodKwh);

console.log('\n--- Step Forward 5 Ticks ---');
for (let i = 0; i < 5; i++) context.stepSimulationForward(true);
const m5 = context.getDerivedMetrics();
console.log('m5 availabilityPct:', m5.availabilityPct);
console.log('m5 estimatedSavingsBdt:', m5.estimatedSavingsBdt);
console.log('m5 totalPeriodKwh:', m5.totalPeriodKwh);

const rows5 = context.getDashboardMachineRows(m5);
console.log('Rows 5 preview:\n', rows5.substring(0, 200));

const svg5 = context.generateEnergyChartSvg('month', m5, context.AppState.simTickCount, false);
console.log('SVG 5 length:', svg5.length);
console.log('SVG has Oct 15 Peak:', svg5.includes('Oct 15'));
console.log('SVG has 8,240 kWh:', svg5.includes('8,240 kWh'));
