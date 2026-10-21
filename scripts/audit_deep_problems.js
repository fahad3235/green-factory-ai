const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Audit getElementById calls
const getElemRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const usedIds = new Set();
while ((match = getElemRegex.exec(html)) !== null) {
  usedIds.add(match[1]);
}

console.log('Total unique getElementById lookups:', usedIds.size);

const missingStaticIds = [];
for (const id of usedIds) {
  // Check if id exists as id="..." in the HTML
  const idRegex = new RegExp(`id=["']${id}["']`, 'i');
  if (!idRegex.test(html)) {
    missingStaticIds.push(id);
  }
}
console.log('IDs queried by getElementById that are not found statically in HTML:');
console.log(missingStaticIds);

// 2. Check if openComparableWindowVerificationModal exists or where it is called
const ocwMatches = [];
html.split('\n').forEach((line, idx) => {
  if (line.includes('openComparableWindowVerificationModal')) {
    ocwMatches.push({ line: idx + 1, content: line.trim() });
  }
});
console.log('\nopenComparableWindowVerificationModal occurrences:', ocwMatches);

// 3. Check for any other undefined functions or references
const rcwMatches = [];
html.split('\n').forEach((line, idx) => {
  if (line.includes('runComparableWindowVerificationModal')) {
    rcwMatches.push({ line: idx + 1, content: line.trim() });
  }
});
console.log('\nrunComparableWindowVerificationModal occurrences:', rcwMatches);
