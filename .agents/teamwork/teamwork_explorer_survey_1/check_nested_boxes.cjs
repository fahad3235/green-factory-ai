const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Check patterns where a container with rounded-* and border has children that also have rounded-* and border and bg-*
const nestedCardPattern = /class="[^"]*rounded-(?:xl|2xl|lg)[^"]*border[^"]*bg-[^"]*"[\s\S]{1,500}?class="[^"]*rounded-(?:xl|2xl|lg)[^"]*border[^"]*bg-[^"]*"/gi;
const matches = html.match(nestedCardPattern) || [];
console.log('Potential nested card patterns in index.html:', matches.length);
if (matches.length > 0) {
  console.log('Sample 1:\n', matches[0].slice(0, 300));
}
