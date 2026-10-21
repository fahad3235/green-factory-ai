const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const startIdx = html.indexOf('function renderDashboardView(m) {');
const endIdx = html.indexOf('function renderEnergyAnalyticsView(m) {');
const rdv = html.substring(startIdx, endIdx);

let p = 0;
while ((p = rdv.indexOf('data:image/jpeg;base64,', p)) !== -1) {
  const quoteEnd = rdv.indexOf('\'', p);
  console.log(`Embedded image at relative pos ${p}, length ${quoteEnd - p}`);
  // check what tag surrounds it
  console.log('Surrounding context:', rdv.substring(Math.max(0, p - 80), p));
  p = quoteEnd + 1;
}
