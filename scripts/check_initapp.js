const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const initIdx = html.indexOf('function initApp(');
if (initIdx !== -1) {
  console.log(html.substring(initIdx, initIdx + 1500));
}
