const fs = require('fs');
const html = fs.readFileSync('preview/digital-twin.html', 'utf8');

const headerIdx = html.indexOf('<header');
console.log('Digital Twin Header:');
console.log(html.substring(headerIdx, headerIdx + 2000));
