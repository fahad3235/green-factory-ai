const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Check AppState.agents
const agIdx = html.indexOf('agents:');
console.log('agents in AppState at:', agIdx);
if (agIdx !== -1) {
  console.log(html.substring(agIdx, agIdx + 1200));
}

// Check AppState.inventory
const invIdx = html.indexOf('inventory:');
console.log('inventory in AppState at:', invIdx);
if (invIdx !== -1) {
  console.log(html.substring(invIdx, invIdx + 1200));
}
