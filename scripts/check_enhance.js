const fs = require('fs');
const enhance = fs.readFileSync('scripts/enhance_index.js', 'utf8');

console.log('enhance_index.js length:', enhance.length);
console.log('Has renderInventoryProductionView:', enhance.includes('renderInventoryProductionView'));
console.log('Has renderSettingsView:', enhance.includes('renderSettingsView'));
console.log('Has renderAgentConsoleView:', enhance.includes('renderAgentConsoleView'));
console.log('Has renderSimulationControlCenterView:', enhance.includes('renderSimulationControlCenterView'));
console.log('Has renderSimulationControlView:', enhance.includes('renderSimulationControlView'));

// Let's check if enhance_index.js implemented these functions!
const regex = /function render[A-Za-z0-9_]+/g;
console.log('Render functions in enhance_index.js:', enhance.match(regex));
