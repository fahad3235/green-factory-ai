const fs = require('fs');
const enhance = fs.readFileSync('scripts/enhance_index.js', 'utf8');

const funcs = ['renderInventoryProductionView', 'renderSettingsView', 'renderAgentConsoleView'];
funcs.forEach(f => {
  let pos = 0;
  console.log(`Searching for "${f}" in enhance_index.js:`);
  while ((pos = enhance.indexOf(f, pos)) !== -1) {
    console.log(`Found at ${pos}:`);
    console.log(enhance.substring(Math.max(0, pos - 50), Math.min(enhance.length, pos + 120)));
    pos += f.length;
  }
});
