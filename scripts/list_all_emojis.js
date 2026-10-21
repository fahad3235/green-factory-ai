const fs = require('fs');

const indexHtml = fs.readFileSync('preview/index.html', 'utf8');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;
const lines = indexHtml.split('\n');

const emojisFound = [];
lines.forEach((line, lineIdx) => {
  const matches = line.match(emojiRegex);
  if (matches) {
    emojisFound.push({
      line: lineIdx + 1,
      emojis: matches,
      lineContent: line.trim()
    });
  }
});

console.log('Total emoji lines:', emojisFound.length);
emojisFound.forEach(item => {
  console.log(`L${item.line} | [${item.emojis.join(',')}] | ${item.lineContent}`);
});
