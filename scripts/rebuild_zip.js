const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const previewDir = path.resolve('preview');
const zipFile = path.resolve('green_factory_brain_ai_full_project.zip');
const zipFileNetlify = path.resolve('netlify_deploy_green_factory_brain.zip');

console.log('Rebuilding ZIP packages from preview directory using fast native bsdtar...');

// Remove existing zips if any
if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
if (fs.existsSync(zipFileNetlify)) fs.unlinkSync(zipFileNetlify);
const oldDuplicate = path.resolve('green_factory_brain_ai_full_project (1).zip');
if (fs.existsSync(oldDuplicate)) fs.unlinkSync(oldDuplicate);

// Use native tar.exe with zip format
const cmd = `tar.exe -a -cf "${zipFile}" -C "${previewDir}" *`;
console.log('Executing:', cmd);
execSync(cmd, { stdio: 'inherit' });

// Also copy to zipFileNetlify
fs.copyFileSync(zipFile, zipFileNetlify);

// Calculate file stats and sha256
const stats = fs.statSync(zipFile);
const buffer = fs.readFileSync(zipFile);
const sha256 = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();

console.log(`✓ Created: ${zipFile}`);
console.log(`✓ Created: ${zipFileNetlify}`);
console.log(`Size: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);
console.log(`SHA256: ${sha256}`);
