const fs = require('fs');
const enhance = fs.readFileSync('scripts/enhance_index.js', 'utf8');

const sIdx = enhance.indexOf('renderSimulationControlCenterView');
console.log(enhance.substring(sIdx, sIdx + 2000));
