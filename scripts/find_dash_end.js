const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const dashIdx = html.indexOf('function renderDashboardView(');
const nextFn = html.indexOf('function render', dashIdx + 30);
console.log('Dashboard starts at:', dashIdx, 'next function starts at:', nextFn);
console.log('Next function is:', html.substring(nextFn, nextFn + 60));
