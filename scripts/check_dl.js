const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');
const start = content.indexOf('<!-- Download ZIP Direct Link -->');
console.log(content.substring(start - 50, start + 450));
