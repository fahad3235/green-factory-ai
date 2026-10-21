const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const gdmIdx = html.indexOf('function getDerivedMetrics');
console.log(html.substring(gdmIdx, gdmIdx + 2000));
