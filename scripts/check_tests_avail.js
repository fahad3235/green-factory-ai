const fs = require('fs');
const test1 = fs.readFileSync('preview/tests/domain-calculations.test.mjs', 'utf8');
const test2 = fs.readFileSync('preview/tests/e2e-routes-and-flows.test.mjs', 'utf8');

console.log('Test 1 has availability:', test1.includes('availability'));
console.log('Test 2 has availability:', test2.includes('availability'));
