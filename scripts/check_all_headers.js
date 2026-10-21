const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const regex = /<header[\s\S]*?<\/header>/g;
let m;
while ((m = regex.exec(idx)) !== null) {
  console.log('Header content:\n', m[0]);
}
