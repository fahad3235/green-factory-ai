const fs = require('fs');
const path = 'C:/Users/h/.gemini/antigravity-ide/brain/228b0fc6-9311-42c8-ba4a-5884f8381bdb/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');
lines.forEach((l, i) => {
  if (!l.trim()) return;
  try {
    const obj = JSON.parse(l);
    if (obj.type === 'USER_INPUT') {
      console.log(`=== Line ${i} USER_INPUT ===`);
      console.log(obj.content);
    }
  } catch(e) {}
});
