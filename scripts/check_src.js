const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');
const target = '<!-- Toggle Ask Green AI Copilot Drawer -->';
console.log(content.includes(target));
