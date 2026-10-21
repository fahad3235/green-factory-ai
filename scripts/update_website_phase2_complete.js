const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '..', 'preview', 'index.html');
const TWIN_PATH = path.join(__dirname, '..', 'preview', 'digital-twin.html');
const SIM_PATH = path.join(__dirname, '..', 'preview', 'simulation.html');
const SERVER_PATH = path.join(__dirname, '..', 'server.js');

// ============================================================================
// 1. UPDATE preview/index.html
// ============================================================================
let html = fs.readFileSync(INDEX_PATH, 'utf8');

// 1A. Upgrade Sign-In Portal Top Bar & Add 3D Orb Showcase + Quick Persona Selector
const oldPortalTopButtons = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40">
            DEMO AUTH PREVIEW — NON-PRODUCTION SESSION
          </span>
          <button type="button" onclick="toggleLoginPortalModal(false)" class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition">
            Return to Dashboard ✕
          </button>`;

const newPortalTopButtons = `<span class="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40">
            DEMO AUTH PREVIEW — NON-PRODUCTION SESSION
          </span>
          <a href="/download" download="green_factory_brain_ai_full_project.zip" class="px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/40 transition flex items-center gap-1.5">
            <span>⬇ Download Project .ZIP</span>
          </a>
          <button type="button" onclick="toggleLoginPortalModal(false)" class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition">
            Return to Dashboard ✕
          </button>`;

if (html.includes(oldPortalTopButtons)) {
  html = html.replace(oldPortalTopButtons, newPortalTopButtons);
  console.log('✓ Upgraded Sign-In Portal top bar with ZIP download button');
}

const oldPortalHudCards = `<!-- Floating HUD Telemetry Preview Cards (Matches Reference Image 2) -->`;
const newPortalOrbShowcaseAndHud = `<!-- Live 3D Animated Orb AI Copilot & Multi-Agent Showcase Card -->
          <div class="p-4 rounded-2xl bg-[#0b291c]/90 border border-emerald-400/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl max-w-xl">
            <div class="flex items-center gap-3.5">
              <div class="mini-orb shrink-0" onclick="handleDemoSignIn(event); toggleCopilotDrawer(true);" title="Launch Live AI Copilot">
                <div class="mini-eye"></div>
                <div class="mini-eye"></div>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-extrabold text-white tracking-tight">AI Copilot &amp; 6 Live Simulation Agents</span>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 uppercase">LIVE AGENT</span>
                </div>
                <div class="text-[11px] text-emerald-200/90 mt-0.5">NVIDIA Nemotron 3 Ultra (550B) • Bilingual EN / বাংলা / Banglish</div>
              </div>
            </div>
            <button type="button" onclick="handleDemoSignIn(event); toggleCopilotDrawer(true);" class="w-full sm:w-auto px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shrink-0 shadow-md">
              Launch Copilot 💬
            </button>
          </div>

          <!-- Floating HUD Telemetry Preview Cards (Matches Reference Image 2) -->`;

if (!html.includes('Live 3D Animated Orb AI Copilot & Multi-Agent Showcase Card') && html.includes(oldPortalHudCards)) {
  html = html.replace(oldPortalHudCards, newPortalOrbShowcaseAndHud);
  console.log('✓ Added 3D Animated Orb AI Copilot Showcase card to Sign-In Portal');
}

const oldPersonaSelectBlock = `<label for="demo-persona-select" class="block text-xs font-medium text-slate-300 mb-1">Demo Persona / Role</label>
                <select id="demo-persona-select" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400">`;

