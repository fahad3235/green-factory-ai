const fs = require('fs');
const test1 = fs.readFileSync('preview/tests/domain-calculations.test.mjs', 'utf8');

let pos = 0;
while ((pos = test1.indexOf('availability', pos)) !== -1) {
  console.log('Test 1 availability match at', pos);
  console.log(test1.substring(pos - 50, pos + 200));
  pos += 'availability'.length;
}
