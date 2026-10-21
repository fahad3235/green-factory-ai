const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

console.log('middle grid index:', html.indexOf('MIDDLE WORKSPACE GRID'));
console.log('workflow bar index:', html.indexOf('CLOSED-LOOP WORKFLOW'));
console.log('Workflow occurrences:');
let p = 0;
while ((p = html.indexOf('WORKFLOW', p)) !== -1) {
  console.log('WORKFLOW at', p, html.substring(p - 30, p + 50));
  p += 8;
}
