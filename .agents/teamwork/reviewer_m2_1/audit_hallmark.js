const fs = require('fs');

const files = [
  'preview/digital-twin.html',
  'preview/simulation.html',
  'preview/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=== Checking ${f} ===`);
  
  // Check for STEP 1 · SOURCE etc.
  const stepMatches = content.match(/STEP\s*\d+\s*[·•]/gi) || [];
  console.log(`Step eyebrow occurrences: ${stepMatches.length}`);

  // Check for uppercase tracking >= 0.12em
  const trackingMatches = content.match(/letter-spacing:\s*(?:0?\.(?:1[2-9]|[2-9]\d*)|[1-9]\d*|\.[1-9]\d*)\s*em/gi) || [];
  console.log(`High letter-spacing matches (>=0.12em): ${trackingMatches.length}`);
  if (trackingMatches.length > 0) {
    console.log(`  Sample tracking:`, trackingMatches.slice(0, 5));
  }

  // Check for nested card patterns (card inside card)
  // e.g. class containing 'card' inside another element with class containing 'card'
  const lines = content.split('\n');
  let cardNestingWarnings = 0;
  lines.forEach((l, i) => {
    if (l.includes('class="card') && l.includes('card-body') && l.includes('subcard')) {
      cardNestingWarnings++;
    }
  });
  console.log(`Suspicious card nesting lines: ${cardNestingWarnings}`);
});
