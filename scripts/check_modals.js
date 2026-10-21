const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const modalMatches = html.match(/id=["'][^"']*modal[^"']*["'][^>]*class=["']([^"']*)["']/gi) || [];
console.log('Modals found:', modalMatches.length);
modalMatches.forEach((m, i) => console.log(`${i + 1}: ${m}`));
