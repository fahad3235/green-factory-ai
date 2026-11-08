const fs = require('fs');

const files = [
  'preview/digital-twin.html',
  'preview/simulation.html',
  'preview/index.html'
];

console.log('=== SVG ACCESSIBILITY AUDIT ===');
files.forEach(file => {
  const c = fs.readFileSync(file, 'utf8');
  const svgMatches = c.match(/<svg[^>]*>/g) || [];
  let accessible = 0;
  let missing = 0;
  const missingSamples = [];

  svgMatches.forEach(tag => {
    if (/aria-hidden=["']true["']|role=["']img["']|aria-label=/i.test(tag)) {
      accessible++;
    } else {
      missing++;
      if (missingSamples.length < 5) missingSamples.push(tag);
    }
  });

  console.log(`${file}: Total SVGs=${svgMatches.length}, Accessible=${accessible}, Missing=${missing}`);
  if (missingSamples.length > 0) {
    console.log(`  Sample missing: ${missingSamples.join(' | ')}`);
  }
});
