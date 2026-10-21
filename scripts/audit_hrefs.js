const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Check for empty or dummy hrefs
const hrefRegex = /href=["']([^"']*)["']/g;
const hrefs = [];
let m;
while ((m = hrefRegex.exec(html)) !== null) {
  if (m[1].trim() === '#' || m[1].trim() === 'javascript:void(0)' || m[1].trim() === '') {
    hrefs.push({ href: m[1], index: m.index });
  }
}

console.log('Dummy hrefs found:', hrefs.length);
hrefs.forEach(h => {
  console.log('Snippet:', html.substring(h.index - 50, h.index + 80).replace(/\n/g, ' '));
});
