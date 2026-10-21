const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('preview/index.html', 'utf8');

console.log('--- DIAGNOSTIC AUDIT OF PREVIEW/INDEX.HTML ---');

// 1. Check for syntax errors in embedded script tags
const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
let match, idx = 0;
while ((match = scriptRegex.exec(indexHtml)) !== null) {
  idx++;
  if (!match[1].includes('src=')) {
    const code = match[2];
    try {
      new Function(code);
      console.log(`Script ${idx} (length ${code.length}): Valid JS Function syntax.`);
    } catch (e) {
      console.error(`Script ${idx} SYNTAX ERROR:`, e.message);
    }
  }
}

// 2. Find all emoji usages and their exact line context
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;
const lines = indexHtml.split('\n');
const emojiLocations = [];
lines.forEach((line, lineIdx) => {
  const matches = line.match(emojiRegex);
  if (matches) {
    emojiLocations.push({
      line: lineIdx + 1,
      emojis: matches.join(' '),
      snippet: line.trim().substring(0, 100)
    });
  }
});
console.log(`\nTotal lines with emojis: ${emojiLocations.length}`);
console.log('Sample emoji lines (first 15):');
emojiLocations.slice(0, 15).forEach(e => {
  console.log(`L${e.line} [${e.emojis}]: ${e.snippet}`);
});

// 3. Find routes and views handled
const routeMatches = indexHtml.match(/case\s+'([^']+)'|case\s+"([^"]+)"|hash\s*===?\s*'([^']+)'|route\s*===?\s*'([^']+)'/g) || [];
console.log('\nFound routes/case statements:', [...new Set(routeMatches)].slice(0, 20));

// 4. Check for onclick or event handlers that might reference undefined functions
const onclickMatches = indexHtml.match(/onclick="([^"]+)"/g) || [];
console.log(`\nTotal inline onclick handlers: ${onclickMatches.length}`);
const uniqueHandlers = [...new Set(onclickMatches.map(m => m.replace(/onclick="|"/g, '')))];
console.log('Sample handlers:', uniqueHandlers.slice(0, 10));

// 5. Look for broken links, javascript:void(0), missing IDs
const missingIds = [];
const getElemMatches = indexHtml.match(/getElementById\(['"]([^'"]+)['"]\)/g) || [];
const uniqueIds = [...new Set(getElemMatches.map(m => m.match(/['"]([^'"]+)['"]/)[1]))];
console.log(`\nTotal unique getElementById targets: ${uniqueIds.length}`);

