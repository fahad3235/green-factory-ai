const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const inputIdx = html.indexOf('id="copilot-input"');
console.log('Copilot input area:');
console.log(html.substring(inputIdx - 300, inputIdx + 700));
