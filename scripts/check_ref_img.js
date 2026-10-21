const fs = require('fs');
const path = 'C:/Users/h/.gemini/antigravity-ide/brain/228b0fc6-9311-42c8-ba4a-5884f8381bdb/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('Reference Image 2') || line.includes('Electricity (kWh) vs.') || line.includes('media_1792348719278')) {
    try {
      const obj = JSON.parse(line);
      if (obj.content && typeof obj.content === 'string') {
        const matches = obj.content.match(/.{0,100}(?:Reference Image 2|Electricity \(kWh\) vs|media_1792348719278).{0,200}/g);
        if (matches) {
          console.log(`Step ${obj.step_index}:`);
          matches.slice(0, 3).forEach(m => console.log('  ...', m.replace(/\n/g, ' '), '...'));
        }
      }
    } catch(e) {}
  }
}
