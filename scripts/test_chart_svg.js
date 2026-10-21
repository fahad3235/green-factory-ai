// Test SVG generator for Energy Usage Overview Chart
function generateEnergyUsageChartSvg(period, m, simTickCount, isDark) {
  const textColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.2)';
  const simFactor = (m.totalCurrentKw / 199.2) || 1.0;
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

  // Geometry
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
    gridSvg += `
      <line x1="${padL}" y1="${yPx}" x2="${W - padR}" y2="${yPx}" stroke="${gridColor}" stroke-dasharray="3,3" stroke-width="1" />
      <text x="${padL - 8}" y="${yPx + 3.5}" text-anchor="end" font-size="10" fill="${textColor}" font-family="sans-serif">${yVal.toLocaleString()}</text>
    `;
  });

  // X Labels
  let xLabelsSvg = '';
  labels.forEach((lbl, idx) => {
    const x = getX(idx);
    xLabelsSvg += `
      <text x="${x}" y="${H - 8}" text-anchor="middle" font-size="10" fill="${textColor}" font-family="sans-serif">${lbl}</text>
    `;
  });

  // Helper for smooth bezier curves
  function makePath(points, closeToBottom) {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    if (closeToBottom) {
      d += ` L ${points[points.length - 1].x} ${padT + plotH} L ${points[0].x} ${padT + plotH} Z`;
    }
    return d;
  }

  const usagePts = usage.map((v, i) => ({ x: getX(i), y: getY(v), val: v }));
  const prodScaledPts = prod.map((v, i) => {
    // Production pcs scaled to plot height
    const maxP = Math.max(...prod) * 1.15;
    const y = padT + plotH - (v / maxP) * plotH;
    return { x: getX(i), y, val: v };
  });

  const usageAreaD = makePath(usagePts, true);
  const usageLineD = makePath(usagePts, false);
  const prodLineD = makePath(prodScaledPts, false);
  const targetY = getY(targetVal);

  return {
    svg: `
      <svg viewBox="0 0 ${W} ${H}" class="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0EA5E9" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.01"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines & Y Axis Labels -->
        ${gridSvg}

        <!-- X Axis Labels -->
        ${xLabelsSvg}

        <!-- Target Threshold Line -->
        <line x1="${padL}" y1="${targetY}" x2="${W - padR}" y2="${targetY}" stroke="#10B981" stroke-dasharray="4,4" stroke-width="1.8" opacity="0.85" />

        <!-- Production (pcs) Line -->
        <path d="${prodLineD}" fill="none" stroke="#34D399" stroke-width="2.2" opacity="0.85" />

        <!-- Total Usage Area & Line -->
        <path d="${usageAreaD}" fill="url(#usageGradient)" />
        <path d="${usageLineD}" fill="none" stroke="#0284C7" stroke-width="2.6" />

        <!-- Data Points for Usage -->
        ${usagePts.map((p, i) => `
          <circle cx="${p.x}" cy="${p.y}" r="${i === peakIdx ? 5.5 : 4}" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5" class="transition-all duration-300" />
        `).join('')}

        <!-- Tooltip Callout at Peak/Live Day (matches Reference Image 2) -->
        <g transform="translate(${usagePts[peakIdx].x - 65}, ${usagePts[peakIdx].y - 58})">
          <rect width="130" height="48" rx="8" fill="#0F172A" fill-opacity="0.92" stroke="#38BDF8" stroke-width="1" />
          <text x="12" y="17" font-size="10" font-weight="bold" fill="#F8FAFC" font-family="sans-serif">${labels[peakIdx]}</text>
          <text x="12" y="31" font-size="11" font-weight="extrabold" fill="#38BDF8" font-family="sans-serif">${usage[peakIdx].toLocaleString()} kWh</text>
          <text x="12" y="43" font-size="9" fill="#94A3B8" font-family="sans-serif">Production: ${prod[peakIdx].toLocaleString()} pcs</text>
        </g>
      </svg>
    `
  };
}

const res = generateEnergyUsageChartSvg('month', { totalCurrentKw: 199.2, totalPeriodKwh: 52300 }, 0, false);
console.log('Generated SVG length:', res.svg.length);
console.log('Snippet:', res.svg.substring(0, 300));
