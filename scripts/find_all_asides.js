const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const asides = html.match(/<aside[^>]*>/gi) || [];
console.log('Asides count:', asides.length);
asides.forEach((a, i) => console.log(`${i + 1}: ${a}`));
