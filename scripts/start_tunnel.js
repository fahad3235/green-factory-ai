const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logPath = path.resolve('cloudflared_active.log');
const outStream = fs.createWriteStream(logPath, { flags: 'a' });

const defaultWinBin = 'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe';
const cfBin = process.env.CLOUDFLARED_BIN || (process.platform === 'win32' && fs.existsSync(defaultWinBin) ? defaultWinBin : 'cloudflared');
const port = process.env.PORT || 4321;

console.log(`Spawning cloudflared tunnel for port ${port}...`);
const child = spawn(cfBin, ['tunnel', '--url', `http://127.0.0.1:${port}`], {
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe']
});

child.stdout.pipe(outStream);
child.stderr.pipe(outStream);

let foundUrl = null;
const urlRegex = /https:\/\/[a-z0-9-]+\.trycloudflare\.com/i;

function checkOutput(chunk) {
  const str = chunk.toString();
  const match = str.match(urlRegex);
  if (match && !foundUrl) {
    foundUrl = match[0];
    console.log('FOUND TRYCLOUDFLARE URL:', foundUrl);
    fs.writeFileSync('active_tunnel_url.txt', foundUrl, 'utf8');
  }
}

child.stdout.on('data', checkOutput);
child.stderr.on('data', checkOutput);

child.unref();

// Wait up to 15 seconds to capture URL
let timer = 0;
const interval = setInterval(() => {
  timer += 500;
  if (foundUrl || timer > 15000) {
    clearInterval(interval);
    if (foundUrl) {
      console.log('Tunnel successfully established at:', foundUrl);
      process.exit(0);
    } else {
      console.log('Timeout reached. Checking log file directly...');
      const logContent = fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : '';
      const match = logContent.match(urlRegex);
      if (match) {
        console.log('FOUND URL in log:', match[0]);
        fs.writeFileSync('active_tunnel_url.txt', match[0], 'utf8');
      } else {
        console.log('Could not find URL yet. Log length:', logContent.length);
      }
      process.exit(0);
    }
  }
}, 500);
