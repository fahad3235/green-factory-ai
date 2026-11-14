import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('.');
const previewDir = path.join(rootDir, 'preview');
const frontendDir = path.join(rootDir, 'src', 'frontend');

const htmlFiles = ['index.html', 'digital-twin.html', 'simulation.html'];
const domainFiles = ['calculations.mjs', 'calculations.ts', 'package.json'];

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function syncFile(srcPath, destPaths) {
  const srcBuf = fs.readFileSync(srcPath);
  for (const destPath of destPaths) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, srcBuf);
    const verifyBuf = fs.readFileSync(destPath);
    assert.equal(Buffer.compare(srcBuf, verifyBuf), 0, `Parity check failed: ${destPath} !== ${srcPath}`);
  }
  console.log(`Synced ${path.relative(rootDir, srcPath)} -> ${destPaths.map(p => path.relative(rootDir, p)).join(', ')} [${sha256(srcBuf).slice(0, 12)}]`);
}

for (const fn of htmlFiles) {
  syncFile(path.join(previewDir, fn), [
    path.join(rootDir, fn),
    path.join(frontendDir, fn)
  ]);
}

for (const fn of domainFiles) {
  syncFile(path.join(previewDir, 'src', 'domain', fn), [
    path.join(frontendDir, 'src', 'domain', fn)
  ]);
}

console.log('Frontend and domain files synchronized with byte-identical SHA-256 verification.');
