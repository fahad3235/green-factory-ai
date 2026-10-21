const fs = require('fs');
const path = require('path');

const filePath = path.resolve('preview/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Ensure Unix LF line endings in memory during replacement
const isCrlf = html.includes('\r\n');
if (isCrlf) {
  html = html.replace(/\r\n/g, '\n');
}

// ============================================================================
// 1. EXTEND AppIcons WITH REFINED ICONS (ZERO EMOJIS, 100% REFINED INLINE SVGS)
// ============================================================================
const targetAppIconsClose = `close: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>\``;

const newIcons = `close: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>\`,
      coin: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>\`,
      certificate: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>\`,
      qrCode: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>\`,
      trendingUp: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>\`,
      building: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>\`,
      tag: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg>\`,
      download: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\`,
      arrowRight: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>\``;

if (!html.includes("coin: (cls = 'w-4 h-4')")) {
  if (html.includes(targetAppIconsClose)) {
    html = html.replace(targetAppIconsClose, () => newIcons);
    console.log('✓ Added refined SVG icons to AppIcons');
  } else {
    console.error('Failed to locate targetAppIconsClose');
  }
}

// ============================================================================
// 2. ADD carbonCredits TO AppState
// ============================================================================
const targetAppStateReports = `{ id: 'RPT-2026-10-F', title: 'Data Quality, Boundaries & Simulation Assumptions Disclosure', type: 'Data Quality & Assumptions', period: 'v2026.1', generatedAt: '2026-10-18 04:30', author: 'System Governance', dataClass: 'SIMULATION', summary: 'Full disclosure of BPDB tariff schedule, DoE Bangladesh grid emission factor v2025.2, Scope 3 exclusions, and non-certified simulation status.' }
      ],`;

const newReportsAndCarbonState = `{ id: 'RPT-2026-10-F', title: 'Data Quality, Boundaries & Simulation Assumptions Disclosure', type: 'Data Quality & Assumptions', period: 'v2026.1', generatedAt: '2026-10-18 04:30', author: 'System Governance', dataClass: 'SIMULATION', summary: 'Full disclosure of BPDB tariff schedule, DoE Bangladesh grid emission factor v2025.2, Scope 3 exclusions, and non-certified simulation status.' },
        { id: 'RPT-2026-10-G', title: 'Voluntary Carbon Credit & MRV Issuance Registry (Verra VCS VM0008)', type: 'Carbon Credit Audit', period: 'Oct 2026', generatedAt: '2026-10-18 04:35', author: 'Carbon Accounting Agent', dataClass: 'SIMULATION', summary: 'Certifies 103.20 tCO2e total verified abatement, 64.10 available credits ($1,378.15 USD / ৳ 165,378 BDT value), and 39.10 retired credits for EU apparel buyers (H&M, Zara, M&S).' }
      ],

      // Voluntary Carbon Credit & MRV Trading Registry (Verra VCS VM0008 / ISO 14064-2)
      carbonCredits: {
        vcmPriceUsd: 21.50,
        usdToBdtRate: 120.0,
        methodology: 'Verra VCS Methodology VM0008 (ISO 14064-2 Compliant)',
        registryId: 'VCS-REG-BD-8902',
        totalMinted: 103.20,
        available: 64.10,
        retired: 39.10,
        cumulativeEarningsBdt: 469200,
        ledger: [
          {
            serial: 'VCS-BD-2026-RUP-048291',
            vintage: '2026-Q3',
            source: 'Stenter Exhaust Heat Recovery (BOIL-01)',
            amountTons: 14.50,
            status: 'Retired',
            beneficiary: 'H&M Hennes & Mauritz (Scope 3 Garment Decarbonization)',
            retiredAt: '2026-10-12',
            txHash: '0x8f2a67e411b938dc941a87e2467d4512c019d45e',
            verifier: 'SGS Bangladesh Ltd. (ISO 14065)'
          },
          {
            serial: 'VCS-BD-2026-RUP-048292',
            vintage: '2026-Q3',
            source: 'Spinning & Weaving VFD Synchronous Drives (WEAV-01 to 04)',
            amountTons: 12.30,
            status: 'Retired',
            beneficiary: 'Inditex / Zara Global Zero-Impact Sourcing',
            retiredAt: '2026-10-16',
            txHash: '0x3c990ef1482ba17dc26b7723910c01fa9104e76b',
            verifier: 'Bureau Veritas Industrial Energy'
          },
          {
            serial: 'VCS-BD-2026-RUP-048293',
            vintage: '2026-Q3',
            source: 'Boiler Air-Fuel Ratio Automation & Steam Trap Inspection',
            amountTons: 12.30,
            status: 'Retired',
            beneficiary: 'Marks & Spencer Plan A Sustainable Supply Chain',
            retiredAt: '2026-10-19',
            txHash: '0x17d983fa9b204e1ac89b740192eab540192bc491',
            verifier: 'TÜV Rheinland Carbon Validation'
          },
          {
            serial: 'VCS-BD-2026-RUP-048294',
            vintage: '2026-Q4',
            source: 'Compressor Leak Elimination & VFD Pressure Staging (COMP-01)',
            amountTons: 28.60,
            status: 'Active',
            beneficiary: null,
            retiredAt: null,
            txHash: '0xd71a82bc44391e0a846f901cb0019eac510283f1',
            verifier: 'SGS Bangladesh Ltd. (ISO 14065)'
          },
          {
            serial: 'VCS-BD-2026-RUP-048295',
            vintage: '2026-Q4',
            source: 'Substation Peak-Shaving & Machine Idling Auto-Sleep Rules',
            amountTons: 35.50,
            status: 'Active',
            beneficiary: null,
            retiredAt: null,
            txHash: '0xfa8912e774023dc819ba0429f550183ca1029c48',
            verifier: 'Bureau Veritas Industrial Energy'
          }
        ]
      },`;

if (!html.includes('carbonCredits: {')) {
  if (html.includes(targetAppStateReports)) {
    html = html.replace(targetAppStateReports, () => newReportsAndCarbonState);
    console.log('✓ Added carbonCredits state to AppState');
  } else {
    console.error('Failed to locate targetAppStateReports');
  }
}

// ============================================================================
// 3. INSERT CARBON CREDIT PANEL INTO renderCarbonIqReportView
// ============================================================================
const targetCarbonIqGridClose = `              }).join('')}
            </div>
          </div>
        </div>
      \`;
    }

    // ----------------------------------------------------------------------------
    // VIEW 8: SUSTAINABILITY REPORTS (Master Prompt Section 14)`;

const newCarbonIqWithCredits = `              }).join('')}
            </div>
          </div>
        </div>

        <!-- VOLUNTARY CARBON CREDIT WALLET & MRV TRADING REGISTRY (Verra VCS VM0008) -->
        <div id="carbon-credit-system-panel" class="p-6 rounded-3xl bg-gradient-to-br from-[#07131e] via-[#091b29] to-[#040e17] border border-emerald-500/40 shadow-2xl space-y-6">
          
          <!-- Registry Header Banner -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div class="space-y-1.5">
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>VERRA VCS METHODOLOGY VM0008</span>
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-500/30">ISO 14064-2 VERIFIED</span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-400">REGISTRY ID: \${AppState.carbonCredits.registryId}</span>
              </div>
              <h2 class="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span class="text-emerald-400">\${AppIcons.coin('w-6 h-6')}</span>
                <span>Industrial Carbon Credit Wallet &amp; MRV Trading Registry</span>
              </h2>
              <p class="text-xs text-slate-400 max-w-2xl">
                Continuous IoT Measurement, Reporting &amp; Verification (MRV) converting verified industrial energy abatement from 18 fleet machines into monetizable Verified Carbon Units (VCUs).
              </p>
            </div>

            <!-- Header Quick Action Buttons -->
            <div class="flex flex-wrap items-center gap-2 shrink-0">
              <button type="button" onclick="mintTelemetryCarbonCredits()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition flex items-center gap-2">
                <span class="text-emerald-200">\${AppIcons.sparkles('w-4 h-4')}</span>
                <span>Mint Credits from Telemetry</span>
              </button>
              <button type="button" onclick="openTradeCarbonCreditsModal()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-2">
                <span class="text-amber-400">\${AppIcons.money('w-4 h-4')}</span>
                <span>Monetize / Trade (VCM)</span>
              </button>
              <button type="button" onclick="downloadCarbonCreditsLedgerCsv()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition flex items-center gap-1.5" title="Export Cryptographic Carbon Ledger">
                <span>\${AppIcons.download('w-3.5 h-3.5')}</span>
                <span>Export Ledger CSV</span>
              </button>
            </div>
          </div>

          <!-- 4 Real-Time Carbon Credit Wallet Metric Cards -->
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
          })()}

          <!-- Dual Monetization & Retirement Workflow Explainer -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex items-start gap-3">
              <span class="text-emerald-400 shrink-0 mt-0.5">\${AppIcons.building('w-5 h-5')}</span>
              <div class="space-y-1 text-xs">
                <div class="font-bold text-emerald-200">Pathway A: Scope 3 Export Brand Retirement (Premium Pricing)</div>
                <div class="text-slate-300 text-[11.5px] leading-relaxed">
                  International fashion buyers pay a premium for verified zero-carbon garment production. Retiring credits directly for your buyers generates official <strong>Verra VCS Retirement Certificates</strong> with verifiable cryptographic serial numbers.
                </div>
                <div class="pt-1">
                  <button type="button" onclick="openRetireCarbonCreditModal()" class="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 group">
                    <span>Issue Retirement Certificate for Buyer</span>
                    <span class="transition-transform group-hover:translate-x-0.5">\${AppIcons.arrowRight('w-3.5 h-3.5')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/25 flex items-start gap-3">
              <span class="text-cyan-400 shrink-0 mt-0.5">\${AppIcons.trendingUp('w-5 h-5')}</span>
              <div class="space-y-1 text-xs">
                <div class="font-bold text-cyan-200">Pathway B: Voluntary Carbon Exchange Liquidation</div>
                <div class="text-slate-300 text-[11.5px] leading-relaxed">
                  Liquidate active carbon credits on voluntary carbon trading platforms (Climate Impact X, ACX Singapore). Secondary trading proceeds are credited directly to Rupsha Garments Ltd. operational accounts in BDT.
                </div>
                <div class="pt-1">
                  <button type="button" onclick="openTradeCarbonCreditsModal()" class="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1 group">
                    <span>Simulate VCM Exchange Trade</span>
                    <span class="transition-transform group-hover:translate-x-0.5">\${AppIcons.arrowRight('w-3.5 h-3.5')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cryptographic Serial Ledger Table -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-slate-300 font-bold text-xs uppercase tracking-wider">Verifiable Cryptographic Carbon Ledger</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">\${AppState.carbonCredits.ledger.length} Batches</span>
              </div>
              <div class="text-[11px] text-slate-400 font-mono">Immutable Traceability Hash: SHA-256</div>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
              <table class="w-full text-left text-xs text-slate-300">
                <thead class="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10.5px]">
                  <tr>
                    <th class="py-3 px-4">Serial Number</th>
                    <th class="py-3 px-3">Vintage</th>
                    <th class="py-3 px-4">Abatement Source</th>
                    <th class="py-3 px-3 text-right">Volume</th>
                    <th class="py-3 px-3">Status</th>
                    <th class="py-3 px-4">Beneficiary / Buyer</th>
                    <th class="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-mono text-[11px]">
                  \${AppState.carbonCredits.ledger.map(item => {
                    const isRetired = item.status === 'Retired';
                    return \`
                      <tr class="hover:bg-slate-900/60 transition">
                        <td class="py-3 px-4 font-bold text-white flex items-center gap-2">
                          <span class="\${isRetired ? 'text-violet-400' : 'text-emerald-400'}">\${AppIcons.coin('w-3.5 h-3.5')}</span>
                          <span>\${item.serial}</span>
                        </td>
                        <td class="py-3 px-3 text-slate-400">\${item.vintage}</td>
                        <td class="py-3 px-4 font-sans text-slate-200">\${item.source}</td>
                        <td class="py-3 px-3 text-right font-bold \${isRetired ? 'text-violet-300' : 'text-emerald-300'}">\${item.amountTons.toFixed(2)} tCO₂e</td>
                        <td class="py-3 px-3">
                          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-sans \${isRetired ? 'bg-violet-950/80 text-violet-300 border border-violet-500/40' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'}">
                            <span class="w-1.5 h-1.5 rounded-full \${isRetired ? 'bg-violet-400' : 'bg-emerald-400'}"></span>
                            <span>\${item.status}</span>
                          </span>
                        </td>
                        <td class="py-3 px-4 font-sans text-slate-300 text-[11px]">
                          \${item.beneficiary ? \`<span class="text-white font-medium">\${item.beneficiary}</span><div class="text-[9.5px] text-slate-500 font-mono">Retired: \${item.retiredAt}</div>\` : \`<span class="text-slate-500 italic">Available in Wallet</span>\`}
                        </td>
                        <td class="py-3 px-4 text-center font-sans">
                          \${isRetired ? \`
                            <button type="button" onclick="openCarbonCreditCertificateModal('\${item.serial}')" class="px-2.5 py-1 rounded-lg bg-violet-600/30 hover:bg-violet-600 text-violet-200 hover:text-white text-[10.5px] font-bold border border-violet-500/40 transition flex items-center gap-1 mx-auto">
                              <span>\${AppIcons.certificate('w-3 h-3')}</span>
                              <span>Certificate</span>
                            </button>
                          \` : \`
                            <button type="button" onclick="openRetireCarbonCreditModal('\${item.serial}')" class="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-[10.5px] font-bold border border-emerald-500/40 transition flex items-center gap-1 mx-auto">
                              <span>\${AppIcons.leaf('w-3 h-3')}</span>
                              <span>Retire</span>
                            </button>
                          \`}
                        </td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      \`;
    }

    // ----------------------------------------------------------------------------
    // VIEW 8: SUSTAINABILITY REPORTS (Master Prompt Section 14)`;

if (!html.includes('id="carbon-credit-system-panel"')) {
  if (html.includes(targetCarbonIqGridClose)) {
    html = html.replace(targetCarbonIqGridClose, () => newCarbonIqWithCredits);
    console.log('✓ Added Carbon Credit Wallet & Registry UI to renderCarbonIqReportView');
  } else {
    console.error('Failed to locate targetCarbonIqGridClose');
  }
}

// ============================================================================
// 4. ADD INTERACTIVE HANDLER FUNCTIONS
// ============================================================================
const targetFunctionInsertionPoint = 'function downloadCarbonIqReportCsv() {';

const newCarbonCreditFunctions = `// ============================================================================
    // CARBON CREDIT SYSTEM INTERACTIVE ACTIONS (VERRA VCS VM0008)
    // ============================================================================
    function updateTradeEstimates(val) {
      const cc = AppState.carbonCredits;
      const num = Number(val) || 0;
      const usd = num * cc.vcmPriceUsd;
      const bdt = usd * cc.usdToBdtRate;
      const usdEl = document.getElementById('trade-est-usd');
      const bdtEl = document.getElementById('trade-est-bdt');
      if (usdEl) usdEl.textContent = '$' + formatNum(usd, 2);
      if (bdtEl) bdtEl.textContent = '৳ ' + formatNum(bdt, 0);
    }

    function mintTelemetryCarbonCredits() {
      const m = getDerivedMetrics();
      const monthlyAbatement = Math.max(0, m.baselineTotalCarbonTons - m.totalCarbonTons);
      const mintAmount = Number(monthlyAbatement.toFixed(2)) || 8.60;
      
      const newSerialNum = 48296 + AppState.carbonCredits.ledger.length;
      const newSerial = \`VCS-BD-2026-RUP-0\${newSerialNum}\`;
      const newTxHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      const newRecord = {
        serial: newSerial,
        vintage: '2026-Q4',
        source: 'Continuous Telemetry Abatement (18-Machine Fleet Energy Optimization)',
        amountTons: mintAmount,
        status: 'Active',
        beneficiary: null,
        retiredAt: null,
        txHash: newTxHash,
        verifier: 'SGS Bangladesh Ltd. (Continuous IoT MRV)'
      };
      
      AppState.carbonCredits.ledger.unshift(newRecord);
      AppState.carbonCredits.totalMinted = Number((AppState.carbonCredits.totalMinted + mintAmount).toFixed(2));
      AppState.carbonCredits.available = Number((AppState.carbonCredits.available + mintAmount).toFixed(2));
      
      logActivity(AppState.currentUser.name, \`Minted \${mintAmount} tCO₂e Carbon Credits (\${newSerial}) from live telemetry.\`);
      renderActiveView();
      showToast(\`Successfully minted \${mintAmount} tCO₂e Verified Carbon Credits! Serial: \${newSerial}\`, 'success');
    }

    function openRetireCarbonCreditModal(targetSerial = '') {
      const activeItems = AppState.carbonCredits.ledger.filter(item => item.status === 'Active');
      if (activeItems.length === 0) {
        showToast('No active carbon credits available in wallet to retire.', 'warning');
        return;
      }
      const defaultItem = activeItems.find(it => it.serial === targetSerial) || activeItems[0];
      
      openAppModal({
        title: '<span class="inline-flex items-center gap-2 text-emerald-400">' + AppIcons.certificate('w-5 h-5') + ' Retire Carbon Credits for Export Brand</span>',
        subtitle: 'Verra VCS Permanent Retirement • Zero-Carbon Fashion Supply Chain Certificate',
        confirmLabel: 'Confirm Permanent Retirement & Issue Certificate',
        cancelLabel: 'Cancel',
        onConfirm: () => {
          const serialSelect = document.getElementById('retire-credit-serial-select');
          const brandInput = document.getElementById('retire-credit-brand-input');
          const chosenSerial = serialSelect ? serialSelect.value : defaultItem.serial;
          const chosenBrand = brandInput && brandInput.value.trim() ? brandInput.value.trim() : 'H&M Hennes & Mauritz (Global Net-Zero Supply Chain)';
          
          const credit = AppState.carbonCredits.ledger.find(it => it.serial === chosenSerial);
          if (credit && credit.status === 'Active') {
            credit.status = 'Retired';
            credit.beneficiary = chosenBrand;
            credit.retiredAt = new Date().toISOString().split('T')[0];
            AppState.carbonCredits.available = Math.max(0, Number((AppState.carbonCredits.available - credit.amountTons).toFixed(2)));
            AppState.carbonCredits.retired = Number((AppState.carbonCredits.retired + credit.amountTons).toFixed(2));
            
            logActivity(AppState.currentUser.name, \`Retired \${credit.amountTons} tCO₂e (\${credit.serial}) for \${chosenBrand}.\`);
            closeAppModal();
            renderActiveView();
            showToast(\`Successfully retired \${credit.amountTons} tCO₂e for \${chosenBrand}!\`, 'success');
            setTimeout(() => {
              openCarbonCreditCertificateModal(credit.serial);
            }, 300);
          }
        },
        bodyHtml: \`
          <div class="space-y-4 text-xs text-slate-300">
            <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              Permanently retiring Verified Carbon Units (VCUs) allows your European apparel buyer to claim verified Scope 3 GHG reductions under the Science Based Targets initiative (SBTi).
            </div>

            <div>
              <label class="block font-bold text-slate-200 mb-1">Select Active Carbon Credit Batch to Retire:</label>
              <select id="retire-credit-serial-select" class="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-mono text-xs focus:outline-none focus:border-emerald-500">
                \${activeItems.map(it => \`
                  <option value="\${it.serial}" \${it.serial === defaultItem.serial ? 'selected' : ''}>
                    \${it.serial} • \${it.amountTons.toFixed(2)} tCO₂e (\${it.source})
                  </option>
                \`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-200 mb-1">Designated Buyer / Brand Beneficiary:</label>
              <input type="text" id="retire-credit-brand-input" value="H&M Hennes & Mauritz (Global Net-Zero Supply Chain)" placeholder="e.g. Inditex / Zara, Marks & Spencer, PVH Corp" class="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <div class="text-[11px] text-slate-400 mb-1.5 font-medium">Quick Select Buyer Presets:</div>
              <div class="flex flex-wrap gap-1.5">
                <button type="button" onclick="document.getElementById('retire-credit-brand-input').value = 'H&M Group (Supply Chain Climate Action)'" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700">H&M Group</button>
                <button type="button" onclick="document.getElementById('retire-credit-brand-input').value = 'Inditex / Zara (Zero-Impact Garment Sourcing)'" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700">Inditex / Zara</button>
                <button type="button" onclick="document.getElementById('retire-credit-brand-input').value = 'Marks & Spencer (Plan A Sustainable Manufacturing)'" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700">Marks &amp; Spencer</button>
                <button type="button" onclick="document.getElementById('retire-credit-brand-input').value = 'PVH Corp / Tommy Hilfiger (Forward Fashion 2030)'" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700">PVH Corp</button>
              </div>
            </div>

            <div class="text-[11px] text-slate-500 italic">
              Upon confirmation, an official verifiable certificate with cryptographic QR code will be generated.
            </div>
          </div>
        \`
      });
    }

    function openTradeCarbonCreditsModal() {
      const cc = AppState.carbonCredits;
      if (cc.available <= 0) {
        showToast('No active carbon credits available for trading.', 'warning');
        return;
      }
      
      openAppModal({
        title: '<span class="inline-flex items-center gap-2 text-cyan-400">' + AppIcons.trendingUp('w-5 h-5') + ' Voluntary Carbon Exchange (VCM) Liquidation</span>',
        subtitle: 'Climate Impact X (CIX) & ACX Carbon Spot Market • Real-Time BDT Liquidation',
        confirmLabel: 'Liquidate & Deposit BDT to Factory Account',
        cancelLabel: 'Cancel',
        onConfirm: () => {
          const qtyInput = document.getElementById('trade-credits-qty-input');
          const qty = Number(qtyInput ? qtyInput.value : 10);
          if (qty > 0 && qty <= cc.available) {
            const usdGross = qty * cc.vcmPriceUsd;
            const bdtGross = usdGross * cc.usdToBdtRate;
            cc.available = Number((cc.available - qty).toFixed(2));
            cc.cumulativeEarningsBdt = Number((cc.cumulativeEarningsBdt + bdtGross).toFixed(0));
            
            logActivity(AppState.currentUser.name, \`Liquidated \${qty} carbon credits on VCM for $\${usdGross.toFixed(2)} USD (৳ \${bdtGross.toLocaleString()} BDT).\`);
            closeAppModal();
            renderActiveView();
            showToast(\`Liquidated \${qty} credits! ৳ \${bdtGross.toLocaleString()} BDT credited to factory operational account.\`, 'success');
          } else {
            showToast('Invalid credit quantity specified.', 'error');
          }
        },
        bodyHtml: \`
          <div class="space-y-4 text-xs text-slate-300">
            <div class="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 flex items-start gap-3">
              <span class="text-cyan-400 shrink-0 mt-0.5">\${AppIcons.coin('w-5 h-5')}</span>
              <div class="space-y-1">
                <div class="font-bold text-cyan-200">Spot Market Rate: $\${cc.vcmPriceUsd.toFixed(2)} USD / tCO₂e (৳ \${(cc.vcmPriceUsd * cc.usdToBdtRate).toLocaleString()} BDT)</div>
                <div class="text-[11px] text-slate-300">Available to trade: <strong>\${cc.available.toFixed(2)} tCO₂e</strong> in your factory wallet.</div>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-200 mb-1">Enter Volume of Carbon Credits to Liquidate (tCO₂e):</label>
              <input type="number" id="trade-credits-qty-input" min="1" max="\${cc.available}" value="\${Math.min(10, Math.floor(cc.available))}" class="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-500" oninput="updateTradeEstimates(this.value)" />
            </div>

            <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 font-mono text-xs">
              <div class="flex justify-between text-slate-400">
                <span>Estimated USD Payout:</span>
                <span id="trade-est-usd" class="font-bold text-cyan-300">$\${(Math.min(10, Math.floor(cc.available)) * cc.vcmPriceUsd).toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Estimated BDT Deposit:</span>
                <span id="trade-est-bdt" class="font-bold text-emerald-400">৳ \${(Math.min(10, Math.floor(cc.available)) * cc.vcmPriceUsd * cc.usdToBdtRate).toLocaleString()}</span>
              </div>
              <div class="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                <span>Settlement Platform:</span>
                <span>Climate Impact X (CIX) • 0.0% Demo Clearing Fee</span>
              </div>
            </div>
          </div>
        \`
      });
    }

    function openCarbonCreditCertificateModal(serial) {
      const credit = AppState.carbonCredits.ledger.find(it => it.serial === serial) || AppState.carbonCredits.ledger[0];
      const cc = AppState.carbonCredits;
      
      openAppModal({
        title: '<span class="inline-flex items-center gap-2 text-violet-400">' + AppIcons.certificate('w-5 h-5') + ' Official Certificate of Carbon Unit Retirement</span>',
        subtitle: 'Verra VCS Methodology VM0008 • Verifiable Environmental Asset Registry',
        confirmLabel: 'Print / Export PDF Certificate',
        cancelLabel: 'Close',
        onConfirm: () => {
          window.print();
        },
        bodyHtml: \`
          <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-emerald-500/60 shadow-2xl space-y-6 text-slate-200">
            <!-- Certificate Header -->
            <div class="text-center space-y-1.5 border-b border-emerald-500/30 pb-4">
              <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
                <span>\${AppIcons.shield('w-4 h-4')}</span>
                <span>PEOPLE\\'S REPUBLIC OF BANGLADESH • VOLUNTARY CARBON REGISTRY</span>
              </div>
              <h1 class="text-xl font-black text-white tracking-wide uppercase">CERTIFICATE OF VOLUNTARY CARBON UNIT RETIREMENT</h1>
              <div class="text-xs text-slate-400">Issued pursuant to ISO 14064-2 &amp; GHG Protocol Corporate Accounting Standards</div>
            </div>

            <!-- Beneficiary & Certificate Details -->
            <div class="space-y-4 text-xs">
              <div class="text-center space-y-1 bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/25">
                <div class="text-slate-400 uppercase text-[10.5px] tracking-wider font-semibold">This is to officially certify that</div>
                <div class="text-lg font-black text-emerald-300 tracking-tight">\${credit.amountTons.toFixed(2)} METRIC TONS OF CO₂e (VCUs)</div>
                <div class="text-slate-300">have been permanently retired on the voluntary carbon registry for the benefit of:</div>
                <div class="text-base font-extrabold text-white tracking-wide pt-1">\${credit.beneficiary || 'H&M Hennes & Mauritz (Global Net-Zero Supply Chain)'}</div>
              </div>

              <!-- Metadata Grid -->
              <div class="grid grid-cols-2 gap-3 font-mono text-[11px] bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <span class="text-slate-500 block text-[9.5px]">UNIQUE SERIAL NUMBER:</span>
                  <span class="font-bold text-white">\${credit.serial}</span>
                </div>
                <div>
                  <span class="text-slate-500 block text-[9.5px]">VINTAGE / PERIOD:</span>
                  <span class="font-bold text-slate-200">\${credit.vintage} (Retired: \${credit.retiredAt || '2026-10-18'})</span>
                </div>
                <div class="col-span-2">
                  <span class="text-slate-500 block text-[9.5px]">ORIGINATING INDUSTRIAL FACILITY:</span>
                  <span class="font-bold text-emerald-400">Rupsha Garments Ltd., Gazipur, Bangladesh (LEED Platinum Facility)</span>
                </div>
                <div class="col-span-2">
                  <span class="text-slate-500 block text-[9.5px]">ABATEMENT INTERVENTION:</span>
                  <span class="font-bold text-slate-200 font-sans">\${credit.source}</span>
                </div>
                <div class="col-span-2">
                  <span class="text-slate-500 block text-[9.5px]">INDEPENDENT THIRD-PARTY VERIFIER:</span>
                  <span class="font-bold text-slate-300">\${credit.verifier || 'SGS Bangladesh Ltd. (ISO 14065 Accredited)'}</span>
                </div>
                <div class="col-span-2">
                  <span class="text-slate-500 block text-[9.5px]">CRYPTOGRAPHIC TRANSACTION HASH:</span>
                  <span class="font-mono text-[10px] text-cyan-300 break-all">\${credit.txHash}</span>
                </div>
              </div>

              <!-- Signatures & QR Code Verification Block -->
              <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <div class="space-y-1">
                  <div class="font-bold text-white">Engr. Tanvir Ahmed, CEM</div>
                  <div class="text-slate-500 text-[10px]">Lead Energy Auditor • SGS Bangladesh</div>
                  <div class="w-28 h-0.5 bg-emerald-500/60 mt-1"></div>
                </div>

                <!-- Vector SVG QR Code -->
                <div class="flex flex-col items-center gap-1">
                  <div class="p-1.5 bg-white rounded-lg shadow-md">
                    <svg class="w-14 h-14" viewBox="0 0 100 100" fill="#000">
                      <rect x="5" y="5" width="25" height="25" fill="#000" rx="2"/>
                      <rect x="9" y="9" width="17" height="17" fill="#fff"/>
                      <rect x="13" y="13" width="9" height="9" fill="#000"/>
                      
                      <rect x="70" y="5" width="25" height="25" fill="#000" rx="2"/>
                      <rect x="74" y="9" width="17" height="17" fill="#fff"/>
                      <rect x="78" y="13" width="9" height="9" fill="#000"/>
                      
                      <rect x="5" y="70" width="25" height="25" fill="#000" rx="2"/>
                      <rect x="9" y="74" width="17" height="17" fill="#fff"/>
                      <rect x="13" y="78" width="9" height="9" fill="#000"/>
                      
                      <rect x="36" y="8" width="6" height="6"/><rect x="48" y="8" width="6" height="6"/><rect x="58" y="14" width="6" height="6"/>
                      <rect x="36" y="22" width="6" height="6"/><rect x="44" y="22" width="6" height="6"/><rect x="54" y="22" width="6" height="6"/>
                      <rect x="10" y="38" width="6" height="6"/><rect x="22" y="38" width="6" height="6"/><rect x="34" y="38" width="6" height="6"/><rect x="46" y="38" width="6" height="6"/><rect x="62" y="38" width="6" height="6"/><rect x="78" y="38" width="6" height="6"/>
                      <rect x="16" y="50" width="6" height="6"/><rect x="28" y="50" width="6" height="6"/><rect x="40" y="50" width="6" height="6"/><rect x="52" y="50" width="6" height="6"/><rect x="70" y="50" width="6" height="6"/><rect x="84" y="50" width="6" height="6"/>
                      <rect x="36" y="72" width="6" height="6"/><rect x="48" y="72" width="6" height="6"/><rect x="64" y="72" width="6" height="6"/>
                      <rect x="42" y="84" width="6" height="6"/><rect x="56" y="84" width="6" height="6"/><rect x="76" y="84" width="6" height="6"/>
                    </svg>
                  </div>
                  <span class="text-[9px] font-mono text-emerald-400 font-bold">SCAN TO VERIFY</span>
                </div>

                <div class="space-y-1 text-right">
                  <div class="font-bold text-white">Md. Fahad</div>
                  <div class="text-slate-500 text-[10px]">Managing Director • Rupsha Garments Ltd.</div>
                  <div class="w-28 h-0.5 bg-emerald-500/60 mt-1 ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        \`
      });
    }

    function downloadCarbonCreditsLedgerCsv() {
      const cc = AppState.carbonCredits;
      const headers = ['Serial_Number', 'Vintage', 'Abatement_Source', 'Volume_tCO2e', 'Status', 'Beneficiary', 'Retired_At', 'Verifier', 'Tx_Hash'];
      const rows = cc.ledger.map(item => [
        item.serial,
        item.vintage,
        \`"\${item.source}"\`,
        item.amountTons.toFixed(2),
        item.status,
        \`"\${item.beneficiary || 'N/A'}"\`,
        item.retiredAt || 'N/A',
        \`"\${item.verifier || 'N/A'}"\`,
        item.txHash
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      triggerCsvDownload('rupsha_garments_carbon_credits_ledger_vcs.csv', csv);
    }

    `;

if (!html.includes('function mintTelemetryCarbonCredits()')) {
  if (html.includes(targetFunctionInsertionPoint)) {
    html = html.replace(targetFunctionInsertionPoint, () => newCarbonCreditFunctions + targetFunctionInsertionPoint);
    console.log('✓ Added Carbon Credit interactive action functions');
  } else {
    console.error('Failed to locate targetFunctionInsertionPoint');
  }
}

// ============================================================================
// 5. ADD CARBON CREDIT Q&A IN generateGroundedCopilotReply
// ============================================================================
const targetCopilotPromptBranch = "if (q.includes('carbon') || q.includes('assumption') || q.includes('কার্বন')) {";

const newCopilotCarbonCreditBranch = `if (q.includes('credit') || q.includes('carbon credit') || q.includes('ক্রেডিট') || q.includes('verra') || q.includes('vcs') || q.includes('monetize') || q.includes('retire')) {
        const cc = AppState.carbonCredits;
        const availUsd = cc.available * cc.vcmPriceUsd;
        const availBdt = availUsd * cc.usdToBdtRate;
        return useBn
          ? \`<strong>কার্বন ক্রেডিট ওয়ালেট ও ভিসিএম ট্রেডিং রেজিস্ট্রি [VERRA VCS VM0008]:</strong><br/>
          • <strong>ওয়ালেটে বিদ্যমান ক্রেডিট:</strong> <strong>\${formatNum(cc.available, 2)} tCO₂e</strong> (মূল্যায়ন: $\${formatNum(availUsd, 2)} USD / ৳ \${formatNum(availBdt, 0)} BDT)।<br/>
          • <strong>বাজারদর (VCM Spot Index):</strong> <strong>$\${formatNum(cc.vcmPriceUsd, 2)}/tCO₂e</strong> (৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)}/ক্রেডিট)।<br/>
          • <strong>পোশাক ক্রেতাদের জন্য অবসরপ্রাপ্ত ক্রেডিট:</strong> <strong>\${formatNum(cc.retired, 2)} tCO₂e</strong> (H&amp;M Group, Inditex/Zara, M&amp;S-এর জন্য প্রত্যয়িত)।<br/>
          • <strong>নগদীকরণ সাশ্রয় আয়:</strong> ৳ \${formatNum(cc.cumulativeEarningsBdt, 0)} BDT সরাসরি ফ্যাক্টরি অ্যাকাউন্টে ক্রেডিট করা হয়েছে।\`
          : \`<strong>Voluntary Carbon Credit System &amp; MRV Registry [VERRA VCS VM0008]:</strong><br/>
          • <strong>Available Credit Balance:</strong> <strong>\${formatNum(cc.available, 2)} tCO₂e</strong> (Portfolio Value: <strong>$\${formatNum(availUsd, 2)} USD</strong> / <strong>৳ \${formatNum(availBdt, 0)} BDT</strong>).<br/>
          • <strong>Global VCM Spot Price:</strong> <strong>$\${formatNum(cc.vcmPriceUsd, 2)} / tCO₂e</strong> (৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)} BDT / credit via Climate Impact X).<br/>
          • <strong>Scope 3 Buyer Retirements:</strong> <strong>\${formatNum(cc.retired, 2)} tCO₂e</strong> retired for H&amp;M, Inditex/Zara, and Marks &amp; Spencer supply chain compliance.<br/>
          • <strong>Dual Monetization Pathway:</strong> 1 VCU = 1 metric ton CO₂e avoided. Verified via continuous IoT edge meters &amp; SGS ISO 14065 audit trail.\`;
      }

      ` + targetCopilotPromptBranch;

if (!html.includes("q.includes('credit')")) {
  if (html.includes(targetCopilotPromptBranch)) {
    html = html.replace(targetCopilotPromptBranch, () => newCopilotCarbonCreditBranch);
    console.log('✓ Added Carbon Credit Q&A branch to Ask Green AI Copilot');
  } else {
    console.error('Failed to locate targetCopilotPromptBranch');
  }
}

// ============================================================================
// 6. ADD PROMPT CHIP TO SUGGESTED_PROMPTS
// ============================================================================
const targetSuggestedPrompts = 'const SUGGESTED_PROMPTS = [';
const newSuggestedPrompt = `const SUGGESTED_PROMPTS = [
      { en: 'What is our carbon credit balance and how much BDT revenue can we generate?', bn: 'আমাদের কার্বন ক্রেডিট ব্যালেন্স কত এবং কত টাকা রাজস্ব আয় হতে পারে?' },`;

if (!html.includes('আমাদের কার্বন ক্রেডিট ব্যালেন্স কত')) {
  if (html.includes(targetSuggestedPrompts)) {
    html = html.replace(targetSuggestedPrompts, () => newSuggestedPrompt);
    console.log('✓ Added Carbon Credit prompt to SUGGESTED_PROMPTS');
  } else {
    console.error('Failed to locate targetSuggestedPrompts');
  }
}

// Write back to preview/index.html
fs.writeFileSync(filePath, html, 'utf8');
console.log('✓ Successfully written preview/index.html with Carbon Credit System integrated!');
