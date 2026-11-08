const fs = require('fs');

const files = [
  'preview/digital-twin.html',
  'preview/simulation.html',
  'preview/index.html'
];

console.log('=== DETAILED HALLMARK RULES COMPLIANCE AUDIT ===\n');

let violations = 0;

// 1. Purple/Violet AI Slop Gradients (e.g. from-purple, from-violet, to-fuchsia)
console.log('1. Checking for AI Slop Purple/Violet gradients:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/(from|to|via)-(purple|violet|fuchsia)-[3-9]00/gi) || [];
  if (matches.length > 0) {
    console.log(`  [VIOLATION] ${f}: Found purple/violet gradient classes: ${matches.join(', ')}`);
    violations += matches.length;
  } else {
    console.log(`  ✓ ${f}: 0 purple/violet AI slop gradients.`);
  }
});

// 2. Viewport user-scalable=no
console.log('\n2. Checking for user-scalable=no:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('user-scalable=no')) {
    console.log(`  [VIOLATION] ${f}: Found user-scalable=no!`);
    violations++;
  } else {
    console.log(`  ✓ ${f}: Accessible viewport meta (no user-scalable=no).`);
  }
});

// 3. Overflow-x clip in root/body
console.log('\n3. Checking for overflow-x: clip:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (/overflow-x:\s*clip/i.test(content)) {
    console.log(`  ✓ ${f}: overflow-x: clip present.`);
  } else {
    console.log(`  [VIOLATION] ${f}: Missing overflow-x: clip.`);
    violations++;
  }
});

// 4. Focus-visible outline
console.log('\n4. Checking for :focus-visible:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes(':focus-visible')) {
    console.log(`  ✓ ${f}: :focus-visible defined.`);
  } else {
    console.log(`  [VIOLATION] ${f}: Missing :focus-visible styling.`);
    violations++;
  }
});

// 5. Prefers-reduced-motion
console.log('\n5. Checking for prefers-reduced-motion:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('prefers-reduced-motion')) {
    console.log(`  ✓ ${f}: prefers-reduced-motion query present.`);
  } else {
    console.log(`  [VIOLATION] ${f}: Missing prefers-reduced-motion query.`);
    violations++;
  }
});

// 6. Cartoon eyes (blinkEyes, lookAround)
console.log('\n6. Checking for cartoon mascot animations:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const cartoonMatches = content.match(/blinkEyes|lookAround/g) || [];
  if (cartoonMatches.length > 0) {
    console.log(`  [VIOLATION] ${f}: Found cartoon animations: ${cartoonMatches.join(', ')}`);
    violations += cartoonMatches.length;
  } else {
    console.log(`  ✓ ${f}: 0 cartoon mascot eye animations.`);
  }
});

// 7. Unicode glyphs in buttons/labels
console.log('\n7. Checking for prohibited unicode glyphs:');
const glyphs = ['→', '←', '▲', '▼', '●', '›', '▶', '⬇', 'ℹ'];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let glyphCount = 0;
  glyphs.forEach(g => {
    let idx = 0;
    while ((idx = content.indexOf(g, idx)) !== -1) {
      glyphCount++;
      idx += g.length;
    }
  });
  if (glyphCount > 0) {
    console.log(`  [VIOLATION] ${f}: Found ${glyphCount} prohibited unicode glyphs.`);
    violations += glyphCount;
  } else {
    console.log(`  ✓ ${f}: 0 prohibited unicode glyphs.`);
  }
});

// 8. Unsplash hotlinks
console.log('\n8. Checking for unsplash hotlinks:');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('unsplash')) {
    console.log(`  [VIOLATION] ${f}: Contains unsplash hotlink.`);
    violations++;
  } else {
    console.log(`  ✓ ${f}: 0 unsplash hotlinks.`);
  }
});

console.log(`\n========================================`);
console.log(`TOTAL HALLMARK VIOLATIONS DETECTED: ${violations}`);
console.log(`========================================`);
