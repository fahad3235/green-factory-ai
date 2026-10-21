const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const styleClose = html.indexOf("');", html.indexOf('id="login-portal-modal"'));
console.log(html.substring(styleClose + 7200, styleClose + 9600));
