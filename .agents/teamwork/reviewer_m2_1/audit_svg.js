const fs = require('fs');

const files = [
  'preview/digital-twin.html',
  'preview/simulation.html',
  'preview/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match all <svg tags including multiline attributes
  const svgMatches = content.match(/<svg[\s\S]*?>/gi) || [];
  let ariaHidden = 0;
  let semantic = 0;
  let neither = [];

  svgMatches.forEach(tag => {
    // Check if aria-hidden is present
    if (/aria-hidden\s*=\s*["']true["']/i.test(tag)) {
      ariaHidden++;
    } else if (/role\s*=\s*["']img["']/i.test(tag) || /aria-label\s*=/i.test(tag) || /aria-labelledby\s*=/i.test(tag)) {
      semantic++;
    } else {
      neither.push(tag);
    }
  });

  console.log(`\n--- ${f} ---`);
  console.log(`Total <svg> tags: ${svgMatches.length}`);
  console.log(`  aria-hidden="true": ${ariaHidden}`);
  console.log(`  Semantic (role/label): ${semantic}`);
  console.log(`  Neither: ${neither.length}`);
  if (neither.length > 0) {
    console.log(`First 3 unadorned SVGs:`);
    neither.slice(0, 3).forEach((t, i) => console.log(`  [${i+1}] ${t.replace(/\s+/g, ' ').slice(0, 100)}`));
  }
});
