const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const matches = html.match(/window\.addEventListener\(['"]DOMContentLoaded['"][^)]*\)[\s\S]{0,500}/g) || [];
console.log('DOMContentLoaded handlers:', matches.length);
matches.forEach((m, i) => console.log(`${i + 1}: ${m}\n`));
