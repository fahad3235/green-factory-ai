const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');

const start = content.indexOf('function renderDashboardView');
const end = content.indexOf('function renderEnergyAnalyticsView');
const dashHtml = content.substring(start, end);

const idx = dashHtml.indexOf('Savings Tracker');
if (idx !== -1) {
  console.log('Found inside renderDashboardView:');
  console.log(dashHtml.substring(idx - 100, idx + 1500));
}
