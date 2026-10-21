const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const euoIdx = html.indexOf('Energy Usage Overview');
console.log('Energy Usage Overview at:', euoIdx);
if (euoIdx !== -1) {
  console.log(html.substring(euoIdx, euoIdx + 3000));
}
