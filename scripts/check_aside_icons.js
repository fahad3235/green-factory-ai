const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');
const asideStart = idx.indexOf('<aside id="app-sidebar"');
const asideEnd = idx.indexOf('</aside>', asideStart) + 8;
console.log(idx.slice(asideStart, asideStart + 2000));