const newPersonaSelectBlock = `<div class="flex items-center justify-between mb-1.5">
                  <label for="demo-persona-select" class="block text-xs font-medium text-slate-300">Demo Persona / Role</label>
                  <span class="text-[10px] text-emerald-400 font-semibold">1-Click Role Switch</span>
                </div>
                <div class="grid grid-cols-3 gap-1.5 mb-2">
                  <button type="button" onclick="selectQuickPersona(0)" class="px-2 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 transition truncate">👨‍💼 Manager</button>
                  <button type="button" onclick="selectQuickPersona(1)" class="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 transition truncate">👩‍🔬 Auditor</button>
                  <button type="button" onclick="selectQuickPersona(2)" class="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 transition truncate">👨‍💻 EPMS Eng</button>
                </div>
                <select id="demo-persona-select" onchange="syncPersonaEmailField()" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400">`;

if (!html.includes('selectQuickPersona(0)') && html.includes(oldPersonaSelectBlock)) {
  html = html.replace(oldPersonaSelectBlock, newPersonaSelectBlock);
  console.log('✓ Added 1-click Persona Quick-Switch buttons to Sign-In Portal');
}

// 1B. Add compact Project .ZIP download button to the Top Header Bar
const oldHeaderCopilotBtn = `<!-- Toggle Ask Green AI Copilot Drawer -->`;
const newHeaderZipAndCopilotBtn = `<!-- Direct Project ZIP Download Pill -->
          <a href="/download" download="green_factory_brain_ai_full_project.zip" class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold transition" title="Download Full Updated Project (.ZIP)">
            <span>⬇</span>
            <span class="hidden lg:inline">.ZIP</span>
          </a>

          <!-- Toggle Ask Green AI Copilot Drawer -->`;

if (!html.includes('Direct Project ZIP Download Pill') && html.includes(oldHeaderCopilotBtn)) {
  html = html.replace(oldHeaderCopilotBtn, newHeaderZipAndCopilotBtn);
  console.log('✓ Added direct .ZIP download pill to Top Header Bar');
}

// 1C. Upgrade Copilot Sub-Header with Auto-Demo Tour button & Voice Readout support
const oldCopilotSubheader = `<div class="px-3.5 py-2 bg-[#effaf3] dark:bg-slate-950/90 border-b border-[#d5f0df] dark:border-emerald-500/20 flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1b5e37] dark:text-emerald-400 truncate">
          <span>📡</span>
          <span id="copilot-mode-status" class="truncate">Tracking Energy, Carbon, Bill &amp; 18+ Machines live</span>
        </div>
        <span class="shrink-0 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#dcfce7] dark:bg-emerald-950 text-[#15803d] dark:text-emerald-300 border border-[#bbf7d0] dark:border-emerald-500/40">LIVE AGENT</span>
      </div>`;

const newCopilotSubheader = `<div class="px-3.5 py-2 bg-[#effaf3] dark:bg-slate-950/90 border-b border-[#d5f0df] dark:border-emerald-500/20 flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1b5e37] dark:text-emerald-400 truncate">
          <span>📡</span>
          <span id="copilot-mode-status" class="truncate">Tracking Energy, Carbon, Bill &amp; 18+ Machines live</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button type="button" onclick="runCopilotAutoDemo()" class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#15803d] hover:bg-[#166534] text-white transition shadow-2xs" title="Run Automated Live Agent Demo">▶ Auto-Demo</button>
          <button type="button" onclick="speakCopilotLastReply()" class="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-white dark:bg-slate-800 hover:bg-[#dcfce7] text-[#15803d] dark:text-emerald-300 border border-[#86efac] dark:border-emerald-500/40 transition" title="Read Latest AI Copilot Insights Aloud">🔊 Listen</button>
          <span class="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#dcfce7] dark:bg-emerald-950 text-[#15803d] dark:text-emerald-300 border border-[#bbf7d0] dark:border-emerald-500/40">LIVE AGENT</span>
        </div>
      </div>`;

if (html.includes(oldCopilotSubheader)) {
  html = html.replace(oldCopilotSubheader, newCopilotSubheader);
  console.log('✓ Upgraded Copilot sub-header with Auto-Demo and Voice Readout buttons');
}

