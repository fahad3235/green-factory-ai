const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Update default AppState.energyChartPeriod to 'day'
html = html.replace(
  "energyChartPeriod: 'month', // 'day' | 'week' | 'month' | 'year'",
  "energyChartPeriod: 'day', // 'day' (One Day 24h Profile) | 'week' | 'month' | 'year'"
);

// 2. Add updateEnergyChartTooltip and getDashboardEnergyChartFooter and replace generateEnergyChartSvg
const oldFuncStart = "    // ----------------------------------------------------------------------------\n    // VIEW 1: DASHBOARD (Matches Reference Image 1 + Master Prompt Section 7)\n    // ----------------------------------------------------------------------------\n    \n    function generateEnergyChartSvg(period, m, simTickCount, isDark) {";

const oldFuncEndMarker = "    function getDashboardMachineRows(m) {";

const sIdx = html.indexOf(oldFuncStart);
const eIdx = html.indexOf(oldFuncEndMarker);

if (sIdx === -1 || eIdx === -1) {
  console.error('Could not find boundaries for generateEnergyChartSvg! sIdx:', sIdx, 'eIdx:', eIdx);
  process.exit(1);
}

const newChartBlock = `    // ----------------------------------------------------------------------------
    // VIEW 1: DASHBOARD (Matches Reference Image 1 + Master Prompt Section 7)
    // ----------------------------------------------------------------------------
    
    function updateEnergyChartTooltip(idx, x, y, lbl, usage, prod, W) {
      const g = document.getElementById('chart-tooltip-group');
      const ch = document.getElementById('chart-crosshair');
      const tLbl = document.getElementById('chart-tt-lbl');
      const tUsage = document.getElementById('chart-tt-usage');
      const tProd = document.getElementById('chart-tt-prod');
      if (ch) {
        ch.setAttribute('x1', x);
        ch.setAttribute('x2', x);
        ch.style.opacity = '0.9';
      }
      if (g && tLbl && tUsage && tProd) {
        const boxW = 140;
        const clampedX = Math.min((W || 620) - boxW - 8, Math.max(8, x - (boxW / 2)));
        const clampedY = Math.max(8, y - 60);
        g.setAttribute('transform', 'translate(' + clampedX + ', ' + clampedY + ')');
        tLbl.textContent = lbl;
        tUsage.textContent = Number(usage).toLocaleString() + ' kWh';
        tProd.textContent = 'Production: ' + Number(prod).toLocaleString() + ' pcs';
      }
      document.querySelectorAll('[id^="chart-pt-dot-"]').forEach((c, i) => {
        if (i === idx) {
          c.setAttribute('r', '6');
          c.setAttribute('stroke', '#38BDF8');
          c.setAttribute('stroke-width', '3');
        } else {
          c.setAttribute('r', '4');
          c.setAttribute('stroke', '#0284C7');
          c.setAttribute('stroke-width', '2');
        }
      });
    }

    function getDashboardEnergyChartFooter(period) {
      if (period === 'day') {
        return 'Peak Hour: <strong class="text-slate-800 dark:text-slate-200">14:00 (265 kWh &bull; 2,750 pcs)</strong> &bull; Daily Target: <strong class="text-slate-800 dark:text-slate-200">200 kWh/h (4,800 kWh/day)</strong>';
      } else if (period === 'week') {
        return 'Peak Day: <strong class="text-slate-800 dark:text-slate-200">Thu (8,240 kWh &bull; 12,600 pcs)</strong> &bull; Daily Target: <strong class="text-slate-800 dark:text-slate-200">6,500 kWh/day</strong>';
      } else if (period === 'year') {
        return 'Peak Month: <strong class="text-slate-800 dark:text-slate-200">Sep (54,100 kWh &bull; 82,000 pcs)</strong> &bull; Monthly Target: <strong class="text-slate-800 dark:text-slate-200">52,000 kWh/mo</strong>';
      } else {
        return 'Peak Day: <strong class="text-slate-800 dark:text-slate-200">Oct 15 (8,240 kWh &bull; 12,450 pcs)</strong> &bull; Daily Target: <strong class="text-slate-800 dark:text-slate-200">6,500 kWh/day</strong>';
      }
    }

    function generateEnergyChartSvg(period, m, simTickCount, isDark) {
      const textColor = isDark ? '#94A3B8' : '#64748B';
      const gridColor = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.2)';
      const simFactor = (m && m.totalCurrentKw ? (m.totalCurrentKw / 199.2) : 1.0);
      const tickWobble = Math.sin((simTickCount || 0) * 0.45) * 140;

      let labels = [];
      let usage = [];
      let prod = [];
      let targetVal = 200;
      let maxY = 320;
      let peakIdx = 7;

      if (period === 'day') {
        // 1-Day View: 24-Hour continuous factory profile with 13 key hourly checkpoints
        labels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00 (Peak)', '16:00 (Live)', '18:00', '20:00', '22:00', '23:59'];
        usage = [95, 80, 75, 115, 210, 240, 230, 265, Math.round(250 * simFactor + tickWobble * 0.08), 225, 205, 165, 105];
        prod = [0, 0, 0, 350, 2100, 2600, 2450, 2750, Math.round(2600 * simFactor), 2350, 2100, 1500, 200];
        targetVal = 200;
        maxY = 320;
        peakIdx = 7;
      } else if (period === 'week') {
        labels = ['Mon', 'Tue', 'Wed', 'Thu (Peak)', 'Fri (Live)', 'Sat', 'Sun'];
        usage = [7450, 7820, 7650, 8240, Math.round(7950 * simFactor + tickWobble), 6800, 2400];
        prod = [11200, 11800, 11500, 12600, Math.round(11900 * simFactor), 9800, 1500];
        targetVal = 6500;
        maxY = 10000;
        peakIdx = 3;
      } else if (period === 'year') {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep (Peak)', 'Oct (Live)', 'Nov', 'Dec'];
        usage = [48500, 51200, 53400, 52100, 54200, 53800, 51900, 52800, 54100, Math.round(m.totalPeriodKwh), 51000, 49500];
        prod = [72000, 76000, 79000, 77500, 81000, 80500, 78000, 79500, 82000, Math.round(m.totalPeriodKwh * 1.5), 77000, 74000];
        targetVal = 52000;
        maxY = 65000;
        peakIdx = 8;
      } else {
        // 'month' (matches Reference Image 2)
        labels = ['Oct 1', 'Oct 5', 'Oct 10', 'Oct 15 (Peak)', 'Oct 20 (Live)', 'Oct 25', 'Oct 31'];
        const liveVal = Math.round(7850 * simFactor + tickWobble);
        usage = [3100, 4200, 6800, 8240, liveVal, 6900, 5200];
        prod = [4500, 6200, 10100, 12450, Math.round(11800 * simFactor), 10500, 7800];
        targetVal = 6500;
        maxY = 10000;
        peakIdx = 3;
      }

      const W = 620;
      const H = 220;
      const padL = 48;
      const padR = 24;
      const padT = 24;
      const padB = 28;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;

      const getX = (idx) => padL + (idx / (labels.length - 1)) * plotW;
      const getY = (val) => padT + plotH - (Math.min(val, maxY) / maxY) * plotH;

      const steps = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
      let gridSvg = '';
      steps.forEach(s => {
        const yVal = Math.round(maxY * s);
        const yPx = padT + plotH - s * plotH;
        gridSvg += '<line x1="' + padL + '" y1="' + yPx + '" x2="' + (W - padR) + '" y2="' + yPx + '" stroke="' + gridColor + '" stroke-dasharray="3,3" stroke-width="1" />' +
                   '<text x="' + (padL - 8) + '" y="' + (yPx + 3.5) + '" text-anchor="end" font-size="10" fill="' + textColor + '" font-family="system-ui, -apple-system, sans-serif">' + yVal.toLocaleString() + '</text>';
      });

      let xLabelsSvg = '';
      labels.forEach((lbl, idx) => {
        const x = getX(idx);
        const shortLbl = lbl.replace(' (Peak)', '').replace(' (Live)', '');
        xLabelsSvg += '<text x="' + x + '" y="' + (H - 8) + '" text-anchor="middle" font-size="9.5" fill="' + textColor + '" font-family="system-ui, -apple-system, sans-serif">' + shortLbl + '</text>';
      });

      function makeBezierPath(points, closeToBottom) {
        if (!points || points.length === 0) return '';
        let d = 'M ' + points[0].x + ' ' + points[0].y;
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i];
          const p1 = points[i + 1];
          const mx = (p0.x + p1.x) / 2;
          d += ' C ' + mx + ' ' + p0.y + ', ' + mx + ' ' + p1.y + ', ' + p1.x + ' ' + p1.y;
        }
        if (closeToBottom) {
          d += ' L ' + points[points.length - 1].x + ' ' + (padT + plotH) + ' L ' + points[0].x + ' ' + (padT + plotH) + ' Z';
        }
        return d;
      }

      const usagePts = usage.map((v, i) => ({ x: getX(i), y: getY(v), val: v }));
      const maxProd = Math.max(...prod) * 1.15;
      const prodPts = prod.map((v, i) => ({ x: getX(i), y: padT + plotH - (v / maxProd) * plotH, val: v }));

      const usageAreaD = makeBezierPath(usagePts, true);
      const usageLineD = makeBezierPath(usagePts, false);
      const prodLineD = makeBezierPath(prodPts, false);
      const targetY = getY(targetVal);

      const initialX = usagePts[peakIdx].x;
      const initialY = usagePts[peakIdx].y;
      const boxW = 140;
      const boxH = 50;
      const initialBoxX = Math.min(W - boxW - 8, Math.max(8, initialX - boxW / 2));
      const initialBoxY = Math.max(8, initialY - 60);

      const crosshairSvg = '<line id="chart-crosshair" x1="' + initialX + '" y1="' + padT + '" x2="' + initialX + '" y2="' + (padT + plotH) + '" stroke="#38BDF8" stroke-dasharray="3,3" stroke-width="1.2" opacity="0.6" style="transition: all 0.15s ease;" />';

      const pointsSvg = usagePts.map((p, i) => {
        const isPeak = (i === peakIdx);
        const radius = isPeak ? 5.5 : 4;
        const strokeW = isPeak ? 2.5 : 2.0;
        const safeLbl = labels[i].replace(/'/g, "\\\\'");
        return '<g class="chart-point-group cursor-pointer" onmouseenter="updateEnergyChartTooltip(' + i + ', ' + p.x + ', ' + p.y + ', \\'' + safeLbl + '\\', ' + usage[i] + ', ' + prod[i] + ', ' + W + ')" onclick="updateEnergyChartTooltip(' + i + ', ' + p.x + ', ' + p.y + ', \\'' + safeLbl + '\\', ' + usage[i] + ', ' + prod[i] + ', ' + W + ')">' +
          '<circle id="chart-pt-dot-' + i + '" cx="' + p.x + '" cy="' + p.y + '" r="' + radius + '" fill="#FFFFFF" stroke="#0284C7" stroke-width="' + strokeW + '" />' +
          '<circle cx="' + p.x + '" cy="' + p.y + '" r="14" fill="transparent" class="cursor-pointer">' +
            '<title>' + labels[i] + ': ' + usage[i].toLocaleString() + ' kWh • ' + prod[i].toLocaleString() + ' pcs</title>' +
          '</circle>' +
        '</g>';
      }).join('');

      const tooltipSvg = '<g id="chart-tooltip-group" transform="translate(' + initialBoxX + ', ' + initialBoxY + ')" style="transition: transform 0.15s ease; pointer-events: none;">' +
        '<rect width="' + boxW + '" height="' + boxH + '" rx="8" fill="#0F172A" fill-opacity="0.95" stroke="#38BDF8" stroke-width="1.2" />' +
        '<text id="chart-tt-lbl" x="12" y="16" font-size="10" font-weight="bold" fill="#F8FAFC" font-family="system-ui, sans-serif">' + labels[peakIdx] + '</text>' +
        '<text id="chart-tt-usage" x="12" y="30" font-size="11" font-weight="extrabold" fill="#38BDF8" font-family="system-ui, sans-serif">' + usage[peakIdx].toLocaleString() + ' kWh</text>' +
        '<text id="chart-tt-prod" x="12" y="43" font-size="9" fill="#94A3B8" font-family="system-ui, sans-serif">Production: ' + prod[peakIdx].toLocaleString() + ' pcs</text>' +
      '</g>';

      return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="w-full h-full" preserveAspectRatio="none">' +
        '<defs>' +
          '<linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#0EA5E9" stop-opacity="0.25"/>' +
            '<stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.01"/>' +
          '</linearGradient>' +
        '</defs>' +
        gridSvg +
        xLabelsSvg +
        crosshairSvg +
        '<line x1="' + padL + '" y1="' + targetY + '" x2="' + (W - padR) + '" y2="' + targetY + '" stroke="#059669" stroke-dasharray="4,4" stroke-width="1.8" opacity="0.8" />' +
        '<path d="' + prodLineD + '" fill="none" stroke="#10B981" stroke-width="2.2" opacity="0.85" />' +
        '<path d="' + usageAreaD + '" fill="url(#usageGradient)" />' +
        '<path d="' + usageLineD + '" fill="none" stroke="#0284C7" stroke-width="2.5" />' +
        pointsSvg +
        tooltipSvg +
      '</svg>';
    }\n\n`;

