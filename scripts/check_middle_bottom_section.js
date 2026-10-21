const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('<!-- MIDDLE WORKSPACE GRID:');
const eIdx = html.indexOf('function renderEnergyAnalyticsView');

console.log('Middle grid index:', sIdx);
console.log('renderEnergyAnalyticsView index:', eIdx);
console.log('Snippet between sIdx and eIdx (length ' + (eIdx - sIdx) + '):');
console.log(html.substring(sIdx, sIdx + 1200));
