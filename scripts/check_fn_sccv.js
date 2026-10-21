const fs = require('fs');
const enhance = fs.readFileSync('scripts/enhance_index.js', 'utf8');

const fnIdx = enhance.indexOf('function renderSimulationControlCenterView');
console.log(enhance.substring(fnIdx, fnIdx + 3000));
