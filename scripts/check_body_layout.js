const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const bodyIdx = html.indexOf('<body');
const mainIdx = html.indexOf('<main');
console.log('Layout shell from <body> to <main>:');
console.log(html.substring(bodyIdx, bodyIdx + 2500));
