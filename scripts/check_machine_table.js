const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const mmIdx = html.indexOf('function renderMachineMonitoringView');
console.log(html.substring(mmIdx + 1500, mmIdx + 4500));
