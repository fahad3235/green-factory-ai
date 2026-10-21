const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const loginIdx = html.indexOf('id="login-portal-modal"');
const endLogin = html.indexOf('<!-- MAIN APPLICATION SHELL -->', loginIdx);
const sub = html.substring(loginIdx, endLogin !== -1 ? endLogin : loginIdx + 20000);
const clean = sub.replace(/data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/g, '');
console.log(clean.substring(clean.indexOf("')"), clean.indexOf("')") + 2500));
