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
vm.runInContext(scriptContent + `
  console.log('Testing generateEnergyChartSvg in context:');
  const m = getDerivedMetrics();
  const svg = generateEnergyChartSvg('month', m, AppState.simTickCount, false);
  console.log('SVG length:', svg.length);
  console.log('SVG contains Oct 15 Peak:', svg.includes('Oct 15'));
  console.log('SVG contains 8,240 kWh:', svg.includes('8,240 kWh'));
  console.log('SVG contains target line:', svg.includes('stroke="#059669"'));
  console.log('SVG contains usage line:', svg.includes('stroke="#0284C7"'));
  console.log('SVG contains production line:', svg.includes('stroke="#10B981"'));
`, context);
