const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const searchIdx = html.indexOf('<!-- Global Search / Command Bar');
console.log(html.substring(searchIdx, searchIdx + 700));
