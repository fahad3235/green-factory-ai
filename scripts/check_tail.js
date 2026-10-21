const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines in index.html:', lines.length);
console.log(lines.slice(lines.length - 80).join('\n'));
