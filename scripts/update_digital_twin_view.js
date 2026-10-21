const fs = require('fs');
const path = require('path');

const indexPath = path.resolve('preview/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Find renderDigitalTwinView
const fnStart = '    function renderDigitalTwinView(m) {';
const returnStart = '      return `\n        <!-- EPMS BRIGHTLAYER DARK INDUSTRIAL SUITE CONTAINER';
const endMarker = '    // ============================================================================\n    // 8. INTERACTIVE 3D WEBGL EPMS DIGITAL TWIN ENGINE (THREE.JS r128)';

const idxFn = content.indexOf(fnStart);
const idxEnd = content.indexOf(endMarker);

if (idxFn === -1 || idxEnd === -1) {
  console.error('Could not find renderDigitalTwinView boundaries');
  process.exit(1);
}

const newRenderDigitalTwinView = `    function renderDigitalTwinView(m) {
      return \`
        <!-- EPMS 3D DIGITAL TWIN (Interactive Three.js WebGL Simulation) -->
        <div class="w-full flex flex-col space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900 border border-sky-500/30 text-white shadow-xl">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-500 flex items-center justify-center text-white text-base font-bold shadow-md shadow-sky-500/30">
                ⚡
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-sm font-extrabold tracking-tight">EPMS — Green AI Digital Twin</h1>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>3D WEBGL ENGINE ACTIVE</span>
                  </span>
                  <span class="badge-sim px-2 py-0.5 rounded text-[10px] font-mono">SIMULATION MODE</span>
                </div>
                <p class="text-[11px] text-slate-400">Interactive 3D facility twin, power transitions, neural busbar topology &amp; IEEE 3002.2 single-line diagram.</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <a href="digital-twin.html" target="_blank" class="px-3 py-1.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 border border-sky-500/40 text-xs font-semibold transition flex items-center gap-1.5" title="Open Dedicated Standalone 3D View">
                <span>Open Dedicated Window ↗</span>
              </a>
              <button type="button" onclick="const f = document.getElementById('epms-3d-iframe'); if (f.requestFullscreen) f.requestFullscreen(); else if (f.webkitRequestFullscreen) f.webkitRequestFullscreen();" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition">
                ⛶ Fullscreen
              </button>
            </div>
          </div>

          <!-- Interactive 3D WebGL Digital Twin Iframe -->
          <div class="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0b0f15]" style="height: calc(100vh - 170px); min-height: 780px;">
            <iframe id="epms-3d-iframe" src="digital-twin.html" class="w-full h-full border-0 select-none" allow="fullscreen; autoplay"></iframe>
          </div>
        </div>
      \`;
    }

`;

content = content.substring(0, idxFn) + newRenderDigitalTwinView + content.substring(idxEnd);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✓ Updated renderDigitalTwinView in preview/index.html to embed digital-twin.html');