// 1D. Upgrade Dashboard Hero Banner buttons & add Live Copilot+ Multi-Agent Telemetry Strip in renderDashboardView
const oldHeroButtons = `<button type="button" onclick="openScenarioPickerModal()" class="px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition">
                  ⚡ Run Scenario
                </button>
              </div>`;

const newHeroButtons = `<button type="button" onclick="openScenarioPickerModal()" class="px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition">
                  ⚡ Run Scenario
                </button>
                <button type="button" onclick="askCopilotDirect('Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao')" class="px-3.5 py-2 rounded-full bg-[#eafaf0] dark:bg-emerald-950/90 hover:bg-[#dcfce7] text-[#134e2c] dark:text-emerald-200 border border-[#86efac] dark:border-emerald-500/40 text-xs font-extrabold transition inline-flex items-center gap-1.5 shadow-2xs">
                  <span class="micro-orb"><span class="micro-eye"></span><span class="micro-eye"></span></span>
                  <span>Ask AI Copilot Plan</span>
                </button>
              </div>`;

if (!html.includes('Ask AI Copilot Plan') && html.includes(oldHeroButtons)) {
  html = html.replace(oldHeroButtons, newHeroButtons);
  console.log('✓ Added Ask AI Copilot Plan button to Dashboard Hero Banner');
}

// Add Live Copilot+ Multi-Agent Sync Bar right above the 5-card Executive KPI Strip on the Dashboard
const oldKpiStripHeader = `<!-- 5-CARD EXECUTIVE KPI STRIP (Section 7: Energy, Cost, Emissions, Savings, Machine Availability) -->`;
const newCopilotSyncBarAndKpiHeader = `<!-- LIVE COPILOT+ & 6-AGENT BI-DIRECTIONAL TELEMETRY SYNC STRIP -->
        <section aria-label="Live AI Copilot Telemetry Strip" class="rounded-2xl border border-[#b9e6c9] dark:border-emerald-500/35 bg-gradient-to-r from-[#eafaf0] via-[#f4fbf7] to-[#eafaf0] dark:from-slate-900 dark:via-emerald-950/40 dark:to-slate-900 px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="mini-orb shrink-0" onclick="askCopilotDirect('Hi')" title="Click to ping Live AI Copilot">
              <div class="mini-eye"></div>
              <div class="mini-eye"></div>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-extrabold text-[#0f3923] dark:text-white tracking-tight">Copilot+ Live Agent Synchronized</span>
                <span class="px-2 py-0.2 rounded-full text-[9.5px] font-extrabold bg-[#dcfce7] dark:bg-emerald-950 text-[#15803d] dark:text-emerald-300 border border-[#bbf7d0] dark:border-emerald-500/40 uppercase">NVIDIA NEMOTRON 3 ULTRA (550B)</span>
                <div class="hidden sm:flex items-center gap-1"><span class="status-dot"></span><span class="status-dot"></span><span class="status-dot"></span></div>
              </div>
              <p class="text-[11px] text-[#1b5e37] dark:text-slate-300 truncate">
                Real-time telemetry: <strong>\${formatNum(m.totalCurrentKw, 1)} kW</strong> active load • <strong>\${formatBdt(m.estimatedSavingsBdt)}/mo</strong> avoidable waste identified across 5 ranked fixes.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <button type="button" onclick="askCopilotDirect('Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao')" class="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-[#dcfce7] text-[#14532d] dark:text-emerald-300 border border-[#ccebd7] dark:border-slate-700 text-[11px] font-bold transition">🎯 4-Mo Savings Plan</button>
            <button type="button" onclick="askCopilotDirect('Which machine wastes the most energy during night shift?')" class="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-[#dcfce7] text-[#14532d] dark:text-emerald-300 border border-[#ccebd7] dark:border-slate-700 text-[11px] font-bold transition">🌙 Night-Shift Waste</button>
            <button type="button" onclick="askCopilotDirect('Inspect 3D EPMS Digital Twin BREAKER_CBX-305 telemetry and wear status.')" class="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-[#dcfce7] text-[#14532d] dark:text-emerald-300 border border-[#ccebd7] dark:border-slate-700 text-[11px] font-bold transition">🧊 3D Breaker Audit</button>
            <button type="button" onclick="navigateTo('agent-console')" class="px-2.5 py-1 rounded-full bg-[#15803d] hover:bg-[#166534] text-white text-[11px] font-extrabold transition shadow-2xs">🤖 6 Agents →</button>
          </div>
        </section>

        <!-- 5-CARD EXECUTIVE KPI STRIP (Section 7: Energy, Cost, Emissions, Savings, Machine Availability) -->`;

