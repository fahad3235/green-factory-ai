const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');

const start = content.indexOf("document.getElementById('dashboard-energy-chart')");
console.log(content.substring(start - 100, start + 2500));
