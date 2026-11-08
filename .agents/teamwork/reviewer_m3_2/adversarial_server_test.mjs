import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(__dirname, '../../../server.js');
const TEST_PORT = 4399;

function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const bodyBuffer = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          bodyBuffer,
          bodyText: bodyBuffer.toString('utf8'),
          bodyBytes: bodyBuffer.length
        });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runAdversarialServerTests() {
  console.log(`[TEST] Spawning server on port ${TEST_PORT} from ${serverPath}...`);
  const child = spawn('node', [serverPath], {
    env: { ...process.env, PORT: String(TEST_PORT), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stderr.on('data', d => console.error('[SERVER STDERR]', d.toString()));

  // Wait for server to listen
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server start timed out')), 5000);
    child.stdout.on('data', (d) => {
      const str = d.toString();
      if (str.includes('listening on')) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });

  console.log('[TEST] Server started successfully. Running test cases...');
  const results = [];

  // 1. POST /
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/',
      method: 'POST'
    }, '{"evil":"payload"}');
    const pass = res.statusCode === 405 && res.headers['allow'] === 'GET, HEAD';
    results.push({ name: 'POST / returns 405 with Allow: GET, HEAD', pass, res });
  }

  // 2. DELETE /portal
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/portal',
      method: 'DELETE'
    });
    const pass = res.statusCode === 405 && res.headers['allow'] === 'GET, HEAD';
    results.push({ name: 'DELETE /portal returns 405 with Allow: GET, HEAD', pass, res });
  }

  // 3. PUT /download
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/download',
      method: 'PUT'
    }, 'evil');
    const pass = res.statusCode === 405 && res.headers['allow'] === 'GET, HEAD';
    results.push({ name: 'PUT /download returns 405 with Allow: GET, HEAD', pass, res });
  }

  // 4. OPTIONS /
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/',
      method: 'OPTIONS'
    });
    const pass = res.statusCode === 405 && res.headers['allow'] === 'GET, HEAD';
    results.push({ name: 'OPTIONS / returns 405 with Allow: GET, HEAD', pass, res });
  }

  // 5. HEAD / (0 body bytes, valid headers)
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/',
      method: 'HEAD'
    });
    const pass = res.statusCode === 200 && res.bodyBytes === 0 && Number(res.headers['content-length']) > 0;
    results.push({
      name: 'HEAD / returns 200, Content-Length > 0, and exactly 0 body bytes',
      pass,
      bodyBytes: res.bodyBytes,
      contentLengthHeader: res.headers['content-length']
    });
  }

  // 6. HEAD /portal
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/portal',
      method: 'HEAD'
    });
    const pass = res.statusCode === 200 && res.bodyBytes === 0 && Number(res.headers['content-length']) > 0;
    results.push({
      name: 'HEAD /portal returns 200, Content-Length > 0, and exactly 0 body bytes',
      pass,
      bodyBytes: res.bodyBytes,
      contentLengthHeader: res.headers['content-length']
    });
  }

  // 7. HEAD /simulation.html
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/simulation.html',
      method: 'HEAD'
    });
    const pass = res.statusCode === 200 && res.bodyBytes === 0 && Number(res.headers['content-length']) > 0;
    results.push({
      name: 'HEAD /simulation.html returns 200, Content-Length > 0, and exactly 0 body bytes',
      pass,
      bodyBytes: res.bodyBytes,
      contentLengthHeader: res.headers['content-length']
    });
  }

  // 8. HEAD /digital-twin.html
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/digital-twin.html',
      method: 'HEAD'
    });
    const pass = res.statusCode === 200 && res.bodyBytes === 0 && Number(res.headers['content-length']) > 0;
    results.push({
      name: 'HEAD /digital-twin.html returns 200, Content-Length > 0, and exactly 0 body bytes',
      pass,
      bodyBytes: res.bodyBytes,
      contentLengthHeader: res.headers['content-length']
    });
  }

  // 9. HEAD /non-existent-xyz
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/non-existent-xyz',
      method: 'HEAD'
    });
    const pass = res.statusCode === 404 && res.bodyBytes === 0;
    results.push({
      name: 'HEAD /non-existent-xyz returns 404 and exactly 0 body bytes',
      pass,
      bodyBytes: res.bodyBytes
    });
  }

  // 10. GET / returns full body matching Content-Length
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.bodyBytes === Number(res.headers['content-length']);
    results.push({
      name: 'GET / returns 200 and bodyBytes == Content-Length header',
      pass,
      bodyBytes: res.bodyBytes,
      contentLengthHeader: res.headers['content-length']
    });
  }

  // 11. GET /?query=param&test=1 handles query string correctly
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/?query=param&test=1',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.bodyBytes > 0;
    results.push({
      name: 'GET /?query=param handles query strings properly without 404',
      pass,
      bodyBytes: res.bodyBytes
    });
  }

  // 12. POST /portal?query=test returns 405 Method Not Allowed
  {
    const res = await httpRequest({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: '/portal?query=test',
      method: 'POST'
    });
    const pass = res.statusCode === 405 && res.headers['allow'] === 'GET, HEAD';
    results.push({
      name: 'POST /portal?query=test returns 405 with Allow: GET, HEAD',
      pass
    });
  }

  child.kill();

  console.log('\n--- ADVERSARIAL SERVER TEST RESULTS ---');
  let allPassed = true;
  for (const r of results) {
    console.log(`${r.pass ? '✓ PASS' : '✗ FAIL'}: ${r.name}`);
    if (!r.pass) {
      allPassed = false;
      console.log('   Details:', r);
    }
  }

  if (!allPassed) {
    process.exit(1);
  } else {
    console.log('\nAll adversarial server tests PASSED (10/10)!');
  }
}

runAdversarialServerTests().catch(err => {
  console.error('[ERROR]', err);
  process.exit(1);
});
