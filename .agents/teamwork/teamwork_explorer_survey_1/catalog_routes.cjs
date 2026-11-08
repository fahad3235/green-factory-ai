const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

const viewsOutput = {};

const domMocks = {
  document: {
    documentElement: { classList: { contains: () => false, add: () => {}, remove: () => {} } },
    getElementById: (id) => ({
      innerHTML: '',
      set innerHTML(val) {
        if (id === 'main-viewport') viewsOutput[currentRoute] = val;
      },
      textContent: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      setAttribute: () => {},
      removeAttribute: () => {},
      style: {}
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, style: {} })
  },
  window: {
    location: { hash: '' },
    addEventListener: () => {},
    sessionStorage: { getItem: () => 'true', setItem: () => {} },
    localStorage: { getItem: () => null, setItem: () => {} },
    lucide: { createIcons: () => {} },
    Chart: function() { return { destroy: () => {}, update: () => {} }; }
  },
  sessionStorage: { getItem: () => 'true', setItem: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: (fn) => fn(),
  setInterval: () => 1,
  console: console
};

const context = vm.createContext(domMocks);
vm.runInContext(scriptContent, context);

const routes = [
  'dashboard', 'energy-analytics', 'factory-operations', 'bill-carbon-forecast',
  'ai-recommendations', 'savings-tracker', 'carboniq-report', 'sustainability-reports',
  'machine-monitoring', 'digital-twin', 'inventory-production', 'simulation',
  'simulation-control', 'settings', 'agent-console'
];

let currentRoute = '';
routes.forEach(r => {
  currentRoute = r;
  vm.runInContext("AppState.activeRoute = '" + r + "'; renderActiveView();", context);
});

console.log('Routes captured:', Object.keys(viewsOutput));

routes.forEach(r => {
  const v = viewsOutput[r] || '';
  const buttons = (v.match(/<button[^>]*>/gi) || []).length;
  const inputs = (v.match(/<input[^>]*>/gi) || []).length;
  const selects = (v.match(/<select[^>]*>/gi) || []).length;
  const tables = (v.match(/<table[^>]*>/gi) || []).length;
  const canvases = (v.match(/<canvas[^>]*>/gi) || []).length;
  const svgs = (v.match(/<svg[^>]*>/gi) || []).length;
  console.log(`Route [${r}]: len=${v.length}, buttons=${buttons}, inputs=${inputs}, selects=${selects}, tables=${tables}, canvas=${canvases}, svgs=${svgs}`);
});
