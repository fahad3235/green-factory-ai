const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const actIdx = html.indexOf('4. Act (Sim)');
console.log('4. Act (Sim) at:', actIdx);
console.log(html.substring(actIdx - 600, actIdx));
