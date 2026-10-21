const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/simulation.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let combinedJs = '';
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  combinedJs += match[1] + '\n;';
}

console.log('Simulation HTML JS length:', combinedJs.length);

const sandbox = {
  console: console,
  document: {
    documentElement: { classList: { contains: () => true } },
    getElementById: (id) => ({
      id,
      innerHTML: '',
      value: '1',
      textContent: '',
      classList: { add: () => {}, remove: () => {}, toggle: () => {} },
      appendChild: () => {},
      removeChild: () => {},
      setAttribute: () => {},
      style: {}
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
  console.log('✓ simulation.html parsed and ran in VM with 0 errors!');
} catch (e) {
  console.error('❌ Error in simulation.html:', e);
}
