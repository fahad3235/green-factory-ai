const fs = require('fs');
let dt = fs.readFileSync('preview/digital-twin.html', 'utf8');

const reps = [
  {
    from: `<button id="btn-tog-insp" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">🔍 CB8</button>`,
    to: `<button id="btn-tog-insp" class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold inline-flex items-center gap-1"><svg class="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> CB8</button>`
  },
  {
    from: `<button id="btn-cctv-pip" class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold" title="Toggle Live Plant CCTV Monitor">📹 CCTV</button>`,
    to: `<button id="btn-cctv-pip" class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold inline-flex items-center gap-1" title="Toggle Live Plant CCTV Monitor"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> CCTV</button>`
  },
  {
    from: `<div data-pick="Hall_F" class="flex justify-between p-1 rounded bg-slate-900/70 hover:bg-slate-800 cursor-pointer"><span>⚙️ Drill Press &amp; Robots</span><span class="mono font-bold text-sky-300">62</span></div>`,
    to: `<div data-pick="Hall_F" class="flex justify-between p-1 rounded bg-slate-900/70 hover:bg-slate-800 cursor-pointer"><span class="inline-flex items-center gap-1.5"><svg class="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Drill Press &amp; Robots</span><span class="mono font-bold text-sky-300">62</span></div>`
  },
  {
    from: `<button data-layer="nature" class="layer-btn px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🌳 Real-Life</button>`,
    to: `<button data-layer="nature" class="layer-btn px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M8 12c-2.2 0-4-1.8-4-4a4 4 0 0 1 7.2-2.3A4.5 4.5 0 0 1 20 8c0 2.2-1.8 4-4 4"/><path d="M8 12c0 2.2 1.8 3 4 3s4-.8 4-3"/></svg> Real-Life</button>`
  }
];

let applied = 0;
reps.forEach(r => {
  if (dt.includes(r.from)) {
    dt = dt.split(r.from).join(r.to);
    applied++;
  } else {
    console.warn("Could not find:", r.from);
  }
});

console.log(`Applied ${applied}/${reps.length} replacements`);
fs.writeFileSync('preview/digital-twin.html', dt, 'utf8');
