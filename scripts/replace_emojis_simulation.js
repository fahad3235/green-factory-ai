const fs = require('fs');

const filePath = 'preview/simulation.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('Original simulation.html length:', html.length);

const ICONS = {
  moon: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  chartUp: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  chartDown: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`,
  wrench: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  plug: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>`,
  sun: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  bolt: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  barChart: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
  cube: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.89 8.73-4.89"/><path d="M12 22V12"/></svg>`,
  calendar: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  ban: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>`,
  alertTriangle: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
  check: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  receipt: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-8"/><path d="M16 12h-8"/><path d="M11 16H8"/></svg>`,
  money: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg>`,
  clock: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  close: `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
  pause: `<svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
  play: `<svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
};

// 1. Play button
html = html.replace('❚❚ Pause engine', 'Pause engine');
html = html.replace('"❚❚ Pause engine"', '"Pause engine"');
html = html.replace('"▶ Resume engine"', '"Resume engine"');
html = html.replace('"▶ Engine resumed"', '"Engine resumed"');
html = html.replace('"❚❚ Engine paused"', '"Engine paused"');

// 2. Scenario buttons
html = html.replace('<span class="s-ico">🌙</span>', `<span class="s-ico">${ICONS.moon}</span>`);
html = html.replace('<span class="s-ico">📈</span>', `<span class="s-ico">${ICONS.chartUp}</span>`);
html = html.replace('<span class="s-ico">🔧</span>', `<span class="s-ico">${ICONS.wrench}</span>`);
html = html.replace('<span class="s-ico">🔌</span>', `<span class="s-ico">${ICONS.plug}</span>`);
html = html.replace('<span class="s-ico">🌤️</span>', `<span class="s-ico">${ICONS.sun}</span>`);
html = html.replace('<span class="s-ico">🌤</span>', `<span class="s-ico">${ICONS.sun}</span>`);

// 3. Bridge icons and links
html = html.replace('<div class="bridge-icon">⚡</div>', `<div class="bridge-icon">${ICONS.bolt}</div>`);
html = html.replace('<span>📊 Open Main Dashboard ↗</span>', `<span>${ICONS.barChart} Open Main Dashboard ↗</span>`);
html = html.replace('<span>⚡ Machine Telemetry ↗</span>', `<span>${ICONS.bolt} Machine Telemetry ↗</span>`);
html = html.replace('<span>🧊 3D EPMS Twin ↗</span>', `<span>${ICONS.cube} 3D EPMS Twin ↗</span>`);
html = html.replace('🧊 3D EPMS Twin', `${ICONS.cube} 3D EPMS Twin`);

// 4. Fault buttons & Alerts in JS
html = html.replace('<button class="mini-btn" data-fault="\' + m.id + \'">⚠ Breakdown</button>',
  `<button class="mini-btn" data-fault="' + m.id + '">${ICONS.alertTriangle} Breakdown</button>`);
html = html.replace('<button class="mini-btn fix hidden" data-repair="\' + m.id + \'">🔧 Repair</button>',
  `<button class="mini-btn fix hidden" data-repair="' + m.id + '">${ICONS.wrench} Repair</button>`);

html = html.replace("d.innerHTML = '<span class=\"a-ico\">' + (a.sev===\"crit\"?\"⛔\":a.sev===\"warn\"?\"⚠️\":\"ℹ️\") + '</span><div>'",
  "d.innerHTML = '<span class=\"a-ico\">' + (a.sev===\"crit\"?'" + ICONS.ban + "':a.sev===\"warn\"?'" + ICONS.alertTriangle + "':'" + ICONS.bolt + "') + '</span><div>'");

html = html.replace("'<button class=\"a-x\" aria-label=\"Dismiss alert\">✕</button>'",
  `'<button class="a-x" aria-label="Dismiss alert">${ICONS.close}</button>'`);

// 5. Fix numbers and cards in JS
html = html.replace(
  "d.innerHTML = '<span class=\"f-num\">' + (done ? \"✓\" : (i+1)) + '</span><div style=\"flex:1;min-width:0\">'",
  `d.innerHTML = '<span class="f-num">' + (done ? '${ICONS.check}' : (i+1)) + '</span><div style="flex:1;min-width:0">'`
);

