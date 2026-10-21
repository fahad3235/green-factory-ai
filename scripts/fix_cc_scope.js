const fs = require('fs');
const path = require('path');

const filePath = path.resolve('preview/index.html');
let html = fs.readFileSync(filePath, 'utf8');

const target = `function renderCarbonIqReportView(m) {
      const a = AppState.assumptions;
      return \``;

const replacement = `function renderCarbonIqReportView(m) {
      const a = AppState.assumptions;
      const cc = AppState.carbonCredits;
      return \``;

if (html.includes(target)) {
  html = html.replace(target, () => replacement);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✓ Added const cc = AppState.carbonCredits; at the top of renderCarbonIqReportView(m)');
} else {
  console.error('Target not found');
}
