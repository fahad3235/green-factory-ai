const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');

const start = content.indexOf('// Recommendations & Savings Totals');
console.log(content.substring(start, start + 1000));
