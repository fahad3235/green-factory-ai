const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 4321;
const ZIP_FILE_PATH = path.join(__dirname, 'green_factory_brain_ai_full_project.zip');
const PREVIEW_DIR = path.join(__dirname, 'preview');

function getZipStats() {
  if (!fs.existsSync(ZIP_FILE_PATH)) {
    return { sizeFormatted: '0 KB', sha256: 'UNKNOWN' };
  }
  const stats = fs.statSync(ZIP_FILE_PATH);
  const sizeFormatted = (stats.size / 1024).toFixed(2) + ' KB';
  const buf = fs.readFileSync(ZIP_FILE_PATH);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex').toUpperCase();
  return { sizeFormatted, sha256, sizeBytes: stats.size };
}

let zipInfo = getZipStats();

function serveFile(res, filePath, contentType, asAttachment = false, downloadName = '') {
  fs.stat(filePath, (err, fileStats) => {
    if (err || !fileStats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const headers = {
      'Content-Type': contentType,
      'Content-Length': fileStats.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    };

    if (asAttachment) {
      headers['Content-Disposition'] = `attachment; filename="${downloadName || path.basename(filePath)}"`;
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  // 1. Direct ZIP Download Routes
  if (
    pathname === '/download' ||
    pathname === '/project.zip' ||
    pathname === '/green_factory_brain_ai_full_project.zip' ||
    pathname === '/green_factory_brain_ai_full_project (1).zip' ||
    pathname === '/netlify_deploy_green_factory_brain.zip'
  ) {
    const dlFile = pathname === '/netlify_deploy_green_factory_brain.zip' 
      ? path.join(__dirname, 'netlify_deploy_green_factory_brain.zip')
      : ZIP_FILE_PATH;
    serveFile(res, dlFile, 'application/zip', true, path.basename(dlFile));
    return;
  }

  // 2. Standalone Simulation Control Center HTML file
  if (pathname === '/simulation.html') {
    serveFile(res, path.join(PREVIEW_DIR, 'simulation.html'), 'text/html; charset=utf-8');
    return;
  }

  // 3D Machine Digital Twin (EPMS Interactive Three.js WebGL Simulation)
  if (pathname === '/digital-twin.html' || pathname === '/digital-twin' || pathname === '/digital-twin/') {
    serveFile(res, path.join(PREVIEW_DIR, 'digital-twin.html'), 'text/html; charset=utf-8');
    return;
  }

  // 3. /simulation URL -> redirect to #/simulation
  if (pathname === '/simulation' || pathname === '/simulation/') {
    res.writeHead(302, { Location: '/#/simulation' });
    res.end();
    return;
  }

  // 4. /login URL -> redirect to #/login
  if (pathname === '/login' || pathname === '/login/') {
    res.writeHead(302, { Location: '/#/login' });
    res.end();
    return;
  }

  // 5. /dashboard URL -> redirect to #/dashboard
  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    res.writeHead(302, { Location: '/#/dashboard' });
    res.end();
    return;
  }

  // 6. Main Application Website (Starts on Login Page by default, then Dashboard)
  if (
    pathname === '/' ||
    pathname === '/index.html' ||
    pathname === '/preview' ||
    pathname === '/preview/' ||
    pathname === '/preview/index.html' ||
    pathname === '/app'
  ) {
    serveFile(res, path.join(PREVIEW_DIR, 'index.html'), 'text/html; charset=utf-8');
    return;
  }

  // 7. Developer Portal / Delivery Information Card
  if (pathname === '/portal' || pathname === '/info') {
    zipInfo = getZipStats();
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Green Factory Brain AI - Cloud Delivery Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f17;
      --card-bg: rgba(18, 26, 41, 0.75);
      --border: rgba(255, 255, 255, 0.08);
      --accent: #10b981;
      --accent-glow: rgba(16, 185, 129, 0.35);
      --accent-light: #34d399;
      --text: #f3f4f6;
      --text-muted: #94a3b8;
      --code-bg: rgba(0, 0, 0, 0.45);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 0%, #152238 0%, var(--bg) 70%);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .container {
      width: 100%;
      max-width: 720px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--accent-light);
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 8px var(--accent); }
    h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 10px; color: #fff; }
    p.desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 24px; }
    .btn-group { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    @media (min-width: 640px) { .btn-group { flex-direction: row; } }
    .btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 22px;
      border-radius: 14px;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-primary { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; }
    .btn-secondary { background: rgba(255, 255, 255, 0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.1); }
    .btn:hover { transform: translateY(-2px); }
    .checksum-section {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge"><span class="dot"></span> GREEN FACTORY BRAIN AI — PORTAL</div>
    <h1>Cloud Delivery &amp; Project Access</h1>
    <p class="desc">Deterministic AI &amp; 3D EPMS Digital Twin Platform for Rupsha Garments Ltd., Gazipur, Bangladesh.</p>
    <div style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:18px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);margin-bottom:20px;">
      <div style="width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 30% 25%, #86efac 0%, #22c55e 42%, #15803d 82%, #052e16 100%);box-shadow:0 8px 20px rgba(22,163,74,0.45);display:flex;align-items:center;justify-content:center;gap:6px;flex-shrink:0;">
        <span style="width:4px;height:10px;background:#fff;border-radius:99px;display:inline-block;"></span>
        <span style="width:4px;height:10px;background:#fff;border-radius:99px;display:inline-block;"></span>
      </div>
      <div>
        <div style="font-weight:800;font-size:0.95rem;color:#fff;">Ask Green AI Copilot &amp; 6 Live Simulation Agents Ready</div>
        <div style="font-size:0.8rem;color:#a7f3d0;">NVIDIA Nemotron 3 Ultra (550B) • 3D Animated Orb • Real-Time Telemetry Sync</div>
      </div>
    </div>
    <div class="btn-group">
      <a href="/" class="btn btn-primary"><svg style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>Open Main Website &amp; AI Copilot</a>
      <a href="/netlify_deploy_green_factory_brain.zip" class="btn btn-secondary" style="border-color: rgba(16,185,129,0.45);"><svg style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download Deployment ZIP (${zipInfo.sizeFormatted})</a>
    </div>
    <div class="btn-group" style="margin-top:-12px;">
      <a href="/#/agent-console" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;"><svg style="width:15px;height:15px;display:inline-block;vertical-align:middle;margin-right:5px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>6-Agent Console</a>
      <a href="/digital-twin.html" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;"><svg style="width:15px;height:15px;display:inline-block;vertical-align:middle;margin-right:5px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>3D EPMS Digital Twin</a>
      <a href="/simulation.html" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;"><svg style="width:15px;height:15px;display:inline-block;vertical-align:middle;margin-right:5px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Simulation Control</a>
    </div>
    <div class="checksum-section">
      <span>SHA256: ${zipInfo.sha256}</span>
      <span style="color:var(--accent-light);"><svg style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Manager &amp; Owner Protected</span>
    </div>
  </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // 8. Serve static files from PREVIEW_DIR
  let relPath = pathname.startsWith('/preview/') ? pathname.replace('/preview/', '') : pathname.replace(/^\//, '');
  const safePath = path.normalize(path.join(PREVIEW_DIR, relPath));
  if (safePath.startsWith(PREVIEW_DIR) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.mjs': 'text/javascript; charset=utf-8',
      '.json': 'application/json',
      '.md': 'text/markdown; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    serveFile(res, safePath, contentTypes[ext] || 'application/octet-stream');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`Green Factory Brain AI server listening on http://localhost:${PORT} and http://127.0.0.1:${PORT}`);
});
