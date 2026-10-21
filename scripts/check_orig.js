const fs = require('fs');
const content = fs.readFileSync('scripts/orig_index.html', 'utf8');

const regex = /new Chart\(/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  console.log(`Chart ${count} at ${m.index}:`);
  console.log(content.substring(m.index - 50, m.index + 200).replace(/\n/g, ' '));
}
if (count === 0) {
  console.log('No "new Chart(" found in orig_index.html!');
  // Check if Chart is used at all
  const regex2 = /Chart/g;
  let m2;
  while ((m2 = regex2.exec(content)) !== null) {
    console.log(`Chart token at ${m2.index}:`);
    console.log(content.substring(m2.index - 30, m2.index + 100).replace(/\n/g, ' '));
  }
}
