const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Add setDashboardMachineFilter to AppState & helpers if not present
if (!html.includes('function setDashboardMachineFilter')) {
  const insertBefore = 'function setDashboardChartPeriod(period) {';
  const helperCode = `
    function setDashboardMachineFilter(filter) {
      AppState.dashboardMachineFilter = filter;
      renderActiveView();
    }
`;
  html = html.replace(insertBefore, helperCode + '    ' + insertBefore);
}

// 2. Add generateEnergyChartSvg and getDashboardMachineRows helper functions
const chartFuncsCode = `
    function generateEnergyChartSvg(period, m, simTickCount, isDark) {
      const textColor = isDark ? '#94A3B8' : '#64748B';
      const gridColor = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.2)';
      const simFactor = (m && m.totalCurrentKw ? (m.totalCurrentKw / 199.2) : 1.0);
      const tickWobble = Math.sin((simTickCount || 0) * 0.45) * 140;

      let labels = [];
      let usage = [];
      let prod = [];
      let targetVal = 6500;
      let maxY = 10000;
      let peakIdx = 3;

      if (period === 'day') {
        labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
        usage = [140, 85, 210, 245, Math.round(230 * simFactor + tickWobble * 0.05), 195, 120];
        prod = [0, 0, 1850, 2600, Math.round(2450 * simFactor), 1900, 200];
        targetVal = 200;
        maxY = 300;
        peakIdx = 3;
      } else if (period === 'week') {
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri (Live)', 'Sat', 'Sun'];
        usage = [7450, 7820, 7650, 8100, Math.round(7950 * simFactor + tickWobble), 6800, 2400];
        prod = [11200, 11800, 11500, 12300, Math.round(11900 * simFactor), 9800, 1500];
        targetVal = 8000;
        maxY = 10000;
        peakIdx = 3;
      } else if (period === 'year') {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Live)', 'Nov', 'Dec'];
        usage = [48500, 51200, 53400, 52100, 54200, 53800, 51900, 52800, 54100, Math.round(m.totalPeriodKwh), 51000, 49500];
        prod = [72000, 76000, 79000, 77500, 81000, 80500, 78000, 79500, 82000, Math.round(m.totalPeriodKwh * 1.5), 77000, 74000];
        targetVal = 52000;
        maxY = 65000;
        peakIdx = 4;
      } else {
        // 'month' (default - exact match to Reference Image 2)
        labels = ['Oct 1', 'Oct 5', 'Oct 10', 'Oct 15', 'Oct 20', 'Oct 25', 'Oct 31'];
        const liveVal = Math.round(7850 * simFactor + tickWobble);
        usage = [3100, 4200, 6800, 8240, liveVal, 6900, 5200];
        prod = [4500, 6200, 10100, 12450, Math.round(11800 * simFactor), 10500, 7800];
        targetVal = 6500;
        maxY = 10000;
        peakIdx = 3;
      }

      // Geometry coordinates
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

      // Grid lines
      const steps = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
      let gridSvg = '';
      steps.forEach(s => {
        const yVal = Math.round(maxY * s);
        const yPx = padT + plotH - s * plotH;
        gridSvg += '<line x1="' + padL + '" y1="' + yPx + '" x2="' + (W - padR) + '" y2="' + yPx + '" stroke="' + gridColor + '" stroke-dasharray="3,3" stroke-width="1" />' +
                   '<text x="' + (padL - 8) + '" y="' + (yPx + 3.5) + '" text-anchor="end" font-size="10" fill="' + textColor + '" font-family="system-ui, -apple-system, sans-serif">' + yVal.toLocaleString() + '</text>';
      });

      // X Labels
      let xLabelsSvg = '';
      labels.forEach((lbl, idx) => {
        const x = getX(idx);
        xLabelsSvg += '<text x="' + x + '" y="' + (H - 8) + '" text-anchor="middle" font-size="10" fill="' + textColor + '" font-family="system-ui, -apple-system, sans-serif">' + lbl + '</text>';
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

      return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="w-full h-full" preserveAspectRatio="none">' +
        '<defs>' +
          '<linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#0EA5E9" stop-opacity="0.25"/>' +
            '<stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.01"/>' +
          '</linearGradient>' +
        '</defs>' +
        gridSvg +
        xLabelsSvg +
        '<line x1="' + padL + '" y1="' + targetY + '" x2="' + (W - padR) + '" y2="' + targetY + '" stroke="#059669" stroke-dasharray="4,4" stroke-width="1.8" opacity="0.8" />' +
        '<path d="' + prodLineD + '" fill="none" stroke="#10B981" stroke-width="2.2" opacity="0.85" />' +
        '<path d="' + usageAreaD + '" fill="url(#usageGradient)" />' +
        '<path d="' + usageLineD + '" fill="none" stroke="#0284C7" stroke-width="2.5" />' +
        usagePts.map((p, i) => '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + (i === peakIdx ? 5.5 : 4) + '" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.2" />').join('') +
        '<g transform="translate(' + (usagePts[peakIdx].x - 65) + ', ' + (usagePts[peakIdx].y - 58) + ')">' +
          '<rect width="130" height="48" rx="8" fill="#0F172A" fill-opacity="0.94" stroke="#38BDF8" stroke-width="1" />' +
          '<text x="12" y="16" font-size="10" font-weight="bold" fill="#F8FAFC" font-family="system-ui, sans-serif">' + labels[peakIdx] + '</text>' +
          '<text x="12" y="30" font-size="11" font-weight="extrabold" fill="#38BDF8" font-family="system-ui, sans-serif">' + usage[peakIdx].toLocaleString() + ' kWh</text>' +
          '<text x="12" y="42" font-size="9" fill="#94A3B8" font-family="system-ui, sans-serif">Production: ' + prod[peakIdx].toLocaleString() + ' pcs</text>' +
        '</g>' +
      '</svg>';
    }

    function getDashboardMachineRows(m) {
      const mode = AppState.dashboardMachineFilter || 'top5';
      const simFactor = (m && m.totalCurrentKw ? (m.totalCurrentKw / 199.2) : 1.0);
      const tickOffset = (AppState.simTickCount || 0) * 0.8;

      // Ordered machines matching Reference Image 2: Machine 3, Machine 2, Machine 5, Machine 7, Machine 1
      const top5Configs = [
        { name: 'Machine 3 (Sewing)', baseKwh: 8420, basePct: 16, status: 'high' },
        { name: 'Machine 2 (Sewing)', baseKwh: 7980, basePct: 15, status: 'high' },
        { name: 'Machine 5 (Cutting)', baseKwh: 6320, basePct: 12, status: 'normal' },
        { name: 'Machine 7 (Finishing)', baseKwh: 5960, basePct: 11, status: 'normal' },
        { name: 'Machine 1 (Sewing)', baseKwh: 5420, basePct: 10, status: 'normal' }
      ];

      if (mode === 'top5') {
        return top5Configs.map(item => {
          const liveKwh = Math.round(item.baseKwh * simFactor + tickOffset);
          const livePct = Math.round((liveKwh / (m.totalPeriodKwh || 52300)) * 100);
          const badge = item.status === 'high'
            ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">▲ High</span>'
            : '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Normal</span>';

          return '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer" onclick="navigateTo(\\'machine-monitoring\\')">' +
            '<td class="py-2.5 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">' +
              '<span class="w-1.5 h-1.5 rounded-full ' + (item.status === 'high' ? 'bg-amber-500' : 'bg-emerald-500') + '"></span>' +
              '<span>' + item.name + '</span>' +
            '</td>' +
            '<td class="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">' + liveKwh.toLocaleString() + '</td>' +
            '<td class="py-2.5 text-right font-mono text-slate-600 dark:text-slate-300">' + livePct + '%</td>' +
            '<td class="py-2.5 text-center">' + badge + '</td>' +
          '</tr>';
        }).join('');
      } else {
        // All fleet units
        const sorted = [...AppState.fleet].sort((a, b) => b.periodKwh - a.periodKwh);
        return sorted.map(u => {
          const pct = Math.max(1, Math.round((u.periodKwh / (m.totalPeriodKwh || 52300)) * 100));
          const isHigh = u.currentKw > (u.ratedKw * 0.9) || u.status === 'Fault';
          const badge = u.status === 'Fault'
            ? '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">Fault</span>'
            : isHigh
            ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">▲ High</span>'
            : '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Normal</span>';

          return '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer" onclick="inspectMachineDetail(\\'' + u.id + '\\')">' +
            '<td class="py-2 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 truncate max-w-[150px]">' +
              '<span class="w-1.5 h-1.5 rounded-full ' + (u.status === 'Running' ? 'bg-emerald-500' : 'bg-slate-400') + '"></span>' +
              '<span class="truncate">' + u.name + '</span>' +
            '</td>' +
            '<td class="py-2 text-right font-mono font-bold text-slate-900 dark:text-white">' + u.periodKwh.toLocaleString() + '</td>' +
            '<td class="py-2 text-right font-mono text-slate-600 dark:text-slate-300">' + pct + '%</td>' +
            '<td class="py-2 text-center">' + badge + '</td>' +
          '</tr>';
        }).join('');
      }
    }
`;

