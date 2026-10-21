const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const fnIdx = html.indexOf('function renderDashboardView(');
const endFn = html.indexOf('function renderLiveMetricsStrip(', fnIdx);
console.log('Dashboard length:', endFn - fnIdx);
const sub = html.substring(fnIdx, endFn);

const gridMatches = sub.match(/class=["'][^"']*grid[^"']*["']/g) || [];
console.log(`Found ${gridMatches.length} grid elements in dashboard:`);
gridMatches.forEach((g, i) => console.log(`${i + 1}: ${g}`));
