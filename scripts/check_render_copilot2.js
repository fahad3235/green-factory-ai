const fs = require('fs');

const idx = fs.readFileSync('preview/index.html', 'utf8');

const renderCopilotStart = idx.indexOf('function renderCopilotDrawerContent()');
console.log(idx.slice(renderCopilotStart + 1800, renderCopilotStart + 4200));
