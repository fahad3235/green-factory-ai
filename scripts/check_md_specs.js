const fs = require('fs');

// Check all .md files in the project
const files = fs.readdirSync('.').filter(f => f.endsWith('.md'));
console.log('Markdown files in root:', files);

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  console.log(`\n=== ${f} ===`);
  const terms = ['Inventory', 'Simulation Control', 'Settings', 'Agent Console', '6 Agents', 'ORCHESTRATION'];
  terms.forEach(t => {
    const idx = c.indexOf(t);
    if (idx !== -1) {
      console.log(`Found "${t}" in ${f} at ${idx}:`);
      console.log(c.substring(idx - 50, idx + 250));
      console.log('---');
    }
  });
});
