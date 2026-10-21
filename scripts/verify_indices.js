const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const middleStart = html.indexOf('<!-- MIDDLE WORKSPACE GRID:');
const bottomEnd = html.indexOf('<!-- CORE LOOP FOOTER BAR:');

console.log('middleStart:', middleStart);
console.log('bottomEnd:', bottomEnd);
console.log('Distance:', bottomEnd - middleStart);
