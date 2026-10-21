const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const styleClose = html.indexOf("');", html.indexOf('id="login-portal-modal"'));
console.log(html.substring(styleClose + 12000, styleClose + 15000));
