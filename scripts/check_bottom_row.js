const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const bIdx = html.indexOf('Bill & Carbon Forecast');
console.log('Bill & Carbon Forecast at:', bIdx);
if (bIdx !== -1) {
  console.log(html.substring(bIdx - 100, bIdx + 3000));
}
