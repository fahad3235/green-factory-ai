const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('preview/index.html', 'utf8');
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let combinedJs = '';
let m;
while ((m = scriptRegex.exec(html)) !== null) {
  combinedJs += m[1] + '\n';
}

const sandbox = {
  console,
  tailwind: { config: {} },
  Chart: class { constructor() {} destroy() {} update() {} },
  document: {
    documentElement: { classList: { contains: () => true, toggle: () => true } },
    getElementById: (id) => ({
      id,
      innerHTML: '',
      value: '12.40',
      textContent: '',
      scrollTop: 0,
      scrollHeight: 1000,
      classList: { add: () => {}, remove: () => {}, toggle: () => true, contains: () => true },
      appendChild: () => {},
      removeChild: () => {},
      setAttribute: () => {},
      focus: () => {},
      style: {}
    }),
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, classList: { add: () => {} } }),
    body: { appendChild: () => {}, removeChild: () => {} },
    addEventListener: () => {}
  },
  window: {
    location: { hash: '' },
    addEventListener: () => {}
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => typeof fn === 'function' && fn(),
  navigator: { userAgent: 'test' }
};

sandbox.window.document = sandbox.document;
sandbox.global = sandbox;

vm.createContext(sandbox);
vm.runInContext(combinedJs, sandbox);

const queries = [
  'Why did energy use rise this week?',
  'Which machine wastes the most energy during night shift?',
  'What is next month’s bill estimate if we do nothing?',
  'Compare the three highest-impact recommendations.',
  'Show the assumptions behind this carbon estimate.',
  'What changed after the simulated intervention?',
  'Explain this in Bangla.',
  'Which data is live and which is simulated?',
  'এই মাসে বিদ্যুৎ খরচ কেন বেড়েছে? কোন কোন মেশিনে বেশি বিদ্যুৎ খরচ হচ্ছে?',
  'Hi',
  'Hello',
  'কেন রাতে বিদ্যুৎ অপচয় হচ্ছে?',
  'কম্প্রেসার লিক',
  '৳ 68,000',
  '6 agents'
];

console.log('Testing Copilot Replies for all queries:');
queries.forEach(q => {
  const reply = sandbox.generateGroundedCopilotReply(q);
  assert.ok(reply && reply.length > 20, `Reply for "${q}" must be non-empty`);
  console.log(`✓ [Query]: ${q}`);
  console.log(`  [Reply Snippet]: ${reply.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 100)}...`);
});

sandbox.submitCopilotQuestion('Hello Green AI');
const msgsLen = vm.runInContext('AppState.copilotMessages.length', sandbox);
assert.ok(msgsLen >= 3, 'copilotMessages should have user and assistant messages added');
console.log('✓ submitCopilotQuestion executed successfully!');
console.log('ALL COPILOT TESTS PASSED!');
