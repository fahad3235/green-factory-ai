const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('AGT-ENERGY');
console.log(html.substring(sIdx, sIdx + 3000));
