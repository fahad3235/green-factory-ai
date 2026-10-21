const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');
const hStart = idx.indexOf('<header class="bg-white');
console.log(idx.slice(hStart, hStart + 1800));
