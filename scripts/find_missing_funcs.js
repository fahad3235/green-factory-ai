const fs = require('fs');

const lines = fs.readFileSync('preview/index.html', 'utf8').split('\n');

const targets = ['exportInventoryCsv', 'setLanguage', 'downloadActivityAuditLogCsv', 'onclick="if'];

lines.forEach((l, i) => {
  targets.forEach(t => {
    if (l.includes(t)) {
      console.log(`Line ${i + 1} for target '${t}':\n  ${l.trim()}`);
    }
  });
});
