const fs = require('fs');

const filePath = 'preview/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// Line 244
html = html.replace(
  '<button type="button" onclick="toggleMobileSidebar(false)" class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" aria-label="Close navigation menu">\n          ✕\n        </button>',
  `<button type="button" onclick="toggleMobileSidebar(false)" class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center" aria-label="Close navigation menu">\n          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>\n        </button>`
);

// Line 253
html = html.replace(
  "onerror=\"this.outerHTML='<span class=\\'text-base\\'>🏭</span>'\"",
  "onerror=\"this.outerHTML='<span class=\\'text-emerald-400\\'>' + AppIcons.factory('w-5 h-5') + '</span>'\""
);

// Line 476
html = html.replace(
  '<div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#064e3b] to-[#10b981] flex items-center justify-center text-white text-base shadow-[0_0_12px_rgba(16,185,129,0.5)]">\n                🍃\n              </div>',
  `<div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#064e3b] to-[#10b981] flex items-center justify-center text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]">\n                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13C4 9.5 7 4 13 3c5.5 0 8 2.5 8 8 0 5-4.5 9-10 9Z"/><path d="M11 20c0-6 4-10 10-10"/></svg>\n              </div>`
);

// Line 607
html = html.replace(
  '<button type="button" onclick="toggleMobileSidebar(true)" class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Open navigation menu">\n            ☰\n          </button>',
  `<button type="button" onclick="toggleMobileSidebar(true)" class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center" aria-label="Open navigation menu">\n            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>\n          </button>`
);

// Line 684
html = html.replace(
  '<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[10px] text-white">📷</div>',
  `<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg></div>`
);

// Comments with emojis
html = html.replace('<!-- Bottom Prompt Bar: 🎯 Marquee Prompt + Suggested Chips + Rounded Green Input Form -->',
  '<!-- Bottom Prompt Bar: Target Marquee Prompt + Suggested Chips + Rounded Green Input Form -->');
html = html.replace('<!-- 🎯 Target Prompt Marquee Pill (Matches Reference Image & Video) -->',
  '<!-- Target Prompt Marquee Pill (Matches Reference Image & Video) -->');

// Line 971
html = html.replace(
  '<div class="text-emerald-400 flex items-center gap-1 font-medium"><span>🍃</span><span>Sustainable • Efficient • Intelligent</span></div>',
  `<div class="text-emerald-400 flex items-center gap-1 font-medium"><span class="text-emerald-400"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13C4 9.5 7 4 13 3c5.5 0 8 2.5 8 8 0 5-4.5 9-10 9Z"/><path d="M11 20c0-6 4-10 10-10"/></svg></span><span>Sustainable • Efficient • Intelligent</span></div>`
);

// Line 990
html = html.replace(
  '<span class="text-base">🔒</span>\n                <span>Sign in to Green Factory Brain AI</span>',
  `<span class="text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>\n                <span>Sign in to Green Factory Brain AI</span>`
);
html = html.replace(
  '<span>🔒</span>\n                <span>Sign in to Green Factory Brain AI</span>',
  `<span class="text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>\n                <span>Sign in to Green Factory Brain AI</span>`
);

// Hero badge cards in JS (L2298, L2309)
html = html.replace(
  '<div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-lg shrink-0">🍃</div>',
  `<div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">\${AppIcons.leaf('w-5 h-5')}</div>`
);
html = html.replace(
  '<div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-lg shrink-0">⚡</div>',
  `<div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-amber-400 shrink-0">\${AppIcons.bolt('w-5 h-5')}</div>`
);

