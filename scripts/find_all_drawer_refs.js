const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const regex = /toggleCopilotDrawer\([^)]*\)/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const start = Math.max(0, m.index - 80);
  const end = Math.min(html.length, m.index + 120);
  console.log('toggleCopilotDrawer call:', html.substring(start, end).replace(/\s+/g, ' '));
}

const regex2 = /['"]copilot-drawer['"]/g;
while ((m = regex2.exec(html)) !== null) {
  const start = Math.max(0, m.index - 80);
  const end = Math.min(html.length, m.index + 120);
  console.log('copilot-drawer ID ref:', html.substring(start, end).replace(/\s+/g, ' '));
}
