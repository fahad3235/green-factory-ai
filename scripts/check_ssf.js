const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const ssfIdx = html.indexOf('function stepSimulationForward');
console.log(html.substring(ssfIdx, ssfIdx + 2500));
