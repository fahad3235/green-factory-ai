const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Extract all onclick handlers
const onclickRegex = /onclick="([^"]+)"/g;
const handlers = [];
let m;
while ((m = onclickRegex.exec(html)) !== null) {
  handlers.push(m[1].trim());
}

console.log('Total onclick handlers found:', handlers.length);

// Extract the function names called in onclick
const funcNames = new Set();
handlers.forEach(h => {
  // match function name before (
  const match = h.match(/^([a-zA-Z0-9_$]+)\s*\(/);
  if (match) {
    funcNames.add(match[1]);
  } else {
    // could be inline expression or multiple statements
    const stmts = h.split(';');
    stmts.forEach(s => {
      const sm = s.trim().match(/^([a-zA-Z0-9_$]+)\s*\(/);
      if (sm) funcNames.add(sm[1]);
    });
  }
});

const JS_KEYWORDS = new Set(['if', 'for', 'while', 'switch', 'return', 'void', 'catch']);
Array.from(funcNames).forEach(f => {
  if (JS_KEYWORDS.has(f)) funcNames.delete(f);
});

console.log('Unique functions called from onclick:', Array.from(funcNames).sort());

// Check which functions are defined in the JS
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let combinedJs = '';
while ((m = scriptRegex.exec(html)) !== null) {
  combinedJs += m[1] + '\n';
}

const missingFuncs = [];
funcNames.forEach(fn => {
  // regex to see if declared: function fn, const fn =, let fn =, var fn =, window.fn =
  const defRegex = new RegExp(`(?:function\\s+${fn}\\b|\\b${fn}\\s*=\\s*function|\\b${fn}\\s*=\\s*\\(|window\\.${fn}\\s*=)`);
  if (!defRegex.test(combinedJs)) {
    missingFuncs.push(fn);
  }
});

console.log('\n--- FUNCTION AUDIT RESULT ---');
if (missingFuncs.length === 0) {
  console.log('✓ ALL onclick functions are defined in the JavaScript bundle!');
} else {
  console.log('❌ MISSING or UNDEFINED onclick functions:', missingFuncs);
}
