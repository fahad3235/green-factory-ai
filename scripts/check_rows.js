const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const dashIdx = 632551;
const nextFn = 879098;
const sub = html.substring(dashIdx, nextFn).replace(/data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/g, '[IMG]');

const midIdx = sub.indexOf('<!-- Card 1: Energy Usage Overview Chart');
console.log('Middle Row Container:');
console.log(sub.substring(midIdx - 200, midIdx + 300));

const botIdx = sub.indexOf('<!-- BOTTOM WORKSPACE ROW');
console.log('\nBottom Row Container:');
console.log(sub.substring(botIdx - 50, botIdx + 400));
