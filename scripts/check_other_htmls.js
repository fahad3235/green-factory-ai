const fs = require('fs');

console.log('--- AUDITING SIMULATION.HTML & DIGITAL-TWIN.HTML ---');

['preview/simulation.html', 'preview/digital-twin.html'].forEach(filePath => {
  console.log(`\nChecking ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract script tags
  const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match, idx = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    idx++;
    if (!match[1].includes('src=')) {
      const code = match[2];
      try {
        new Function(code);
        console.log(`  Script tag ${idx} (length ${code.length}): Valid JS.`);
      } catch (err) {
        console.error(`  Script tag ${idx} SYNTAX ERROR:`, err.message);
      }
    }
  }

  // Count emojis
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;
  const emojiMatches = content.match(emojiRegex);
  console.log(`  Total emojis: ${emojiMatches ? emojiMatches.length : 0}`);
  if (emojiMatches) {
    const counts = {};
    for (const m of emojiMatches) counts[m] = (counts[m] || 0) + 1;
    console.log(`  Emoji breakdown:`, counts);
  }
});
