const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Emoji check: Ensure ZERO emojis anywhere in the new features or entire file if possible
const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu;
const emojiMatches = html.match(emojiRegex);
console.log('Emoji count in preview/index.html:', emojiMatches ? emojiMatches.length : 0);
if (emojiMatches) {
  console.warn('Found emojis:', [...new Set(emojiMatches)]);
}

// 2. Syntax validation of all <script> blocks
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIdx = 0;
let errors = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  scriptIdx++;
  const code = match[1];
  try {
    new vm.Script(code);
    console.log(`Script block #${scriptIdx}: Syntax OK (${code.length} chars)`);
  } catch (err) {
    errors++;
    console.error(`Script block #${scriptIdx} SYNTAX ERROR:`, err.message);
  }
}

if (errors > 0) {
  console.error(`Total syntax errors: ${errors}`);
  process.exit(1);
} else {
  console.log('✓ All script blocks passed syntax check with 0 errors!');
}
