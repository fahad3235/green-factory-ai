const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const renderCopilotStart = idx.indexOf('function renderCopilotDrawerContent()');
console.log('renderCopilotDrawerContent index:', renderCopilotStart);
if (renderCopilotStart !== -1) {
  console.log(idx.slice(renderCopilotStart, renderCopilotStart + 1800));
}
