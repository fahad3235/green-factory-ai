const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const demoBarStart = idx.indexOf('DEMO CONTROL');
console.log('DEMO CONTROL index:', demoBarStart);
if (demoBarStart !== -1) {
  console.log(idx.slice(demoBarStart - 100, demoBarStart + 1200));
}
