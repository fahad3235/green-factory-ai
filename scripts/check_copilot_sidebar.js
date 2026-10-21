const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const copilotIdx = html.indexOf('copilot-sidebar');
if (copilotIdx !== -1) {
  console.log('Copilot sidebar declaration:');
  console.log(html.substring(copilotIdx - 100, copilotIdx + 1200));
} else {
  console.log('copilot-sidebar not found');
}
