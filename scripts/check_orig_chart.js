const fs = require('fs');
const orig = fs.readFileSync('scripts/orig_index.html', 'utf8');

console.log('Orig length:', orig.length);
let pos = 0;
while ((pos = orig.indexOf('dashboard-energy-chart', pos)) !== -1) {
  console.log('Orig dashboard-energy-chart at:', pos);
  console.log(orig.substring(pos - 200, pos + 500));
  pos += 'dashboard-energy-chart'.length;
}

// Also check for 'Electricity (kWh) vs. Garment Output'
const egPos = orig.indexOf('Electricity (kWh) vs. Garment Output');
console.log('Electricity (kWh) vs. Garment Output at:', egPos);
if (egPos !== -1) {
  console.log(orig.substring(egPos - 100, egPos + 800));
}
