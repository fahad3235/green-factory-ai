const fs = require('fs');
const orig = fs.readFileSync('scripts/orig_index.html', 'utf8');

const regex = /function render[A-Za-z0-9_]+/g;
const matches = orig.match(regex);
console.log('All render functions in orig_index.html:');
console.log(matches);
