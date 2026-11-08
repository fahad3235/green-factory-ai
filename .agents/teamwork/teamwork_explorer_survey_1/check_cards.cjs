const fs = require('fs');

const files = ['preview/index.html', 'preview/simulation.html', 'preview/digital-twin.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  
  // Check for nested .card or card-like containers
  // Look for .card inside .card or card classes
  const cardMatches = content.match(/class=["'][^"']*\b(card|epms-panel|epms-glow-card)\b[^"']*["']/gi) || [];
  console.log('Card class instances:', cardMatches.length);
});
