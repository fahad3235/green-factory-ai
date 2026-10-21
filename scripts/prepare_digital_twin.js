const fs = require('fs');
const path = require('path');

const srcPath = path.resolve('epms_green_ai_digital_twin_interactive_three_js_webgl_simulation (2).html');
const destPath = path.resolve('preview/digital-twin.html');

let content = fs.readFileSync(srcPath, 'utf8');

// Insert return to dashboard button into header
const target = `<button id="quick-search-btn" title="Inspect Any Machine Node" class="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>`;

const replacement = `<button id="quick-search-btn" title="Inspect Any Machine Node" class="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>

      <!-- Back to Main Dashboard -->
      <a href="/#dashboard" class="ml-1 px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition flex items-center gap-1" title="Return to Green Factory Brain AI Dashboard">
        <span>←</span><span>Dashboard</span>
      </a>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  console.log('✓ Injected Dashboard link into digital-twin.html');
} else {
  console.log('Target for dashboard link not found, copying directly');
}

fs.writeFileSync(destPath, content, 'utf8');
console.log(`✓ Created: ${destPath} (${(fs.statSync(destPath).size / 1024).toFixed(2)} KB)`);