if (!html.includes('LIVE COPILOT+ & 6-AGENT BI-DIRECTIONAL TELEMETRY SYNC STRIP') && html.includes(oldKpiStripHeader)) {
  html = html.replace(oldKpiStripHeader, newCopilotSyncBarAndKpiHeader);
  console.log('✓ Added Live Copilot+ & 6-Agent Telemetry Sync Strip to Dashboard');
}

// 1E. Expand generateGroundedCopilotReply with 3D Digital Twin (BREAKER_CBX-305), Inventory/Production, and Higg FEM intents
const oldAgentIntentCheck = `if (q.includes('agent') || q.includes('এজেন্ট') || q.includes('6 agents')) {`;
const newExtraIntentsAndAgentCheck = `if (q.includes('3d') || q.includes('twin') || q.includes('breaker') || q.includes('cbx') || q.includes('epms')) {
        return useBn
          ? \`<strong>3D EPMS Digital Twin ও BREAKER_CBX-305 বিশ্লেষণ [SIMULATION]:</strong><br/>
          • <strong>সাবস্টেশন লোড:</strong> ১,৯১০ kW (২,০৭৬ kVA • Power Factor: 0.92 • THD: 3.8%)।<br/>
          • <strong>ব্রেকার স্বাস্থ্য (BREAKER_CBX-305):</strong> Contact Wear 14%, Mechanical Wear 8%, Control Unit Wear 5% (স্বাভাবিক সীমার মধ্যে)।<br/>
          • <strong>ফ্লিট অ্যালার্ট:</strong> <code class="font-mono">MCH-CUT-02</code> ওভারলোড (24.6 kW, 68.4°C) ও <code class="font-mono">MCH-SEW-03</code> নাইট-শিফট আইডল ড্র (4.8 kW)।\`
          : \`<strong>3D EPMS Digital Twin &amp; BREAKER_CBX-305 Diagnostics [SIMULATION]:</strong><br/>
          • <strong>Main Substation Busbar:</strong> <strong>1,910 kW</strong> active power (2,076 kVA apparent • PF <strong>0.92</strong> • Voltage 400V 3-Phase • THD 3.8%).<br/>
          • <strong>BREAKER_CBX-305 Wear Telemetry:</strong> Contact Wear <strong>14%</strong> • Mechanical Wear <strong>8%</strong> • Control Unit <strong>5%</strong> (1,452 operating hours, 94/100 Health Score).<br/>
          • <strong>Active Floor Hotspots:</strong> <code class="font-mono">MCH-CUT-02</code> thermal spike (<strong>68.4°C / 24.6 kW</strong>) on Floor 1 &amp; <code class="font-mono">MCH-SEW-03</code> standby leak (<strong>4.8 kW</strong>) on Floor 2.\`;
      }

      if (q.includes('inventory') || q.includes('production') || q.includes('garment') || q.includes('sku') || q.includes('উৎপাদন') || q.includes('ইনভেন্টরি')) {
        return useBn
          ? \`<strong>ইনভেন্টরি ও গার্মেন্টস উৎপাদন দক্ষতা [SIMULATION]:</strong><br/>
          • <strong>দৈনিক গার্মেন্টস আউটপুট:</strong> ১২,৪৫০ পিস (লক্ষ্যমাত্রা: ১২,৮০০ পিস • ৯৭.৩% দক্ষতা)।<br/>
          • <strong>এনার্জি ইনটেনসিটি:</strong> প্রতি পিসে <strong>৪.২০ kWh/pc</strong> (বেসলাইন ৪.৯৫ kWh/pc থেকে ১৫.২% কম)।<br/>
          • <strong>ম্যাটেরিয়াল স্টক:</strong> ৬টি সক্রিয় SKU (১টি Low Stock ও ১টি Reorder Needed — High-Efficiency Servo Belt)।\`
          : \`<strong>Inventory &amp; Garment Production Line Efficiency [SIMULATION]:</strong><br/>
          • <strong>Active Production Clusters (4 Lines):</strong> <code class="font-mono">LN-SEW-A</code>, <code class="font-mono">LN-SEW-B</code>, <code class="font-mono">LN-CUT-A</code>, <code class="font-mono">LN-FIN-A</code> producing <strong>12,450 pcs/day</strong> (97.3% of 12,800 pcs target).<br/>
          • <strong>Energy Intensity:</strong> <strong>4.20 kWh/pc</strong> (-15.2% improvement vs. 4.95 kWh/pc baseline).<br/>
          • <strong>Material &amp; Spares Alert:</strong> 6 active SKUs tracked; 1 Low Stock &amp; 1 Reorder Needed item ready for simulated restock in Inventory &amp; Production.\`;
      }

      if (q.includes('higg') || q.includes('fem') || q.includes('score') || q.includes('esg') || q.includes('sustainability')) {
        return useBn
          ? \`<strong>CarbonIQ ও Higg FEM Level 3 সাসটেইনেবিলিটি স্কোর [SIMULATION]:</strong><br/>
          • <strong>সামগ্রিক স্কোর:</strong> <strong>\${m.sustainabilityScore}% (Tier 2 Good)</strong>।<br/>
          • <strong>স্কোরের অংশসমূহ:</strong> এনার্জি ইনটেনসিটি (\${m.intensityScore}/100 × 35%) + কার্বন দক্ষতা (\${m.carbonScore}/100 × 30%) + মেশিন উপলব্ধতা (\${m.availScore}/100 × 20%) + সাশ্রয় অগ্রগতি (\${m.savingsScore}/100 × 15%)।\`
          : \`<strong>CarbonIQ &amp; Higg FEM Level 3 Readiness Audit [SIMULATION]:</strong><br/>
          • <strong>Composite Sustainability Score:</strong> <strong>\${m.sustainabilityScore}% (Tier 2 Good — Higg FEM Level 3 Track)</strong>.<br/>
          • <strong>Weighted Formula Breakdown:</strong> Energy Intensity (<strong>\${m.intensityScore}%</strong> × 0.35) + Carbon Footprint (<strong>\${m.carbonScore}%</strong> × 0.30) + Fleet Availability (<strong>\${m.availScore}%</strong> × 0.20) + Savings Target Achievement (<strong>\${m.savingsScore}%</strong> × 0.15).<br/>
          • <strong>Audit Notice:</strong> Simulation report for operational benchmarking; not third-party certified.\`;
      }

      if (q.includes('agent') || q.includes('এজেন্ট') || q.includes('6 agents')) {`;

