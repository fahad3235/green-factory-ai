const fs = require('fs');

console.log('Applying fix for modal HTML titles and play/step icons...');

// 1. UPDATE preview/index.html
let indexHtml = fs.readFileSync('preview/index.html', 'utf8');

// Fix openAppModal tEl.textContent -> tEl.innerHTML and sEl.textContent -> sEl.innerHTML
const oldModalTitleLines = `tEl.textContent = title || 'Dialog';
      sEl.textContent = subtitle || 'Simulation Action Gate';`;

const newModalTitleLines = `tEl.innerHTML = title || 'Dialog';
      sEl.innerHTML = subtitle || 'Simulation Action Gate';`;

if (indexHtml.includes(oldModalTitleLines)) {
  indexHtml = indexHtml.replace(oldModalTitleLines, newModalTitleLines);
  console.log('✓ Fixed openAppModal to use innerHTML for title and subtitle');
} else {
  console.warn('Could not find exact oldModalTitleLines string in preview/index.html');
}

// Fix line 617: <span id="demo-play-icon">▶</span>
indexHtml = indexHtml.replace(
  '<span id="demo-play-icon">▶</span>',
  '<span id="demo-play-icon"><svg class="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg></span>'
);
console.log('✓ Replaced demo-play-icon with SVG play icon');

// Fix line 621: <span>↷</span><span>Step</span>
indexHtml = indexHtml.replace(
  '<span>↷</span><span>Step</span>',
  '<svg class="w-3 h-3 text-slate-300 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg><span>Step</span>'
);
console.log('✓ Replaced step icon with SVG step icon');

// Fix line 4693: if (icon) icon.textContent = AppState.simRunning ? '⏸' : '▶';
indexHtml = indexHtml.replace(
  "if (icon) icon.textContent = AppState.simRunning ? '⏸' : '▶';",
  "if (icon) icon.innerHTML = AppState.simRunning ? '<svg class=\"w-3 h-3 inline-block\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>' : '<svg class=\"w-3 h-3 inline-block\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><polygon points=\"6 3 20 12 6 21 6 3\"/></svg>';"
);
console.log('✓ Fixed toggleSimulationPlay icon update to use SVG icons');

// Fix line 4706 toast text
indexHtml = indexHtml.replace(
  "showToast(AppState.simRunning ? '▶ Simulation running with live deterministic telemetry.' : '⏸ Simulation paused.', 'info');",
  "showToast(AppState.simRunning ? 'Simulation running with live deterministic telemetry.' : 'Simulation paused.', 'info');"
);
console.log('✓ Cleaned toast notification string in toggleSimulationPlay');

fs.writeFileSync('preview/index.html', indexHtml, 'utf8');
console.log('Finished updating preview/index.html!');

// 2. UPDATE preview/digital-twin.html
let dtHtml = fs.readFileSync('preview/digital-twin.html', 'utf8');

// Fix line 1800 in digital-twin.html
const oldColorPreset = `    document.getElementById("btn-color-preset").onclick = (e) => {
      state.colorPreset = (state.colorPreset + 1) % 3;
      const presets = [
        { label: "Vivid Real-Life", h: 14.5, exp: 1.16 },
        { label: "Golden Sunset", h: 17.5, exp: 1.25 },
        { label: "High Noon Crisp", h: 12.0, exp: 1.12 }
      ];
      const p = presets[state.colorPreset];
      e.target.textContent = p.label;`;

const newColorPreset = `    document.getElementById("btn-color-preset").onclick = () => {
      state.colorPreset = (state.colorPreset + 1) % 3;
      const presets = [
        { label: "Vivid Real-Life", h: 14.5, exp: 1.16 },
        { label: "Golden Sunset", h: 17.5, exp: 1.25 },
        { label: "High Noon Crisp", h: 12.0, exp: 1.12 }
      ];
      const p = presets[state.colorPreset];
      const btn = document.getElementById("btn-color-preset");
      if (btn) btn.innerHTML = \`<svg class="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="1.5"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/><circle cx="12" cy="16" r="1.5"/></svg> \${p.label}\`;`;

if (dtHtml.includes(oldColorPreset)) {
  dtHtml = dtHtml.replace(oldColorPreset, newColorPreset);
  console.log('✓ Fixed btn-color-preset to preserve SVG icon in digital-twin.html');
}

fs.writeFileSync('preview/digital-twin.html', dtHtml, 'utf8');
console.log('Finished updating preview/digital-twin.html!');
