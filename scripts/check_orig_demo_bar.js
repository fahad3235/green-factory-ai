const fs = require('fs');

if (fs.existsSync('scripts/orig_index.html')) {
  const orig = fs.readFileSync('scripts/orig_index.html', 'utf8');
  const dIndex = orig.indexOf('DEMO CONTROL');
  console.log('orig_index has DEMO CONTROL:', dIndex);
  if (dIndex !== -1) {
    console.log(orig.slice(dIndex - 100, dIndex + 800));
  }
}
