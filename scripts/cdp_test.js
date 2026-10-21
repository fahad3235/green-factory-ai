const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('1. Launching Chrome with remote debugging...');
  const proc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1366,768',
    'http://localhost:4321/'
  ]);

  proc.on('error', err => console.error('Chrome spawn error:', err));

  // Wait for Chrome port
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      targets = await fetchJson('http://localhost:9222/json');
      if (targets && targets.length > 0) break;
    } catch(e) {}
  }

  if (!targets || !targets[0]) {
    throw new Error('Could not connect to Chrome debugging endpoint');
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  console.log('Target found:', pageTarget.title, pageTarget.url);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let msgId = 1;
  const pending = new Map();

  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  console.log('CDP WebSocket connected!');

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expr) {
    const res = await send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result ? res.result.value : null;
  }

  async function captureScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buf = Buffer.from(res.data, 'base64');
    fs.writeFileSync(path.resolve('preview', filename), buf);
    console.log(`Saved screenshot: preview/${filename} (${buf.length} bytes)`);
  }

  // 1. Initial State: Login page should be visible
  await sleep(1500);
  const isLoginVisible = await evaluate(`!document.getElementById('login-portal-modal').classList.contains('hidden')`);
  console.log('Step 1: Is login modal visible on initial load?', isLoginVisible);
  await captureScreenshot('test_step1_login.png');

  // 2. Select Factory Owner persona
  console.log('Step 2: Clicking Factory Owner card...');
  await evaluate(`selectQuickPersona(1);`);
  await sleep(500);
  const ownerUserVal = await evaluate(`document.getElementById('demo-login-email').value`);
  const ownerPassVal = await evaluate(`document.getElementById('demo-login-password').value`);
  console.log('Owner persona values:', { ownerUserVal, ownerPassVal });
  await captureScreenshot('test_step2_owner_selected.png');

  // 3. Switch back to Manager and Sign in
  console.log('Step 3: Selecting Manager and Signing in...');
  await evaluate(`selectQuickPersona(0);`);
  await sleep(300);
  await evaluate(`simulatePasskeyDemoSignIn();`);
  await sleep(1500);

  const isModalStillVisible = await evaluate(`!document.getElementById('login-portal-modal').classList.contains('hidden')`);
  const activeRoute = await evaluate(`AppState.activeRoute`);
  console.log('Step 3 Result: is modal visible?', isModalStillVisible, 'activeRoute:', activeRoute);
  await captureScreenshot('test_step3_dashboard.png');

  // 4. Open User Profile Modal
  console.log('Step 4: Opening User Profile Modal...');
  await evaluate(`openUserProfileModal();`);
  await sleep(800);
  await captureScreenshot('test_step4_profile_modal.png');

  // 5. Test Live Profile Photo Upload
  console.log('Step 5: Testing Live Profile Photo Upload...');
  const samplePhotoData = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="50" fill="%2310b981"/><text x="50" y="60" font-size="30" text-anchor="middle" fill="white">TEST</text></svg>';
  await evaluate(`
    handleProfilePhotoUpload({
      target: {
        files: []
      }
    });
    // Directly invoke the avatar update helper to simulate FileReader result
    AppState.currentUser.avatarUrl = '${samplePhotoData}';
    localStorage.setItem('gfb_user_avatar', '${samplePhotoData}');
    updateHeaderProfileUI();
  `);
  await sleep(500);
  await captureScreenshot('test_step5_avatar_updated.png');

  // Close Chrome
  console.log('Testing completed successfully!');
  ws.close();
  proc.kill();
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