if (!html.includes('3D EPMS Digital Twin &amp; BREAKER_CBX-305 Diagnostics') && html.includes(oldAgentIntentCheck)) {
  html = html.replace(oldAgentIntentCheck, newExtraIntentsAndAgentCheck);
  console.log('✓ Added 3D Digital Twin, Inventory/Production, and Higg FEM intents to generateGroundedCopilotReply');
}

// 1F. Add helper functions: selectQuickPersona, syncPersonaEmailField, runCopilotAutoDemo, speakCopilotLastReply
const oldWindowExports = `window.runScenarioModal = runScenarioModal;`;
const newHelperFuncsAndExports = `function selectQuickPersona(idx) {
      const sel = document.getElementById('demo-persona-select');
      if (!sel || !sel.options[idx]) return;
      sel.selectedIndex = idx;
      syncPersonaEmailField();
    }

    function syncPersonaEmailField() {
      const sel = document.getElementById('demo-persona-select');
      const emailInp = document.getElementById('demo-login-email');
      if (sel && sel.value && emailInp) {
        const parts = sel.value.split('|');
        if (parts[2]) emailInp.value = parts[2];
      }
    }

    function runCopilotAutoDemo() {
      const drawer = document.getElementById('copilot-drawer');
      if (drawer && drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
      }
      const demoPrompts = [
        'Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao',
        'Inspect 3D EPMS Digital Twin BREAKER_CBX-305 telemetry and wear status.',
        'Run all 6 simulation agents and provide a consensus report.'
      ];
      const nextPrompt = demoPrompts[(AppState.copilotMessages.length || 0) % demoPrompts.length];
      submitCopilotQuestion(nextPrompt);
      showToast('AI Copilot Auto-Demo triggered: analyzing live factory telemetry...', 'success');
    }

    function speakCopilotLastReply() {
      try {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
          showToast('Voice synthesis is ready in browser environments with Web Speech API.', 'info');
          return;
        }
        window.speechSynthesis.cancel();
        const m = getDerivedMetrics();
        const lastAssistant = [...AppState.copilotMessages].reverse().find(x => x.sender === 'assistant');
        const rawHtml = lastAssistant
          ? (lastAssistant.isDynamicInitial ? buildGroundedBanglaDefaultAnswer(m) : lastAssistant.text)
          : 'Green Factory Brain AI Copilot is online and tracking 18 machines live.';
        const cleanText = String(rawHtml).replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.rate = 1.02;
        window.speechSynthesis.speak(utter);
        showToast('🔊 Reading AI Copilot telemetry briefing aloud...', 'info');
      } catch (e) {
        showToast('Audio briefing ready.', 'info');
      }
    }

    window.selectQuickPersona = selectQuickPersona;
    window.syncPersonaEmailField = syncPersonaEmailField;
    window.runCopilotAutoDemo = runCopilotAutoDemo;
    window.speakCopilotLastReply = speakCopilotLastReply;
    window.runScenarioModal = runScenarioModal;`;

