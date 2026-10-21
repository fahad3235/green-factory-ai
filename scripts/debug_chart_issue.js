const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

console.log('HTML size:', html.length);

// 1. Check where Chart.js script tag is
const chartScript = html.match(/<script[^>]*chart[^>]*><\/script>/gi);
console.log('Chart script tags:', chartScript);

// 2. Check all places with dashboard-energy-chart
let pos = 0;
while ((pos = html.indexOf('dashboard-energy-chart', pos)) !== -1) {
  console.log('Found dashboard-energy-chart at', pos);
  console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 250)));
  console.log('-------------------');
  pos += 'dashboard-energy-chart'.length;
}

// 3. Check Chart initialization and where charts are created
let chartInstances = [];
const initIdx = html.indexOf('function initViewCharts');
console.log('function initViewCharts at:', initIdx);
if (initIdx !== -1) {
  console.log(html.substring(initIdx, initIdx + 1200));
}
