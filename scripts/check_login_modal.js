const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const loginIdx = html.indexOf('id="login-portal-modal"');
console.log(html.substring(loginIdx, loginIdx + 2000));
