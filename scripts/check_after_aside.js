const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const asideEnd = html.indexOf('</aside>');
console.log('After </aside>:');
console.log(html.substring(asideEnd, asideEnd + 2500));
