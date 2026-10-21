const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const kpi1 = html.indexOf('<!-- KPI 1: Total Energy Use -->');
console.log(html.substring(kpi1 - 300, kpi1 + 100));
