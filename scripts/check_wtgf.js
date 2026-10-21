const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const wtgfIdx = html.indexOf('Want to go further?');
console.log('Want to go further? at:', wtgfIdx);
if (wtgfIdx !== -1) {
  console.log(html.substring(wtgfIdx - 200, wtgfIdx + 500));
}
