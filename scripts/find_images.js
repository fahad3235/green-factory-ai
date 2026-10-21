const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Find all data:image/jpeg in html
let pos = 0;
let count = 0;
while ((pos = html.indexOf('data:image/jpeg;base64,', pos)) !== -1) {
  count++;
  console.log(`Image ${count} at pos ${pos}, length ~${html.indexOf('\'', pos) - pos}`);
  pos += 30;
}
console.log('Total embedded images:', count);
