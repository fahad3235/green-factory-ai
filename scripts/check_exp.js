const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const expIdx = html.indexOf('2. Explain');
console.log(html.substring(expIdx - 800, expIdx));
