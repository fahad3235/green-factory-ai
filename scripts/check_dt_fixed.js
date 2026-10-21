const fs = require('fs');
const html = fs.readFileSync('preview/digital-twin.html', 'utf8');

const matches = html.match(/class=["'][^"']*fixed[^"']*["']/g) || [];
console.log('Fixed elements in digital-twin.html:');
matches.forEach((m, i) => console.log(`${i + 1}: ${m}`));
