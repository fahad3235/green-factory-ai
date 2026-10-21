const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const headerTag = html.match(/<header[^>]*>/);
console.log('Header tag:\n', headerTag ? headerTag[0] : 'not found');
if (headerTag) {
  const idx = html.indexOf(headerTag[0]);
  console.log(html.substring(idx, idx + 1800));
}
