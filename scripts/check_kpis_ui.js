const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const kpiStart = idx.indexOf('id="dashboard-kpi-grid"');
if (kpiStart === -1) {
  const kpiFn = idx.indexOf('renderExecutiveKpiStrip');
  console.log('renderExecutiveKpiStrip index:', kpiFn);
  if (kpiFn !== -1) {
    console.log(idx.slice(kpiFn, kpiFn + 1800));
  }
} else {
  console.log(idx.slice(kpiStart, kpiStart + 1800));
}
