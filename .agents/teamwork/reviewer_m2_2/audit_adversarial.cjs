const fs = require('fs');

const files = [
  'preview/digital-twin.html',
  'preview/simulation.html',
  'preview/index.html'
];

console.log('=== ADVERSARIAL AUDIT: GLYPHS, UNSPLASH, EYEBROWS ===');

const bannedGlyphs = [
  { char: '→', name: 'Right arrow' },
  { char: '←', name: 'Left arrow' },
  { char: '▲', name: 'Black up-pointing triangle' },
  { char: '▼', name: 'Black down-pointing triangle' },
  { char: '●', name: 'Black circle' },
  { char: '›', name: 'Single right-pointing angle quotation mark' },
  { char: '▶', name: 'Black right-pointing triangle' },
  { char: '⬇', name: 'Downwards black arrow' },
  { char: 'ℹ', name: 'Information source' }
];

let totalGlyphsFound = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  bannedGlyphs.forEach(g => {
    let count = 0;
    let idx = 0;
    while ((idx = content.indexOf(g.char, idx)) !== -1) {
      count++;
      idx += g.char.length;
    }
    if (count > 0) {
      console.log(`[VIOLATION] ${file} contains ${count} occurrences of ${g.char} (${g.name})`);
      totalGlyphsFound += count;
    }
  });
});
if (totalGlyphsFound === 0) {
  console.log('✓ PASS: Exactly 0 prohibited glyphs across all 3 files.');
}

console.log('\n--- Checking for Unsplash hotlinks ---');
let unsplashFound = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.toLowerCase().includes('unsplash')) {
    console.log(`[VIOLATION] ${file} contains unsplash reference`);
    unsplashFound++;
  }
});
if (unsplashFound === 0) {
  console.log('✓ PASS: Exactly 0 unsplash hotlinks in target files.');
}

console.log('\n--- Checking for Eyebrow patterns ---');
const eyebrowPatterns = [
  /STEP\s*1\s*·\s*SOURCE/i,
  /STEP\s*2\s*·\s*ENGINE/i,
  /STEP\s*3\s*·\s*API/i,
  /STEP\s*4\s*·\s*WEBSITE/i,
  /STEP\s*\d+\s*·/i
];
let eyebrowsFound = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  eyebrowPatterns.forEach(pattern => {
    const m = content.match(pattern);
    if (m) {
      console.log(`[VIOLATION] ${file} matches eyebrow pattern: ${m[0]}`);
      eyebrowsFound++;
    }
  });
});
if (eyebrowsFound === 0) {
  console.log('✓ PASS: Exactly 0 eyebrow tags found in target files.');
}

console.log('\n--- Checking for Tracked Caps (letter-spacing >= 0.12em) ---');
let trackedCapsFound = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/letter-spacing:\s*0?\.[1-9]\d*em/gi) || [];
  matches.forEach(m => {
    const val = parseFloat(m.replace(/letter-spacing:\s*/i, ''));
    if (val >= 0.12) {
      console.log(`[NOTE] ${file} has tracked caps: ${m}`);
      trackedCapsFound++;
    }
  });
});
if (trackedCapsFound === 0) {
  console.log('✓ PASS: 0 egregious tracked caps (>= 0.12em) found.');
}
