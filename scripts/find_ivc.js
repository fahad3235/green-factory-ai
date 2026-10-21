const fs = require('fs');
const content = fs.readFileSync('scripts/orig_index.html', 'utf8');

const regex = /destroyChartIfExists/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(`orig_index.html index ${m.index}:`);
  console.log(content.substring(m.index - 40, m.index + 80).replace(/\n/g, ' '));
}
if (!content.includes('destroyChartIfExists')) {
  console.log('destroyChartIfExists not in orig_index.html either!');
}