if (!html.includes('function runCopilotAutoDemo()') && html.includes(oldWindowExports)) {
  html = html.replace(oldWindowExports, newHelperFuncsAndExports);
  console.log('✓ Added selectQuickPersona, syncPersonaEmailField, runCopilotAutoDemo, and speakCopilotLastReply');
}

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log('✓ Saved updated preview/index.html');

// ============================================================================
// 2. UPDATE preview/digital-twin.html WITH FLOATING 3D ORB QUICK-SWITCH DOCK
// ============================================================================
if (fs.existsSync(TWIN_PATH)) {
  let twinHtml = fs.readFileSync(TWIN_PATH, 'utf8');
  if (!twinHtml.includes('id="gfb-twin-floating-orb-dock"')) {
    const twinDockHtml = `
  <!-- FLOATING 3D ANIMATED ORB COPILOT & NAVIGATION DOCK -->
  <style>
    .gfb-mini-orb {
      width: 34px; height: 34px; border-radius: 50%;
      background: radial-gradient(circle at 30% 25%, #86efac 0%, #22c55e 42%, #15803d 82%, #052e16 100%);
      box-shadow: 0 5px 14px rgba(22, 163, 74, 0.5), inset -3px -3px 7px rgba(5, 46, 22, 0.55), inset 3px 3px 6px rgba(255, 255, 255, 0.65);
      display: flex; align-items: center; justify-content: center; gap: 5px;
      animation: gfbOrbFloat 3.6s ease-in-out infinite; flex-shrink: 0;
    }
    .gfb-mini-eye {
      width: 3.5px; height: 8px; background: #ffffff; border-radius: 999px;
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.9);
      animation: gfbOrbBlink 4.2s infinite;
    }
    @keyframes gfbOrbFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
    @keyframes gfbOrbBlink { 0%, 44%, 48%, 92%, 96%, 100% { transform: scaleY(1); } 46%, 94% { transform: scaleY(0.1); } }
  </style>
  <div id="gfb-twin-floating-orb-dock" class="fixed bottom-4 left-4 z-40 flex flex-wrap items-center gap-2 pointer-events-auto">
    <a href="/#/dashboard" class="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-[#0b291c]/95 hover:bg-[#113d2a] text-white border border-emerald-400/50 shadow-[0_10px_28px_rgba(16,185,129,0.3)] transition text-xs font-bold">
      <span class="gfb-mini-orb"><span class="gfb-mini-eye"></span><span class="gfb-mini-eye"></span></span>
      <span>🏠 Main Dashboard &amp; AI Copilot</span>
      <span class="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 uppercase">LIVE AGENT</span>
    </a>
    <a href="/#/agent-console" class="px-3 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/35 text-xs font-bold transition shadow-lg">
      🤖 6 Agents
    </a>
    <a href="/simulation.html" class="px-3 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-sky-300 border border-sky-500/35 text-xs font-bold transition shadow-lg">
      🎛️ Sim Engine
    </a>
    <a href="/download" download="green_factory_brain_ai_full_project.zip" class="px-3 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/35 text-xs font-bold transition shadow-lg">
      ⬇ .ZIP
    </a>
  </div>
</body>`;
    twinHtml = twinHtml.replace('</body>', twinDockHtml);
    fs.writeFileSync(TWIN_PATH, twinHtml, 'utf8');
    console.log('✓ Added Floating 3D Orb Copilot & Navigation Dock to preview/digital-twin.html');
  }
}

