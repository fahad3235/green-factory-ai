const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

console.log('Current HTML size:', html.length);

// Check if openUserProfileModal exists
const fnIdx = html.indexOf('function openUserProfileModal()');
console.log('openUserProfileModal exists:', fnIdx !== -1);
