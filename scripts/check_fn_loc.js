const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const funcs = ['renderInventoryProductionView', 'renderSettingsView', 'renderAgentConsoleView', 'renderActiveView'];

for (const fn of funcs) {
  let pos = 0;
  while ((pos = html.indexOf(fn, pos)) !== -1) {
    console.log(`${fn} at ${pos}:`);
    console.log(html.substring(Math.max(0, pos - 50), Math.min(html.length, pos + 100)));
    console.log('---');
    pos += fn.length;
  }
}
