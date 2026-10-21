const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Let's check how the middle grid is laid out in dashboard
const dIdx = html.indexOf('function renderDashboardView');
console.log(html.substring(dIdx, dIdx + 2000));
