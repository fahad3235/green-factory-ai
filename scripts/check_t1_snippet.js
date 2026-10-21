const fs = require('fs');
const test1 = fs.readFileSync('preview/tests/domain-calculations.test.mjs', 'utf8');

console.log(test1.substring(3800, 4200));
