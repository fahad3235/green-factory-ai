const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

class ClassList {
  constructor() { this.classes = new Set(); }
  add(...cls) { cls.forEach(c => this.classes.add(c)); }
  remove(...cls) { cls.forEach(c => this.classes.delete(c)); }
  contains(c) { return this.classes.has(c); }
  toggle(c) {
    if (this.classes.has(c)) { this.classes.delete(c); return false; }
    else { this.classes.add(c); return true; }
  }
}

class ElementMock {
  constructor(id) {
    this.id = id;
    this.classList = new ClassList();
    this.style = {
      display: '',
      setProperty: (prop, val) => { this.style[prop] = val; },
      removeProperty: (prop) => { delete this.style[prop]; }
    };
  }
  focus() {}
}

const mockElements = {
  'copilot-drawer': new ElementMock('copilot-drawer'),
  'mobile-copilot-backdrop': new ElementMock('mobile-copilot-backdrop'),
  'floating-ai-launcher': new ElementMock('floating-ai-launcher'),
  'copilot-input': new ElementMock('copilot-input'),
  'main-viewport': new ElementMock('main-viewport')
};

const sandbox = {
  window: {
    innerWidth: 1440,
    location: { hash: '' },
    addEventListener: () => {},
    removeEventListener: () => {},
    history: { pushState: () => {} }
  },
  document: {
    getElementById: (id) => mockElements[id] || new ElementMock(id),
    querySelectorAll: () => [],
    querySelector: () => null,
    body: { classList: new ClassList() }
  },
  sessionStorage: {
    getItem: () => 'true'
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  isSessionAuthenticated: () => true,
  toggleLoginPortalModal: () => {},
  showToast: () => {},
  renderCopilotDrawerContent: () => {},
  console: console
};

vm.createContext(sandbox);

// Extract the script containing toggleCopilotDrawer
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let extractedCode = '';
while ((match = scriptRegex.exec(html)) !== null) {
  if (match[1].includes('function toggleCopilotDrawer')) {
    extractedCode = match[1];
    break;
  }
}

vm.runInContext(extractedCode, sandbox);

const drawer = mockElements['copilot-drawer'];
const fab = mockElements['floating-ai-launcher'];

console.log('--- TEST 1: Open Copilot (Desktop or Mobile) ---');
vm.runInContext('toggleCopilotDrawer(true);', sandbox);
console.log('Drawer display:', drawer.style.display);
console.log('FAB display:', fab.style.display);
console.log('FAB has hidden class:', fab.classList.contains('hidden'));
if (drawer.style.display === 'flex' && fab.style.display === 'none' && fab.classList.contains('hidden')) {
  console.log('✅ TEST 1 PASSED: When Copilot is OPEN, floating-ai-launcher is completely HIDDEN!');
} else {
  console.error('❌ TEST 1 FAILED');
  process.exit(1);
}

console.log('\n--- TEST 2: Close Copilot (User clicks Cross button) ---');
vm.runInContext('toggleCopilotDrawer(false);', sandbox);
console.log('Drawer display:', drawer.style.display);
console.log('FAB display:', fab.style.display);
console.log('FAB has hidden class:', fab.classList.contains('hidden'));
if (drawer.style.display === 'none' && fab.style.display === 'flex' && !fab.classList.contains('hidden')) {
  console.log('✅ TEST 2 PASSED: When Copilot is CLOSED, floating-ai-launcher is RESTORED for user to click!');
} else {
  console.error('❌ TEST 2 FAILED');
  process.exit(1);
}

console.log('\n--- TEST 3: User clicks FAB to re-open Copilot ---');
vm.runInContext('toggleCopilotDrawer(true);', sandbox);
console.log('Drawer display:', drawer.style.display);
console.log('FAB display:', fab.style.display);
if (drawer.style.display === 'flex' && fab.style.display === 'none') {
  console.log('✅ TEST 3 PASSED: FAB re-hides itself as soon as Copilot re-opens!');
} else {
  console.error('❌ TEST 3 FAILED');
  process.exit(1);
}

console.log('\n🎉 ALL FLOATING LAUNCHER HIDE/SHOW TESTS PASSED 100%!');
