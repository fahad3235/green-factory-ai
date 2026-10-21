const fs = require('fs');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log(`=== Matches for /download in ${filePath} ===`);
  lines.forEach((line, idx) => {
    if (line.includes('/download')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  });
}

checkFile('preview/index.html');
checkFile('preview/simulation.html');
