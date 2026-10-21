const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const mmIdx = html.indexOf('function renderMachineMonitoringView');
console.log('renderMachineMonitoringView at:', mmIdx);
if (mmIdx !== -1) {
  console.log(html.substring(mmIdx, mmIdx + 3000));
}
