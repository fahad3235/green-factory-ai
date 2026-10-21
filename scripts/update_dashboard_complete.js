const fs = require('fs');

const html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Extract the factory photo base64
const imgSearch = 'data:image/jpeg;base64,';
const fIdx = html.indexOf('Factory Profile Card');
const imgStart = html.indexOf(imgSearch, fIdx);
const imgEnd = html.indexOf('"', imgStart);
const factoryImgBase64 = html.substring(imgStart, imgEnd);
console.log('Factory image extracted, length:', factoryImgBase64.length);

// 2. Identify the middle + bottom workspace rows to replace
const middleStart = html.indexOf('<!-- MIDDLE WORKSPACE GRID:');
const workflowBarStart = html.indexOf('<!-- CLOSED-LOOP WORKFLOW BAR');

if (middleStart === -1 || workflowBarStart === -1) {
  console.error('Could not find section boundaries!');
  process.exit(1);
}

const newMiddleAndBottomRows = `<!-- MIDDLE WORKSPACE GRID: ENERGY USAGE OVERVIEW + MACHINE-WISE ENERGY + AI RECOMMENDATIONS (Matches Reference Image 2) -->
        <section class="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <!-- Card 1: Energy Usage Overview Chart (5 cols) -->
          <div class="xl:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Energy Usage Overview</h2>
                    \${renderDataBadge('SIMULATION')}
                  </div>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">Electricity (kWh) vs. Garment Output (pcs) &amp; Daily Target</p>
                </div>
                <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                  \${['day', 'week', 'month', 'year'].map(p => \`
                    <button type="button" onclick="setDashboardChartPeriod('\${p}')" class="px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition \${AppState.energyChartPeriod === p ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}">\${p}</button>
                  \`).join('')}
                </div>
              </div>

              <!-- Legend (Matches Reference Image 2) -->
              <div class="flex items-center justify-end gap-3 text-[11px] text-slate-500 mb-1">
                <span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-xs bg-[#0EA5E9]"></span> Total Usage</span>
                <span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-xs bg-[#10B981]"></span> Production</span>
                <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#059669]"></span> Target</span>
              </div>

              <!-- Fixed Height Bulletproof Chart Container (Never Blank) -->
              <div id="dashboard-energy-chart-container" class="relative h-64 w-full">
                \${generateEnergyChartSvg(AppState.energyChartPeriod || 'month', m, AppState.simTickCount || 0, document.documentElement.classList.contains('dark') || AppState.theme === 'dark')}
              </div>
            </div>

            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>Peak Day: <strong class="text-slate-800 dark:text-slate-200">Oct 15 (8,240 kWh • 12,450 pcs)</strong></span>
              <button type="button" onclick="exportFilteredEnergyCsv()" class="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">⬇ Export CSV</button>
            </div>
          </div>

          <!-- Card 2: Machine-wise Energy Consumption (4 cols — Matches Reference Image 2) -->
          <div class="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2.5">
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">Machine-wise Energy Consumption</h2>
                <button type="button" onclick="navigateTo('machine-monitoring')" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">View Details →</button>
              </div>

              <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 mb-2.5">
                <button type="button" onclick="setDashboardMachineFilter('top5')" class="px-2.5 py-1 rounded-md text-[11px] font-semibold transition \${(AppState.dashboardMachineFilter || 'top5') === 'top5' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}">Top 5 Machines</button>
                <button type="button" onclick="setDashboardMachineFilter('all')" class="px-2.5 py-1 rounded-md text-[11px] font-semibold transition \${(AppState.dashboardMachineFilter || 'top5') === 'all' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}">All Machines</button>
              </div>

              <div class="overflow-x-auto max-h-[225px] overflow-y-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="text-slate-400 dark:text-slate-500 text-[11px] border-b border-slate-100 dark:border-slate-800 pb-1.5 sticky top-0 bg-white dark:bg-slate-900">
                      <th class="font-medium pb-1.5">Machine</th>
                      <th class="font-medium pb-1.5 text-right">Usage (kWh)</th>
                      <th class="font-medium pb-1.5 text-right">% of Total</th>
                      <th class="font-medium pb-1.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800/80">
                    \${getDashboardMachineRows(m)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>Live Fleet: <strong class="text-emerald-600 font-mono">\${AppState.fleet.length} Units Active</strong></span>
              <button type="button" onclick="navigateTo('machine-monitoring')" class="text-emerald-600 font-semibold hover:underline">Fleet Map →</button>
            </div>
          </div>

          <!-- Card 3: AI Recommendations (3 cols — Matches Reference Image 2) -->
          <div class="xl:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">AI Recommendations</h2>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Top 3 Fixes
                </span>
              </div>

              <div class="space-y-2.5 flex-1">
                <!-- Fix 1 -->
                <div onclick="openRecommendationModal('REC-SEW-03-IDLE')" class="cursor-pointer p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition">
                  <div class="flex items-start gap-2">
                    <span class="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs font-bold text-slate-900 dark:text-white truncate">Optimize Machine 3 (Night Shift)</div>
                      <div class="text-[10px] text-slate-500 dark:text-slate-400">Reduce idle time &amp; fix compressed air leaks</div>
                      <div class="mt-1.5 flex items-center justify-between text-[10px]">
                        <span class="text-emerald-600 font-semibold">⚡ Save: 18,500 kWh/mo</span>
                        <span class="font-extrabold text-slate-900 dark:text-white">৳ 28,000/mo</span>
                      </div>
                      <div class="text-[9px] text-slate-400 mt-0.5">⏱ Payback: 2.1 months</div>
                    </div>
                  </div>
                </div>

                <!-- Fix 2 -->
                <div onclick="openRecommendationModal('REC-BLR-01-BLOWDOWN')" class="cursor-pointer p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition">
                  <div class="flex items-start gap-2">
                    <span class="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs font-bold text-slate-900 dark:text-white truncate">Adjust Boiler Operation</div>
                      <div class="text-[10px] text-slate-500 dark:text-slate-400">Improve set temperature &amp; scheduling</div>
                      <div class="mt-1.5 flex items-center justify-between text-[10px]">
                        <span class="text-emerald-600 font-semibold">⚡ Save: 12,400 kWh/mo</span>
                        <span class="font-extrabold text-slate-900 dark:text-white">৳ 19,000/mo</span>
                      </div>
                      <div class="text-[9px] text-slate-400 mt-0.5">⏱ Payback: 3.8 months</div>
                    </div>
                  </div>
                </div>

                <!-- Fix 3 -->
                <div onclick="openRecommendationModal('REC-FIN-02-EXHAUST')" class="cursor-pointer p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition">
                  <div class="flex items-start gap-2">
                    <span class="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs font-bold text-slate-900 dark:text-white truncate">Upgrade to LED Lighting</div>
                      <div class="text-[10px] text-slate-500 dark:text-slate-400">Replace old lights in production hall</div>
                      <div class="mt-1.5 flex items-center justify-between text-[10px]">
                        <span class="text-emerald-600 font-semibold">⚡ Save: 8,600 kWh/mo</span>
                        <span class="font-extrabold text-slate-900 dark:text-white">৳ 12,000/mo</span>
                      </div>
                      <div class="text-[9px] text-slate-400 mt-0.5">⏱ Payback: 4.5 months</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span class="text-slate-500">Human approval required</span>
              <button type="button" onclick="navigateTo('ai-recommendations')" class="font-semibold text-emerald-600 hover:underline">Manage All →</button>
            </div>
          </div>
        </section>

        <!-- BOTTOM WORKSPACE ROW: 4 CARDS (Exact Match to Reference Image 2) -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Bottom Card 1: Bill & Carbon Forecast -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2.5">
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">Bill &amp; Carbon Forecast</h2>
                \${renderDataBadge('ESTIMATE/FORECAST')}
              </div>
              <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 mb-3">
                \${[
                  { id: '1m', label: 'Next Month' },
                  { id: '3m', label: 'Next 3 Months' },
                  { id: '6m', label: 'Next 6 Months' }
                ].map(h => \`
                  <button type="button" onclick="setForecastHorizon('\${h.id}')" class="px-2 py-1 rounded-md text-[10px] font-semibold transition \${AppState.forecastHorizon === h.id ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">\${h.label}</button>
                \`).join('')}
              </div>
              <div class="space-y-2.5">
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                  <div class="text-[10px] text-slate-500">Forecasted Bill</div>
                  <div class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                    \${formatBdt((m.currentBillBdt - m.estimatedSavingsBdt) * (AppState.forecastHorizon === '3m' ? 3 : AppState.forecastHorizon === '6m' ? 6 : 1))}
                  </div>
                  <div class="text-[9px] text-emerald-600 font-mono">(±5% range)</div>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                  <div class="text-[10px] text-slate-500">Forecasted Carbon</div>
                  <div class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                    \${formatNum((m.totalCarbonTons - m.totalRecSavedCo2) * (AppState.forecastHorizon === '3m' ? 3 : AppState.forecastHorizon === '6m' ? 6 : 1), 1)} ton
                  </div>
                  <div class="text-[9px] text-sky-600 font-mono">(±5% range)</div>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span class="truncate">Based on historical data</span>
              <button type="button" onclick="navigateTo('bill-carbon-forecast')" class="font-semibold text-emerald-600 hover:underline shrink-0">View Details →</button>
            </div>
          </div>

          <!-- Bottom Card 2: Savings Tracker -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">Savings Tracker</h2>
                <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-[9px] font-semibold text-slate-600 dark:text-slate-300">
                  <span class="px-1.5 py-0.5 rounded bg-emerald-700 text-white">This Month</span>
                  <span class="px-1.5 py-0.5">3M</span>
                  <span class="px-1.5 py-0.5">6M</span>
                  <span class="px-1.5 py-0.5">1Y</span>
                </div>
              </div>

              <div class="flex items-center gap-3 my-2">
                <div class="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="10" class="text-slate-200 dark:text-slate-800" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#059669" stroke-width="10" stroke-linecap="round" stroke-dasharray="251.2" stroke-dashoffset="\${251.2 - (251.2 * m.savingsTargetPct) / 100}" />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span class="text-sm font-extrabold text-slate-900 dark:text-white">\${m.savingsTargetPct}%</span>
                    <span class="text-[8px] text-slate-500 leading-none">Target<br/>Achieved</span>
                  </div>
                </div>
                <div class="space-y-1.5 flex-1 min-w-0">
                  <div>
                    <div class="text-[10px] text-slate-500">Total Savings</div>
                    <div class="text-sm font-extrabold text-slate-900 dark:text-white truncate">\${formatBdt(m.estimatedSavingsBdt)}</div>
                    <div class="text-[9px] text-slate-400">(Plan: \${formatBdt(a.savingsPlanTargetBdt)})</div>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-500">Carbon Reduction</div>
                    <div class="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 truncate">🌱 \${formatNum(m.totalRecSavedCo2, 1)} ton CO₂e</div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" onclick="navigateTo('savings-tracker')" class="w-full mt-2 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition">
              View Progress →
            </button>
          </div>

          <!-- Bottom Card 3: CarbonIQ Report -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">CarbonIQ Report</h2>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Higg FEM Level 3</span>
              </div>
              <div class="space-y-1.5 my-1">
                <div class="text-[10px] text-slate-500">Total Emissions (Oct)</div>
                <div class="text-lg font-extrabold text-slate-900 dark:text-white">\${formatNum(m.totalCarbonTons, 1)} ton CO₂e</div>
                <div class="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Scope 1: <strong>\${formatNum(m.scope1Tons, 1)} t</strong></span>
                  <span>Scope 2: <strong>\${formatNum(m.scope2Tons, 1)} t</strong></span>
                </div>
              </div>
              <div class="mt-2 p-2 rounded-xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-200/60 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div class="text-[9px] text-slate-500">Sustainability Score</div>
                  <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">Tier 2/100 Good</div>
                </div>
                <div class="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">\${m.sustainabilityScore}%</div>
              </div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-[10px]">
              <button type="button" onclick="downloadCarbonIqReportCsv()" class="font-semibold text-emerald-600 hover:underline">Download Report</button>
              <button type="button" onclick="navigateTo('carboniq-report')" class="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">View Higg FEM Details</button>
            </div>
          </div>

          <!-- Bottom Card 4: Want to go further? (Matches Reference Image 2) -->
          <div class="rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between relative overflow-hidden text-white" style="background: linear-gradient(135deg, rgba(6,18,26,0.85) 0%, rgba(15,23,42,0.70) 100%), url('${factoryImgBase64}') center/cover no-repeat;">
            <div class="relative z-10 space-y-1.5">
              <h3 class="text-base font-extrabold text-white">Want to go further?</h3>
              <p class="text-xs text-slate-200 leading-relaxed">Explore solar, efficient motors and other green investments.</p>
            </div>
            <div class="relative z-10 mt-4">
              <button type="button" onclick="navigateTo('sustainability-reports')" class="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md">
                <span>See All Investment Options</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        `;

const finalHtml = html.substring(0, middleStart) + newMiddleAndBottomRows + html.substring(workflowBarStart);
fs.writeFileSync('preview/index.html', finalHtml, 'utf8');
console.log('Successfully applied Reference Image 2 dashboard layout!');
