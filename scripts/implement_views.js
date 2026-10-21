const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

const viewsCode = `
    // ----------------------------------------------------------------------------
    // VIEW 11: INVENTORY & PRODUCTION (Enterprise Material & Garment Efficiency)
    // ----------------------------------------------------------------------------
    function renderInventoryProductionView(m) {
      const isDark = document.documentElement.classList.contains('dark') || AppState.theme === 'dark';
      const statusFilter = AppState.inventoryFilterStatus || 'All';
      const items = (AppState.inventoryItems || []).filter(it => {
        if (statusFilter === 'All') return true;
        return it.status === statusFilter;
      });

      const totalTargetPcs = (AppState.productionLines || []).reduce((acc, l) => acc + (l.targetPcs || 0), 0);
      const totalActualPcs = (AppState.productionLines || []).reduce((acc, l) => acc + (l.actualPcs || 0), 0);
      const totalRejects = (AppState.productionLines || []).reduce((acc, l) => acc + (l.rejectedPcs || 0), 0);
      const prodEfficiency = totalTargetPcs > 0 ? ((totalActualPcs / totalTargetPcs) * 100).toFixed(1) : 100;

      return \`
        <div class="space-y-5">
          <!-- Header -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl font-extrabold text-slate-900 dark:text-white">📦 Inventory &amp; Production Management</h1>
                \${renderDataBadge('SIMULATION')}
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Tracking finished garment outputs, production line clusters, and material efficiency across 3 shifts.</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <button type="button" onclick="openAddInventoryModal()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5">
                <span>+ Add Simulated Item</span>
              </button>
              <button type="button" onclick="exportInventoryCsv()" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition">
                ⬇ Export CSV
              </button>
            </div>
          </div>

          <!-- KPI Stats Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div class="text-[11px] text-slate-500 font-medium">Daily Garment Output</div>
              <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">\${totalActualPcs.toLocaleString()} pcs</div>
              <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">Target: \${totalTargetPcs.toLocaleString()} pcs (\${prodEfficiency}% Efficiency)</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div class="text-[11px] text-slate-500 font-medium">Energy Intensity</div>
              <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">\${formatNum(m.kwhPerPiece, 2)} kWh/pc</div>
              <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">Baseline: 4.95 kWh/pc (-15.2% intensity)</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div class="text-[11px] text-slate-500 font-medium">Quality &amp; Rejection Rate</div>
              <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">\${totalRejects} pcs</div>
              <div class="text-[10px] text-slate-500 mt-0.5">Defect Rate: \${((totalRejects / (totalActualPcs || 1)) * 100).toFixed(1)}% (ISO 9001 Standard)</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div class="text-[11px] text-slate-500 font-medium">Active Material SKUs</div>
              <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">\${(AppState.inventoryItems || []).length} SKUs</div>
              <div class="text-[10px] text-amber-600 font-semibold mt-0.5">1 Low Stock • 1 Reorder Alert</div>
            </div>
          </div>

          <!-- Section 1: Active Production Lines -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div class="flex items-center justify-between mb-3.5">
              <div>
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">Active Production Lines (4 Clusters)</h2>
                <p class="text-[11px] text-slate-500">Live operational throughput linked to factory machine power draw.</p>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Live Telemetry</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <th class="font-medium pb-2">Cluster ID</th>
                    <th class="font-medium pb-2">Production Line Cluster</th>
                    <th class="font-medium pb-2">Shift Schedule</th>
                    <th class="font-medium pb-2 text-right">Target (pcs)</th>
                    <th class="font-medium pb-2 text-right">Actual Output</th>
                    <th class="font-medium pb-2 text-right">Scrap / Defects</th>
                    <th class="font-medium pb-2 text-right">Energy (kWh)</th>
                    <th class="font-medium pb-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/80">
                  \${(AppState.productionLines || []).map(l => {
                    const statusBadge = l.status === 'Running'
                      ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Running</span>'
                      : '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">' + l.status + '</span>';
                    return \`
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <td class="py-2.5 font-mono font-bold text-slate-900 dark:text-white">\${l.id}</td>
                        <td class="py-2.5 font-medium text-slate-800 dark:text-slate-200">\${l.name}</td>
                        <td class="py-2.5 text-slate-500">\${l.shift}</td>
                        <td class="py-2.5 text-right font-mono text-slate-500">\${l.targetPcs.toLocaleString()}</td>
                        <td class="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">\${l.actualPcs.toLocaleString()}</td>
                        <td class="py-2.5 text-right font-mono text-rose-500">\${l.rejectedPcs}</td>
                        <td class="py-2.5 text-right font-mono text-emerald-600 font-bold">\${l.kwhUsed.toLocaleString()}</td>
                        <td class="py-2.5 text-center">\${statusBadge}</td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Section 2: Material & Spares Inventory -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3.5">
              <div>
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">Material &amp; Maintenance Inventory</h2>
                <p class="text-[11px] text-slate-500">Fabric rolls, organic trims, and mechanical maintenance spares.</p>
              </div>

              <!-- Filter tabs -->
              <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                \${['All', 'In Stock', 'Low Stock', 'Reorder Needed'].map(s => \`
                  <button type="button" onclick="setInventoryStatusFilter('\${s}')" class="px-2.5 py-1 rounded-md text-[11px] font-semibold transition \${statusFilter === s ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}">\${s}</button>
                \`).join('')}
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <th class="font-medium pb-2">SKU ID</th>
                    <th class="font-medium pb-2">Material Description</th>
                    <th class="font-medium pb-2">Category</th>
                    <th class="font-medium pb-2">Allocated Line</th>
                    <th class="font-medium pb-2 text-right">Stock Level</th>
                    <th class="font-medium pb-2 text-right">Reorder Threshold</th>
                    <th class="font-medium pb-2 text-center">Status</th>
                    <th class="font-medium pb-2 text-right">Sim Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/80">
                  \${items.map(it => {
                    const badge = it.status === 'In Stock'
                      ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">In Stock</span>'
                      : it.status === 'Low Stock'
                      ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">Low Stock</span>'
                      : '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">Reorder Needed</span>';

                    return \`
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <td class="py-2.5 font-mono font-bold text-slate-900 dark:text-white">\${it.id}</td>
                        <td class="py-2.5 font-medium text-slate-800 dark:text-slate-200">\${it.name}</td>
                        <td class="py-2.5 text-slate-500">\${it.category}</td>
                        <td class="py-2.5 font-mono text-slate-500">\${it.line}</td>
                        <td class="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">\${it.stockQty.toLocaleString()} \${it.unit}</td>
                        <td class="py-2.5 text-right font-mono text-slate-400">\${it.reorderThreshold.toLocaleString()} \${it.unit}</td>
                        <td class="py-2.5 text-center">\${badge}</td>
                        <td class="py-2.5 text-right">
                          <button type="button" onclick="openAdjustStockModal('\${it.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] transition">
                            Adjust Stock ⚙️
                          </button>
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
    // VIEW 12: SIMULATION CONTROL CENTER (Live Canonical Engine & Scenarios)
    // ----------------------------------------------------------------------------
    function renderSimulationControlCenterView(m) {
      const isDark = document.documentElement.classList.contains('dark') || AppState.theme === 'dark';
      const spd = AppState.simSpeed || 1;

      return \`
        <div class="space-y-5">
          <!-- Live Simulation Header -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 border border-emerald-500/30 text-white shadow-xl">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/30">
                🎛️
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-lg font-extrabold tracking-tight">Simulation Control Center</h1>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold \${AppState.simRunning ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'}">
                    <span class="w-1.5 h-1.5 rounded-full \${AppState.simRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}"></span>
                    <span>\${AppState.simRunning ? 'ENGINE RUNNING (LIVE)' : 'ENGINE PAUSED'}</span>
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/80 text-sky-300 border border-sky-500/30">ALL 13 VIEWS SYNCED</span>
                </div>
                <p class="text-xs text-slate-300 mt-1">Deterministic PRNG Seed #\${AppState.simSeed} driving real-time telemetry, 3D digital twin, and financial forecasts.</p>
              </div>
            </div>

            <!-- Operations Bar -->
            <div class="flex items-center gap-2 flex-wrap text-xs">
              <a href="simulation.html" target="_blank" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-semibold text-[11px] transition flex items-center gap-1.5">
                <span>Open Standalone ↗</span>
              </a>
              <button type="button" onclick="toggleSimulationPlay()" class="px-3.5 py-1.5 rounded-xl font-bold transition shadow-xs \${AppState.simRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}">
                \${AppState.simRunning ? '⏸ Pause Engine' : '▶ Resume Engine'}
              </button>
              <button type="button" onclick="stepSimulationForward()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition">
                ⏭ +1 Tick
              </button>
              <div class="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                \${[1, 2, 5].map(s => \`
                  <button type="button" onclick="setSimulationSpeed(\${s})" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold transition \${spd === s ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">\${s}x</button>
                \`).join('')}
              </div>
              <button type="button" onclick="promptResetSimulation()" class="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 font-semibold transition">
                🔄 Reset
              </button>
            </div>
          </div>

          <!-- Live Telemetry KPI Strip -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Substation Load</div>
              <div class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">1,910 kW</div>
              <div class="text-[9px] text-slate-400 font-mono">2,076 kVA • PF 0.92</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Live Fleet Power</div>
              <div class="text-base font-extrabold text-emerald-600 mt-0.5">\${formatNum(m.totalCurrentKw, 1)} kW</div>
              <div class="text-[9px] text-slate-400 font-mono">18 Units Monitored</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Machine Availability</div>
              <div class="text-base font-extrabold text-sky-600 mt-0.5">\${formatNum(m.availabilityPct, 1)}%</div>
              <div class="text-[9px] text-emerald-600 font-mono">Real-time dynamic</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Simulation Clock</div>
              <div class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 font-mono">Tick #\${AppState.simTickCount}</div>
              <div class="text-[9px] text-slate-400 font-mono">\${AppState.lastUpdateTimestamp.split(' ')[1] || '05:04:19'}</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Accrued Savings</div>
              <div class="text-base font-extrabold text-emerald-600 mt-0.5">৳ \${formatNum(m.estimatedSavingsBdt, 0)}</div>
              <div class="text-[9px] text-slate-400 font-mono">Realized live</div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/90 dark:border-slate-800">
              <div class="text-[10px] text-slate-500 font-medium">Avoidable Carbon</div>
              <div class="text-base font-extrabold text-teal-600 mt-0.5">🌱 \${formatNum(m.totalRecSavedCo2, 2)} t</div>
              <div class="text-[9px] text-slate-400 font-mono">tCO₂e / month</div>
            </div>
          </div>

          <!-- Simulation Scenarios Grid (6 Scenarios) -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-sm font-bold text-slate-900 dark:text-white">Deterministic Simulation Scenarios (6 Modes)</h2>
                <p class="text-[11px] text-slate-500">Inject operational events to verify how Green Factory Brain AI responds and protects factory margins.</p>
              </div>
              <span class="text-xs font-mono text-slate-400">Current: <strong class="text-emerald-600 uppercase">\${AppState.activeScenario}</strong></span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              \${[
                { id: 'baseline', title: '1. Normal Baseline Operations', desc: 'Standard production day across all 18 machines at 52,300 kWh/mo.', badge: 'Standard', color: 'emerald' },
                { id: 'night_idle', title: '2. Night-Shift Idle Waste', desc: 'Sewing Line 3 left running after-hours (+14% idle drain).', badge: 'Waste Anomaly', color: 'amber' },
                { id: 'compressor_leak', title: '3. Compressed Air Leak', desc: 'COMP-01 header leaks air (+18.5 kW duty cycle spike).', badge: 'Pneumatic Fault', color: 'amber' },
                { id: 'machine_overload', title: '4. Cutting Machine Overload', desc: 'Vacuum blower MCH-CUT-02 spikes to 24.6 kW / 68.4°C thermal trip.', badge: 'Thermal Critical', color: 'rose' },
                { id: 'shift_change', title: '5. Shift Change Handover', desc: 'Day to Night transition: machines cycle through standby and idle.', badge: 'Operational', color: 'sky' },
                { id: 'production_surge', title: '6. Production Surge (+22%)', desc: 'Rush export order: all lines running at 105% capacity with peak tariff.', badge: 'Heavy Load', color: 'indigo' }
              ].map(sc => {
                const isActive = AppState.activeScenario === sc.id;
                return \`
                  <div onclick="promptScenarioChange('\${sc.id}')" class="cursor-pointer p-4 rounded-xl border transition flex flex-col justify-between \${isActive ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-xs ring-1 ring-emerald-500' : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/40 border-slate-200 dark:border-slate-700'}">
                    <div>
                      <div class="flex items-center justify-between gap-1 mb-1.5">
                        <h3 class="text-xs font-bold text-slate-900 dark:text-white">\${sc.title}</h3>
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">\${sc.badge}</span>
                      </div>
                      <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">\${sc.desc}</p>
                    </div>
                    <div class="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                      <span class="font-semibold \${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}">\${isActive ? '✓ Active Scenario' : 'Click to Activate'}</span>
                      <span class="text-xs">⚡</span>
                    </div>
                  </div>
                \`;
              }).join('')}
            </div>
          </div>
        </div>
      \`;
    }

    function renderSimulationControlView(m) {
      return renderSimulationControlCenterView(m);
    }

    // ----------------------------------------------------------------------------
    // VIEW 13: SETTINGS & ORCHESTRATION & AUTH
    // ----------------------------------------------------------------------------
    function renderSettingsView(m) {
      const a = AppState.assumptions || {};

      return \`
        <div class="space-y-5">
          <!-- Header -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl font-extrabold text-slate-900 dark:text-white">⚙️ Settings, Orchestration &amp; Auth</h1>
                \${renderDataBadge('SIMULATION')}
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Enterprise credentials, domain assumptions, AI orchestration gateway, and graphics rendering modes.</p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="toggleLoginPortalModal(true)" class="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5">
                <span>🔒 Lock Session / Re-Login</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Card 1: ORCHESTRATION & AUTH -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">🔐</span>
                  <div>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Orchestration &amp; Authentication</h2>
                    <p class="text-[10px] text-slate-400">Operator profile and AI model credentials</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Active Operator</span>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <div class="text-[11px] text-slate-500">Current Operator Profile</div>
                  <div class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">\${AppState.currentUser.name} (\${AppState.currentUser.role})</div>
                  <div class="text-[10px] text-slate-400 font-mono">\${AppState.currentUser.email}</div>
                </div>

                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div class="text-[11px] font-bold text-slate-800 dark:text-slate-200">AI Orchestration Gateway</div>
                  <div class="grid grid-cols-2 gap-2 text-[11px]">
                    <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                      <div class="text-slate-400">Target Model</div>
                      <div class="font-bold text-slate-900 dark:text-white">Claude 3.5 Sonnet / SLM</div>
                    </div>
                    <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                      <div class="text-slate-400">Temperature</div>
                      <div class="font-bold text-slate-900 dark:text-white">0.20 (Deterministic)</div>
                    </div>
                  </div>
                  <div class="text-[10px] text-slate-500 font-mono truncate">API Endpoint: https://api.greenfactorybrain.ai/v1 (Local Mock Mode)</div>
                </div>
              </div>
            </div>

            <!-- Card 2: DOMAIN ASSUMPTIONS & FINANCIAL TARIFFS -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm font-bold">⚡</span>
                  <div>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Tariffs &amp; Carbon Emission Factors</h2>
                    <p class="text-[10px] text-slate-400">Single Source of Truth parameters</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Editable</span>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <label class="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Grid Electricity Tariff (BDT/kWh):</label>
                  <div class="flex items-center gap-2 mt-1">
                    <input id="settings-tariff-input" type="number" step="0.1" value="\${a.tariffBdtPerKwh}" class="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold w-32" />
                    <button type="button" onclick="updateTariffAssumption(document.getElementById('settings-tariff-input').value)" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition">
                      Update Tariff
                    </button>
                  </div>
                </div>

                <div>
                  <label class="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Grid Emission Factor (kg CO₂e/kWh):</label>
                  <div class="flex items-center gap-2 mt-1">
                    <input id="settings-grid-input" type="number" step="0.01" value="\${a.gridEmissionFactorKgPerKwh}" class="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold w-32" />
                    <button type="button" onclick="updateGridFactorAssumption(document.getElementById('settings-grid-input').value)" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition">
                      Update Factor
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3: DIGITAL TWIN & VISUAL MODES -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-sm font-bold">🧊</span>
                  <div>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Digital Twin &amp; Visual Modes</h2>
                    <p class="text-[10px] text-slate-400">WebGL rendering fallback and theme options</p>
                  </div>
                </div>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <div class="text-[11px] text-slate-500 mb-1.5">Default EPMS Digital Twin Engine:</div>
                  <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                    \${['3d', '2d', 'sld'].map(mMode => \`
                      <button type="button" onclick="setEpmsViewMode('\${mMode}')" class="px-3 py-1.5 rounded-md text-[11px] font-semibold uppercase transition \${AppState.epmsViewMode === mMode ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}">\${mMode}</button>
                    \`).join('')}
                  </div>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span class="text-slate-600 dark:text-slate-300">Theme Mode:</span>
                  <button type="button" onclick="toggleThemeMode()" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">Toggle Light / Dark ☀️</button>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span class="text-slate-600 dark:text-slate-300">System Language:</span>
                  <div class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold">
                    <button type="button" onclick="setLanguage('en')" class="px-2.5 py-1 rounded \${AppState.language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">English</button>
                    <button type="button" onclick="setLanguage('bn')" class="px-2.5 py-1 rounded \${AppState.language === 'bn' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">বাংলা</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 4: AUDIT LOG & MAINTENANCE -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">📜</span>
                  <div>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Audit Trail &amp; Reset</h2>
                    <p class="text-[10px] text-slate-400">Traceable operator actions and data governance</p>
                  </div>
                </div>
              </div>

              <div class="space-y-3 text-xs">
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-[11px] text-slate-500 font-mono">
                  Active Activity Entries: <strong>\${(AppState.activityLog || []).length} logged actions</strong>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <button type="button" onclick="promptResetSimulation()" class="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition">
                    Reset to Baseline Seed
                  </button>
                  <button type="button" onclick="downloadActivityAuditLogCsv()" class="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition">
                    Export Audit CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // ----------------------------------------------------------------------------
    // VIEW 14: AI AGENT CONSOLE (6 Rule-Based Simulation Agents)
    // ----------------------------------------------------------------------------
    function renderAgentConsoleView(m) {
      const agents = AppState.agents || [];

      return \`
        <div class="space-y-5">
          <!-- Header -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl font-extrabold text-slate-900 dark:text-white">🤖 AI Agent Console (6 Rule-Based Agents)</h1>
                \${renderDataBadge('ORCHESTRATOR')}
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Deterministic multi-agent pipeline executing closed-loop detect, explain, recommend, act, and verify workflows.</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <button type="button" onclick="runFullAgentWorkflow()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5">
                <span>▶ Run Full 6-Agent Pipeline</span>
              </button>
            </div>
          </div>

          <!-- Top Pipeline Banner -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">⚡</span>
              <div>
                <div class="text-xs font-bold">Deterministic Closed-Loop Architecture</div>
                <div class="text-[11px] text-slate-300">6 Agents Active • 5 Fully Automated • 1 Human Approval Gate • 100% Deterministic Reproducibility</div>
              </div>
            </div>
            <div class="text-xs font-mono text-emerald-400">
              Shared State: \${formatNum(m.totalPeriodKwh)} kWh Total
            </div>
          </div>

          <!-- 6 Agent Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            \${agents.map((ag, idx) => {
              const isApproval = ag.requiresApproval && ag.status === 'Awaiting Approval';
              const badgeClass = isApproval
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';

              return \`
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <div class="flex items-start justify-between gap-2 mb-2">
                      <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">\${idx + 1}</span>
                        <div>
                          <h3 class="text-xs font-bold text-slate-900 dark:text-white leading-tight">\${ag.name}</h3>
                          <div class="text-[10px] text-slate-400 font-mono">\${ag.id}</div>
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 \${badgeClass}">\${ag.status}</span>
                    </div>

                    <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mb-2">\${ag.purpose}</p>

                    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-[10px] font-mono">
                      <div><span class="text-slate-400">Trigger:</span> <span class="text-slate-700 dark:text-slate-300">\${ag.trigger}</span></div>
                      <div><span class="text-slate-400">Run ID:</span> <span class="text-emerald-600 font-bold">\${ag.lastRunId}</span></div>
                      <div class="truncate"><span class="text-slate-400">Output:</span> <span class="text-slate-700 dark:text-slate-300">\${ag.outputSummary}</span></div>
                    </div>
                  </div>

                  <!-- Steps List -->
                  <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">Execution Steps:</div>
                    <ul class="text-[10px] text-slate-500 space-y-0.5 list-disc pl-3">
                      \${(ag.steps || []).slice(0, 3).map(st => \`<li class="truncate">\${st}</li>\`).join('')}
                    </ul>
                  </div>

                  <!-- Action -->
                  <button type="button" onclick="runIndividualAgent('\${ag.id}')" class="w-full py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 hover:text-emerald-700 font-semibold text-xs border border-slate-200/70 dark:border-slate-700 transition">
                    Run \${ag.name} Individually ⚡
                  </button>
                </div>
              \`;
            }).join('')}
          </div>
        </div>
      \`;
    }
`;

// Insert the views right before function renderActiveView()
const insertTarget = 'function renderActiveView() {';
if (!html.includes('function renderInventoryProductionView')) {
  html = html.replace(insertTarget, viewsCode + '\n    ' + insertTarget);
  console.log('✓ Successfully injected all 4 view functions into preview/index.html');
}

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('preview/index.html updated successfully.');
