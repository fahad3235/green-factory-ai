const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');
const sIdx = html.indexOf('const VALID_ROUTES');
const scriptStart = html.lastIndexOf('<script>', sIdx);
const scriptEnd = html.indexOf('</script>', sIdx);
const scriptCode = html.substring(scriptStart + '<script>'.length, scriptEnd);

try {
  new vm.Script(scriptCode);
  console.log('Script compiles cleanly in VM!');
} catch (e) {
  console.log('Compilation error:', e.message);
  console.log('Stack:', e.stack);
}
