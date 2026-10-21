const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

const domMocks = {
  document: {
    documentElement: { classList: { contains: () => false } },
    getElementById: (id) => ({
      innerHTML: '',
      textContent: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      setAttribute: () => {},
      style: {}
    }),
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

// Test routes via VM eval
const routes = [
  'dashboard',
  'energy-analytics',
  'factory-operations',
  'bill-carbon-forecast',
  'ai-recommendations',
  'savings-tracker',
  'carboniq-report',
  'sustainability-reports',
  'machine-monitoring',
  'digital-twin',
  'inventory-production',
  'simulation-control',
  'settings',
  'agent-console'
];

for (const r of routes) {
  try {
    vm.runInContext("AppState.activeRoute = '" + r + "'; renderActiveView();", context);
    console.log("PASS: renderActiveView for " + r);
  } catch (e) {
    console.error("FAIL: renderActiveView for " + r + ":", e.message, e.stack);
  }
}
