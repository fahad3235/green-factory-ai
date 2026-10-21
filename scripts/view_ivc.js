const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const ivcIdx = html.indexOf('function initViewCharts');
console.log(html.substring(ivcIdx, ivcIdx + 3000));
