const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const ravIdx = html.indexOf('function renderActiveView()');
console.log(html.substring(ravIdx, ravIdx + 1500));
