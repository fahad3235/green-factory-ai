const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');

const regex = /initViewCharts/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(`Match at ${m.index}:`);
  console.log(content.substring(Math.max(0, m.index - 50), Math.min(content.length, m.index + 100)).replace(/\n/g, ' '));
}
