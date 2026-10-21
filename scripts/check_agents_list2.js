const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('AGT-CARBON');
console.log(html.substring(sIdx + 500, sIdx + 3000));
