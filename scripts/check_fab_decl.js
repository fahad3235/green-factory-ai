const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const fabIdx = html.indexOf('id="floating-ai-launcher"');
console.log(html.substring(fabIdx - 100, fabIdx + 1200));
