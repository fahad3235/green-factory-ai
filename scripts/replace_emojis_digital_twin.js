const fs = require('fs');

const filePath = 'preview/digital-twin.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('Original digital-twin.html length:', html.length);

const ICONS = {
  bolt: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  worker: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M6 3h8l2 4H4z"/></svg>`,
  thermometer: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`,
  sparkles: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>`,
  palette: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.7 1.7-1.7h2c3 0 5.6-2.5 5.6-5.6C22 6.5 17.5 2 12 2Z"/></svg>`,
  moon: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  sun: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  volume: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeMute: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
  barChart: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
  search: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  chartUp: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  video: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
  eye: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  cctv: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="10" x="2" y="6" rx="2"/><circle cx="10" cy="11" r="2.5"/><path d="M18 11h4"/><path d="M10 16v4"/><path d="M7 20h6"/></svg>`,
  close: `<svg class="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
  refresh: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>`,
  check: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  alert: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
  flame: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  gear: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  battery: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>`,
  barrel: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>`,
  building: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>`,
  barrier: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6v12"/><path d="M20 6v12"/></svg>`,
  tree: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2-7 10h4l-5 8h16l-5-8h4Z"/><path d="M12 20v2"/></svg>`,
  tag: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>`,
  drone: `<svg class="w-3.5 h-3.5 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M6 6l4 3"/><path d="M18 6l-4 3"/><path d="M6 18l4-3"/><path d="M18 18l-4-3"/></svg>`
};

// Replace Header & Top Control Bar buttons
html = html.replace('>⚡</span>', `>${ICONS.bolt}</span>`);
html = html.replace('<div class="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 via-sky-500 to-blue-600 flex items-center justify-center text-xs font-black text-white shrink-0 shadow-sm">⚡</div>',
  `<div class="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>`);

html = html.replace('>👷 NPC &amp; Fleet Panel</button>', `>${ICONS.worker}NPC &amp; Fleet Panel</button>`);
html = html.replace('>🌡️Thermal</button>', `>${ICONS.thermometer}Thermal</button>`);
html = html.replace('>✨Glow Rendered</button>', `>${ICONS.sparkles}Glow Rendered</button>`);
html = html.replace('>🎨 Shade</button>', `>${ICONS.palette}Shade</button>`);
html = html.replace('>🌙 Night</button>', `>${ICONS.moon}Night</button>`);
html = html.replace('>☀️ Daylight</button>', `>${ICONS.sun}Daylight</button>`);
html = html.replace('>⚡ Load State</button>', `>${ICONS.bolt}Load State</button>`);
html = html.replace('>🔇 Audio</button>', `>${ICONS.volumeMute}Audio</button>`);
html = html.replace('>🔊 Audio ON</button>', `>${ICONS.volume}Audio ON</button>`);

html = html.replace('>📊 Telemetry</button>', `>${ICONS.barChart}Telemetry</button>`);
html = html.replace('>🔍 Inspect</button>', `>${ICONS.search}Inspect</button>`);
html = html.replace('>📈 Analytics</button>', `>${ICONS.chartUp}Analytics</button>`);
html = html.replace('>🎥 Follow</button>', `>${ICONS.video}Follow</button>`);
html = html.replace('>👁 POV</button>', `>${ICONS.eye}POV</button>`);
html = html.replace('>📹 CCTV PiP</button>', `>${ICONS.cctv}CCTV PiP</button>`);

// Close buttons
html = html.replace('<button id="btn-cctv-close" class="text-[10px] text-slate-400 hover:text-white px-0.5">✕</button>',
  `<button id="btn-cctv-close" class="text-[10px] text-slate-400 hover:text-white px-0.5">${ICONS.close}</button>`);
html = html.replace('<button id="btn-close-insp" class="text-xs text-slate-400 hover:text-white px-1">✕</button>',
  `<button id="btn-close-insp" class="text-xs text-slate-400 hover:text-white px-1">${ICONS.close}</button>`);

// NPC Panel Actions
html = html.replace('>👷 Dispatch to Breaker</button>', `>${ICONS.worker}Dispatch to Breaker</button>`);
html = html.replace('>⚡ Self-Test</button>', `>${ICONS.bolt}Self-Test</button>`);
html = html.replace('>🔄 ATS Gen-01</button>', `>${ICONS.refresh}ATS Gen-01</button>`);
html = html.replace('>✓ Ack All</button>', `>${ICONS.check}Ack All</button>`);
html = html.replace('<span>👷 Working NPCs (30)</span>', `<span>${ICONS.worker}Working NPCs (30)</span>`);
html = html.replace('>🚨 Muster</button>', `>${ICONS.alert}Muster</button>`);

html = html.replace('Click an NPC to follow • Press <span class="mono text-amber-300">👁 POV</span>',
  'Click an NPC to follow • Press <span class="mono text-amber-300">POV</span>');

// Quick picks
html = html.replace('<span>🔥 Boiler House</span>', `<span>${ICONS.flame}Boiler House</span>`);
html = html.replace('<span>⚙ Sewing Line 1</span>', `<span>${ICONS.gear}Sewing Line 1</span>`);
html = html.replace('<span>🔋 BESS Microgrid</span>', `<span>${ICONS.battery}BESS Microgrid</span>`);
html = html.replace('<span>🛢 Fuel Reserve</span>', `<span>${ICONS.barrel}Fuel Reserve</span>`);

html = html.replace('✦ AI Energy &amp; NCP Insights', 'AI Energy &amp; NCP Insights');

// Layer buttons
html = html.replace('>🏢 Bldgs</button>', `>${ICONS.building}Bldgs</button>`);
html = html.replace('>🔍 X-Ray</button>', `>${ICONS.search}X-Ray</button>`);
html = html.replace('>🛢 Pipes</button>', `>${ICONS.barrel}Pipes</button>`);
html = html.replace('>🚧 Fence</button>', `>${ICONS.barrier}Fence</button>`);
html = html.replace('>👷 NPCs</button>', `>${ICONS.worker}NPCs</button>`);
html = html.replace('>🌳 Nature</button>', `>${ICONS.tree}Nature</button>`);
html = html.replace('>🏷 Labels</button>', `>${ICONS.tag}Labels</button>`);
html = html.replace('>✨ Bloom</button>', `>${ICONS.sparkles}Bloom</button>`);
html = html.replace('>🚁 Walk Mode</button>', `>${ICONS.drone}Walk Mode</button>`);

// Dynamic JS texts
html = html.replace('btn.textContent = state.audioOn ? "🔊 Audio ON" : "🔇 Audio";',
  'btn.innerHTML = state.audioOn ? \'' + ICONS.volume + 'Audio ON\' : \'' + ICONS.volumeMute + 'Audio\';');
html = html.replace('toast("🔊 Industrial 3D Audio Ambience Active");',
  'toast("Industrial 3D Audio Ambience Active");');

html = html.replace('a.id === "NCP_01" ? "⚡ NCP-01" :', 'a.id === "NCP_01" ? "NCP-01" :');
html = html.replace('toast(`🎥 Following ${ag.def.name}', 'toast(`Following ${ag.def.name}');
html = html.replace('toast(`📹 Live CCTV Monitor:', 'toast(`Live CCTV Monitor:');

html = html.replace('{ label: "🎨 Vivid Real-Life",', '{ label: "Vivid Real-Life",');
html = html.replace('{ label: "🌅 Golden Sunset",', '{ label: "Golden Sunset",');
html = html.replace('{ label: "☀️ High Noon Crisp",', '{ label: "High Noon Crisp",');

html = html.replace('toast("⚡ NCP-01 Self-Test Complete:', 'toast("NCP-01 Self-Test Complete:');
html = html.replace('toast(state.atsGenMode ? "🔄 NCP-01 ATS: Switched to GEN-01 (2,000 kVA) + BESS-01 Microgrid" : "🔄 NCP-01 ATS: Switched back to BPDB 33 kV Substation");',
  'toast(state.atsGenMode ? "NCP-01 ATS: Switched to GEN-01 (2,000 kVA) + BESS-01 Microgrid" : "NCP-01 ATS: Switched back to BPDB 33 kV Substation");');
html = html.replace('toast("✓ All High & Low Alarms Acknowledged via NCP-01");',
  'toast("All High & Low Alarms Acknowledged via NCP-01");');

html = html.replace('toast(state.npcPov ? `👁️ 1st-Person POV: ${ag.def.name} (Use WASD / Arrows to walk!)` : `🎥 Orbit Follow Mode: ${ag.def.name}`);',
  'toast(state.npcPov ? `1st-Person POV: ${ag.def.name} (Use WASD / Arrows to walk!)` : `Orbit Follow Mode: ${ag.def.name}`);');

html = html.replace('e.target.textContent = state.musterDrill ? "✓ End Drill" : "🚨 Muster";',
  'e.target.innerHTML = state.musterDrill ? \'' + ICONS.check + 'End Drill\' : \'' + ICONS.alert + 'Muster\';');

html = html.replace('"🚨 MUSTER DRILL: NPCs Rallying to Helipad"',
  '"MUSTER DRILL: NPCs Rallying to Helipad"');
html = html.replace('toast("🚨 Emergency Muster Drill: Walking NPCs Rallying to Helipad (H)");',
  'toast("Emergency Muster Drill: Walking NPCs Rallying to Helipad (H)");');
html = html.replace('toast("✓ Muster Drill Complete: All 30 NPCs Returning to Stations");',
  'toast("Muster Drill Complete: All 30 NPCs Returning to Stations");');

html = html.replace('toast(`👷 NPC Work & Patrol Speed: ${state.npcSpeed}x`);',
  'toast(`NPC Work & Patrol Speed: ${state.npcSpeed}x`);');
html = html.replace('toast(`👷 Dispatched ${ag.def.name} to ${targetAsset.name}`);',
  'toast(`Dispatched ${ag.def.name} to ${targetAsset.name}`);');

html = html.replace('document.getElementById("btn-daynight").textContent = state.night ? "🌙 Night" : "☀️ Daylight";',
  'document.getElementById("btn-daynight").innerHTML = state.night ? \'' + ICONS.moon + 'Night\' : \'' + ICONS.sun + 'Daylight\';');

html = html.replace('${isF ? "🎥" : "👁"}`,', '${isF ? "Follow" : "POV"}`);');
html = html.replace('${isF ? "🎥" : "👁"}', '${isF ? "Follow" : "POV"}');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Finished updating preview/digital-twin.html!');
