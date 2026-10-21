const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

console.log('function renderInventoryProductionView in html:', html.includes('function renderInventoryProductionView'));
console.log('function renderSettingsView in html:', html.includes('function renderSettingsView'));
console.log('function renderAgentConsoleView in html:', html.includes('function renderAgentConsoleView'));

const orig = fs.readFileSync('scripts/orig_index.html', 'utf8');
console.log('\nIn orig_index.html:');
console.log('function renderInventoryProductionView in orig:', orig.includes('function renderInventoryProductionView'));
console.log('function renderSettingsView in orig:', orig.includes('function renderSettingsView'));
console.log('function renderAgentConsoleView in orig:', orig.includes('function renderAgentConsoleView'));
