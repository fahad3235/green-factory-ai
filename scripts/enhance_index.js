import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('preview/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Ensure 'simulation' and 'login' are in VALID_ROUTES
const validRoutesTarget = `    const VALID_ROUTES = [
      'dashboard',
      'energy-analytics',
      'factory-operations',
      'bill-carbon-forecast',
      'ai-recommendations',
      'savings-tracker',
      'carboniq-report',
      'sustainability-reports',
      'machine-monitoring',
      'digital-twin',
      'inventory-production',
      'settings',
      'agent-console'
    ];`;

const validRoutesReplacement = `    const VALID_ROUTES = [
      'dashboard',
      'energy-analytics',
      'factory-operations',
      'bill-carbon-forecast',
      'ai-recommendations',
      'savings-tracker',
      'carboniq-report',
      'sustainability-reports',
      'machine-monitoring',
      'digital-twin',
      'inventory-production',
      'simulation',
      'settings',
      'agent-console',
      'login'
    ];`;

if (content.includes(validRoutesTarget)) {
  content = content.replace(validRoutesTarget, validRoutesReplacement);
  console.log('✓ Updated VALID_ROUTES with simulation and login');
}

// 2. Ensure renderActiveView handles 'simulation' and 'login'
const activeViewTarget = `      switch (AppState.activeRoute) {
        case 'dashboard': html = renderDashboardView(m); break;
        case 'energy-analytics': html = renderEnergyAnalyticsView(m); break;
        case 'factory-operations': html = renderFactoryOperationsView(m); break;
        case 'bill-carbon-forecast': html = renderBillCarbonForecastView(m); break;
        case 'ai-recommendations': html = renderAiRecommendationsView(m); break;
        case 'savings-tracker': html = renderSavingsTrackerView(m); break;
        case 'carboniq-report': html = renderCarbonIqReportView(m); break;
        case 'sustainability-reports': html = renderSustainabilityReportsView(m); break;
        case 'machine-monitoring': html = renderMachineMonitoringView(m); break;
        case 'digital-twin': html = renderDigitalTwinView(m); break;
        case 'inventory-production': html = renderInventoryProductionView(m); break;
        case 'settings': html = renderSettingsView(m); break;
        case 'agent-console': html = renderAgentConsoleView(m); break;
        default: html = renderNotFoundView(); break;
      }`;

const activeViewReplacement = `      switch (AppState.activeRoute) {
        case 'dashboard': html = renderDashboardView(m); break;
        case 'energy-analytics': html = renderEnergyAnalyticsView(m); break;
        case 'factory-operations': html = renderFactoryOperationsView(m); break;
        case 'bill-carbon-forecast': html = renderBillCarbonForecastView(m); break;
        case 'ai-recommendations': html = renderAiRecommendationsView(m); break;
        case 'savings-tracker': html = renderSavingsTrackerView(m); break;
        case 'carboniq-report': html = renderCarbonIqReportView(m); break;
        case 'sustainability-reports': html = renderSustainabilityReportsView(m); break;
        case 'machine-monitoring': html = renderMachineMonitoringView(m); break;
        case 'digital-twin': html = renderDigitalTwinView(m); break;
        case 'inventory-production': html = renderInventoryProductionView(m); break;
        case 'simulation': html = renderSimulationControlCenterView(m); break;
        case 'settings': html = renderSettingsView(m); break;
        case 'agent-console': html = renderAgentConsoleView(m); break;
        case 'login':
          toggleLoginPortalModal(true);
          html = renderDashboardView(m);
          break;
        default: html = renderNotFoundView(); break;
      }`;

if (content.includes(activeViewTarget)) {
  content = content.replace(activeViewTarget, activeViewReplacement);
  console.log('✓ Updated renderActiveView switch with simulation and login');
}

// 3. Update window.onload to start from the login page by default
const onloadTarget = `    window.onload = function() {
      const initHash = window.location.hash.replace(/^#\\/?/, '');
      if (initHash && VALID_ROUTES.includes(initHash)) {
        AppState.activeRoute = initHash;
      } else {
        AppState.activeRoute = 'dashboard';
      }
      renderActiveView();
      startOrUpdateSimulationTimer();
    };`;

const onloadReplacement = `    window.onload = function() {
      const initHash = window.location.hash.replace(/^#\\/?/, '');
      const hasAuth = sessionStorage.getItem('gfb_authenticated') === 'true';

      // The user requires: "First the website start from the login page"
      if (!hasAuth || initHash === 'login') {
        AppState.activeRoute = 'dashboard';
        toggleLoginPortalModal(true);
      } else if (initHash && VALID_ROUTES.includes(initHash)) {
        AppState.activeRoute = initHash;
        toggleLoginPortalModal(false);
      } else {
        AppState.activeRoute = 'dashboard';
        toggleLoginPortalModal(false);
      }

      renderActiveView();
      startOrUpdateSimulationTimer();
    };`;

if (content.includes(onloadTarget)) {
  content = content.replace(onloadTarget, onloadReplacement);
  console.log('✓ Updated window.onload to start from login page');
}

// 4. Update handleDemoSignIn to set sessionStorage and close modal
const handleSignInTarget = `    function handleDemoSignIn(e) {
      e.preventDefault();
      const sel = document.getElementById('demo-persona-select');
      if (sel && sel.value) {
        const [name, role, email] = sel.value.split('|');
        AppState.currentUser = { name, role, email };
        const nEl = document.getElementById('active-user-name');
        const rEl = document.getElementById('active-user-role');
        if (nEl) nEl.textContent = name;
        if (rEl) rEl.textContent = role;
        logActivity(name, \`Switched active demo operator persona to \${name} (\${role}).\`);
      }
      toggleLoginPortalModal(false);
      showToast(\`Signed in to demo session as \${AppState.currentUser.name}.\`, 'success');
    }`;

const handleSignInReplacement = `    function handleDemoSignIn(e) {
      if (e) e.preventDefault();
      sessionStorage.setItem('gfb_authenticated', 'true');
      AppState.isLoggedIn = true;
      const sel = document.getElementById('demo-persona-select');
      if (sel && sel.value) {
        const [name, role, email] = sel.value.split('|');
        AppState.currentUser = { name, role, email };
        const nEl = document.getElementById('active-user-name');
        const rEl = document.getElementById('active-user-role');
        if (nEl) nEl.textContent = name;
        if (rEl) rEl.textContent = role;
        logActivity(name, \`Signed in to factory platform as \${name} (\${role}).\`);
      }
      toggleLoginPortalModal(false);
      showToast(\`Welcome back, \${AppState.currentUser.name}! Factory dashboard online.\`, 'success');
      navigateTo('dashboard');
    }

    function simulatePasskeyDemoSignIn() {
      sessionStorage.setItem('gfb_authenticated', 'true');
      AppState.isLoggedIn = true;
      toggleLoginPortalModal(false);
      showToast('Demo Passkey biometric simulation verified. Welcome to Rupsha Garments dashboard.', 'success');
      navigateTo('dashboard');
    }

    function handleSignOut() {
      sessionStorage.removeItem('gfb_authenticated');
      AppState.isLoggedIn = false;
      toggleLoginPortalModal(true);
      showToast('Signed out of session. Returned to sign-in portal.', 'info');
    }`;

if (content.includes(handleSignInTarget)) {
  content = content.replace(handleSignInTarget, handleSignInReplacement);
  console.log('✓ Updated handleDemoSignIn and added handleSignOut');
}

// 5. Add renderSimulationControlCenterView implementation
const renderSimViewCode = `
    // ----------------------------------------------------------------------------
    // VIEW 12: SIMULATION CONTROL CENTER (Unified Canonical State Engine)
    // ----------------------------------------------------------------------------
    function renderSimulationControlCenterView(m) {
      const a = AppState.assumptions;
      const hour = AppState.simClockHour !== undefined ? AppState.simClockHour : 9;
      const min = AppState.simClockMin !== undefined ? AppState.simClockMin : (AppState.simTickCount * 15) % 60;
      const pad = n => String(n).padStart(2, '0');
      const timeStr = \`\${pad(hour)}:\${pad(min)}\`;
      const isNight = hour >= 22 || hour < 6 || AppState.activeScenario === 'night_idle';
      const isSurge = AppState.activeScenario === 'production_surge';
      const isOutage = AppState.simOutage || false;
      const totalKw = m.totalCurrentKw;
      const peakKw = Math.max(m.totalCurrentKw, 199.2);

      const m3 = AppState.fleet.find(x => x.id === 'MCH-SEW-03') || AppState.fleet[2];
      const boiler = AppState.fleet.find(x => x.id === 'BOIL-01') || AppState.fleet[16];
      const comp = AppState.fleet.find(x => x.id === 'COMP-01') || AppState.fleet[15];
      const cutter = AppState.fleet.find(x => x.id === 'MCH-CUT-02') || AppState.fleet[9];

      return \`
        <!-- SIMULATION CONTROL CENTER HEADER -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 border border-emerald-500/30 text-white shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-emerald-500/30">
              🎛️
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-lg font-extrabold tracking-tight">Simulation Control Center</h1>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>\${AppState.simRunning ? 'ENGINE RUNNING' : 'ENGINE PAUSED'}</span>
                </span>
                <span class="badge-sim px-2 py-0.5 rounded text-[10px] font-mono">ALL 13 VIEWS SYNCED</span>
              </div>
              <p class="text-xs text-slate-300 mt-0.5">Canonical simulation engine feeds Dashboard, 3D Digital Twin, Machine Monitoring, Analytics, and AI Copilot in real time.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-wrap text-xs">
            <a href="simulation.html" target="_blank" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-semibold text-[11px] transition flex items-center gap-1.5">
              <span>Open Standalone Console ↗</span>
            </a>
            <button type="button" onclick="toggleSimulationPlay()" class="px-3 py-1.5 rounded-xl \${AppState.simRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white font-semibold text-[11px] transition">
              \${AppState.simRunning ? '❚❚ Pause Engine' : '▶ Resume Engine'}
            </button>
            <button type="button" onclick="stepSimulationForward()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-[11px] transition">
              ⏭ +1 hr Step
            </button>
            <button type="button" onclick="openResetDemoModal()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-200 border border-slate-700 font-semibold text-[11px] transition">
              ↺ Reset
            </button>
          </div>
        </div>

        <!-- 4-STEP INTERACTIVE DATA FLOW PIPELINE -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Step 1 · Data Source</div>
            <div class="text-sm font-extrabold text-slate-800 dark:text-white">Simulated Meters</div>
            <p class="text-xs text-slate-500">18 virtual clamp meters generating synthetic load signals.</p>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-300">
              ⚡ \${formatNum(totalKw, 1)} kW total draw
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Step 2 · Engine</div>
            <div class="text-sm font-extrabold text-slate-800 dark:text-white">Canonical Store</div>
            <p class="text-xs text-slate-500">Advances factory time, shift models, faults &amp; tariffs.</p>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-semibold text-sky-600 dark:text-sky-300">
              ⏱ Tick #\${AppState.simTickCount} · \${AppState.simSpeed}x Speed
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Step 3 · API Feed</div>
            <div class="text-sm font-extrabold text-slate-800 dark:text-white">JSON Push Layer</div>
            <p class="text-xs text-slate-500">Exposes 4 live endpoints: /energy, /machines, /forecast, /alerts.</p>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-semibold text-teal-600 dark:text-teal-300">
              📡 POST /api/energy → 200 OK
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div class="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Step 4 · Main Platform</div>
            <div class="text-sm font-extrabold text-slate-800 dark:text-white">All 13 Views Live</div>
            <p class="text-xs text-slate-500">Dashboard, 3D Digital Twin, Analytics &amp; Copilot read from here.</p>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-300">
              ✓ Synchronized in real time
            </div>
          </div>
        </div>

        <!-- MAIN SIMULATION CONTROL GRID (3 COLUMNS) -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">

          <!-- LEFT COLUMN: Engine Transport, Scenarios & Global Inputs -->
          <div class="xl:col-span-4 space-y-4">

            <!-- Card 1: Clock & Transport -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>⏱️</span> Simulation Clock &amp; Speed
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  TICK #\${AppState.simTickCount}
                </span>
              </div>

              <div class="text-center py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div class="text-3xl font-mono font-extrabold text-slate-900 dark:text-white tracking-wider">\${timeStr} BST</div>
                <div class="flex items-center justify-center gap-2 mt-1">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase \${isNight ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'}">
                    \${isNight ? '🌙 NIGHT SHIFT (22:00–06:00)' : '🌤️ DAY SHIFT (06:00–22:00)'}
                  </span>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Engine Speed Multiplier</label>
                <div class="grid grid-cols-4 gap-1.5">
                  \${[1, 2, 5, 12].map(spd => \`
                    <button type="button" onclick="changeSimulationSpeed(\${spd})" class="py-1.5 rounded-lg text-xs font-mono font-bold transition \${AppState.simSpeed === spd ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}">
                      \${spd}×
                    </button>
                  \`).join('')}
                </div>
              </div>
            </div>

            <!-- Card 2: 1-Click Scenario Presets (Master Requirement) -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>⚡</span> Scenario Presets
                </span>
                <span class="text-[10px] text-slate-400">1-Click Trigger</span>
              </div>
              <p class="text-[11px] text-slate-500">Every scenario updates machine telemetry, the 3D twin, alarms, and the AI Copilot context simultaneously.</p>

              <div class="space-y-2">
                <button type="button" onclick="promptScenarioChange('night_idle')" class="w-full text-left p-2.5 rounded-xl border transition \${AppState.activeScenario === 'night_idle' ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200' : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500'}">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs flex items-center gap-1.5">🌙 Night Shift — Machine 3 Waste</span>
                    <span class="text-[10px] font-mono text-rose-500 font-bold">38.0 kW Idle</span>
                  </div>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Sets MCH-SEW-03 to idle draw with zero output; fires critical waste alarm; drains savings.</p>
                </button>

                <button type="button" onclick="promptScenarioChange('production_surge')" class="w-full text-left p-2.5 rounded-xl border transition \${AppState.activeScenario === 'production_surge' ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200' : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500'}">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs flex items-center gap-1.5">📈 Peak Demand Surge (+25%)</span>
                    <span class="text-[10px] font-mono text-amber-500 font-bold">Risk: &gt;218 kW</span>
                  </div>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Multiplies all active loads by 1.25x. Breaching 218 kW contract peak triggers demand charge.</p>
                </button>

                <button type="button" onclick="promptScenarioChange('maintenance_downtime')" class="w-full text-left p-2.5 rounded-xl border transition \${AppState.activeScenario === 'maintenance_downtime' ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200' : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500'}">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs flex items-center gap-1.5">🔧 Machine Breakdown — Boiler System</span>
                    <span class="text-[10px] font-mono text-rose-500 font-bold">0 kW · Health 31</span>
                  </div>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Boiler halts; steam temperature falls; 3D Digital Twin glows red; alarm triggers.</p>
                </button>

                <button type="button" onclick="triggerGridPowerCut()" class="w-full text-left p-2.5 rounded-xl border transition \${isOutage ? 'bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-200' : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500'}">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs flex items-center gap-1.5">🔌 Grid Power Cut (Outage)</span>
                    <span class="text-[10px] font-mono \${isOutage ? 'text-rose-400' : 'text-slate-400'} font-bold">\${isOutage ? 'GENERATOR ONLY' : 'Normal'}</span>
                  </div>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Simulates grid failure; production lines drop to 0 kW; generator powers lighting only.</p>
                </button>

                <button type="button" onclick="promptScenarioChange('baseline')" class="w-full text-left p-2.5 rounded-xl border transition \${AppState.activeScenario === 'baseline' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-200' : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-emerald-500'}">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs flex items-center gap-1.5">🌤️ Normal Baseline Operations</span>
                    <span class="text-[10px] font-mono text-emerald-500 font-bold">Nominal</span>
                  </div>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Clears all faults, outages, and overrides. Returns factory to smooth balanced operation.</p>
                </button>
              </div>

              <button type="button" onclick="run60SecJudgeStory()" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5">
                <span>▶ Run 60-Second Judge Story</span>
              </button>
              <p class="text-[10px] text-slate-400 text-center">Autonomous walk: Night waste → Alarm fired → AI recommendation applied → Verified savings increase.</p>
            </div>

            <!-- Card 3: Global Inputs (Tariff, Target, Production) -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3.5">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>⚙️</span> Global Parameters
                </span>
                <span class="badge-est px-2 py-0.5 rounded text-[10px] font-mono">LIVE PROPAGATION</span>
              </div>

              <!-- Tariff Slider -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-slate-600 dark:text-slate-300">Electricity Tariff</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-mono">৳\${formatNum(a.tariffBdtPerKwh, 2)} /kWh</span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="20.0"
                  step="0.05"
                  value="\${a.tariffBdtPerKwh}"
                  oninput="updateSimTariff(this.value)"
                  class="w-full accent-emerald-500 cursor-pointer"
                />
                <div class="text-[10px] text-slate-400 mt-0.5">Blended industrial rate. Changing this instantly recalculates bills across all 13 views.</div>
              </div>

              <!-- Monthly Savings Target Slider -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-slate-600 dark:text-slate-300">Savings Target (BDT)</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-mono">৳ \${formatNum(a.savingsPlanTargetBdt, 0)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="150000"
                  step="5000"
                  value="\${a.savingsPlanTargetBdt}"
                  oninput="updateSimSavingsTarget(this.value)"
                  class="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <!-- Production Capacity Slider -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-slate-600 dark:text-slate-300">Daily Production Target</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-mono">\${formatNum(a.dailyCapacityPcs, 0)} pcs</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value="\${a.dailyCapacityPcs}"
                  oninput="updateSimCapacity(this.value)"
                  class="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

          </div>

          <!-- CENTER COLUMN: Virtual Meters, Live Chart & Engine Logs -->
          <div class="xl:col-span-5 space-y-4">

            <!-- Card 4: Simulated Meters Fleet Table -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>📊</span> Virtual Sub-Meters Fleet
                  </h3>
                  <div class="text-[10px] text-slate-400">Rupsha Garments Ltd. • 18 Metred Industrial Assets</div>
                </div>
                <span class="badge-sim px-2 py-0.5 rounded text-[10px] font-mono">
                  \${AppState.fleet.filter(x => x.status === 'Running').length} / \${AppState.fleet.length} ONLINE
                </span>
              </div>

              <div class="overflow-x-auto custom-scroll max-h-72">
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="text-[10px] font-mono uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      <th class="pb-1.5">Meter / Asset</th>
                      <th class="pb-1.5">Status</th>
                      <th class="pb-1.5 text-right">kW Now</th>
                      <th class="pb-1.5 text-right">kWh Month</th>
                      <th class="pb-1.5 text-right">Health</th>
                      <th class="pb-1.5 text-center">Sim Control</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    \${AppState.fleet.slice(0, 9).map(u => {
                      const loadPct = u.ratedKw ? Math.min(100, Math.round((u.currentKw / u.ratedKw) * 100)) : 0;
                      const isFault = u.status === 'Fault';
                      return \`
                        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
                          <td class="py-2 pr-2">
                            <div class="font-semibold text-slate-900 dark:text-white truncate max-w-[140px]">\${u.name.split(' (')[0]}</div>
                            <div class="text-[10px] text-slate-400 font-mono">\${u.id} · \${u.dept}</div>
                          </td>
                          <td class="py-2 pr-2">
                            <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold \${
                              u.status === 'Running' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' :
                              u.status === 'Idle' ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300' :
                              'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                            }">\${u.status}</span>
                          </td>
                          <td class="py-2 pr-2 text-right font-mono font-bold \${u.currentKw > (u.ratedKw * 0.95) ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}">
                            \${formatNum(u.currentKw, 1)}
                          </td>
                          <td class="py-2 pr-2 text-right font-mono text-slate-600 dark:text-slate-300">
                            \${formatNum(u.periodKwh, 0)}
                          </td>
                          <td class="py-2 pr-2 text-right">
                            <span class="font-mono text-xs font-semibold \${u.healthScore > 85 ? 'text-emerald-500' : u.healthScore > 70 ? 'text-amber-500' : 'text-rose-500'}">
                              \${u.healthScore}
                            </span>
                          </td>
                          <td class="py-2 text-center">
                            <button type="button" onclick="toggleSimMachineFault('\${u.id}')" class="px-2 py-0.5 rounded text-[10px] font-semibold border transition \${
                              isFault ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25' : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                            }">
                              \${isFault ? 'Repair' : 'Fault'}
                            </button>
                          </td>
                        </tr>
                      \`;
                    }).join('')}
                  </tbody>
                </table>
              </div>

              <!-- Meter Total Footer -->
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-200">TOTAL SIMULATED DRAW</span>
                <span class="text-sm font-mono font-extrabold text-emerald-600 dark:text-emerald-400">\${formatNum(totalKw, 1)} kW</span>
                <span class="text-[11px] text-slate-400">Contract Peak: 218.0 kW</span>
              </div>
            </div>

            <!-- Card 5: Live Factory Load Chart (SVG) -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>📈</span> Real-Time Factory Load (Last 60 Ticks)
                </span>
                <span class="text-[10px] font-mono text-emerald-500">Live Telemetry</span>
              </div>

              <div class="h-44 w-full relative">
                <svg viewBox="0 0 600 180" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="simLoadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#10B981" stop-opacity="0.35"/>
                      <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <!-- 218 kW Contract Peak Line -->
                  <line x1="0" y1="45" x2="600" y2="45" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4 4"/>
                  <text x="590" y="40" text-anchor="end" fill="#F59E0B" font-size="10" font-family="JetBrains Mono">218 kW Contract Peak</text>

                  <!-- Simulated Area Curve -->
                  <polygon points="0,180 0,110 50,115 100,105 150,95 200,90 250,100 300,85 350,80 400,95 450,75 500,65 550,70 600,60 600,180" fill="url(#simLoadGrad)"/>
                  <polyline points="0,110 50,115 100,105 150,95 200,90 250,100 300,85 350,80 400,95 450,75 500,65 550,70 600,60" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="600" cy="60" r="4" fill="#34D399"/>
                </svg>
              </div>

              <div class="grid grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div class="text-[10px] text-slate-400">Live Draw</div>
                  <div class="font-mono font-bold text-slate-900 dark:text-white">\${formatNum(totalKw, 1)} kW</div>
                </div>
                <div>
                  <div class="text-[10px] text-slate-400">Peak Today</div>
                  <div class="font-mono font-bold text-amber-500">\${formatNum(peakKw, 1)} kW</div>
                </div>
                <div>
                  <div class="text-[10px] text-slate-400">Power Factor</div>
                  <div class="font-mono font-bold text-sky-500">0.92 PF</div>
                </div>
                <div>
                  <div class="text-[10px] text-slate-400">Contract Margin</div>
                  <div class="font-mono font-bold text-emerald-500">\${formatNum(Math.max(0, 218 - totalKw), 1)} kW</div>
                </div>
              </div>
            </div>

            <!-- Card 6: Live Engine Terminal Logs -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>💻</span> Engine Event Stream
                </span>
                <span class="text-[10px] font-mono text-slate-400">Live Terminal</span>
              </div>
              <div class="bg-navy-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 max-h-32 overflow-y-auto text-emerald-400 custom-scroll">
                <div><span class="text-slate-500">[\${timeStr}]</span> <span class="text-emerald-300">✓ Simulation engine initialized with deterministic PRNG Seed #20261018</span></div>
                <div><span class="text-slate-500">[\${timeStr}]</span> <span class="text-sky-300">📡 Telemetry bus connected to all 18 machine sensors</span></div>
                <div><span class="text-slate-500">[\${timeStr}]</span> <span class="text-amber-300">ℹ Active scenario: \${AppState.activeScenario.toUpperCase()}</span></div>
                <div><span class="text-slate-500">[\${timeStr}]</span> <span class="text-teal-300">⚡ Total draw: \${formatNum(totalKw, 1)} kW | Monthly: \${formatNum(m.totalMonthlyKwh, 0)} kWh</span></div>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: JSON API Response & Website Preview Card -->
          <div class="xl:col-span-3 space-y-4">

            <!-- Card 7: Live API Payload Inspector -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>🔌</span> Live API Response
                </span>
                <span class="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 font-bold">200 OK</span>
              </div>

              <!-- Endpoint Selector Pills -->
              <div class="grid grid-cols-2 gap-1.5">
                \${['energy', 'machines', 'forecast', 'alerts'].map(ep => \`
                  <button type="button" onclick="setSimApiEndpoint('\${ep}')" class="py-1 rounded-lg text-[10px] font-mono font-bold transition \${(AppState.simApiTab || 'energy') === ep ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-white'}">
                    /api/\${ep}
                  </button>
                \`).join('')}
              </div>

              <!-- JSON Viewer -->
              <div class="p-3 rounded-xl bg-navy-950 border border-slate-800 text-[10px] font-mono text-teal-300 max-h-56 overflow-y-auto whitespace-pre custom-scroll">
\${generateSimJsonPayload(AppState.simApiTab || 'energy', m)}
              </div>
            </div>

            <!-- Card 8: Synchronized Metrics Snapshot -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 border border-emerald-500/30 text-white space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="text-xs font-bold flex items-center gap-1.5">
                  <span>🌐</span> Platform Synchronized KPIs
                </span>
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div class="space-y-2 text-xs">
                <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/60">
                  <span class="text-slate-300">Total Energy Use</span>
                  <span class="font-mono font-bold text-emerald-400">\${formatNum(m.totalMonthlyKwh, 0)} kWh</span>
                </div>
                <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/60">
                  <span class="text-slate-300">Electricity Bill</span>
                  <span class="font-mono font-bold text-teal-300">৳ \${formatNum(m.currentMonthlyBillBdt, 0)}</span>
                </div>
                <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/60">
                  <span class="text-slate-300">Carbon Footprint</span>
                  <span class="font-mono font-bold text-sky-400">\${formatNum(m.totalCarbonTons, 1)} tCO₂e</span>
                </div>
                <div class="flex justify-between items-center p-2 rounded-lg bg-slate-800/60">
                  <span class="text-slate-300">Estimated Savings</span>
                  <span class="font-mono font-bold text-emerald-400">৳ \${formatNum(m.totalVerifiedSavingsBdt, 0)}</span>
                </div>
              </div>

              <button type="button" onclick="navigateTo('dashboard')" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition">
                Return to Full Dashboard →
              </button>
            </div>

          </div>

        </div>
      \`;
    }

    // Helper functions for Simulation Control Center
    function setSimApiEndpoint(ep) {
      AppState.simApiTab = ep;
      renderActiveView();
    }

    function updateSimTariff(val) {
      AppState.assumptions.tariffBdtPerKwh = Number(val);
      renderActiveView();
    }

    function updateSimSavingsTarget(val) {
      AppState.assumptions.savingsPlanTargetBdt = Number(val);
      renderActiveView();
    }

    function updateSimCapacity(val) {
      AppState.assumptions.dailyCapacityPcs = Number(val);
      renderActiveView();
    }

    function toggleSimMachineFault(mId) {
      const u = AppState.fleet.find(x => x.id === mId);
      if (!u) return;
      if (u.status === 'Fault') {
        u.status = 'Running';
        u.healthScore = 90;
        u.currentKw = u.ratedKw * 0.8;
        showToast(\`\${u.name} repaired. Status returned to Running.\`, 'success');
      } else {
        u.status = 'Fault';
        u.healthScore = 31;
        u.currentKw = 0;
        showToast(\`Simulated breakdown on \${u.name}. Meter draw dropped to 0 kW.\`, 'warn');
      }
      renderActiveView();
    }

    function triggerGridPowerCut() {
      AppState.simOutage = !AppState.simOutage;
      if (AppState.simOutage) {
        AppState.fleet.forEach(u => {
          if (u.dept !== 'Lighting') {
            u.currentKw = 0;
            u.status = 'Idle';
          } else {
            u.currentKw = 4.9;
          }
        });
        showToast('Grid power cut simulated! Production halted; generator carrying lighting only.', 'warn');
      } else {
        AppState.fleet = createInitialFleet();
        showToast('Grid power restored. All machine meters back online.', 'success');
      }
      renderActiveView();
    }

    function run60SecJudgeStory() {
      showToast('Starting 60-Second Judge Story: Night Waste → Alarm → Fix Applied → Verified Savings.', 'info');
      executeScenario('night_idle');
      setTimeout(() => {
        showToast('Story Beat 1: Night-shift waste detected on Sewing Line 3 (38 kW). Alarm live on feed.', 'warn');
      }, 3000);
      setTimeout(() => {
        applyRecommendation('REC-01');
        showToast('Story Beat 2: AI Recommendation applied! Night-shift auto-sleep cutoff active.', 'success');
      }, 7000);
      setTimeout(() => {
        executeScenario('baseline');
        showToast('Story Complete: Verified savings banked, emissions cut, forecast improved.', 'success');
      }, 12000);
    }

    function generateSimJsonPayload(ep, m) {
      if (ep === 'energy') {
        return JSON.stringify({
          endpoint: '/api/energy',
          factory: 'Rupsha Garments Ltd.',
          timestamp: AppState.lastUpdateTimestamp,
          total_kwh_month: Math.round(m.totalMonthlyKwh),
          bill_bdt_month: Math.round(m.currentMonthlyBillBdt),
          carbon_ton_month: Number(m.totalCarbonTons.toFixed(2)),
          tariff_bdt_per_kwh: AppState.assumptions.tariffBdtPerKwh,
          live_draw_kw: Number(m.totalCurrentKw.toFixed(1)),
          production_pcs_today: AppState.assumptions.dailyCapacityPcs,
          active_scenario: AppState.activeScenario,
          source: 'canonical-simulation-engine'
        }, null, 2);
      }
      if (ep === 'machines') {
        return JSON.stringify({
          endpoint: '/api/machines',
          machines_count: AppState.fleet.length,
          fleet: AppState.fleet.slice(0, 5).map(u => ({
            id: u.id,
            name: u.name,
            dept: u.dept,
            status: u.status,
            current_kw: u.currentKw,
            period_kwh: u.periodKwh,
            health_score: u.healthScore
          }))
        }, null, 2);
      }
      if (ep === 'forecast') {
        return JSON.stringify({
          endpoint: '/api/forecast',
          forecast_bill_1m_bdt: Math.round(m.currentMonthlyBillBdt * 0.96),
          forecast_carbon_1m_ton: Number((m.totalCarbonTons * 0.95).toFixed(1)),
          confidence: '±5% deterministic',
          recommendations_count: AppState.recommendations.length
        }, null, 2);
      }
      return JSON.stringify({
        endpoint: '/api/alerts',
        active_alerts: AppState.alerts.filter(x => !x.acknowledged)
      }, null, 2);
    }
`;

const settingsEnd = '        </div>\n      `;\n    }\n\n    // ----------------------------------------------------------------------------\n    // VIEW 13: AI AGENT CONSOLE';
if (content.includes(settingsEnd)) {
  content = content.replace(settingsEnd, '        </div>\n      `;\n    }\n' + renderSimViewCode + '\n    // ----------------------------------------------------------------------------\n    // VIEW 13: AI AGENT CONSOLE');
  console.log('✓ Successfully injected renderSimulationControlCenterView and handlers');
} else {
  console.error('Could not find settingsEnd insertion point');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Done updating preview/index.html!');
