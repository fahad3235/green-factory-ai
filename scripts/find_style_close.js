const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const loginIdx = html.indexOf('id="login-portal-modal"');
const styleClose = html.indexOf("');", loginIdx);
if (styleClose !== -1) {
  console.log('Found style close at:', styleClose);
  console.log(html.substring(styleClose, styleClose + 1500));
} else {
  const quoteClose = html.indexOf('")', loginIdx);
  console.log('Found quote close at:', quoteClose);
  console.log(html.substring(quoteClose, quoteClose + 1500));
}
