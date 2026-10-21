const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const stripIdx = html.indexOf('function renderLiveMetricsStrip(');
if (stripIdx !== -1) {
  console.log(html.substring(stripIdx, stripIdx + 1500));
}
