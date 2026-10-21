const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const headerIdx = html.indexOf('<header');
const headerEnd = html.indexOf('</header>');
console.log('Right side of Header:');
console.log(html.substring(headerIdx + 1200, headerEnd + 10));
