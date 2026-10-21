const fs = require('fs');

const orig = fs.readFileSync('scripts/orig_index.html', 'utf8');
const curr = fs.readFileSync('preview/index.html', 'utf8');

console.log('In orig_index.html:');
console.log('renderInventoryProductionView:', orig.includes('renderInventoryProductionView'));
console.log('renderSettingsView:', orig.includes('renderSettingsView'));
console.log('renderAgentConsoleView:', orig.includes('renderAgentConsoleView'));
console.log('renderSimulationControlView:', orig.includes('renderSimulationControlView'));

console.log('\nIn preview/index.html:');
console.log('renderInventoryProductionView:', curr.includes('renderInventoryProductionView'));
console.log('renderSettingsView:', curr.includes('renderSettingsView'));
console.log('renderAgentConsoleView:', curr.includes('renderAgentConsoleView'));
console.log('renderSimulationControlView:', curr.includes('renderSimulationControlView'));
