const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
const ids = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  ids.add(match[1]);
}

console.log('Total getElementById IDs found:', ids.size);

const unhandled = [];
ids.forEach(id => {
  // Check if id exists in the HTML
  const hasIdInHtml = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  if (!hasIdInHtml) {
    // Check if it's generated dynamically or if it might be missing
    unhandled.push(id);
  }
});

console.log('IDs queried by getElementById that are not statically in the main shell (might be in dynamic templates):', unhandled);

// Now let's check if the code accessing these IDs checks for null
unhandled.forEach(id => {
  let pos = 0;
  while ((pos = html.indexOf(`getElementById('${id}')`, pos)) !== -1) {
    const snippet = html.substring(pos - 30, pos + 120);
    console.log(`\nSnippet for '${id}':\n`, snippet);
    pos += id.length + 18;
  }
});
