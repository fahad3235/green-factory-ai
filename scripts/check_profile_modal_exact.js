const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');
const fnIdx = idx.indexOf('function openUserProfileModal()');
console.log(idx.slice(fnIdx, fnIdx + 2500));
