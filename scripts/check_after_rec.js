const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const sIdx = html.indexOf('<!-- Top 3 AI Recommendations');
console.log(html.substring(sIdx + 1500, sIdx + 4500));
