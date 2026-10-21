const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const vIdx = html.indexOf('5. Verify');
console.log(html.substring(vIdx - 800, vIdx + 100));
