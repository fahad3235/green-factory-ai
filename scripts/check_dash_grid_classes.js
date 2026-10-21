const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const dashIdx = html.indexOf('function renderDashboardView(');
const match = html.substring(dashIdx, dashIdx + 15000).match(/grid\s+grid-cols-[^"'>\s]+/g) || [];
console.log('Grid classes in renderDashboardView:');
console.log([...new Set(match)]);
