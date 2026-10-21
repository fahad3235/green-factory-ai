const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const mainTag = html.match(/<main[^>]*>/);
console.log('Main tag:\n', mainTag ? mainTag[0] : 'not found');
