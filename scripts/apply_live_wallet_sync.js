const fs = require('fs');
const path = require('path');

const filePath = path.resolve('preview/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Ensure Unix LF in memory
if (html.includes('\r\n')) {
  html = html.replace(/\r\n/g, '\n');
}

// ============================================================================
// 1. UPDATE 4 METRIC CARDS IN renderCarbonIqReportView
// ============================================================================
const targetCardsOld = `          <!-- 4 Real-Time Carbon Credit Wallet Metric Cards -->
          \${(() => {
            const cc = AppState.carbonCredits;
            const availableValUsd = cc.available * cc.vcmPriceUsd;
            const availableValBdt = availableValUsd * cc.usdToBdtRate;
            const monthlyAbatement = Math.max(0, m.baselineTotalCarbonTons - m.totalCarbonTons);
            return \`
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Card 1: Available Credit Wallet -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>Available Credit Balance</span>
                    <span class="text-emerald-400">\${AppIcons.coin('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-white mt-1.5 tracking-tight">\${formatNum(cc.available, 2)} <span class="text-xs font-bold text-emerald-400">tCO₂e</span></div>
                  <div class="text-[11px] font-mono text-emerald-400 font-bold mt-1">Valuation: $\${formatNum(availableValUsd, 2)} USD (৳ \${formatNum(availableValBdt, 0)} BDT)</div>
                  <div class="text-[10px] text-slate-400 mt-1">Ready for trading or European brand retirement</div>
                </div>

                <!-- Card 2: Global VCM Index Price -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-cyan-500/5 group-hover:bg-cyan-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>VCM Spot Index Price</span>
                    <span class="text-cyan-400">\${AppIcons.trendingUp('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-cyan-300 mt-1.5 tracking-tight">$\${formatNum(cc.vcmPriceUsd, 2)} <span class="text-xs font-bold text-slate-400">/ credit</span></div>
                  <div class="text-[11px] font-mono text-slate-300 font-bold mt-1">৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)} BDT / tCO₂e (CIX / ACX)</div>
                  <div class="text-[10px] text-slate-400 mt-1">Exchange rate: 1 USD = \${cc.usdToBdtRate} BDT</div>
                </div>

                <!-- Card 3: Total Abatement Minted -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>Total Verified Minted</span>
                    <span class="text-teal-400">\${AppIcons.leaf('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-white mt-1.5 tracking-tight">\${formatNum(cc.totalMinted, 2)} <span class="text-xs font-bold text-teal-400">tCO₂e</span></div>
                  <div class="text-[11px] text-teal-300 font-mono mt-1">Telemetry Delta: +\${formatNum(monthlyAbatement, 2)} tCO₂e/mo</div>
                  <div class="text-[10px] text-slate-400 mt-1">All batches ISO 14065 third-party audited</div>
                </div>

                <!-- Card 4: Retired for Fashion Brands -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-violet-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-violet-500/5 group-hover:bg-violet-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>Retired for Apparel Buyers</span>
                    <span class="text-violet-400">\${AppIcons.certificate('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-violet-300 mt-1.5 tracking-tight">\${formatNum(cc.retired, 2)} <span class="text-xs font-bold text-slate-400">tCO₂e</span></div>
                  <div class="text-[11px] font-mono text-emerald-400 mt-1">Realized Cash: ৳ \${formatNum(cc.cumulativeEarningsBdt, 0)} BDT</div>
                  <div class="text-[10px] text-slate-400 mt-1">Beneficiaries: H&amp;M Group, Inditex/Zara, M&amp;S</div>
                </div>
              </div>
            \`;
          })()}`.replace(/\r\n/g, '\n');

const newCardsLiveSynced = `          <!-- 4 Real-Time Carbon Credit Wallet Metric Cards (Live Synced with Simulation) -->
          \${(() => {
            const cc = AppState.carbonCredits;
            const simYield = m.simPotentialCredits || 0;
            const liveAvailableCredits = Number((cc.available + simYield).toFixed(2));
            const liveTotalMinted = Number((cc.totalMinted + simYield).toFixed(2));
            const availableValUsd = liveAvailableCredits * cc.vcmPriceUsd;
            const availableValBdt = availableValUsd * cc.usdToBdtRate;
            const monthlyAbatement = m.simTotalAbatementTons || Math.max(0, m.baselineTotalCarbonTons - m.totalCarbonTons);
            return \`
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Card 1: Available Credit Wallet (Live Synced) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 relative overflow-hidden group shadow-lg">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span class="flex items-center gap-1.5 font-medium">
                      <span>Available Credit Balance</span>
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Live Simulation Synced"></span>
                    </span>
                    <span class="text-emerald-400">\${AppIcons.coin('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-white mt-1.5 tracking-tight flex items-baseline gap-1.5 flex-wrap">
                    <span>\${formatNum(liveAvailableCredits, 2)}</span>
                    <span class="text-xs font-bold text-emerald-400">tCO₂e</span>
                    <span class="text-[10.5px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      (Base: \${formatNum(cc.available, 2)} + Sim: +\${formatNum(simYield, 2)})
                    </span>
                  </div>
                  <div class="text-[11px] font-mono text-emerald-400 font-bold mt-1">Valuation: $\${formatNum(availableValUsd, 2)} USD (৳ \${formatNum(availableValBdt, 0)} BDT)</div>
                  <div class="text-[10px] text-slate-400 mt-1">Ready for trading or European brand retirement • Live simulation synced</div>
                </div>

                <!-- Card 2: Global VCM Index Price -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-cyan-500/5 group-hover:bg-cyan-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>VCM Spot Index Price</span>
                    <span class="text-cyan-400">\${AppIcons.trendingUp('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-cyan-300 mt-1.5 tracking-tight">$\${formatNum(cc.vcmPriceUsd, 2)} <span class="text-xs font-bold text-slate-400">/ credit</span></div>
                  <div class="text-[11px] font-mono text-slate-300 font-bold mt-1">৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)} BDT / tCO₂e (CIX / ACX)</div>
                  <div class="text-[10px] text-slate-400 mt-1">Exchange rate: 1 USD = \${cc.usdToBdtRate} BDT</div>
                </div>

                <!-- Card 3: Total Abatement Minted (Live Synced) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span class="flex items-center gap-1.5 font-medium">
                      <span>Total Verified + Sim Minted</span>
                      <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                    </span>
                    <span class="text-teal-400">\${AppIcons.leaf('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-white mt-1.5 tracking-tight flex items-baseline gap-1.5 flex-wrap">
                    <span>\${formatNum(liveTotalMinted, 2)}</span>
                    <span class="text-xs font-bold text-teal-400">tCO₂e</span>
                    <span class="text-[10px] font-mono text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-500/30">
                      (+\${formatNum(simYield, 2)} Sim)
                    </span>
                  </div>
                  <div class="text-[11px] text-teal-300 font-mono mt-1">Sim Abatement: +\${formatNum(monthlyAbatement, 2)} tCO₂e/mo</div>
                  <div class="text-[10px] text-slate-400 mt-1">Base verified: \${formatNum(cc.totalMinted, 2)} t • Live Sim: +\${formatNum(simYield, 2)} t</div>
                </div>

                <!-- Card 4: Retired for Fashion Brands -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-violet-500/30 relative overflow-hidden group">
                  <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-violet-500/5 group-hover:bg-violet-500/10 transition"></div>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>Retired for Apparel Buyers</span>
                    <span class="text-violet-400">\${AppIcons.certificate('w-4 h-4')}</span>
                  </div>
                  <div class="text-2xl font-black text-violet-300 mt-1.5 tracking-tight">\${formatNum(cc.retired, 2)} <span class="text-xs font-bold text-slate-400">tCO₂e</span></div>
                  <div class="text-[11px] font-mono text-emerald-400 mt-1">Realized Cash: ৳ \${formatNum(cc.cumulativeEarningsBdt, 0)} BDT</div>
                  <div class="text-[10px] text-slate-400 mt-1">Beneficiaries: H&amp;M Group, Inditex/Zara, M&amp;S</div>
                </div>
              </div>
            \`;
          })()}`.replace(/\r\n/g, '\n');

if (html.includes(targetCardsOld)) {
  html = html.replace(targetCardsOld, () => newCardsLiveSynced);
  console.log('✓ Successfully updated 4 metric cards to reflect live simulation credit yield');
} else {
  console.error('Target cards block not found');
}

// ============================================================================
// 2. INSERT DYNAMIC SIMULATION ROW AT TOP OF CRYPTOGRAPHIC LEDGER TABLE
// ============================================================================
const targetTableTbody = `<tbody class="divide-y divide-slate-800/60 font-mono text-[11px]">
                  \${AppState.carbonCredits.ledger.map(item => {`.replace(/\r\n/g, '\n');

const newTableTbodyWithSimRow = `<tbody class="divide-y divide-slate-800/60 font-mono text-[11px]">
                  <!-- Dynamic Active Simulation Batch (Live Synced with Simulation Engine) -->
                  <tr class="bg-emerald-950/40 hover:bg-emerald-950/60 transition border-b border-emerald-500/40">
                    <td class="py-3 px-4 font-bold text-emerald-300 flex items-center gap-2">
                      <span class="text-emerald-400 animate-pulse">\${AppIcons.sparkles('w-3.5 h-3.5')}</span>
                      <span>VCS-BD-2026-SIM-LIVE</span>
                    </td>
                    <td class="py-3 px-3 text-cyan-300 font-bold">2026-Q4 (Live Sim)</td>
                    <td class="py-3 px-4 font-sans text-slate-200">
                      Simulation Interventions (\${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')} • Tick #\${AppState.simTickCount})
                    </td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-300">+\${formatNum(m.simPotentialCredits, 2)} tCO₂e</td>
                    <td class="py-3 px-3">
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-sans bg-emerald-900/90 text-emerald-200 border border-emerald-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>Simulated</span>
                      </span>
                    </td>
                    <td class="py-3 px-4 font-sans text-emerald-300/80 text-[11px]">
                      <span class="italic font-medium">Available in Live Wallet</span>
                      <div class="text-[9.5px] text-slate-400 font-mono">Value: +$\${formatNum(m.simRevenueUsd, 2)} USD (৳ \${formatNum(m.simRevenueBdt, 0)} BDT)</div>
                    </td>
                    <td class="py-3 px-4 text-center font-sans">
                      <button type="button" onclick="mintSimulatedCarbonCredits()" class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-[10.5px] font-black transition flex items-center gap-1 mx-auto shadow-sm">
                        <span>\${AppIcons.coin('w-3 h-3')}</span>
                        <span>Mint Now</span>
                      </button>
                    </td>
                  </tr>
                  \${AppState.carbonCredits.ledger.map(item => {`.replace(/\r\n/g, '\n');

if (!html.includes('VCS-BD-2026-SIM-LIVE')) {
  if (html.includes(targetTableTbody)) {
    html = html.replace(targetTableTbody, () => newTableTbodyWithSimRow);
    console.log('✓ Added dynamic live simulation batch row to Cryptographic Carbon Ledger table');
  } else {
    console.error('Target table tbody not found');
  }
}

// ============================================================================
// 3. UPDATE openTradeCarbonCreditsModal() TO TRADE LIVE BALANCE
// ============================================================================
const targetTradeModalStart = `function openTradeCarbonCreditsModal() {
      const cc = AppState.carbonCredits;
      if (cc.available <= 0) {
        showToast('No active carbon credits available for trading.', 'warning');
        return;
      }`;

const newTradeModalStart = `function openTradeCarbonCreditsModal() {
      const cc = AppState.carbonCredits;
      const m = getDerivedMetrics();
      const liveAvailable = Number((cc.available + (m.simPotentialCredits || 0)).toFixed(2));
      if (liveAvailable <= 0) {
        showToast('No active carbon credits available for trading.', 'warning');
        return;
      }`;

if (html.includes(targetTradeModalStart)) {
  html = html.replace(targetTradeModalStart, () => newTradeModalStart);
  console.log('✓ Updated openTradeCarbonCreditsModal() to check liveAvailable');
}

const targetTradeQtyInput = `input type="number" id="trade-credits-qty-input" min="1" max="\${cc.available}" value="\${Math.min(10, Math.floor(cc.available))}"`;
const newTradeQtyInput = `input type="number" id="trade-credits-qty-input" min="1" max="\${liveAvailable}" value="\${Math.min(10, Math.floor(liveAvailable))}"`;
if (html.includes(targetTradeQtyInput)) {
  html = html.replace(targetTradeQtyInput, () => newTradeQtyInput);
  console.log('✓ Updated trade quantity input to use liveAvailable');
}

const targetTradeAvailableText = `Available to trade: <strong>\${cc.available.toFixed(2)} tCO₂e</strong> in your factory wallet.`;
const newTradeAvailableText = `Available to trade: <strong>\${liveAvailable.toFixed(2)} tCO₂e</strong> in your factory wallet (Base: \${cc.available.toFixed(2)} t + Sim: \${(m.simPotentialCredits || 0).toFixed(2)} t).`;
if (html.includes(targetTradeAvailableText)) {
  html = html.replace(targetTradeAvailableText, () => newTradeAvailableText);
  console.log('✓ Updated trade available text to show liveAvailable and base/sim breakdown');
}

// ============================================================================
// 4. UPDATE openRetireCarbonCreditModal() TO INCLUDE SIMULATION OPTION
// ============================================================================
const targetRetireActiveItems = `const activeItems = AppState.carbonCredits.ledger.filter(item => item.status === 'Active');`;
const newRetireActiveItems = `const m = getDerivedMetrics();
      const simYield = m.simPotentialCredits || 0;
      const activeItems = AppState.carbonCredits.ledger.filter(item => item.status === 'Active');
      if (simYield > 0 && !activeItems.some(it => it.serial === 'VCS-BD-2026-SIM-LIVE')) {
        activeItems.unshift({
          serial: 'VCS-BD-2026-SIM-LIVE',
          vintage: '2026-Q4',
          source: \`Active Simulation: \${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')}\`,
          amountTons: simYield,
          status: 'Active'
        });
      }`;

if (!html.includes('if (simYield > 0 && !activeItems.some(it => it.serial === \'VCS-BD-2026-SIM-LIVE\'))')) {
  if (html.includes(targetRetireActiveItems)) {
    html = html.replace(targetRetireActiveItems, () => newRetireActiveItems);
    console.log('✓ Updated openRetireCarbonCreditModal() to include live simulation batch');
  }
}

// Write back to preview/index.html
fs.writeFileSync(filePath, html, 'utf8');
console.log('✓ Successfully written preview/index.html with Live Synced Wallet Part!');