// Hero copilot chips (L2343-2345)
html = html.replace(
  '>🎯 4-Mo Savings Plan</button>',
  `><span class="inline-flex items-center gap-1.5"><span class="text-emerald-500">\${AppIcons.target('w-3.5 h-3.5')}</span> 4-Mo Savings Plan</span></button>`
);
html = html.replace(
  '>🌙 Night-Shift Waste</button>',
  `><span class="inline-flex items-center gap-1.5"><span class="text-indigo-400">\${AppIcons.moon('w-3.5 h-3.5')}</span> Night-Shift Waste</span></button>`
);
html = html.replace(
  '>🧊 3D Breaker Audit</button>',
  `><span class="inline-flex items-center gap-1.5"><span class="text-sky-400">\${AppIcons.cube('w-3.5 h-3.5')}</span> 3D Breaker Audit</span></button>`
);

// KPI strip round icons (L2356, L2404, L2428, L2452)
html = html.replace(
  '<div class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0">⚡</div>',
  `<div class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">\${AppIcons.bolt('w-4 h-4 text-white')}</div>`
);
html = html.replace(
  '<div class="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">☁️</div>',
  `<div class="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0">\${AppIcons.cloud('w-4 h-4 text-white')}</div>`
);
html = html.replace(
  '<div class="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center text-sm font-bold shrink-0">🍃</div>',
  `<div class="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">\${AppIcons.leaf('w-4 h-4 text-white')}</div>`
);
html = html.replace(
  '<div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">⚙️</div>',
  `<div class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">\${AppIcons.gear('w-4 h-4 text-white')}</div>`
);

// L2690
html = html.replace(
  '<div class="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 truncate">🌱 ${formatNum(m.totalRecSavedCo2, 1)} ton CO₂e</div>',
  `<div class="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 truncate flex items-center gap-1"><span class="text-teal-500">\${AppIcons.leaf('w-3.5 h-3.5')}</span> \${formatNum(m.totalRecSavedCo2, 1)} ton CO₂e</div>`
);

// L2748
html = html.replace(
  '<span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">🧭</span>',
  `<span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">\${AppIcons.compass('w-4 h-4 text-white')}</span>`
);

// L2953-2955
html = html.replace('🔄 Simulate Shift Handover', `<span class="inline-flex items-center gap-1.5"><span class="text-emerald-500">\${AppIcons.refresh('w-3.5 h-3.5')}</span> Simulate Shift Handover</span>`);
html = html.replace('📈 Simulate Production Surge', `<span class="inline-flex items-center gap-1.5"><span class="text-teal-500">\${AppIcons.chartUp('w-3.5 h-3.5')}</span> Simulate Production Surge</span>`);
html = html.replace('🔧 Simulate Downtime', `<span class="inline-flex items-center gap-1.5"><span class="text-amber-500">\${AppIcons.wrench('w-3.5 h-3.5')}</span> Simulate Downtime</span>`);

// L3067
html = html.replace(
  "'<span class=\"px-2 py-1 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-700\">✓ Acknowledged</span>'",
  "'<span class=\"px-2 py-1 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-700 inline-flex items-center gap-1\">' + AppIcons.check('w-3 h-3 text-emerald-600') + ' Acknowledged</span>'"
);

// L3476
html = html.replace('🖨️ Printable Disclosure', `<span class="inline-flex items-center gap-1.5">\${AppIcons.printer('w-3.5 h-3.5 text-white')} Printable Disclosure</span>`);
// L3587
html = html.replace('👁️ Preview / Print', `<span class="inline-flex items-center gap-1.5">\${AppIcons.eye('w-3.5 h-3.5 text-emerald-500')} Preview / Print</span>`);

// L3699
html = html.replace('⚡</span>', `<span class="text-amber-400">\${AppIcons.bolt('w-3.5 h-3.5')}</span>`);

// L4314
html = html.replace(
  '<button type="button" onclick="navigateTo(\'agent-console\')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition">🤖 6 Agents</button>',
  `<button type="button" onclick="navigateTo('agent-console')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition"><span class="text-emerald-500">\${AppIcons.bot('w-3.5 h-3.5')}</span> 6 Agents</button>`
);

