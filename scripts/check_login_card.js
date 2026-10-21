const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const loginIdx = html.indexOf('id="login-portal-modal"');
console.log(html.substring(loginIdx + 1500, loginIdx + 3500));
