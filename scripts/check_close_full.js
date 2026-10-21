const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const idx = html.indexOf('toggleCopilotDrawer(false)');
console.log('Close button full block:');
console.log(html.substring(idx - 30, idx + 600));
