const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const previewDir = path.resolve('preview');
const zipFile1 = path.resolve('green_factory_brain_ai_full_project (1).zip');
const zipFile2 = path.resolve('green_factory_brain_ai_full_project.zip');
const zipFileNetlify = path.resolve('netlify_deploy_green_factory_brain.zip');

console.log('Rebuilding ZIP packages from preview directory using fast native bsdtar...');

// Remove existing zips if any
if (fs.existsSync(zipFile1)) fs.unlinkSync(zipFile1);
if (fs.existsSync(zipFile2)) fs.unlinkSync(zipFile2);
if (fs.existsSync(zipFileNetlify)) fs.unlinkSync(zipFileNetlify);

// Use native tar.exe with zip format
const cmd = `tar.exe -a -cf "${zipFile1}" -C "${previewDir}" *`;
console.log('Executing:', cmd);
execSync(cmd, { stdio: 'inherit' });

// Also copy to zipFile2 and zipFileNetlify
fs.copyFileSync(zipFile1, zipFile2);
fs.copyFileSync(zipFile1, zipFileNetlify);

// Calculate file stats and sha256
const stats = fs.statSync(zipFile1);
const buffer = fs.readFileSync(zipFile1);
const sha256 = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();

console.log(`✓ Created: ${zipFile1}`);
console.log(`✓ Created: ${zipFile2}`);
console.log(`✓ Created: ${zipFileNetlify}`);
console.log(`Size: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);
console.log(`SHA256: ${sha256}`);
