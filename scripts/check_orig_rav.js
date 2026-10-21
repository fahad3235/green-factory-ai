const fs = require('fs');
const orig = fs.readFileSync('scripts/orig_index.html', 'utf8');

const ravIdx = orig.indexOf('function renderActiveView()');
console.log(orig.substring(ravIdx, ravIdx + 2000));
