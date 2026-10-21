const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const dStart = idx.indexOf('renderDashboardView');
console.log(idx.slice(dStart + 11000, dStart + 14000));
