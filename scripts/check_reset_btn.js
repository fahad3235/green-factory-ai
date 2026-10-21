const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const idx = html.indexOf('resetCopilotChat()');
console.log('From resetCopilotChat():');
console.log(html.substring(idx, idx + 1000));
