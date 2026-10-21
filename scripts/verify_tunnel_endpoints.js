const https = require('https');

const baseUrl = 'https://shop-strategy-engage-conducting.trycloudflare.com';

const endpoints = [
  '/',
  '/portal',
  '/simulation.html',
  '/digital-twin.html',
  '/#/dashboard',
  '/#/agent-console'
];

console.log('Checking live TryCloudflare Tunnel:', baseUrl);
console.log('');

let completed = 0;
endpoints.forEach((ep) => {
  const url = baseUrl + ep;
  https.get(url, (res) => {
    console.log(`${res.statusCode === 200 ? '✓' : '⚠'} ${ep}: HTTP ${res.statusCode}`);
    completed++;
    if (completed === endpoints.length) {
      console.log('\nAll endpoints checked successfully!');
    }
  }).on('error', (err) => {
    console.error(`❌ ${ep}: Error - ${err.message}`);
    completed++;
    if (completed === endpoints.length) {
      console.log('\nFinished with errors.');
    }
  });
});
