const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

// Extract the two images from preview/index.html
const startIdx = html.indexOf('function renderDashboardView(m) {');
const endIdx = html.indexOf('function renderEnergyAnalyticsView(m) {');
const rdv = html.substring(startIdx, endIdx);

// Extract Image 1 (Hero background)
const img1Start = rdv.indexOf('data:image/jpeg;base64,');
const img1End = rdv.indexOf('\'', img1Start);
const heroImgBase64 = rdv.substring(img1Start, img1End);
console.log('Hero image extracted, length:', heroImgBase64.length);

// Extract Image 2 (Factory/Solar photo)
const img2Start = rdv.indexOf('data:image/jpeg;base64,', img1End + 10);
const img2End = rdv.indexOf('"', img2Start);
const factoryImgBase64 = rdv.substring(img2Start, img2End);
console.log('Factory image extracted, length:', factoryImgBase64.length);
