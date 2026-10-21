const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const rIdx = html.indexOf('3. Recommend');
console.log(html.substring(rIdx - 800, rIdx));
