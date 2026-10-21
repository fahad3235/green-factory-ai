const fs = require('fs');
const content = fs.readFileSync('preview/index.html', 'utf8');

function findOccurrences(term) {
  let idx = 0;
  console.log(`=== Matches for "${term}" ===`);
  while ((idx = content.indexOf(term, idx)) !== -1) {
    console.log(content.substring(idx - 40, idx + 200).replace(/\n/g, ' '));
    console.log('---');
    idx += term.length;
  }
}

findOccurrences('startOrUpdateSimulationTimer');
findOccurrences('Energy Usage Overview');
findOccurrences('Estimated Savings');
findOccurrences('avoidable');
