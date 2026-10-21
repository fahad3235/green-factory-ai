const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('MIDDLE WORKSPACE GRID');
const eIdx = html.indexOf('function renderEnergyAnalyticsView');

console.log(html.substring(eIdx - 500, eIdx));
