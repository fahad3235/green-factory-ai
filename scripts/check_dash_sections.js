const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const dashIdx = 632551;
const nextFn = 879098;
const sub = html.substring(dashIdx, nextFn);
const clean = sub.replace(/data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/g, '[IMG]');

const sections = clean.match(/<!--\s*([^-]+)\s*-->/g) || [];
console.log('Sections in Dashboard view:');
sections.forEach(s => console.log(' - ' + s));
