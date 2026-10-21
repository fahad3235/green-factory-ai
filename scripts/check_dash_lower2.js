const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

console.log(html.substring(774500, 778000));