// Clean emojis from strings in JS
html = html.replace("showToast('🔒 Please sign in as Factory Manager or Factory Owner first.', 'info');", "showToast('Please sign in as Factory Manager or Factory Owner first.', 'info');");
html = html.replace("showToast('🔊 Playing AI Copilot voice audio...', 'info');", "showToast('Playing AI Copilot voice audio...', 'info');");
html = html.replace("showToast('🎙️ Voice Input: Type your question or use Chrome/Edge for live mic input.', 'info');", "showToast('Voice Input: Type your question or use Chrome/Edge for live mic input.', 'info');");
html = html.replace("rec.onstart = () => showToast('🎙️ Listening... Speak your factory query now.', 'info');", "rec.onstart = () => showToast('Listening... Speak your factory query now.', 'info');");
html = html.replace("showToast('🎙️ Voice Input ready.', 'info');", "showToast('Voice Input ready.', 'info');");
html = html.replace("showToast('🔑 Cryptographic Token [' + val + '] Verified & Active.', 'success');", "showToast('Cryptographic Token [' + val + '] Verified & Active.', 'success');");
html = html.replace('<p class="font-semibold text-emerald-700 dark:text-emerald-400">✓ All 5 ledger packages verified over matching 720-hour windows.</p>',
  `<p class="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5"><span class="text-emerald-500">\${AppIcons.checkCircle('w-4 h-4')}</span><span>All 5 ledger packages verified over matching 720-hour windows.</span></p>`);

html = html.replace("showToast('🔒 Please sign in with Factory Manager or Factory Owner credentials to access the platform.', 'info');", "showToast('Please sign in with Factory Manager or Factory Owner credentials to access the platform.', 'info');");
html = html.replace("showToast('🔒 Security Gate Active: Sign in as Factory Manager or Factory Owner first.', 'info');", "showToast('Security Gate Active: Sign in as Factory Manager or Factory Owner first.', 'info');");
html = html.replace("showToast(`✅ Verified ${op.role}: Welcome, ${op.name}!`, 'success');", "showToast(`Verified \${op.role}: Welcome, \${op.name}!`, 'success');");
html = html.replace("const msg = '⛔ Access Denied: Only Factory Manager (username: manager) or Factory Owner (username: owner) can log in.';", "const msg = 'Access Denied: Only Factory Manager (username: manager) or Factory Owner (username: owner) can log in.';");
html = html.replace("const msg = `⛔ Invalid Password for ${op.role}. Demo password is ${op.password}.`;", "const msg = `Invalid Password for \${op.role}. Demo password is \${op.password}.`;");
html = html.replace("const msg = `⛔ Invalid Passkey Token for ${op.role}. Expected ${op.passkey}.`;", "const msg = `Invalid Passkey Token for \${op.role}. Expected \${op.passkey}.`;");
html = html.replace("showToast(`🔒 Signed out (${prevName}). Workspace locked — authentication required.`, 'info');", "showToast(`Signed out (\${prevName}). Workspace locked — authentication required.`, 'info');");
html = html.replace("showToast('📸 Profile photo updated immediately across the platform!', 'success');", "showToast('Profile photo updated immediately across the platform!', 'success');");
html = html.replace("showToast('🔒 Please sign in with Manager or Owner credentials to access the website.', 'info');", "showToast('Please sign in with Manager or Owner credentials to access the website.', 'info');");

// L6435 simulation header:
html = html.replace('>🎛️</span>', `>\${AppIcons.sliders('w-4 h-4 text-emerald-400')}</span>`);
html = html.replace('🎛️', `\${AppIcons.sliders('w-4 h-4 text-emerald-400')}`);

// L6788 telemetry:
html = html.replace('<div class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1b5e37] dark:text-emerald-400 truncate">\n          <span>📡</span>',
  `<div class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1b5e37] dark:text-emerald-400 truncate">\n          <span class="text-emerald-400">\${AppIcons.telemetry('w-3.5 h-3.5')}</span>`);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Finished updating preview/index.html!');
