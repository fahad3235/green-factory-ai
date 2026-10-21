const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const askIdx = html.indexOf('function askCopilotDirect(');
console.log(html.substring(askIdx, askIdx + 800));
