const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');

const start = content.indexOf('<!-- KPI 1:');
console.log(content.substring(start, start + 3000));
