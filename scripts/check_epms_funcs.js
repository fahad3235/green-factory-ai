const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');
const start = content.indexOf('function renderDigitalTwinView');
const end = content.indexOf('function initEpms3dScene');
console.log(content.substring(start, end));
