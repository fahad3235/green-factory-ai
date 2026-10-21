const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

const scriptMatches = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)];
const script6 = scriptMatches.find(m => !m[1].includes('src=') && m[2].length > 50000)[2];

const testRunnerCode = `
  console.log('Testing inside VM scope:');
  console.log('AppState activeRoute initial:', AppState.activeRoute);
  
  const testRoutes = [
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
    'simulation',
    'settings',
    'agent-console',
    'login'
  ];

  let passedCount = 0;
  for (const r of testRoutes) {
    try {
      AppState.activeRoute = r;
      renderActiveView();
      passedCount++;
      console.log('  ✓ Route [' + r + '] rendered successfully.');
    } catch (e) {
      console.error('  ✗ Route [' + r + '] ERROR:', e.message);
    }
  }
  console.log('Total routes passed: ' + passedCount + ' / ' + testRoutes.length);
`;

const mockElements = new Map();
function getMockElement(id) {
  if (!mockElements.has(id)) {
    mockElements.set(id, {
      id,
      className: '',
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      },
      innerHTML: '',
      textContent: '',
      style: {},
      value: '',
      children: [],
      appendChild: () => {},
      remove: () => {},
      setAttribute: () => {},
      getAttribute: () => null,
      addEventListener: () => {}
    });
  }
  return mockElements.get(id);
}

const context = {
  console: console,
  setTimeout: (fn) => setTimeout(fn, 1),
  clearTimeout: (id) => clearTimeout(id),
  setInterval: (fn) => setInterval(fn, 1000),
  clearInterval: (id) => clearInterval(id),
  document: {
    getElementById: (id) => getMockElement(id),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => getMockElement('mock-' + tag),
    body: getMockElement('body'),
    documentElement: getMockElement('html'),
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    location: { hash: '#/dashboard', pathname: '/' },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    innerWidth: 1280,
    innerHeight: 800,
    matchMedia: () => ({ matches: false })
  },
  navigator: { userAgent: 'NodeTest' },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  location: { hash: '#/dashboard', pathname: '/' },
  fetch: async () => ({ ok: true, json: async () => ({}) })
};
context.window.document = context.document;
context.window.window = context.window;

vm.createContext(context);
vm.runInContext(script6 + '\n' + testRunnerCode, context);
