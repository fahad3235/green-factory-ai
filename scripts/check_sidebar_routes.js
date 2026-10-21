const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Find all data-route attributes in sidebar
const regex = /data-route=\"([^\"]+)\"/g;
let match;
const routesFound = new Set();
while ((match = regex.exec(html)) !== null) {
  routesFound.add(match[1]);
}
console.log('Routes in sidebar/buttons:', Array.from(routesFound));
console.log('VALID_ROUTES in JS:', html.match(/const VALID_ROUTES = \[([^\]]+)\]/)[0]);
