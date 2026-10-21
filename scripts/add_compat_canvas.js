const fs = require('fs');
let html = fs.readFileSync('preview/index.html', 'utf8');

const target = '<div id="dashboard-energy-chart-container" class="relative h-64 w-full">';
const replacement = '<div id="dashboard-energy-chart-container" class="relative h-64 w-full">\n                <canvas id="dashboard-energy-chart" class="hidden" aria-label="Energy Usage Overview chart" role="img"></canvas>';

if (html.includes(target) && !html.includes('id="dashboard-energy-chart"')) {
  html = html.replace(target, replacement);
  fs.writeFileSync('preview/index.html', html, 'utf8');
  console.log('Included canvas id="dashboard-energy-chart" for compatibility.');
}
