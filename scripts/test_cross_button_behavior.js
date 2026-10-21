const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Mock DOM environment
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
    this.style = {};
  }
  focus() {}
}

const mockElements = {
  'copilot-drawer': new ElementMock('copilot-drawer'),
  'mobile-copilot-backdrop': new ElementMock('mobile-copilot-backdrop'),
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
    getItem: () => 'true' // authenticated
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

console.log('--- TEST 1: Initial state on Desktop (1440px) ---');
sandbox.window.innerWidth = 1440;
const drawer = mockElements['copilot-drawer'];
drawer.style.display = 'flex';
console.log('Initial drawer display:', drawer.style.display);

console.log('\n--- TEST 2: User clicks Cross (X) Button (toggleCopilotDrawer(false)) ---');
vm.runInContext('toggleCopilotDrawer(false);', sandbox);
console.log('After cross click - drawer.style.display:', drawer.style.display);
console.log('After cross click - has hidden class:', drawer.classList.contains('hidden'));
console.log('After cross click - has !hidden class:', drawer.classList.contains('!hidden'));
if (drawer.style.display === 'none' && drawer.classList.contains('hidden')) {
  console.log('✅ TEST 2 PASSED: Cross button successfully closes drawer on desktop/laptop!');
} else {
  console.error('❌ TEST 2 FAILED');
  process.exit(1);
}

console.log('\n--- TEST 3: User clicks Ask AI button to reopen (toggleCopilotDrawer(true)) ---');
vm.runInContext('toggleCopilotDrawer(true);', sandbox);
console.log('After Ask AI click - drawer.style.display:', drawer.style.display);
console.log('After Ask AI click - has hidden class:', drawer.classList.contains('hidden'));
if (drawer.style.display === 'flex' && !drawer.classList.contains('hidden')) {
  console.log('✅ TEST 3 PASSED: Ask AI successfully reopens drawer!');
} else {
  console.error('❌ TEST 3 FAILED');
  process.exit(1);
}

console.log('\n--- TEST 4: Mobile Viewport (390px) Cross Click ---');
sandbox.window.innerWidth = 390;
const backdrop = mockElements['mobile-copilot-backdrop'];
vm.runInContext('toggleCopilotDrawer(true);', sandbox);
console.log('Mobile opened - backdrop hidden:', backdrop.classList.contains('hidden'));
vm.runInContext('toggleCopilotDrawer(false);', sandbox);
console.log('Mobile cross clicked - drawer display:', drawer.style.display);
console.log('Mobile cross clicked - backdrop hidden:', backdrop.classList.contains('hidden'));
if (drawer.style.display === 'none' && backdrop.classList.contains('hidden')) {
  console.log('✅ TEST 4 PASSED: Cross button successfully closes drawer and backdrop on mobile!');
} else {
  console.error('❌ TEST 4 FAILED');
  process.exit(1);
}

console.log('\n🎉 ALL CROSS BUTTON BEHAVIOR TESTS PASSED 100%!');
