const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

let pos = 500000;
while ((pos = html.indexOf('Bill & Carbon Forecast', pos)) !== -1) {
  console.log('Bill & Carbon Forecast in HTML at:', pos);
  console.log(html.substring(pos - 100, pos + 400));
  console.log('---');
  pos += 'Bill & Carbon Forecast'.length;
}