// ============================================================================
// 3. UPDATE preview/simulation.html WITH FLOATING 3D ORB QUICK-SWITCH DOCK
// ============================================================================
if (fs.existsSync(SIM_PATH)) {
  let simHtml = fs.readFileSync(SIM_PATH, 'utf8');
  if (!simHtml.includes('id="gfb-sim-floating-orb-dock"')) {
    const simDockHtml = `
  <!-- FLOATING 3D ANIMATED ORB COPILOT & NAVIGATION DOCK -->
  <style>
    .gfb-sim-dock {
      position: fixed; bottom: 18px; right: 18px; z-index: 90;
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    }
    .gfb-sim-pill {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 7px 14px 7px 9px; border-radius: 999px;
      background: #eafaf0; color: #0f3923;
      border: 1.5px solid #86efac;
      box-shadow: 0 12px 28px rgba(22, 163, 74, 0.32);
      font-family: "Manrope", system-ui, sans-serif;
      font-size: 12px; font-weight: 800; text-decoration: none;
      transition: transform 0.2s ease;
    }
    .gfb-sim-pill:hover { transform: translateY(-2px); }
    .gfb-mini-orb {
      width: 32px; height: 32px; border-radius: 50%;
      background: radial-gradient(circle at 30% 25%, #86efac 0%, #22c55e 42%, #15803d 82%, #052e16 100%);
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.45), inset -2px -2px 6px rgba(5, 46, 22, 0.5), inset 2px 2px 5px rgba(255, 255, 255, 0.65);
      display: flex; align-items: center; justify-content: center; gap: 4px;
      animation: gfbSimOrbFloat 3.6s ease-in-out infinite; flex-shrink: 0;
    }
    .gfb-mini-eye {
      width: 3.2px; height: 7.5px; background: #ffffff; border-radius: 999px;
      animation: gfbSimOrbBlink 4.2s infinite;
    }
    @keyframes gfbSimOrbFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
    @keyframes gfbSimOrbBlink { 0%, 44%, 48%, 92%, 96%, 100% { transform: scaleY(1); } 46%, 94% { transform: scaleY(0.1); } }
  </style>
  <div id="gfb-sim-floating-orb-dock" class="gfb-sim-dock">
    <a href="/#/dashboard" class="gfb-sim-pill">
      <span class="gfb-mini-orb"><span class="gfb-mini-eye"></span><span class="gfb-mini-eye"></span></span>
      <span>AI Copilot &amp; Main Dashboard</span>
      <span style="padding:2px 7px;border-radius:99px;background:#dcfce7;color:#15803d;border:1px solid #bbf7d0;font-size:9px;">LIVE AGENT</span>
    </a>
    <a href="/digital-twin.html" class="gfb-sim-pill" style="padding-left:13px;background:#0a2534;color:#2fe0bd;border-color:#1f5064;">
      🧊 3D EPMS Twin
    </a>
    <a href="/download" download="green_factory_brain_ai_full_project.zip" class="gfb-sim-pill" style="padding-left:13px;background:#0a2534;color:#f0a12b;border-color:#1f5064;">
      ⬇ .ZIP
    </a>
  </div>
</body>`;
    simHtml = simHtml.replace('</body>', simDockHtml);
    fs.writeFileSync(SIM_PATH, simHtml, 'utf8');
    console.log('✓ Added Floating 3D Orb Copilot & Navigation Dock to preview/simulation.html');
  }
}

