const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('const VALID_ROUTES');
const scriptStart = html.lastIndexOf('<script>', sIdx);
const scriptEnd = html.indexOf('</script>', sIdx);
const scriptCode = html.substring(scriptStart + '<script>'.length, scriptEnd);

global.window = {
  location: { hash: '#/dashboard' },
  addEventListener: () => {}
};
global.document = {
  documentElement: { classList: { contains: () => false } },
  getElementById: (id) => ({
    textContent: '',
    innerHTML: '',
    getContext: () => ({}),
    classList: { add: () => {}, remove: () => {} },
    getAttribute: () => null
  }),
  querySelectorAll: () => [],
  hidden: false
};
global.sessionStorage = {
  getItem: () => 'true',
  setItem: () => {}
};
global.Chart = function() {
  return {
    destroy: () => {},
    update: () => {},
    data: { labels: [], datasets: [{ data: [] }, { data: [] }, { data: [] }] }
  };
};

eval(scriptCode);

console.log('Testing night_idle waste scenario impact on live savings:');
AppState.activeScenario = 'night_idle';
for (let i = 1; i <= 5; i++) {
  stepSimulationForward(true);
  const m = getDerivedMetrics();
  console.log(`Night Idle Tick ${i} -> Savings: ৳ ${m.estimatedSavingsBdt.toLocaleString()} | Carbon: ${m.totalRecSavedCo2} tCO2e`);
}