html = html.replace(
  "'<div class=\"f-nums\"><span>⚡ ' + f.saveLabel + '</span><span>💰 ' + bdt(f.money) + '/month</span><span>'",
  `'<div class="f-nums"><span>' + '${ICONS.bolt}' + ' ' + f.saveLabel + '</span><span>' + '${ICONS.money}' + ' ' + bdt(f.money) + '/month</span><span>'`
);

html = html.replace(
  '(done ? "✓ Applied — verified by meters" : "Apply fix")',
  `(done ? "Applied — verified by meters" : "Apply fix")`
);

html = html.replace('"Machine 3 (Sewing) — fixed ✓ Night idle draw eliminated · Waste now "',
  '"Machine 3 (Sewing) — fixed · Night idle draw eliminated · Waste now "');

// 6. Log events and strings
html = html.replace('🗓️ New simulated day (', 'New simulated day (');
html = html.replace('(sev==="crit"?"⛔ ALARM — ":"⚠ ")', '(sev==="crit"?"ALARM — ":"WARNING: ")');
html = html.replace('✓ Machine 3 idle block gone — waste resolved by AI fix #1', 'Machine 3 idle block gone — waste resolved by AI fix #1');
html = html.replace('🌙 Night shift started (22:00–06:00)', 'Night shift started (22:00–06:00)');
html = html.replace('🌤️ Day shift started (06:00)', 'Day shift started (06:00)');
html = html.replace('🌤 Day shift started (06:00)', 'Day shift started (06:00)');
html = html.replace('🧾 Demand charge +৳9,000 added', 'Demand charge +৳9,000 added');
html = html.replace('📉 Draw back under 218 kW contract peak', 'Draw back under 218 kW contract peak');
html = html.replace('🌙 Machine 3 night idle waste ARMED — 38 kW all night', 'Machine 3 night idle waste ARMED — 38 kW all night');
html = html.replace('🔧 " + short + " repaired — health back to ', 'Repaired: " + short + " — health back to ');
html = html.replace('⚠ M3 night leak running', 'Warning: M3 night leak running');
html = html.replace('🔌 GRID POWER CUT', 'GRID POWER CUT');
html = html.replace('🔧 BREAKDOWN', 'BREAKDOWN');
html = html.replace('✓ AI fix applied: “', 'AI fix applied: “');
html = html.replace('🔌 Grid power cut — generator carrying lighting only', 'Grid power cut — generator carrying lighting only');
html = html.replace('🔌 Grid power restored — all meters back online', 'Grid power restored — all meters back online');
html = html.replace('🌙 Scenario: night shift — Machine 3 waste armed', 'Scenario: night shift — Machine 3 waste armed');
html = html.replace('📈 Scenario: peak demand surge — all loads', 'Scenario: peak demand surge — all loads');
html = html.replace('🌤️ Scenario: normal operations — all events cleared', 'Scenario: normal operations — all events cleared');
html = html.replace('🌤 Scenario: normal operations — all events cleared', 'Scenario: normal operations — all events cleared');
html = html.replace('⛔ Story beat: waste alarm live on website feed', 'Story beat: waste alarm live on website feed');
html = html.replace('✓ Story complete — savings & carbon reduction verified', 'Story complete — savings & carbon reduction verified');
html = html.replace('🌙 Story beat: night shift — Machine 3 idling at 38 kW', 'Story beat: night shift — Machine 3 idling at 38 kW');
html = html.replace('🕐 Shift pattern: ', 'Shift pattern: ');
html = html.replace('📈 Peak demand level set to ×', 'Peak demand level set to ×');
html = html.replace('🔌 Power cut length: ', 'Power cut length: ');
html = html.replace('🧾 Monthly bill imported (', 'Monthly bill imported (');
html = html.replace('✓ Applied — simulation re-based to ', 'Applied — simulation re-based to ');
html = html.replace('✗ Invalid JSON — ', 'Invalid JSON — ');

fs.writeFileSync(filePath, html, 'utf8');
console.log('preview/simulation.html updated successfully! New length:', html.length);
