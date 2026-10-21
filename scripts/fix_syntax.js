const fs = require('fs');
const indexPath = 'preview/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

const badString = `return 'Factory: Rupsha Garments Ltd. (Gazipur)\nStatus: Live Simulated Meter Telemetry';`;
const goodString = `return 'Factory: Rupsha Garments Ltd. (Gazipur) • Status: Live Simulated Meter Telemetry';`;

// Also check for unescaped literal newline
const brokenString = `return 'Factory: Rupsha Garments Ltd. (Gazipur)\r\nStatus: Live Simulated Meter Telemetry';`;

if (content.includes(brokenString)) {
  content = content.replace(brokenString, goodString);
  console.log('✓ Fixed brokenString with CRLF');
} else if (content.includes(`return 'Factory: Rupsha Garments Ltd. (Gazipur)\nStatus: Live Simulated Meter Telemetry';`)) {
  content = content.replace(`return 'Factory: Rupsha Garments Ltd. (Gazipur)\nStatus: Live Simulated Meter Telemetry';`, goodString);
  console.log('✓ Fixed badString with LF');
} else {
  // Regex replace any multiline return 'Factory...
  content = content.replace(/return\s+'Factory:\s*Rupsha\s*Garments\s*Ltd\.[^']*'/s, goodString);
  console.log('✓ Regex replaced Factory string');
}

fs.writeFileSync(indexPath, content, 'utf8');
