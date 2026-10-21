const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('Your Sustainability Journey (Core Loop)');
console.log(html.substring(sIdx - 600, sIdx - 300));
