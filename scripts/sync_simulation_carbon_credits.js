const fs = require('fs');
const path = require('path');

const filePath = path.resolve('preview/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Normalize line endings in memory
if (html.includes('\r\n')) {
  html = html.replace(/\r\n/g, '\n');
}

// ============================================================================
// 1. ADD SIMULATION CARBON CALCULATIONS TO getDerivedMetrics()
// ============================================================================
const targetMetricsBeforeReturn = `for (const k of Object.keys(deptKwh)) {
        deptSharePct[k] = totalPeriodKwh > 0 ? ((deptKwh[k] / totalPeriodKwh) * 100.0) : 0;
      }

      return {`.replace(/\r\n/g, '\n');

const newMetricsWithSimCarbon = `for (const k of Object.keys(deptKwh)) {
        deptSharePct[k] = totalPeriodKwh > 0 ? ((deptKwh[k] / totalPeriodKwh) * 100.0) : 0;
      }

      // Real-time Simulation Carbon Abatement & Credit Forecast
      const simAvoidedKwh = (AppState.simAvoidedKwh || 0);
      const simLiveAvoidedCo2Tons = (simAvoidedKwh * (a.gridEmissionFactorKgPerKwh || 0.62)) / 1000.0;
      
      // Scenario-based instantaneous abatement delta (Baseline - Current monthly carbon)
      const scenarioAbatementTons = Math.max(0, baselineTotalCarbonTons - totalCarbonTons);
      
      // Applied recommendations abatement (Scope 2 avoidance)
      let appliedRecCo2Tons = 0;
      for (const r of AppState.recommendations) {
        if (r.status === 'Applied in simulation' || r.status === 'Verified in simulation') {
          appliedRecCo2Tons += (r.estSavedKwh * (a.gridEmissionFactorKgPerKwh || 0.62)) / 1000.0;
        }
      }
      
      // Combined Real-Time Simulation Abatement Tonnage (tCO2e)
      const simTotalAbatementTons = Number((scenarioAbatementTons + simLiveAvoidedCo2Tons + appliedRecCo2Tons).toFixed(2));
      const simPotentialCredits = Math.max(0, simTotalAbatementTons);
      
      const vcmPrice = (AppState.carbonCredits && AppState.carbonCredits.vcmPriceUsd) || 21.50;
      const bdtRate = (AppState.carbonCredits && AppState.carbonCredits.usdToBdtRate) || 120.0;
      const simRevenueUsd = Number((simPotentialCredits * vcmPrice).toFixed(2));
      const simRevenueBdt = Math.round(simRevenueUsd * bdtRate);
      const simCarbonYieldPct = baselineTotalCarbonTons > 0 ? Number(((simTotalAbatementTons / baselineTotalCarbonTons) * 100).toFixed(1)) : 0;

      return {
        simAvoidedKwh,
        simLiveAvoidedCo2Tons: Number(simLiveAvoidedCo2Tons.toFixed(2)),
        scenarioAbatementTons: Number(scenarioAbatementTons.toFixed(2)),
        appliedRecCo2Tons: Number(appliedRecCo2Tons.toFixed(2)),
        simTotalAbatementTons,
        simPotentialCredits,
        simRevenueUsd,
        simRevenueBdt,
        simCarbonYieldPct,`.replace(/\r\n/g, '\n');

if (!html.includes('simTotalAbatementTons')) {
  if (html.includes(targetMetricsBeforeReturn)) {
    html = html.replace(targetMetricsBeforeReturn, () => newMetricsWithSimCarbon);
    console.log('✓ Injected simulation carbon calculations into getDerivedMetrics()');
  } else {
    console.error('Failed to find targetMetricsBeforeReturn');
  }
}

// ============================================================================
// 2. ACCUMULATE simAvoidedCo2Tons IN stepSimulationForward()
// ============================================================================
const targetStepSimAvoided = `AppState.simAvoidedKwh = (AppState.simAvoidedKwh || 0) + stepAvoidedKwh;
      AppState.simSavingsAccruedBdt = (AppState.simSavingsAccruedBdt || 0) + (stepAvoidedKwh * tariff);`.replace(/\r\n/g, '\n');

const newStepSimAvoided = `AppState.simAvoidedKwh = (AppState.simAvoidedKwh || 0) + stepAvoidedKwh;
      AppState.simSavingsAccruedBdt = (AppState.simSavingsAccruedBdt || 0) + (stepAvoidedKwh * tariff);
      const gridFactor = (AppState.assumptions && AppState.assumptions.gridEmissionFactorKgPerKwh) || 0.62;
      AppState.simAvoidedCo2Tons = (AppState.simAvoidedCo2Tons || 0) + (stepAvoidedKwh * gridFactor / 1000.0);`.replace(/\r\n/g, '\n');

if (!html.includes('AppState.simAvoidedCo2Tons = (AppState.simAvoidedCo2Tons || 0)')) {
  if (html.includes(targetStepSimAvoided)) {
    html = html.replace(targetStepSimAvoided, () => newStepSimAvoided);
    console.log('✓ Added simAvoidedCo2Tons accumulation in stepSimulationForward()');
  } else {
    console.error('Failed to find targetStepSimAvoided');
  }
}

// ============================================================================
// 3. ENRICH CARBON CREDIT PANEL WITH LIVE SIMULATION IMPACT HUB & DYNAMIC CARDS
// ============================================================================
const targetCarbonCardsStart = '<!-- 4 Real-Time Carbon Credit Wallet Metric Cards -->';

const newSimulationCarbonHubAndCards = `<!-- Real-Time Simulation Carbon Credit Impact Hub -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/50 shadow-2xl space-y-4">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>LIVE SIMULATION CARBON IMPACT</span>
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-500/30">
                    SCENARIO: \${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-300 bg-slate-800 border border-slate-700">
                    SIM TICK #\${AppState.simTickCount}
                  </span>
                </div>
                <h3 class="text-base font-extrabold text-white flex items-center gap-2">
                  <span class="text-emerald-400">\${AppIcons.sparkles('w-4 h-4')}</span>
                  <span>Simulation Carbon Credit Yield: <span class="text-emerald-300 font-mono">+\${formatNum(m.simPotentialCredits, 2)} tCO₂e</span> (\${formatNum(m.simPotentialCredits, 2)} Credits Forecast)</span>
                </h3>
                <p class="text-xs text-slate-400">
                  Real-time carbon emissions avoided by active simulation interventions, schedule optimization, and IoT energy drift under Verra VCS VM0008 rules.
                </p>
              </div>

              <!-- Mint Simulation Credits Action Button -->
              <div class="flex flex-wrap items-center gap-2 shrink-0">
                <button type="button" onclick="mintSimulatedCarbonCredits()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-950/50 transition flex items-center gap-1.5">
                  <span>\${AppIcons.coin('w-4 h-4')}</span>
                  <span>Mint +\${formatNum(m.simPotentialCredits, 2)} Sim Credits</span>
                </button>
                <button type="button" onclick="stepSimulationForward()" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5" title="Advance simulation tick to see credits rise">
                  <span>+1 Tick</span>
                </button>
              </div>
            </div>

            <!-- 3 Simulation Carbon Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/25">
                <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Simulated Carbon Abatement</div>
                <div class="text-xl font-black text-emerald-300 font-mono mt-1">+\${formatNum(m.simTotalAbatementTons, 2)} <span class="text-xs font-sans text-slate-400">tCO₂e</span></div>
                <div class="text-[10.5px] text-slate-400 mt-1">Live reduction vs \${formatNum(m.baselineTotalCarbonTons, 1)} t baseline</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/25">
                <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Simulated Credit Revenue Forecast</div>
                <div class="text-xl font-black text-cyan-300 font-mono mt-1">+$\${formatNum(m.simRevenueUsd, 2)} <span class="text-xs font-bold text-emerald-400 font-sans">(৳ \${formatNum(m.simRevenueBdt, 0)} BDT)</span></div>
                <div class="text-[10.5px] text-slate-400 mt-1">Value at VCM spot $\${formatNum(cc.vcmPriceUsd, 2)} / tCO₂e</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-teal-500/25">
                <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Combined Total Wallet Potential</div>
                <div class="text-xl font-black text-white font-mono mt-1">\${formatNum(cc.available + m.simPotentialCredits, 2)} <span class="text-xs font-bold text-teal-400 font-sans">tCO₂e</span></div>
                <div class="text-[10.5px] text-slate-400 mt-1">Base Verified (\${formatNum(cc.available, 2)} t) + Sim Yield (\${formatNum(m.simPotentialCredits, 2)} t)</div>
              </div>
            </div>

            <!-- 1-Click Interactive Scenario Switcher inside Carbon Credit Panel -->
            <div class="pt-1 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[11px] text-slate-400 font-medium">Switch Simulation Scenario:</span>
                <button type="button" onclick="applyScenarioState('energy_intervention', 'Energy Efficiency Optimization');" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition \${AppState.activeScenario === 'energy_intervention' ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}">
                  Max Abatement (+18.4 tCO₂e)
                </button>
                <button type="button" onclick="applyScenarioState('baseline', 'Normal Baseline Operations');" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition \${AppState.activeScenario === 'baseline' ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}">
                  Normal Baseline
                </button>
                <button type="button" onclick="applyScenarioState('production_surge', 'Production Surge');" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition \${AppState.activeScenario === 'production_surge' ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}">
                  Production Surge (High Carbon)
                </button>
                <button type="button" onclick="applyScenarioState('night_idle', 'Night Shift Idle Leak');" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition \${AppState.activeScenario === 'night_idle' ? 'bg-rose-600 text-white font-bold ring-2 ring-rose-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}">
                  Night Idle (Carbon Waste Leak)
                </button>
              </div>
              <div class="text-[10.5px] text-slate-500 font-mono">
                Real-Time MRV Sync Active
              </div>
            </div>
          </div>

          <!-- 4 Real-Time Carbon Credit Wallet Metric Cards -->`;

if (!html.includes('LIVE SIMULATION CARBON IMPACT')) {
  if (html.includes(targetCarbonCardsStart)) {
    html = html.replace(targetCarbonCardsStart, () => newSimulationCarbonHubAndCards);
    console.log('✓ Added Live Simulation Carbon Credit Impact Hub to CarbonIQ report');
  } else {
    console.error('Failed to find targetCarbonCardsStart');
  }
}

// ============================================================================
// 4. ADD mintSimulatedCarbonCredits() FUNCTION
// ============================================================================
const targetMintTelemetryFunction = 'function mintTelemetryCarbonCredits() {';

const newSimulatedMintFunction = `function mintSimulatedCarbonCredits() {
      const m = getDerivedMetrics();
      const mintAmount = m.simPotentialCredits > 0 ? Number(m.simPotentialCredits.toFixed(2)) : 6.40;
      
      const newSerialNum = 48300 + AppState.carbonCredits.ledger.length;
      const newSerial = \`VCS-BD-2026-SIM-0\${newSerialNum}\`;
      const newTxHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      const newRecord = {
        serial: newSerial,
        vintage: '2026-Q4',
        source: \`Simulation Interventions (\${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')})\`,
        amountTons: mintAmount,
        status: 'Active',
        beneficiary: null,
        retiredAt: null,
        txHash: newTxHash,
        verifier: 'SGS Bangladesh Ltd. (ISO 14065 Simulation Verification)'
      };
      
      AppState.carbonCredits.ledger.unshift(newRecord);
      AppState.carbonCredits.totalMinted = Number((AppState.carbonCredits.totalMinted + mintAmount).toFixed(2));
      AppState.carbonCredits.available = Number((AppState.carbonCredits.available + mintAmount).toFixed(2));
      
      logActivity(AppState.currentUser.name, \`Minted \${mintAmount} tCO₂e Simulated Carbon Credits (\${newSerial}).\`);
      renderActiveView();
      showToast(\`Successfully minted \${mintAmount} tCO₂e from active simulation! Serial: \${newSerial}\`, 'success');
    }

    ` + targetMintTelemetryFunction;

if (!html.includes('function mintSimulatedCarbonCredits()')) {
  if (html.includes(targetMintTelemetryFunction)) {
    html = html.replace(targetMintTelemetryFunction, () => newSimulatedMintFunction);
    console.log('✓ Added mintSimulatedCarbonCredits() function');
  } else {
    console.error('Failed to find targetMintTelemetryFunction');
  }
}

// ============================================================================
// 5. UPDATE SIMULATION CONTROL CENTER KPI CARD TO SHOW CARBON CREDITS
// ============================================================================
const targetSimKpiCarbon = `<div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Avoidable Carbon</div>
              <div id="sim-kpi-carbon" class="text-base font-extrabold text-teal-600 mt-0.5 flex items-center gap-1"><span class="text-teal-500">\${AppIcons.leaf('w-3.5 h-3.5')}</span> \${formatNum(m.totalRecSavedCo2, 2)} t</div>
              <div class="text-[9px] text-slate-400 font-mono">tCO₂e / month</div>
            </div>`.replace(/\r\n/g, '\n');

const newSimKpiCarbon = `<div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800 cursor-pointer hover:border-emerald-500 transition group" onclick="navigateToRoute('carboniq-report')" title="Click to view Carbon Credit System">
              <div class="text-[10px] text-slate-500 font-medium flex items-center justify-between">
                <span>Sim Carbon Credits</span>
                <span class="text-emerald-500 text-[9px] group-hover:underline">View ↗</span>
              </div>
              <div id="sim-kpi-carbon" class="text-base font-extrabold text-emerald-600 mt-0.5 flex items-center gap-1"><span class="text-emerald-500">\${AppIcons.coin('w-3.5 h-3.5')}</span> +\${formatNum(m.simPotentialCredits, 2)} t</div>
              <div class="text-[9px] text-slate-400 font-mono">৳ \${formatNum(m.simRevenueBdt, 0)} BDT Potential</div>
            </div>`.replace(/\r\n/g, '\n');

if (!html.includes('Sim Carbon Credits</span>')) {
  if (html.includes(targetSimKpiCarbon)) {
    html = html.replace(targetSimKpiCarbon, () => newSimKpiCarbon);
    console.log('✓ Updated Simulation Control Center KPI card to show Sim Carbon Credits');
  } else {
    console.error('Failed to find targetSimKpiCarbon');
  }
}

// ============================================================================
// 6. ENRICH AI COPILOT REPLIES TO INCLUDE SIMULATION CARBON CREDIT YIELD
// ============================================================================
const targetCopilotCreditBranch = `if (q.includes('credit') || q.includes('carbon credit') || q.includes('ক্রেডিট') || q.includes('verra') || q.includes('vcs') || q.includes('monetize') || q.includes('retire')) {
        const cc = AppState.carbonCredits;
        const availUsd = cc.available * cc.vcmPriceUsd;
        const availBdt = availUsd * cc.usdToBdtRate;`;

const newCopilotCreditBranch = `if (q.includes('credit') || q.includes('carbon credit') || q.includes('ক্রেডিট') || q.includes('verra') || q.includes('vcs') || q.includes('monetize') || q.includes('retire') || (q.includes('simul') && q.includes('carbon'))) {
        const cc = AppState.carbonCredits;
        const availUsd = cc.available * cc.vcmPriceUsd;
        const availBdt = availUsd * cc.usdToBdtRate;
        const simYieldTons = m.simPotentialCredits || 0;
        const simYieldUsd = m.simRevenueUsd || 0;
        const simYieldBdt = m.simRevenueBdt || 0;`;

if (!html.includes('const simYieldTons = m.simPotentialCredits || 0;')) {
  if (html.includes(targetCopilotCreditBranch)) {
    html = html.replace(targetCopilotCreditBranch, () => newCopilotCreditBranch);
    console.log('✓ Enriched AI Copilot Carbon Credit logic with live simulation yield variables');
  } else {
    console.error('Failed to find targetCopilotCreditBranch');
  }
}

// Write back to preview/index.html
fs.writeFileSync(filePath, html, 'utf8');
console.log('✓ Successfully wrote preview/index.html with synchronized Simulation Carbon Credits!');
