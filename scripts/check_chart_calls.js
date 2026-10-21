const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Let's find where initViewCharts is called
let pos = 0;
while ((pos = html.indexOf('initViewCharts', pos)) !== -1) {
  console.log('initViewCharts call at', pos);
  console.log(html.substring(Math.max(0, pos - 150), Math.min(html.length, pos + 250)));
  console.log('---');
  pos += 'initViewCharts'.length;
}

// Let's also check setDashboardChartPeriod
pos = 0;
while ((pos = html.indexOf('setDashboardChartPeriod', pos)) !== -1) {
  console.log('setDashboardChartPeriod at', pos);
  console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 200)));
  console.log('---');
  pos += 'setDashboardChartPeriod'.length;
}
