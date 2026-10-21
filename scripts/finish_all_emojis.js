// scripts/finish_all_emojis.js
const fs = require('fs');
const path = require('path');

// 1. Process preview/digital-twin.html
let dt = fs.readFileSync('preview/digital-twin.html', 'utf8');

const dtReplacements = [
  // L55: ⚡
  {
    from: `<div class="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 via-sky-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow">⚡</div>`,
    to: `<div class="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 via-sky-500 to-blue-600 flex items-center justify-center font-bold text-white shadow"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>`
  },
  // L65: 👷 NPCs &amp; NCP
  {
    from: `<button id="tab-ncp" class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">👷 NPCs &amp; NCP</button>`,
    to: `<button id="tab-ncp" class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold inline-flex items-center gap-1.5"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> NPCs &amp; NCP</button>`
  },
  // L69: 🌡️Therm
  {
    from: `<button data-shade="thermal" class="shade-btn px-1.5 py-0.5 rounded text-[9px] text-slate-400">🌡️Therm</button>`,
    to: `<button data-shade="thermal" class="shade-btn px-1.5 py-0.5 rounded text-[9px] text-slate-400 inline-flex items-center gap-1"><svg class="w-2.5 h-2.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>Therm</button>`
  },
  // L71: ✨PBR
  {
    from: `<button data-shade="rendered" class="shade-btn px-1.5 py-0.5 rounded text-[9px] bg-orange-500/25 text-orange-300 font-bold">✨PBR</button>`,
    to: `<button data-shade="rendered" class="shade-btn px-1.5 py-0.5 rounded text-[9px] bg-orange-500/25 text-orange-300 font-bold inline-flex items-center gap-1"><svg class="w-2.5 h-2.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>PBR</button>`
  },
  // L83: 🎨 Vivid Real-Life
  {
    from: `<button id="btn-color-preset" class="px-1.5 py-0.5 rounded bg-amber-500/25 border border-amber-400/50 text-[10px] text-amber-200 font-semibold">🎨 Vivid Real-Life</button>`,
    to: `<button id="btn-color-preset" class="px-1.5 py-0.5 rounded bg-amber-500/25 border border-amber-400/50 text-[10px] text-amber-200 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="1.5"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/><circle cx="12" cy="16" r="1.5"/></svg> Vivid Real-Life</button>`
  },
  // L85: ⚡States
  {
    from: `<button id="btn-states" class="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">⚡States</button>`,
    to: `<button id="btn-states" class="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>States</button>`
  },
  // L95: 📊 KPI
  {
    from: `<button id="btn-tog-left" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold ml-0.5">📊 KPI</button>`,
    to: `<button id="btn-tog-left" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold ml-0.5 inline-flex items-center gap-1"><svg class="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> KPI</button>`
  },
  // L97: 📈 AI
  {
    from: `<button id="btn-tog-right" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">📈 AI</button>`,
    to: `<button id="btn-tog-right" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> AI</button>`
  },
  // L98: 🎥 Follow NPC
  {
    from: `<button id="btn-follow-npc" class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">🎥 Follow NPC</button>`,
    to: `<button id="btn-follow-npc" class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> Follow NPC</button>`
  },
  // L99: 👁️ POV
  {
    from: `<button id="btn-npc-pov" class="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold" title="First-Person Eyes View + WASD Walk">👁️ POV</button>`,
    to: `<button id="btn-npc-pov" class="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold inline-flex items-center gap-1" title="First-Person Eyes View + WASD Walk"><svg class="w-3 h-3 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> POV</button>`
  },
  // L281: 👷 Send NPC
  {
    from: `<button id="btn-dispatch-npc" class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">👷 Send NPC</button>`,
    to: `<button id="btn-dispatch-npc" class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Send NPC</button>`
  },
  // L310: ⚡ Self-Test NCP
  {
    from: `<button id="btn-ncp-test" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">⚡ Self-Test NCP</button>`,
    to: `<button id="btn-ncp-test" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Self-Test NCP</button>`
  },
  // L311: 🔄 ATS Gen
  {
    from: `<button id="btn-ncp-ats" class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">🔄 ATS Gen</button>`,
    to: `<button id="btn-ncp-ats" class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> ATS Gen</button>`
  },
  // L312: ✓ Clear Alarms
  {
    from: `<button id="btn-ncp-reset" class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">✓ Clear Alarms</button>`,
    to: `<button id="btn-ncp-reset" class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Clear Alarms</button>`
  },
  // L320: 👷 Working NPCs (30)
  {
    from: `<span class="text-xs font-bold text-white">👷 Working NPCs (30)</span>`,
    to: `<span class="text-xs font-bold text-white inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Working NPCs (30)</span>`
  },
  // L328: Click an NPC to follow • Press <span class="mono text-amber-300">👁️ POV</span> + <span class="mono text-sky-300">WASD</span> to walk
  {
    from: `<span class="mono text-amber-300">👁️ POV</span>`,
    to: `<span class="mono text-amber-300">POV</span>`
  },
  // L345: 🔥 Vacuum Furnace
  {
    from: `<span>🔥 Vacuum Furnace</span>`,
    to: `<span class="inline-flex items-center gap-1.5"><svg class="w-3 h-3 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg> Vacuum Furnace</span>`
  },
  // L347: 🔋 BESS Megapacks &amp; Gen
  {
    from: `<span>🔋 BESS Megapacks &amp; Gen</span>`,
    to: `<span class="inline-flex items-center gap-1.5"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></svg> BESS Megapacks &amp; Gen</span>`
  },
  // L348: 🛢️ Chemical &amp; Acid Tanks
  {
    from: `<span>🛢️ Chemical &amp; Acid Tanks</span>`,
    to: `<span class="inline-flex items-center gap-1.5"><svg class="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Chemical &amp; Acid Tanks</span>`
  },
  // L381: 🛢️ Tanks
  {
    from: `<button data-layer="tanksPipes" class="layer-btn px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">🛢️ Tanks</button>`,
    to: `<button data-layer="tanksPipes" class="layer-btn px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 inline-flex items-center gap-1"><svg class="w-3 h-3 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/></svg> Tanks</button>`
  },
  // L383: 👷 NPCs (12)
  {
    from: `<button data-layer="npcs" class="layer-btn px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">👷 NPCs (12)</button>`,
    to: `<button data-layer="npcs" class="layer-btn px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg> NPCs (12)</button>`
  },
  // L385: 🏷️ Pins
  {
    from: `<button data-layer="labels" class="layer-btn px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">🏷️ Pins</button>`,
    to: `<button data-layer="labels" class="layer-btn px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 inline-flex items-center gap-1"><svg class="w-3 h-3 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> Pins</button>`
  },
  // L389: 🚁 Walk
  {
    from: `<button id="btn-walk" class="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-300">🚁 Walk</button>`,
    to: `<button id="btn-walk" class="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-300 inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg> Walk</button>`
  },
  // L439: bubble: "⚡ Welding Seam #3"
  {
    from: `bubble: "⚡ Welding Seam #3"`,
    to: `bubble: "Arc-Welding Seam #3"`
  },
  // L1502: "🔋 BESS/GEN"
  {
    from: `"🔋 BESS/GEN"`,
    to: `"BESS/GEN"`
  },
  // L1663: '👁️ POV' : '🎥 Active'
  {
    from: `'👁️ POV' : '🎥 Active'`,
    to: `'POV' : 'Active'`
  },
  // L1834: "🔄 NCP-01 ATS: ...
  {
    from: `"🔄 NCP-01 ATS:`,
    to: `"NCP-01 ATS:`
  },
  // L1853: `👁️ 1st-Person POV:
  {
    from: "`👁️ 1st-Person POV:",
    to: "`1st-Person POV:"
  },
  {
    from: ": `🎥 Orbit Follow:",
    to: ": `Orbit Follow:"
  }
];

