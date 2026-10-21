const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');
const start = content.indexOf('data-route="simulation"');
console.log(content.substring(start - 20, start + 400));
