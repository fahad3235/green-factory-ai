const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const fnIdx = html.indexOf('function renderActiveView(');
if (fnIdx !== -1) {
  console.log(html.substring(fnIdx, fnIdx + 1200));
}
