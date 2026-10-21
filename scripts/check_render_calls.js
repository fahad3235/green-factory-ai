const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('renderActiveView()', pos)) !== -1) {
  console.log('renderActiveView() called at', pos);
  console.log(html.substring(Math.max(0, pos - 80), Math.min(html.length, pos + 120)));
  console.log('---');
  pos += 'renderActiveView()'.length;
}

// Check bottom of script
const endScript = html.lastIndexOf('</script>');
console.log('Bottom of script:');
console.log(html.substring(endScript - 1000, endScript));
