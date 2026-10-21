const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const eIdx = html.indexOf('function renderEnergyAnalyticsView');
console.log('End of renderDashboardView (last 800 chars):');
console.log(html.substring(eIdx - 800, eIdx));