// ============================================================================
// 4. UPDATE server.js (/portal Delivery Page with 3D Animated Orb & Quick Links)
// ============================================================================
if (fs.existsSync(SERVER_PATH)) {
  let srv = fs.readFileSync(SERVER_PATH, 'utf8');
  const oldPortalBtnGroup = `<div class="btn-group">
      <a href="/download" class="btn btn-primary">Download Full Project (.ZIP)</a>
      <a href="/" class="btn btn-secondary">Launch Live Web Preview</a>
    </div>`;

  const newPortalBtnGroup = `<div style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:18px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);margin-bottom:20px;">
      <div style="width:48px;height:48px;border-radius:50%;background:radial-gradient(circle at 30% 25%, #86efac 0%, #22c55e 42%, #15803d 82%, #052e16 100%);box-shadow:0 8px 20px rgba(22,163,74,0.45);display:flex;align-items:center;justify-content:center;gap:6px;flex-shrink:0;">
        <span style="width:4px;height:10px;background:#fff;border-radius:99px;display:inline-block;"></span>
        <span style="width:4px;height:10px;background:#fff;border-radius:99px;display:inline-block;"></span>
      </div>
      <div>
        <div style="font-weight:800;font-size:0.95rem;color:#fff;">Ask Green AI Copilot &amp; 6 Live Simulation Agents Ready</div>
        <div style="font-size:0.8rem;color:#a7f3d0;">NVIDIA Nemotron 3 Ultra (550B) • 3D Animated Orb • Real-Time Telemetry Sync</div>
      </div>
    </div>
    <div class="btn-group">
      <a href="/" class="btn btn-primary">🚀 Launch Full Website &amp; AI Copilot</a>
      <a href="/download" class="btn btn-secondary">⬇ Download Full Project (.ZIP)</a>
    </div>
    <div class="btn-group" style="margin-top:-12px;">
      <a href="/#/agent-console" class="btn btn-secondary" style="font-size:0.82rem;padding:10px 14px;">🤖 6-Agent Console</a>
      <a href="/digital-twin.html" class="btn btn-secondary" style="font-size:0.82rem;padding:10px 14px;">🧊 3D EPMS Digital Twin</a>
      <a href="/simulation.html" class="btn btn-secondary" style="font-size:0.82rem;padding:10px 14px;">🎛️ Simulation Control</a>
    </div>`;

  if (srv.includes(oldPortalBtnGroup)) {
    srv = srv.replace(oldPortalBtnGroup, newPortalBtnGroup);
    fs.writeFileSync(SERVER_PATH, srv, 'utf8');
    console.log('✓ Upgraded /portal page in server.js with 3D Orb & Quick Links');
  }
}