if (!html.includes('function generateEnergyChartSvg')) {
  const insertBefore = 'function renderDashboardView(m) {';
  html = html.replace(insertBefore, chartFuncsCode + '\n    ' + insertBefore);
}

// 3. Update stepSimulationForward with dynamic machine availability
const oldSsf = `      AppState.fleet.forEach(u => {
        if (u.status === 'Running') {
          const delta = (prng() - 0.48) * 0.35;
          u.currentKw = Math.max(1.5, Math.min(u.ratedKw * 1.05, Number((u.currentKw + delta).toFixed(2))));
          u.periodKwh = Math.round(u.periodKwh + u.currentKw * 0.05);
          u.tempC = Number((u.tempC + (prng() - 0.49) * 0.25).toFixed(1));

          // Real-time avoided energy & waste simulation
          if (u.id === 'MCH-SEW-03' && AppState.activeScenario === 'night_idle') {
            stepWasteKwh += 1.45; // 38 kW idle leak cost drain
          } else {
            stepAvoidedKwh += u.currentKw * 0.0075; // Continuous verified energy efficiency savings
          }
        }
      });`;

const newSsf = `      AppState.fleet.forEach(u => {
        if (u.status === 'Running') {
          const delta = (prng() - 0.48) * 0.35;
          u.currentKw = Math.max(1.5, Math.min(u.ratedKw * 1.05, Number((u.currentKw + delta).toFixed(2))));
          u.periodKwh = Math.round(u.periodKwh + u.currentKw * 0.05);
          u.tempC = Number((u.tempC + (prng() - 0.49) * 0.25).toFixed(1));

          // Real-time avoided energy & waste simulation
          if (u.id === 'MCH-SEW-03' && AppState.activeScenario === 'night_idle') {
            stepWasteKwh += 1.45; // 38 kW idle leak cost drain
          } else {
            stepAvoidedKwh += u.currentKw * 0.0075; // Continuous verified energy efficiency savings
          }
        }
      });

      // Real-time dynamic Machine Availability ("machine ability") drift
      const availOsc = Math.sin((AppState.simTickCount || 0) * 0.45) * 1.8;
      AppState.fleetAvailabilityRealtime = Number(Math.max(88.0, Math.min(98.8, 94.4 + availOsc)).toFixed(1));`;

html = html.replace(oldSsf, newSsf);

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Helpers and dynamic availability installed successfully.');
