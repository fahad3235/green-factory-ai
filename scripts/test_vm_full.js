const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let combinedJs = '';
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  combinedJs += match[1] + '\n;';
}

console.log('Combined JS length:', combinedJs.length);

const sandbox = {
  console: console,
  tailwind: { config: {} },
  Chart: class { constructor() {} destroy() {} update() {} },
  document: {
    documentElement: { classList: { contains: () => true } },
    getElementById: (id) => ({
      id,
      innerHTML: '',
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      getContext: () => ({})
    }),
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    location: { hash: '' }
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => typeof fn === 'function' && fn(),
  clearTimeout: () => {},
  navigator: { userAgent: 'test' }
};

sandbox.window.document = sandbox.document;
sandbox.global = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(combinedJs, sandbox);
  console.log('VM parsed combined JS successfully!');

  // Now test rendering each view
  const routes = [
    'dashboard', 'energy-analytics', 'factory-operations', 'bill-carbon-forecast',
    'ai-recommendations', 'savings-tracker', 'carboniq-report', 'sustainability-reports',
    'machine-monitoring', 'digital-twin', 'inventory-production', 'simulation',
    'simulation-control', 'settings', 'agent-console'
  ];

  routes.forEach(r => {
    vm.runInContext(`AppState.activeRoute = '${r}'; renderActiveView();`, sandbox);
    console.log(`Rendered route ${r} successfully.`);
  });
  console.log('ALL 15 ROUTES RENDERED SUCCESSFULLY IN VM WITH ZERO ERRORS!');
} catch (e) {
  console.error('VM Error:', e);
}
