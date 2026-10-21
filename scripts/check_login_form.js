const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const loginIdx = html.indexOf('id="login-portal-modal"');
const afterImg = html.indexOf('</style>', loginIdx);
console.log('After base64 in login modal:');
const cardIdx = html.indexOf('<div class="max-w-', loginIdx);
if (cardIdx !== -1) {
  console.log(html.substring(cardIdx, cardIdx + 1500));
} else {
  console.log('Looking for login container...');
  const formIdx = html.indexOf('<form', loginIdx);
  if (formIdx !== -1) {
    console.log(html.substring(formIdx - 200, formIdx + 1500));
  }
}
