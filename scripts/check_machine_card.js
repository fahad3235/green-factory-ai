const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Find Machine-wise Energy Consumption
const mweIdx = html.indexOf('Machine-wise Energy Consumption');
console.log('Machine-wise Energy Consumption at:', mweIdx);
if (mweIdx !== -1) {
  console.log(html.substring(mweIdx - 100, mweIdx + 1800));
}
