const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const fnStart = idx.indexOf('function openUserProfileModal');
console.log(idx.slice(fnStart, fnStart + 2200));
