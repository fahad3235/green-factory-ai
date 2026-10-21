const fs = require('fs');
let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Line 990
html = html.replace(
  '<span>🔒</span>\n                <span>SECURE ACCESS</span>',
  '<svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\n                <span>SECURE ACCESS</span>'
);

// 2. Line 3699
html = html.replace(
  '<div class="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-500 flex items-center justify-center text-white text-base font-bold shadow-md shadow-sky-500/30">\n                ⚡\n              </div>',
  '<div class="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-500 flex items-center justify-center text-white text-base font-bold shadow-md shadow-sky-500/30">\n                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>\n              </div>'
);

// 3. Line 6788
html = html.replace(
  '<div class="flex items-center gap-2">\n                <span>📡</span>\n                <span>Bi-Directional Sync Active Across 18 Machines',
  '<div class="flex items-center gap-2">\n                <span class="text-emerald-500"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg></span>\n                <span>Bi-Directional Sync Active Across 18 Machines'
);

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Final 3 emojis in index.html successfully replaced!');
