const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const dIdx = html.indexOf('function renderDashboardView');
console.log(html.substring(dIdx + 5500, dIdx + 8500));
