const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');
const tag = html.match(/<aside[^>]*id=["']copilot-drawer["'][^>]*>/);
console.log('Copilot drawer tag:\n', tag ? tag[0] : 'not found');
