const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('availabilityPct', pos)) !== -1) {
  console.log('availabilityPct at', pos);
  console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 200)));
  console.log('---');
  pos += 'availabilityPct'.length;
}

pos = 0;
while ((pos = html.indexOf('kpi_avail', pos)) !== -1) {
  console.log('kpi_avail at', pos);
  console.log(html.substring(Math.max(0, pos - 50), Math.min(html.length, pos + 100)));
  console.log('---');
  pos += 'kpi_avail'.length;
}