html = html.substring(0, sIdx) + newChartBlock + html.substring(eIdx);

// 3. Update the call and footer in renderDashboardView
html = html.replace(
  `\${generateEnergyChartSvg(AppState.energyChartPeriod || 'month', m, AppState.simTickCount || 0, document.documentElement.classList.contains('dark') || AppState.theme === 'dark')}`,
  `\${generateEnergyChartSvg(AppState.energyChartPeriod || 'day', m, AppState.simTickCount || 0, document.documentElement.classList.contains('dark') || AppState.theme === 'dark')}`
);

html = html.replace(
  `<span>Peak Day: <strong class="text-slate-800 dark:text-slate-200">Oct 15 (8,240 kWh • 12,450 pcs)</strong></span>`,
  `<span id="dashboard-energy-footer-text">\${getDashboardEnergyChartFooter(AppState.energyChartPeriod || 'day')}</span>`
);

// 4. Update initViewCharts
html = html.replace(
  `const period = AppState.energyChartPeriod || 'month';`,
  `const period = AppState.energyChartPeriod || 'day';`
);

html = html.replace(
  `if (period === 'day') {
            labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
            usageData = [140, 85, 210, 245, Math.round(230 * simFactor + tickWobble * 0.05), 195, 120];
            prodData = [0, 0, 1850, 2600, Math.round(2450 * simFactor), 1900, 200];
            targetData = [200, 200, 200, 200, 200, 200, 200];
          }`,
  `if (period === 'day') {
            labels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00 (Peak)', '16:00 (Live)', '18:00', '20:00', '22:00', '23:59'];
            usageData = [95, 80, 75, 115, 210, 240, 230, 265, Math.round(250 * simFactor + tickWobble * 0.08), 225, 205, 165, 105];
            prodData = [0, 0, 0, 350, 2100, 2600, 2450, 2750, Math.round(2600 * simFactor), 2350, 2100, 1500, 200];
            targetData = Array(13).fill(200);
          }`
);

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Successfully updated preview/index.html with interactive 1-day & multi-day Energy Usage Overview chart!');
