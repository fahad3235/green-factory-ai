const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('const AppState = {');
console.log('AppState initialization at:', sIdx);
if (sIdx !== -1) {
  console.log(html.substring(sIdx, sIdx + 3000));
}
