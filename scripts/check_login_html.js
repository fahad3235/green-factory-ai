const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const scriptIdx = html.indexOf('<script');
const loginIdx = html.indexOf('id="login-portal-modal"');
const sub = html.substring(loginIdx, scriptIdx);

console.log('Login modal HTML length:', sub.length);
// print first 1500 chars of login modal HTML excluding base64
const clean = sub.replace(/data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/g, '[BASE64]');
console.log(clean.substring(0, 2000));
