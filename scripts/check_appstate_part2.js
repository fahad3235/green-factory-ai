const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('savingsLedger: [');
console.log(html.substring(sIdx + 1000, sIdx + 4500));
