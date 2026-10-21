const fs = require('fs');
const content = fs.readFileSync('epms_green_ai_digital_twin_interactive_three_js_webgl_simulation (2).html', 'utf8');
const headerEnd = content.indexOf('</header>');
console.log(content.substring(headerEnd - 400, headerEnd + 50));
