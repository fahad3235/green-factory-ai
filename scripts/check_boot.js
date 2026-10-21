const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

// Find DOMContentLoaded or init
const dcl = html.indexOf('DOMContentLoaded');
console.log('DOMContentLoaded at:', dcl);
if (dcl !== -1) {
  console.log(html.substring(dcl, dcl + 800));
}

// Find window.onload or boot
const boot = html.indexOf('function bootApp');
console.log('bootApp at:', boot);
if (boot !== -1) {
  console.log(html.substring(boot, boot + 800));
}
