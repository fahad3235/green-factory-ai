const fs = require('fs');
const html = fs.readFileSync('preview/simulation.html', 'utf8');

const bodyIdx = html.indexOf('<body');
console.log('Simulation Body:');
console.log(html.substring(bodyIdx, bodyIdx + 2000));
