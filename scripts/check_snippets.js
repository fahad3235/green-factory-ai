const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');
const lines = html.split('\n');

function printLines(start, end) {
  for (let i = start; i <= end && i < lines.length; i++) {
    console.log(`L${i}: ${lines[i-1]}`);
  }
}

console.log('--- MIC & COPILOT INPUT (lines around 780-840) ---');
printLines(780, 840);

console.log('--- EPMS CANVAS (lines around 3650-3715) ---');
printLines(3650, 3715);

console.log('--- LOGIN ERROR (lines around 5550-5590) ---');
printLines(5550, 5590);
