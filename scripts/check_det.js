const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const detIdx = html.indexOf('1. Detect');
console.log(html.substring(detIdx - 800, detIdx));
