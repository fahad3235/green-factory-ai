const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const regex = /floating-ai-launcher/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const start = Math.max(0, m.index - 80);
  const end = Math.min(html.length, m.index + 120);
  console.log('Match:\n', html.substring(start, end).replace(/\s+/g, ' '));
}
