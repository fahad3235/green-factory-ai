const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('Energy Usage Overview Chart (5 cols)');
console.log(html.substring(sIdx - 200, sIdx + 4000));
