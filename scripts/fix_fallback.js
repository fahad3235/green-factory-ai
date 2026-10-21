const fs = require('fs');
const path = require('path');

const indexPath = path.resolve('preview/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const target = '    function renderDigitalTwinView(m) {';
const replacement = `    function renderEpms2dOrSldFallback(m) {
      return \`
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <h3 class="font-bold text-white mb-1">EPMS 2D Isometric & Single-Line Diagram (SLD) Fallback</h3>
          <p class="text-[10px] text-slate-400">IEEE 3002.2 Neural Busbar Topology Fallback mode.</p>
        </div>
      \`;
    }

    function renderDigitalTwinView(m) {`;

if (!content.includes('function renderEpms2dOrSldFallback')) {
  content = content.replace(target, replacement);
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('✓ Added renderEpms2dOrSldFallback to preview/index.html');
} else {
  console.log('renderEpms2dOrSldFallback already present');
}
