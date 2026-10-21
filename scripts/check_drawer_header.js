const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const drawerIdx = html.indexOf('id="copilot-drawer"');
console.log(html.substring(drawerIdx, drawerIdx + 2000));
