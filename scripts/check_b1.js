const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const s1Idx = html.indexOf('1. Benchmark');
console.log('1. Benchmark at:', s1Idx);
console.log(html.substring(s1Idx - 300, s1Idx + 100));
