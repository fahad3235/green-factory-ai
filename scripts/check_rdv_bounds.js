const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const startIdx = html.indexOf('function renderDashboardView(m) {');
const endIdx = html.indexOf('function renderEnergyAnalyticsView(m) {');

console.log('renderDashboardView start:', startIdx, 'end:', endIdx, 'length:', endIdx - startIdx);
