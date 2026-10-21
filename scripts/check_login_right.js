const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const styleClose = html.indexOf("');", html.indexOf('id="login-portal-modal"'));
console.log(html.substring(styleClose + 4800, styleClose + 7200));
