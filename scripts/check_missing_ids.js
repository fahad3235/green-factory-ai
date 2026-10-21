const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');
const lines = html.split('\n');

const ids = [
  'epms-3d-canvas-wrap',
  'btn-copilot-mic',
  'copilot-user-input',
  'sim-play-icon',
  'sim-play-text',
  'btn-sim-toggle',
  'last-update-clock',
  'login-error-banner'
];

ids.forEach(id => {
  console.log(`\n=== LOOKUP FOR ID: "${id}" ===`);
  lines.forEach((line, idx) => {
    if (line.includes(`'${id}'`) || line.includes(`"${id}"`)) {
      console.log(`L${idx + 1}: ${line.trim()}`);
    }
  });
});