let dtMatches = 0;
dtReplacements.forEach(r => {
  if (dt.includes(r.from)) {
    dt = dt.split(r.from).join(r.to);
    dtMatches++;
  } else {
    console.warn("Could not find dt snippet:", r.from.substring(0, 40));
  }
});
console.log(`Applied ${dtMatches}/${dtReplacements.length} replacements to preview/digital-twin.html`);
fs.writeFileSync('preview/digital-twin.html', dt, 'utf8');

// 2. Process server.js
let srv = fs.readFileSync('server.js', 'utf8');
const srvReplacements = [
  {
    from: `<a href="/" class="btn btn-primary">🚀 Open Main Website &amp; AI Copilot</a>`,
    to: `<a href="/" class="btn btn-primary"><svg style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>Open Main Website &amp; AI Copilot</a>`
  },
  {
    from: `<a href="/#/login" class="btn btn-secondary">🔐 Hardened Executive Sign-In</a>`,
    to: `<a href="/#/login" class="btn btn-secondary"><svg style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Hardened Executive Sign-In</a>`
  },
  {
    from: `<a href="/#/agent-console" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;">🤖 6-Agent Console</a>`,
    to: `<a href="/#/agent-console" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;"><svg style="width:15px;height:15px;display:inline-block;vertical-align:middle;margin-right:5px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>6-Agent Console</a>`
  },
  {
    from: `<a href="/digital-twin.html" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;">🧊 3D EPMS Digital Twin</a>`,
    to: `<a href="/digital-twin.html" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;"><svg style="width:15px;height:15px;display:inline-block;vertical-align:middle;margin-right:5px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>3D EPMS Digital Twin</a>`
  },
  {
    from: `<a href="/simulation.html" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;">🎛️ Simulation Control</a>`,
    to: `<a href="/simulation.html" class="btn btn-secondary" style="font-size:0.84rem;padding:11px 14px;"><svg style="width:15px;height:15px;display:inline-block;vertical-align:middle;margin-right:5px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Simulation Control</a>`
  },
  {
    from: `<span style="color:var(--accent-light);">🔒 Manager &amp; Owner Protected</span>`,
    to: `<span style="color:var(--accent-light);"><svg style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Manager &amp; Owner Protected</span>`
  }
];

let srvMatches = 0;
srvReplacements.forEach(r => {
  if (srv.includes(r.from)) {
    srv = srv.split(r.from).join(r.to);
    srvMatches++;
  } else {
    console.warn("Could not find srv snippet:", r.from.substring(0, 40));
  }
});
console.log(`Applied ${srvMatches}/${srvReplacements.length} replacements to server.js`);
fs.writeFileSync('server.js', srv, 'utf8');
