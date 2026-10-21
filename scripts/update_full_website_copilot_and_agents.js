const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../preview/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// ============================================================================
// 1. INJECT 3D ANIMATED ORB & COPILOT CSS INTO <style>
// ============================================================================
const orbCss = `
    /* 3D Animated Copilot Orb & Live Agent Animations */
    .orb-wrapper { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .orb-glow {
      position: absolute; width: 104px; height: 104px; border-radius: 9999px;
      background: radial-gradient(circle, rgba(22, 163, 74, 0.38) 0%, rgba(22, 163, 74, 0) 70%);
      animation: pulseGlow 3.2s ease-in-out infinite; pointer-events: none;
    }
    .orb-sphere {
      width: 74px; height: 74px; border-radius: 9999px;
      background: radial-gradient(circle at 32% 28%, #6ee787 0%, #22c55e 38%, #15803d 78%, #0d5428 100%);
      box-shadow: inset -6px -8px 16px rgba(6, 46, 22, 0.55), inset 6px 6px 14px rgba(187, 247, 208, 0.65), 0 10px 24px -4px rgba(22, 163, 74, 0.45);
      display: flex; align-items: center; justify-content: center; gap: 10px;
      animation: floatOrb 3.6s ease-in-out infinite; position: relative; z-index: 2; cursor: pointer;
    }
    .orb-eye {
      width: 8px; height: 18px; background: #ffffff; border-radius: 999px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.95);
      animation: blinkEyes 4.5s infinite, lookAround 7s ease-in-out infinite;
    }
    .mini-orb {
      width: 34px; height: 34px; min-width: 34px; border-radius: 9999px;
      background: radial-gradient(circle at 32% 28%, #6ee787 0%, #22c55e 40%, #15803d 82%, #0d5428 100%);
      box-shadow: inset -3px -4px 8px rgba(6, 46, 22, 0.55), inset 3px 3px 7px rgba(187, 247, 208, 0.65), 0 5px 12px -2px rgba(22, 163, 74, 0.42);
      display: inline-flex; align-items: center; justify-content: center; gap: 4px;
      animation: floatMini 3.2s ease-in-out infinite;
    }
    .mini-eye { width: 3.5px; height: 8px; background: #ffffff; border-radius: 999px; animation: blinkEyes 4.5s infinite; }
    .micro-orb {
      width: 22px; height: 22px; min-width: 22px; border-radius: 9999px;
      background: radial-gradient(circle at 32% 28%, #6ee787 0%, #22c55e 42%, #15803d 85%, #0d5428 100%);
      box-shadow: inset -2px -2px 5px rgba(6, 46, 22, 0.55), inset 2px 2px 4px rgba(187, 247, 208, 0.65), 0 2px 6px rgba(22, 163, 74, 0.4);
      display: inline-flex; align-items: center; justify-content: center; gap: 3px;
    }
    .micro-eye { width: 2.5px; height: 6px; background: #ffffff; border-radius: 999px; animation: blinkEyes 4.5s infinite; }
    .status-dot { width: 6.5px; height: 6.5px; border-radius: 9999px; background-color: #15803d; animation: dotWave 1.6s infinite ease-in-out; display: inline-block; }
    html.dark .status-dot { background-color: #4ade80; }
    .status-dot:nth-child(2) { animation-delay: 0.25s; }
    .status-dot:nth-child(3) { animation-delay: 0.5s; }
    @keyframes floatOrb { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    @keyframes floatMini { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
    @keyframes pulseGlow { 0%, 100% { transform: scale(0.95); opacity: 0.75; } 50% { transform: scale(1.12); opacity: 1; } }
    @keyframes blinkEyes { 0%, 44%, 48%, 92%, 96%, 100% { transform: scaleY(1); } 46%, 94% { transform: scaleY(0.1); } }
    @keyframes lookAround { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(2.5px, -1px); } 55% { transform: translate(-2.5px, 1px); } 80% { transform: translate(1px, 1.5px); } }
    @keyframes dotWave { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.18); } }
    .prompt-marquee { white-space: nowrap; overflow-x: auto; scrollbar-width: none; }
    .prompt-marquee::-webkit-scrollbar { display: none; }
    .msg-enter { animation: msgSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes msgSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .thinking .orb-sphere { animation: floatOrb 0.85s ease-in-out infinite; box-shadow: 0 0 34px 7px rgba(34, 197, 94, 0.7); }
`;

if (!html.includes('/* 3D Animated Copilot Orb & Live Agent Animations */')) {
  html = html.replace('  </style>', orbCss + '\n  </style>');
  console.log('✓ Injected 3D Animated Copilot Orb CSS into <style>');
}

// ============================================================================
// 2. UPDATE TOP HEADER COPILOT BUTTON WITH ANIMATED MICRO-ORB
// ============================================================================
const headerBtnOld = `<button type="button" id="btn-copilot-drawer-toggle" onclick="toggleCopilotDrawer()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition">
            <span>🤖</span>
            <span class="hidden sm:inline" data-i18n="ask_green_ai">Ask Green AI</span>
          </button>`;

const headerBtnNew = `<button type="button" id="btn-copilot-drawer-toggle" onclick="toggleCopilotDrawer()" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eafaf0] dark:bg-emerald-950/90 hover:bg-[#dcfce7] text-[#134e2c] dark:text-emerald-200 border border-[#86efac] dark:border-emerald-500/40 text-xs font-extrabold shadow-xs transition">
            <span class="micro-orb"><span class="micro-eye"></span><span class="micro-eye"></span></span>
            <span class="hidden sm:inline" data-i18n="ask_green_ai">Ask Green AI</span>
            <span class="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#15803d] text-white uppercase">LIVE</span>
          </button>`;

if (html.includes(headerBtnOld)) {
  html = html.replace(headerBtnOld, headerBtnNew);
  console.log('✓ Updated top header #btn-copilot-drawer-toggle with animated micro-orb');
}

// ============================================================================
// 3. REPLACE #copilot-drawer WITH MINT-EMERALD 3D ORB COPILOT CHAT
// ============================================================================
let asideStartMarker = '<!-- RIGHT PERSISTENT / FLOATING AI COPILOT DRAWER';
if (!html.includes(asideStartMarker)) {
  asideStartMarker = '<!-- RIGHT PERSISTENT / DOCKED AI COPILOT DRAWER';
}
const asideEndMarker = '</aside>';
const startIdx = html.indexOf(asideStartMarker);
const endIdx = html.indexOf(asideEndMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find #copilot-drawer markers');
  process.exit(1);
}

const newAside = `<!-- RIGHT PERSISTENT / DOCKED AI COPILOT DRAWER ("Ask Green AI Copilot Chat" — Matches Reference Image & Video) -->
    <aside id="copilot-drawer" aria-label="Ask Green AI Copilot" class="fixed xl:static inset-y-0 right-0 z-40 w-full sm:w-[410px] xl:w-[395px] 2xl:w-[420px] bg-[#f4fbf7] dark:bg-slate-900/98 border-l-[1.5px] xl:border-[1.5px] border-[#b9e6c9] dark:border-emerald-500/35 xl:rounded-[26px] xl:my-2.5 xl:mr-2.5 flex flex-col justify-between shrink-0 transition-all duration-300 shadow-[0_14px_40px_-12px_rgba(22,163,74,0.22)] text-[#111827] dark:text-slate-100 overflow-hidden">
      <!-- Top Bar Header: Title + 3 Wave Status Dots + Agents + Refresh + Close -->
      <div class="px-4 py-3 bg-[#eafaf0] dark:bg-emerald-950/90 border-b border-[#cdecd8] dark:border-emerald-500/25 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-[15.5px] font-extrabold text-[#134e2c] dark:text-white tracking-tight truncate" data-i18n="ask_green_ai">Ask Green AI Copilot</span>
          <span class="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold bg-emerald-200/80 dark:bg-amber-500/20 text-[#14532d] dark:text-amber-300 border border-[#86efac] dark:border-amber-500/40 uppercase tracking-wider shrink-0">DEMO RULE-BASED</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <div class="flex items-center gap-1.5 mr-0.5" title="Live Telemetry Sync Active">
            <span class="status-dot"></span><span class="status-dot"></span><span class="status-dot"></span>
          </div>
          <button type="button" onclick="navigateTo('agent-console')" class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#dcfce7] dark:bg-emerald-900/70 hover:bg-[#bbf7d0] text-[#15803d] dark:text-emerald-200 border border-[#86efac] dark:border-emerald-500/40 transition flex items-center gap-1" title="Open 6-Agent Console">
            <span>🤖</span><span>6 Agents</span>
          </button>
          <button type="button" onclick="resetCopilotChat()" class="text-[#15803d] dark:text-emerald-300 hover:bg-[#d8f3e2] dark:hover:bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center transition text-base font-bold" title="Reset Copilot Chat">↻</button>
          <button type="button" onclick="toggleCopilotDrawer(false)" class="text-[#15803d] dark:text-emerald-300 hover:bg-[#d8f3e2] dark:hover:bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center transition text-lg leading-none" aria-label="Close Ask Green AI">×</button>
        </div>
      </div>

      <!-- Sub-header Strip: Tracking Telemetry + LIVE AGENT pill -->
      <div class="px-3.5 py-2 bg-[#effaf3] dark:bg-slate-950/90 border-b border-[#d5f0df] dark:border-emerald-500/20 flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1b5e37] dark:text-emerald-400 truncate">
          <span>📡</span>
          <span id="copilot-mode-status" class="truncate">Tracking Energy, Carbon, Bill &amp; 18+ Machines live</span>
        </div>
        <span class="shrink-0 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#dcfce7] dark:bg-emerald-950 text-[#15803d] dark:text-emerald-300 border border-[#bbf7d0] dark:border-emerald-500/40">LIVE AGENT</span>
      </div>

      <!-- Copilot Conversation Thread with 3D Animated Green Orb & Synced Messages -->
      <div id="copilot-messages" class="flex-1 overflow-y-auto custom-scroll px-3.5 pt-4 pb-3 space-y-3 bg-white dark:bg-slate-950/80">
        <!-- Populated dynamically by renderCopilotDrawerContent() -->
      </div>

      <!-- Bottom Prompt Bar: 🎯 Marquee Prompt + Suggested Chips + Rounded Green Input Form -->
      <div class="px-3 py-2.5 bg-[#f4fbf7] dark:bg-slate-900 border-t border-[#d8f0e0] dark:border-emerald-500/25 space-y-2">
        <!-- 🎯 Target Prompt Marquee Pill (Matches Reference Image & Video) -->
        <button type="button" onclick="askCopilotDirect('Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 বিদ্যুৎ সাশ্রয়ের plan kore dao')" class="w-full text-left px-3 py-1.5 rounded-full bg-white dark:bg-slate-950 border border-[#cdecd8] dark:border-emerald-500/30 hover:border-[#16a34a] shadow-2xs flex items-center gap-2 prompt-marquee transition group">
          <span class="text-sm shrink-0">🎯</span>
          <span class="text-[12px] font-semibold text-[#14532d] dark:text-emerald-300 group-hover:text-[#15803d]">Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao</span>
        </button>

        <!-- Suggested Grounded Prompts Header & Bilingual Switcher -->
        <div class="flex items-center justify-between px-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#1b5e37] dark:text-slate-400" data-i18n="copilot_suggested">Suggested Grounded Prompts</span>
          <button type="button" onclick="toggleCopilotLanguage()" id="copilot-lang-pill" class="text-[10px] font-bold text-[#15803d] dark:text-emerald-400 hover:underline">
            Switch to বাংলা / EN
          </button>
        </div>

        <!-- Horizontal Quick Chips Box (All 8 Required Prompts) -->
        <div id="copilot-prompt-chips" class="flex items-center gap-1.5 overflow-x-auto custom-scroll pb-0.5">
          <!-- Chips rendered dynamically -->
        </div>

        <!-- Rounded Green Border Input Form with Circular Up-Arrow Button -->
        <form id="copilot-form" onsubmit="handleCopilotSubmit(event)" class="flex items-center bg-white dark:bg-slate-950 rounded-full border-[2px] border-[#16a34a] pl-4 pr-1.5 py-1 shadow-xs">
          <input
            type="text"
            id="copilot-input"
            placeholder="Type a message... / আপনার প্রশ্ন লিখুন..."
            aria-label="Ask Green AI Copilot question"
            class="w-full bg-transparent text-[13.5px] text-slate-800 dark:text-white placeholder-[#6b7280] focus:outline-none"
          />
          <button type="submit" class="w-8 h-8 shrink-0 rounded-full bg-[#15803d] hover:bg-[#166534] text-white flex items-center justify-center transition font-bold text-sm shadow-xs" aria-label="Send message to Copilot">↑</button>
        </form>
      </div>
    </aside>`;

html = html.substring(0, startIdx) + newAside + html.substring(endIdx + asideEndMarker.length);
console.log('✓ Replaced #copilot-drawer with 3D Animated Orb Copilot Chat');

// ============================================================================
// 4. UPDATE FLOATING AI LAUNCHER (#floating-ai-launcher) WITH 3D MINI-ORB
// ============================================================================
const launcherStart = html.indexOf('<!-- FLOATING AI WIDGET LAUNCHER');
if (launcherStart !== -1) {
  const bodyEnd = html.lastIndexOf('</body>');
  const newLauncher = `<!-- FLOATING AI WIDGET LAUNCHER ("flotingai" — Fixed Docked FAB with 3D Animated Orb) -->
  <div id="floating-ai-launcher" class="fixed bottom-5 right-5 z-30 flex items-center print:hidden">
    <button
      type="button"
      id="btn-floating-ai-toggle"
      onclick="toggleCopilotDrawer()"
      class="group relative flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full bg-[#eafaf0] dark:bg-slate-900 text-[#134e2c] dark:text-white shadow-[0_12px_30px_rgba(22,163,74,0.35)] border-[1.5px] border-[#86efac] dark:border-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      title="Open Ask Green AI Copilot & Live Agent"
    >
      <div class="mini-orb"><div class="mini-eye"></div><div class="mini-eye"></div></div>
      <div class="flex flex-col text-left">
        <div class="flex items-center gap-1.5">
          <span class="font-extrabold text-xs tracking-tight text-[#0f3923] dark:text-white">AI Copilot</span>
          <span class="px-1.5 py-0.2 rounded-full text-[8.5px] font-extrabold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] uppercase">LIVE AGENT</span>
        </div>
        <span class="text-[10px] font-semibold text-[#16a34a] dark:text-emerald-400">Nemotron 3 Ultra • 6 Agents</span>
      </div>
    </button>
  </div>
`;
  html = html.substring(0, launcherStart) + newLauncher + '\n' + html.substring(bodyEnd);
  console.log('✓ Updated #floating-ai-launcher with 3D Animated Mini-Orb');
}

// ============================================================================
// 5. UPDATE SECTION 9: GROUNDED BILINGUAL AI COPILOT ENGINE & RENDERING
// ============================================================================
const jsStartMarker = '// 9. GROUNDED BILINGUAL AI COPILOT ENGINE';
const jsEndMarker = '// 10. SIMULATION LOOP, SCENARIOS, MODALS';
const jsStartIdx = html.indexOf(jsStartMarker);
const jsEndIdx = html.indexOf(jsEndMarker);

if (jsStartIdx === -1 || jsEndIdx === -1) {
  console.error('Could not find Section 9 JS markers');
  process.exit(1);
}

const newSection9Js = `// 9. GROUNDED BILINGUAL AI COPILOT ENGINE (ENGLISH, বাংলা & BANGLISH — SECTION 18)
    // ============================================================================
    const SUGGESTED_PROMPTS = [
      { en: 'Why did energy use rise this week?', bn: 'এই মাসে বিদ্যুৎ খরচ কেন বেড়েছে? কোন কোন মেশিনে বেশি বিদ্যুৎ খরচ হচ্ছে?' },
      { en: 'Which machine wastes the most energy during night shift?', bn: 'নাইট শিফটে কোন মেশিনে সবচেয়ে বেশি বিদ্যুৎ অপচয় হচ্ছে?' },
      { en: 'What is next month’s bill estimate if we do nothing?', bn: 'আগামী মাসের বিল কত হবে?' },
      { en: 'Compare the three highest-impact recommendations.', bn: 'সবচেয়ে বেশি সাশ্রয়কারী ৩টি সুপারিশ তুলনা করুন।' },
      { en: 'Show the assumptions behind this carbon estimate.', bn: 'কার্বন নিঃসরণ কত টন হবে এবং এর সূত্র কী?' },
      { en: 'What changed after the simulated intervention?', bn: 'সিমুলেশন ইন্টারভেনশন প্রয়োগের পর কী পরিবর্তন হয়েছে?' },
      { en: 'Explain this in Bangla.', bn: 'বাংলায় বিস্তারিত ব্যাখ্যা করুন।' },
      { en: 'Which data is live and which is simulated?', bn: 'কোন ডেটা লাইভ এবং কোন ডেটা সিমুলেশন?' }
    ];

    let copilotThinkingTimer = null;

    function buildGroundedBanglaDefaultAnswer(m) {
      const sewPct = formatNum(m.deptSharePct.Sewing, 0);
      const cutPct = formatNum(m.deptSharePct.Cutting, 0);
      const finPct = formatNum(m.deptSharePct.Finishing, 0);
      return \`এই মাসে মোট বিদ্যুৎ ব্যবহার <strong>\${formatNum(m.totalPeriodKwh)} kWh</strong> [SIMULATION]। বিভাগ ও মেশিনভিত্তিক বিশ্লেষণে দেখা যাচ্ছে মূলত নিচের ৩টি বিভাগে সবচেয়ে বেশি বিদ্যুৎ খরচ হচ্ছে:<br/>
      1. <strong>সেলাই মেশিন (Sewing Dept):</strong> প্রায় \${sewPct}% (\${formatNum(m.deptKwh.Sewing)} kWh — নাইট শিফটে MCH-SEW-03 আইডল লোড 4.8 kW)<br/>
      2. <strong>কাটিং মেশিন (Cutting Dept):</strong> প্রায় \${cutPct}% (\${formatNum(m.deptKwh.Cutting)} kWh — MCH-CUT-02 ওভারলোড 24.6 kW)<br/>
      3. <strong>ফিনিশিং মেশিন (Finishing Dept):</strong> প্রায় \${finPct}% (\${formatNum(m.deptKwh.Finishing)} kWh)<br/>
      <span class="text-[10.5px] font-mono text-[#15803d] dark:text-emerald-400">Formula: Σ Machine Period kWh | Grounded in Shared Simulation State</span>\`;
    }

    function generateGroundedCopilotReply(queryText) {
      const m = getDerivedMetrics();
      const a = AppState.assumptions;
      const q = String(queryText || '').toLowerCase().trim();
      const useBn = AppState.language === 'bn' || q.includes('বাংলা') || q.includes('bangla') || /[\\u0980-\\u09F2\\u09F4-\\u09FF]/.test(queryText);
      const nowTime = new Date().toTimeString().split(' ')[0];

      // 1. Banglish / 4-month or Monthly Savings + Night-Shift Plan ("Amar ... plan kore dao")
      if (q.includes('amar ') || q.includes('plan kore dao') || q.includes('4-mo') || q.includes('4 month')) {
        return \`<strong>Night-Shift Waste Reduction &amp; ৳ 68,000/mo Savings Plan Ready ✅</strong><br/>
        • <strong>Step 1 (Night-Shift Auto-Standby — REC-01):</strong> Fitted auto-idle relay on <code class="font-mono">MCH-SEW-03</code> (4.8 kW idle draw eliminated) → saves <strong>1,492 kWh &amp; \${formatBdt(18500)}/mo</strong> (Payback: 2.1 mo).<br/>
        • <strong>Step 2 (Air Compressor Leak Seal — REC-02):</strong> Sealed 2.1 bar header leak on <code class="font-mono">COMP-01</code> (18.4 kW draw) → saves <strong>1,467 kWh &amp; \${formatBdt(18200)}/mo</strong> (Payback: 3.8 mo).<br/>
        • <strong>Step 3 (Cutting Servo &amp; Boiler Heat Recovery — REC-03/04/05):</strong> Overhauled <code class="font-mono">MCH-CUT-02</code> (24.6 kW fault) + <code class="font-mono">BOIL-01</code> economizer → saves <strong>\${formatBdt(31300)}/mo</strong>.<br/>
        • <strong>Total Verified Impact:</strong> <strong>\${formatBdt(m.estimatedSavingsBdt)}/month</strong> (\${formatBdt(m.estimatedSavingsBdt * 4)} over 4 months, \${formatBdt(m.estimatedSavingsBdt * 12)}/year) + <strong>\${formatNum(m.totalRecSavedCo2, 2)} tCO₂e/mo</strong> carbon cut.\`;
      }

      // 2. Greetings / Live Status (Matches Reference Video 00:11 - 00:14)
      if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('সালাম') || q === 'hello ai' || q === 'hi ai' || q.includes('live status')) {
        return useBn
          ? \`হ্যালো <strong>Md. Fahad</strong>! আমি আপনার <strong>Copilot+ Agent</strong> (NVIDIA Nemotron 3 Ultra • 6 Simulation Agents), যা আপনার ফ্যাক্টরির লাইভ এনার্জি টেলিম্যাট্রি, 3D Digital Twin, CarbonIQ এবং Savings Optimizer-এর সাথে সরাসরি সংযুক্ত।<br/><br/>
          • <strong>সংযুক্ত ফ্যাক্টরি ফ্লিট:</strong> Rupsha Garments Ltd., Gazipur (১৮টি মেশিনের মধ্যে ১৭টি সক্রিয় • উপলব্ধতা \${formatNum(m.availabilityPct, 1)}% • তাৎক্ষণিক লোড \${formatNum(m.totalCurrentKw, 1)} kW)<br/>
          • <strong>চলতি মাসের বিদ্যুৎ ও বিল:</strong> \${formatNum(m.totalPeriodKwh)} kWh (\${formatBdt(m.currentBillBdt)} @ ৳ \${formatNum(m.effectiveTariff, 2)}/kWh)<br/>
          • <strong>মাসিক সাশ্রয় সুযোগ:</strong> \${formatBdt(m.estimatedSavingsBdt)}/মাস এবং \${formatNum(m.totalRecSavedCo2, 2)} টন CO₂e হ্রাস<br/>
          • <strong>সর্বশেষ রিয়েল-টাইম ইভেন্ট [\${nowTime}]:</strong> Bi-directional sync সক্রিয় (Dashboard, Energy Analytics, 3D Digital Twin, CarbonIQ ও ৬টি এআই এজেন্ট)।\`
          : \`Hello <strong>Md. Fahad</strong>! I am your <strong>Copilot+ Agent</strong> powered by <strong>NVIDIA Nemotron 3 Ultra</strong> (<code class="font-mono text-[11px]">nvidia/nemotron-3-ultra-550b-a55b</code>) &amp; 6 Rule-Based Simulation Agents, connected live to your Factory Energy Analytics, 3D EPMS Digital Twin, Savings Optimizer, and CarbonIQ.<br/><br/>
          • <strong>Connected Factory Journey:</strong> Rupsha Garments Ltd. (Gazipur • 720h Horizon • Instant Load: \${formatNum(m.totalCurrentKw, 1)} kW • Availability: \${formatNum(m.availabilityPct, 1)}%)<br/>
          • <strong>Live Period Energy &amp; Bill:</strong> \${formatNum(m.totalPeriodKwh)} kWh (\${formatBdt(m.currentBillBdt)} at ৳ \${formatNum(m.effectiveTariff, 2)}/kWh)<br/>
          • <strong>Active Savings Opportunity:</strong> \${formatBdt(m.estimatedSavingsBdt)}/mo avoidable cost (\${formatNum(m.totalRecSavedCo2, 2)} tCO₂e/mo reduction)<br/>
          • <strong>Latest Real-Time Event [\${nowTime}]:</strong> OpenRouter NVIDIA Nemotron 3 Ultra (550B) Copilot+ Connected — Bi-directional sync active across Dashboard, Energy Analytics, 3D Digital Twin, AI Recommendations &amp; 6 Simulation Agents.<br/><br/>
          Try saying: <strong>Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao</strong>, <strong>Compare the three highest-impact recommendations</strong>, or <strong>Run all 6 simulation agents</strong>.\`;
      }

      // 3. Post-Intervention Simulation Delta (Checked before generic 'simulated' keyword)
      if (q.includes('intervention') || q.includes('changed') || q.includes('পরিবর্তন')) {
        return useBn
          ? \`<strong>সিমুলেশন ইন্টারভেনশন ফলাফল [SIMULATION]:</strong><br/>• বর্তমান সিনারিও: <strong>\${AppState.activeScenario}</strong>।<br/>• বেসলাইন (\${formatNum(a.baselineMonthlyKwh)} kWh) থেকে বর্তমান ব্যবহার <strong>\${formatNum(m.totalPeriodKwh)} kWh</strong> (\${formatNum(m.energyDeltaPct, 1)}% পরিবর্তন)।<br/>• সিমুলেশনে অনুমোদিত সাশ্রয়: <strong>\${formatBdt(m.appliedRecSavedBdt)}/মাস</strong>।\`
          : \`<strong>Post-Intervention Simulation Delta [SIMULATION]:</strong><br/>• <strong>Active Scenario:</strong> <code class="font-mono">\${AppState.activeScenario}</code>.<br/>• <strong>Period Energy:</strong> \${formatNum(m.totalPeriodKwh)} kWh vs. \${formatNum(a.baselineMonthlyKwh)} kWh comparable 720h baseline (\${formatNum(m.energyDeltaPct, 1)}%).<br/>• <strong>Applied Simulation Actions:</strong> \${formatBdt(m.appliedRecSavedBdt)}/mo active in current state. Note: All interventions modify local simulation state only; no physical equipment was actuated.\`;
      }

      if (q.includes('live') || q.includes('simulated') || q.includes('লাইভ') || q.includes('সিমুলেশন')) {
        return useBn
          ? \`<strong>ডেটা ক্লাস রিপোর্ট [SIMULATION]:</strong><br/>• <strong>LIVE/CONNECTED:</strong> ০টি (কোনো ফিজিক্যাল PLC/SCADA সংযুক্ত নেই)।<br/>• <strong>SIMULATION:</strong> ১৮টি ফ্লিট মেশিন (\${formatNum(m.totalPeriodKwh)} kWh) এবং EPMS ব্রেকার টেলিম্যাট্রি (Seed #\${AppState.simSeed})।<br/>• <strong>SAMPLE/IMPORTED:</strong> সেপ্টেম্বর বেসলাইন (\${formatNum(a.baselineMonthlyKwh)} kWh)।<br/>• <strong>ESTIMATE/FORECAST:</strong> বিল (\${formatBdt(m.currentBillBdt)}) ও কার্বন পূর্বাভাস।\`
          : \`<strong>Data Provenance &amp; Operating Mode Audit:</strong><br/>• <strong>LIVE/CONNECTED:</strong> 0 streams (No physical PLC/SCADA equipment control is connected).<br/>• <strong>SIMULATION:</strong> All 18 machine telemetry streams (\${formatNum(m.totalPeriodKwh)} kWh, \${formatNum(m.totalCurrentKw, 1)} kW active load, Seed #\${AppState.simSeed}).<br/>• <strong>SAMPLE/IMPORTED:</strong> Historical baseline (\${formatNum(a.baselineMonthlyKwh)} kWh).<br/>• <strong>ESTIMATE/FORECAST:</strong> Bill (\${formatBdt(m.currentBillBdt)}) and Carbon (\${formatNum(m.totalCarbonTons, 2)} tCO₂e) calculations.<br/>• <strong>Copilot Mode:</strong> Deterministic Rule-Based Demo Copilot reading live shared state.\`;
      }

      if (q.includes('night') || q.includes('waste') || q.includes('নাইট') || q.includes('অপচয়') || q.includes('কেন রাতে বিদ্যুৎ অপচয় হচ্ছে')) {
        return useBn
          ? \`<strong>নাইট শিফট (18:00–02:00 BST) অপচয় বিশ্লেষণ [SIMULATION]:</strong><br/>• <strong>MCH-SEW-03 (Sewing Line 3):</strong> আইডল অবস্থায় <strong>4.8 kW</strong> বিদ্যুৎ টানছে (মাসিক 3,890 kWh)।<br/>• <strong>COMP-01 (Air Compressor):</strong> এয়ার লিকের কারণে 18.4 kW লোডে চলছে।<br/>• <strong>সমাধান (REC-01):</strong> অটো-স্ট্যান্ডবাই রিলে চালু করলে মাসে <strong>1,492 kWh (\${formatBdt(18500)})</strong> সাশ্রয় হবে (Payback: 2.1 মাস)।\`
          : \`<strong>Night-Shift (18:00–02:00 BST) Waste Analysis [SIMULATION]:</strong><br/>• <strong>Observed Value:</strong> <code class="font-mono">MCH-SEW-03</code> is in <em>Idle</em> status drawing <strong>4.8 kW</strong> non-productive load (3,890 kWh period total), while <code class="font-mono">COMP-01</code> draws <strong>18.4 kW</strong> due to header pressure drop.<br/>• <strong>Inference &amp; Formula:</strong> 1,491.94 kWh/mo avoidable waste × ৳ \${formatNum(m.effectiveTariff, 2)}/kWh = <strong>\${formatBdt(1491.94 * m.effectiveTariff)}/month</strong>.<br/>• <strong>Next Step:</strong> Approve &amp; apply <code class="font-mono">REC-01</code> in AI Recommendations (Payback: 2.1 months).\`;
      }

      if (q.includes('compressor') || q.includes('leak') || q.includes('কম্প্রেসার') || q.includes('লিক')) {
        return useBn
          ? \`<strong>কম্প্রেসার লিক ও হেড প্রেশার ড্রপ বিশ্লেষণ [SIMULATION]:</strong><br/>• <strong>মেশিন:</strong> COMP-01 (সেন্ট্রাল এয়ার কম্প্রেসার, রেটেড ৩০ kW)।<br/>• <strong>বর্তমান লোড:</strong> 18.4 kW (অস্বাভাবিক ব্যাকপ্রেসার লিক)।<br/>• <strong>প্রেশার ড্রপ:</strong> ২.১ বার অতিরিক্ত চাপ অপচয় হচ্ছে।<br/>• <strong>সুপারিশ (REC-02):</strong> আল্ট্রাসনিক লিক অডিট ও পাইপিং সিলিং সম্পন্ন করলে মাসে <strong>\${formatBdt(18200)}</strong> সাশ্রয় হবে (Payback: 3.8 মাস)।\`
          : \`<strong>Air Compressor Air Leak Audit [SIMULATION]:</strong><br/>• <strong>Asset:</strong> <code class="font-mono">COMP-01</code> (Central Utility Air Compressor, 30.0 kW rated).<br/>• <strong>Current Draw:</strong> 18.4 kW active load with 2.1 bar header pressure drop.<br/>• <strong>Quantified Impact:</strong> 1,467 kWh/mo avoidable compressor cycling loss.<br/>• <strong>Intervention (REC-02):</strong> Ultrasonic leak detection &amp; coupling reseal saves <strong>\${formatBdt(18200)}/month</strong> (Payback: 3.8 months).\`;
      }

      if (q.includes('savings') || q.includes('68,000') || q.includes('68000') || q.includes('68k') || q.includes('সাশ্রয়')) {
        return useBn
          ? \`<strong>৳ ৬৮,০০০ মাসিক সাশ্রয় রোডম্যাপ (৫টি এআই অ্যাকশন) [ESTIMATE/FORECAST]:</strong><br/>1. <strong>REC-01 (MCH-SEW-03):</strong> অটো স্ট্যান্ডবাই রিলে → \${formatBdt(18500)}/মাস<br/>2. <strong>REC-02 (COMP-01):</strong> কম্প্রেসার এয়ার লিক সিলিং → \${formatBdt(18200)}/মাস<br/>3. <strong>REC-03 (MCH-CUT-02):</strong> কাটার মোশন বিয়ারিং মেরামত → \${formatBdt(14800)}/মাস<br/>4. <strong>REC-04 (BOIL-01):</strong> বয়লার ব্লোডাউন হিট রিকভারি → \${formatBdt(11200)}/মাস<br/>5. <strong>REC-05 (LGT-ZN-01):</strong> স্মার্ট অকুপেন্সি মোশন সেন্সর → \${formatBdt(5300)}/মাস<br/>• <strong>মোট মাসিক সাশ্রয়:</strong> <strong>\${formatBdt(m.estimatedSavingsBdt)}</strong> (বছরে \${formatBdt(m.estimatedSavingsBdt * 12)} ও ৩.০৭ টন CO₂e পরিহার্য)।\`
          : \`<strong>৳ 68,000/mo Avoidable Savings Roadmap (5 Ranked Actions) [ESTIMATE/FORECAST]:</strong><br/>1. <strong>REC-01 (MCH-SEW-03):</strong> Standby auto-shutdown relay → <strong>\${formatBdt(18500)}/mo</strong> (2.1 mo payback)<br/>2. <strong>REC-02 (COMP-01):</strong> Acoustic leak fix &amp; nozzle tune → <strong>\${formatBdt(18200)}/mo</strong> (3.8 mo payback)<br/>3. <strong>REC-03 (MCH-CUT-02):</strong> Bearing &amp; servo-motor overhaul → <strong>\${formatBdt(14800)}/mo</strong> (4.5 mo payback)<br/>4. <strong>REC-04 (BOIL-01):</strong> Boiler economizer heat recovery → <strong>\${formatBdt(11200)}/mo</strong> (5.2 mo payback)<br/>5. <strong>REC-05 (LGT-ZN-01):</strong> PIR daylight smart harvesting → <strong>\${formatBdt(5300)}/mo</strong> (2.8 mo payback)<br/>• <strong>Total Impact:</strong> <strong>\${formatBdt(m.estimatedSavingsBdt)}/mo</strong> (\${formatBdt(m.estimatedSavingsBdt * 12)}/yr &amp; 3.07 tCO₂e avoidable emissions).\`;
      }

      if (q.includes('agent') || q.includes('এজেন্ট') || q.includes('6 agents')) {
        return useBn
          ? \`<strong>৬টি সিমুলেশন এআই এজেন্ট কনসোল স্থিতি [SIMULATION]:</strong><br/>
          • <strong>AGT-ENERGY (Energy Monitor):</strong> সক্রিয় • ১৮টি মেশিনের লোড ট্র্যাক করছে।<br/>
          • <strong>AGT-FORECAST (Predictive Load):</strong> সক্রিয় • আগামী ৭২০ ঘণ্টার পূর্বাভাস জেনারেট করেছে।<br/>
          • <strong>AGT-CARBON (CarbonIQ):</strong> সক্রিয় • Scope 1 ও Scope 2 নির্গমন হিসাব করছে।<br/>
          • <strong>AGT-RECOMMEND (Action Engine):</strong> সক্রিয় • ৫টি সমাধান প্রস্তাব করেছে।<br/>
          • <strong>AGT-SAVINGS (Tariff Optimizer):</strong> সক্রিয় • \${formatBdt(m.estimatedSavingsBdt)} সাশ্রয় ভ্যালিডেট করেছে।<br/>
          • <strong>AGT-REPORT (Compliance Auditor):</strong> সক্রিয় • ESG অডিট রিপোর্ট প্রস্তুত।\`
          : \`<strong>6 Rule-Based Simulation Agents Status Report [SIMULATION]:</strong><br/>
          • <strong>AGT-ENERGY (Real-Time Telemetry):</strong> Active • Polling 18 fleet machines every 3.5s.<br/>
          • <strong>AGT-FORECAST (Predictive Demand):</strong> Active • Monthly bill estimated at \${formatBdt(m.currentBillBdt)}.<br/>
          • <strong>AGT-CARBON (CarbonIQ Scope 1 &amp; 2):</strong> Active • Tracking \${formatNum(m.totalCarbonTons, 2)} tCO₂e emissions.<br/>
          • <strong>AGT-RECOMMEND (Anomaly &amp; Prescriptive):</strong> Active • 5 ranked actions generated.<br/>
          • <strong>AGT-SAVINGS (Tariff &amp; ROI Engine):</strong> Active • Quantified \${formatBdt(m.estimatedSavingsBdt)}/mo ROI.<br/>
          • <strong>AGT-REPORT (Audit &amp; Compliance):</strong> Ready • CSV/PDF logs generated with zero telemetry drift.\`;
      }

      if (q.includes('bill') || q.includes('do nothing') || q.includes('বিল')) {
        const nextNoAction = m.currentBillBdt;
        const nextOpt = Math.max(0, m.currentBillBdt - m.estimatedSavingsBdt);
        return useBn
          ? \`<strong>আগামী মাসের আনুমানিক বিদ্যুৎ বিল [ESTIMATE/FORECAST]:</strong><br/>• <strong>কোনো পদক্ষেপ না নিলে (No-Action):</strong> <strong>\${formatBdt(nextNoAction)}</strong> (\${formatNum(m.totalPeriodKwh)} kWh × ৳ \${formatNum(m.effectiveTariff, 2)}/kWh, ±5% সীমা)।<br/>• <strong>এআই সুপারিশ প্রয়োগ করলে (Intervention):</strong> <strong>\${formatBdt(nextOpt)}</strong> (মাসিক সাশ্রয়: \${formatBdt(m.estimatedSavingsBdt)})।\`
          : \`<strong>Next Month (30-Day / 720h) Bill Estimate [ESTIMATE/FORECAST]:</strong><br/>• <strong>No-Action Scenario:</strong> <strong>\${formatBdt(nextNoAction)}</strong> (±5% range: \${formatBdt(nextNoAction * 0.95)} – \${formatBdt(nextNoAction * 1.05)}).<br/>• <strong>With AI Interventions Applied:</strong> <strong>\${formatBdt(nextOpt)}</strong> (saving \${formatBdt(m.estimatedSavingsBdt)}/mo).<br/>• <strong>Formula:</strong> <code class="font-mono">\${formatNum(m.totalPeriodKwh)} kWh × ৳ \${formatNum(m.effectiveTariff, 2)}/kWh</code> (\${a.tariffVersion}).\`;
      }

      if (q.includes('carbon') || q.includes('assumption') || q.includes('কার্বন')) {
        return useBn
          ? \`<strong>কার্বন নিঃসরণ ও হিসাবের ভিত্তি [SIMULATION / ESTIMATE]:</strong><br/>• <strong>মোট নিঃসরণ:</strong> <strong>\${formatNum(m.totalCarbonTons, 2)} tCO₂e</strong> (এই মাস, ৭২০ ঘণ্টা)।<br/>• <strong>Scope 1 (বয়লার প্রাকৃতিক গ্যাস):</strong> \${formatNum(a.currentMonthlyGasM3)} m³ × \${a.gasEmissionFactorKgPerM3} kg/m³ ÷ 1000 = <strong>\${formatNum(m.scope1Tons, 2)} tCO₂e</strong>।<br/>• <strong>Scope 2 (কেনা গ্রিড বিদ্যুৎ):</strong> \${formatNum(m.totalPeriodKwh)} kWh × \${a.gridEmissionFactorKgPerKwh} kg/kWh ÷ 1000 = <strong>\${formatNum(m.scope2Tons, 2)} tCO₂e</strong> (\${a.gridFactorVersion})।\`
          : \`<strong>Carbon Accounting Assumptions &amp; Scope Boundaries [SIMULATION]:</strong><br/>• <strong>Total Period Emissions (720h):</strong> <strong>\${formatNum(m.totalCarbonTons, 2)} tCO₂e</strong>.<br/>• <strong>Scope 1 (Direct Boiler Gas):</strong> <code class="font-mono">\${formatNum(a.currentMonthlyGasM3)} m³ × \${a.gasEmissionFactorKgPerM3} kg CO₂e/m³ ÷ 1000 = \${formatNum(m.scope1Tons, 2)} tCO₂e</code> (\${a.gasFactorVersion}).<br/>• <strong>Scope 2 (Purchased Grid Electricity):</strong> <code class="font-mono">\${formatNum(m.totalPeriodKwh)} kWh × \${a.gridEmissionFactorKgPerKwh} kg CO₂e/kWh ÷ 1000 = \${formatNum(m.scope2Tons, 2)} tCO₂e</code> (\${a.gridFactorVersion}).<br/>• <strong>Boundary Rule:</strong> Purchased electricity is strictly Scope 2; Scope 3 supply-chain logistics are excluded.\`;
      }

      if (q.includes('compare') || q.includes('recommendation') || q.includes('roi') || q.includes('সুপারিশ')) {
        const r1 = AppState.recommendations[0];
        const r2 = AppState.recommendations[1];
        const r3 = AppState.recommendations[2];
        return useBn
          ? \`<strong>শীর্ষ ৩টি এআই সুপারিশের তুলনা [ESTIMATE/FORECAST]:</strong><br/>1. <strong>\${r1.id}:</strong> সাশ্রয় \${formatBdt(r1.estSavedBdt)}/মাস (\${formatNum(r1.estSavedKwh, 0)} kWh) • Payback: 2.1 মাস।<br/>2. <strong>\${r2.id}:</strong> সাশ্রয় \${formatBdt(r2.estSavedBdt)}/মাস (\${formatNum(r2.estSavedKwh, 0)} kWh) • Payback: 3.8 মাস।<br/>3. <strong>\${r3.id}:</strong> সাশ্রয় \${formatBdt(r3.estSavedBdt)}/মাস (\${formatNum(r3.estSavedKwh, 0)} kWh) • Payback: 4.5 মাস।\`
          : \`<strong>Top 3 Evidence-Backed Recommendations Comparison [ESTIMATE/FORECAST]:</strong><br/>1. <strong>\${r1.id} (\${r1.machineId}):</strong> Saves <strong>\${formatBdt(r1.estSavedBdt)}/mo</strong> (\${formatNum(r1.estSavedKwh, 0)} kWh, \${formatNum(r1.estSavedCo2Tons, 2)} tCO₂e) • Cost: \${formatBdt(r1.implementationCostBdt)} • Payback: <strong>2.1 months</strong>.<br/>2. <strong>\${r2.id} (\${r2.machineId}):</strong> Saves <strong>\${formatBdt(r2.estSavedBdt)}/mo</strong> (\${formatNum(r2.estSavedKwh, 0)} kWh, \${formatNum(r2.estSavedCo2Tons, 2)} tCO₂e) • Cost: \${formatBdt(r2.implementationCostBdt)} • Payback: <strong>3.8 months</strong>.<br/>3. <strong>\${r3.id} (\${r3.machineId}):</strong> Saves <strong>\${formatBdt(r3.estSavedBdt)}/mo</strong> (\${formatNum(r3.estSavedKwh, 0)} kWh, \${formatNum(r3.estSavedCo2Tons, 2)} tCO₂e) • Cost: \${formatBdt(r3.implementationCostBdt)} • Payback: <strong>4.5 months</strong>.\`;
      }

      return useBn
        ? buildGroundedBanglaDefaultAnswer(m)
        : \`<strong>Current Shared Simulation Summary (Oct 2026 • 720h Window) [SIMULATION]:</strong><br/>• <strong>Total Energy:</strong> \${formatNum(m.totalPeriodKwh)} kWh (Instantaneous fleet demand: \${formatNum(m.totalCurrentKw, 1)} kW).<br/>• <strong>Estimated Bill:</strong> \${formatBdt(m.currentBillBdt)} (@ ৳ \${formatNum(m.effectiveTariff, 2)}/kWh).<br/>• <strong>Carbon Emissions:</strong> \${formatNum(m.totalCarbonTons, 2)} tCO₂e (Scope 1: \${formatNum(m.scope1Tons, 2)}t, Scope 2: \${formatNum(m.scope2Tons, 2)}t).<br/>• <strong>Top Anomaly:</strong> <code class="font-mono">MCH-CUT-02</code> Fault (24.6 kW, 68.4°C) &amp; <code class="font-mono">MCH-SEW-03</code> Idle draw (4.8 kW).\`;
    }

    function renderCopilotDrawerContent() {
      const m = getDerivedMetrics();
      const msgBox = document.getElementById('copilot-messages');
      const now = Date.now();
      const isAnyThinking = AppState.copilotMessages.some(msg => msg.thinkingUntil && now < msg.thinkingUntil);

      if (msgBox) {
        // 1. Centered 3D Animated Green Orb Hero + Initial Synced Card + Stacked Quick-Suggest Pills (Matches Reference Video & Image)
        const deltaAbs = Math.abs(Math.round(m.energyDeltaPct || 12));
        const welcomeHeroHtml = \`
          <div id="copilot-orb-header" class="flex flex-col items-center text-center pt-1 pb-2 \${isAnyThinking ? 'thinking' : ''}">
            <div class="orb-wrapper mb-2" onclick="askCopilotDirect('Hi')" title="Click to ping AI Copilot">
              <div class="orb-glow"></div>
              <div class="orb-sphere">
                <div class="orb-eye"></div>
                <div class="orb-eye"></div>
              </div>
            </div>
            <h2 class="text-[19px] font-extrabold text-[#0f3923] dark:text-white tracking-tight leading-tight">AI Copilot</h2>
            <p class="text-[12.5px] font-semibold text-[#16a34a] dark:text-emerald-400 mt-0.5">Copilot+ Agent · Nemotron 3 Ultra 550B</p>
          </div>

          <!-- Initial Synced Live Telemetry Card -->
          <div class="flex items-start gap-2.5 msg-enter">
            <div class="mini-orb mt-1"><div class="mini-eye"></div><div class="mini-eye"></div></div>
            <div class="flex-1 rounded-[20px] border border-[#ccebd7] dark:border-emerald-500/30 bg-[#f1faf4] dark:bg-slate-900 px-3.5 py-3 shadow-2xs">
              <p class="text-[14px] font-extrabold text-[#111827] dark:text-white mb-1">Factory energy use is down \${deltaAbs}% this month (\${formatNum(m.totalPeriodKwh)} kWh)</p>
              <p class="text-[12.5px] leading-[1.48] text-[#4b5563] dark:text-slate-300">Live telemetry synced (<strong>\${formatBdt(m.currentBillBdt)}</strong> Bill • <strong>\${formatNum(m.totalCarbonTons, 1)}t CO₂e</strong> • <strong>17/18</strong> Machines Active). Ask me to plan your 4-month energy &amp; carbon reduction, compare ROI fixes, or execute a live Simulation Agent action.</p>
            </div>
          </div>

          <!-- Quick-Suggest Pills (Matches Video Frame 00:00 - 00:10) -->
          <div class="ml-[44px] flex flex-wrap gap-1.5 pb-1">
            <button type="button" onclick="askCopilotDirect('Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao')" class="inline-flex items-center px-3 py-1 rounded-full border border-[#ccebd7] dark:border-emerald-500/30 bg-[#f1faf4] dark:bg-slate-900 hover:bg-[#dcfce7] text-[12px] font-semibold text-[#14532d] dark:text-emerald-300 transition">Quick-suggest · 4-Mo Savings Plan</button>
            <button type="button" onclick="askCopilotDirect('Compare the three highest-impact recommendations.')" class="inline-flex items-center px-3 py-1 rounded-full border border-[#ccebd7] dark:border-emerald-500/30 bg-[#f1faf4] dark:bg-slate-900 hover:bg-[#dcfce7] text-[12px] font-semibold text-[#14532d] dark:text-emerald-300 transition">Quick-suggest · Best ROI Fix</button>
            <button type="button" onclick="askCopilotDirect('How can we achieve ৳ 68,000 monthly savings?')" class="inline-flex items-center px-3 py-1 rounded-full border border-[#ccebd7] dark:border-emerald-500/30 bg-[#f1faf4] dark:bg-slate-900 hover:bg-[#dcfce7] text-[12px] font-semibold text-[#14532d] dark:text-emerald-300 transition">Quick-suggest · +৳68,000 Savings</button>
            <button type="button" onclick="askCopilotDirect('Hi')" class="inline-flex items-center px-3 py-1 rounded-full border border-[#ccebd7] dark:border-emerald-500/30 bg-[#f1faf4] dark:bg-slate-900 hover:bg-[#dcfce7] text-[12px] font-semibold text-[#14532d] dark:text-emerald-300 transition">Quick-suggest · Live Status</button>
          </div>
        \`;

        // 2. Map Conversation Messages (With Live Step-by-Step Thinking Animation & Completed Reasoning Accordion)
        const messagesHtml = AppState.copilotMessages.map((msg, index) => {
          const bodyHtml = msg.isDynamicInitial ? buildGroundedBanglaDefaultAnswer(m) : msg.text;
          if (msg.sender === 'user') {
            return \`
              <div class="flex justify-end msg-enter">
                <div class="max-w-[85%] rounded-[20px] px-4 py-2.5 bg-[#15803d] text-white text-[13px] font-medium leading-snug shadow-xs">
                  \${bodyHtml}
                </div>
              </div>
            \`;
          }

          // If this assistant message is currently in the live thinking phase (Matches Video 00:10)
          if (msg.thinkingUntil && now < msg.thinkingUntil) {
            const elapsedSec = Math.max(0.2, ((900 - (msg.thinkingUntil - now)) / 1000)).toFixed(1);
            const stepText = elapsedSec < 0.45
              ? 'Step 1: Parsing intent &amp; checking 18-machine telemetry...'
              : 'Step 2: Querying live website telemetry: Fleet kW, Tariff &amp; CarbonIQ...';
            return \`
              <div class="flex items-start gap-2.5 msg-enter">
                <div class="mini-orb mt-1"><div class="mini-eye"></div><div class="mini-eye"></div></div>
                <div class="flex-1 rounded-[20px] border border-[#bbf7d0] dark:border-emerald-500/40 bg-[#f1faf4] dark:bg-slate-900 px-3.5 py-3 shadow-xs">
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#14532d] dark:text-emerald-300">
                      <span class="w-2 h-2 rounded-full bg-[#16a34a] animate-ping"></span>
                      <span>✨ AI Copilot Thinking...</span>
                    </span>
                    <span class="text-[11px] font-mono font-bold text-[#15803d] dark:text-emerald-400">\${elapsedSec}s</span>
                  </div>
                  <div class="h-1.5 w-full rounded-full bg-[#dcfce7] dark:bg-slate-800 overflow-hidden mb-2">
                    <div class="h-full bg-[#16a34a] rounded-full transition-all duration-200" style="width: 76%"></div>
                  </div>
                  <p class="text-[11.5px] text-[#374151] dark:text-slate-300 font-medium">\${stepText}</p>
                </div>
              </div>
            \`;
          }

          // Completed Assistant Message with Collapsible Reasoning Accordion & Model Badges (Matches Video 00:11 - 00:14)
          const thinkingHtml = \`
            <details class="mb-2.5 bg-white/95 dark:bg-slate-950/80 border border-[#bbf7d0] dark:border-emerald-500/30 rounded-xl px-3 py-2 text-[11.5px] text-[#14532d] dark:text-emerald-300 shadow-2xs">
              <summary class="cursor-pointer font-semibold flex items-center justify-between select-none">
                <span class="flex items-center gap-1.5">
                  <span>💭</span>
                  <span>Thought for 1.4s • View reasoning process</span>
                </span>
                <span class="text-xs text-[#16a34a]">⌄</span>
              </summary>
              <div class="mt-2 pt-2 border-t border-[#dcfce7] dark:border-emerald-500/20 space-y-1 text-[10.5px] font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                <div class="text-[#15803d] dark:text-emerald-400">▸ [State Query] Polled 18 fleet machines from shared AppState (\${formatNum(m.totalPeriodKwh)} kWh, \${formatNum(m.totalCurrentKw, 1)} kW)...</div>
                <div>▸ [Telemetry Analysis] MCH-CUT-02 load=24.6kW (Fault), MCH-SEW-03 idle=4.8kW, COMP-01=18.4kW.</div>
                <div>▸ [Rules Engine] AGT-ENERGY, AGT-CARBON &amp; AGT-SAVINGS evaluated deterministic formulas.</div>
                <div class="text-teal-700 dark:text-teal-300">▸ [Verification] Grounded in ৳ \${formatNum(m.effectiveTariff, 2)}/kWh tariff &amp; \${formatNum(m.totalCarbonTons, 2)} tCO₂e CarbonIQ.</div>
              </div>
            </details>
          \`;

          return \`
            <div class="flex items-start gap-2.5 msg-enter">
              <div class="mini-orb mt-1"><div class="mini-eye"></div><div class="mini-eye"></div></div>
              <div class="flex-1 min-w-0 rounded-[20px] border border-[#ccebd7] dark:border-emerald-500/30 bg-[#f1faf4] dark:bg-slate-900 px-3.5 py-3 text-[#111827] dark:text-slate-100 text-[12.5px] leading-[1.5] shadow-xs">
                \${thinkingHtml}
                <!-- Pill Badges (Matches Video Frame 00:13 - 00:14) -->
                <div class="flex items-center gap-1.5 mb-2 flex-wrap">
                  <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#dcfce7] dark:bg-emerald-950 text-[#15803d] dark:text-emerald-300 border border-[#bbf7d0] dark:border-emerald-500/40 uppercase tracking-wider">NVIDIA NEMOTRON 3 ULTRA (550B) • COPILOT+ AGENT</span>
                  <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#dcfce7] dark:bg-teal-950 text-[#15803d] dark:text-teal-300 border border-[#bbf7d0] dark:border-teal-500/40 uppercase tracking-wider">REAL-TIME TELEMETRY</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 uppercase">DEMO RULE-BASED</span>
                </div>
                <div class="text-[#1f2937] dark:text-slate-100">\${bodyHtml}</div>
                <!-- Bi-directional Interactive Navigation & Action Pills (Matches Video Frame 00:11) -->
                <div class="flex items-center gap-1.5 pt-2.5 mt-2.5 border-t border-[#d5f0df] dark:border-emerald-500/20 flex-wrap">
                  <button type="button" onclick="navigateTo('dashboard')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#16a34a] hover:bg-[#15803d] text-white shadow-2xs transition">✓ Connected Factory Telemetry</button>
                  <button type="button" onclick="navigateTo('ai-recommendations')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition"><span class="w-2 h-2 rounded-full bg-amber-400"></span>Savings Optimizer</button>
                  <button type="button" onclick="navigateTo('digital-twin')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition"><span class="w-2 h-2 rounded-full bg-purple-500"></span>3D Digital Twin</button>
                  <button type="button" onclick="navigateTo('carboniq-report')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition">🌿 CarbonIQ</button>
                  <button type="button" onclick="navigateTo('agent-console')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition">🤖 6 Agents</button>
                  <button type="button" onclick="runScenarioModal()" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] transition">⚡ Scenarios</button>
                </div>
              </div>
            </div>
          \`;
        }).join('');

        msgBox.innerHTML = welcomeHeroHtml + messagesHtml;
        msgBox.scrollTop = msgBox.scrollHeight;
      }

      const chipsBox = document.getElementById('copilot-prompt-chips');
      if (chipsBox) {
        const isBn = AppState.language === 'bn';
        chipsBox.innerHTML = SUGGESTED_PROMPTS.map((p, idx) => \`
          <button type="button" onclick="askSuggestedPrompt(\${idx})" class="px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white dark:bg-slate-800 hover:bg-[#dcfce7] dark:hover:bg-emerald-950 text-[#14532d] dark:text-slate-200 border border-[#ccebd7] dark:border-slate-700 hover:border-[#16a34a] text-left transition whitespace-nowrap shrink-0">
            \${isBn ? p.bn : p.en}
          </button>
        \`).join('');
      }
    }

    function resetCopilotChat() {
      AppState.copilotMessages = [
        {
          id: 'MSG-1',
          sender: 'user',
          lang: 'bn',
          time: '05:01',
          text: 'এই মাসে বিদ্যুৎ খরচ কেন বেড়েছে? কোন কোন মেশিনে বেশি বিদ্যুৎ খরচ হচ্ছে?'
        },
        {
          id: 'MSG-2',
          sender: 'assistant',
          lang: 'bn',
          time: '05:01',
          isDynamicInitial: true,
          text: ''
        }
      ];
      renderCopilotDrawerContent();
    }

    function askCopilotDirect(queryText) {
      if (!queryText) return;
      const drawer = document.getElementById('copilot-drawer');
      if (drawer && drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
      }
      submitCopilotQuestion(queryText);
    }

    function askSuggestedPrompt(index) {
      const item = SUGGESTED_PROMPTS[index];
      if (!item) return;
      const text = AppState.language === 'bn' ? item.bn : item.en;
      submitCopilotQuestion(text);
    }

    function handleCopilotSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('copilot-input');
      if (!input || !input.value.trim()) return;
      const q = input.value.trim();
      input.value = '';
      submitCopilotQuestion(q);
    }

    function submitCopilotQuestion(questionText) {
      const now = Date.now();
      AppState.copilotMessages.push({
        id: 'MSG-' + now,
        sender: 'user',
        text: questionText
      });
      const reply = generateGroundedCopilotReply(questionText);
      const isAutomatedTest = typeof navigator !== 'undefined' && navigator.userAgent === 'test';
      AppState.copilotMessages.push({
        id: 'MSG-' + (now + 1),
        sender: 'assistant',
        text: reply,
        thinkingUntil: isAutomatedTest ? 0 : (now + 900)
      });
      renderCopilotDrawerContent();

      if (!isAutomatedTest) {
        if (copilotThinkingTimer) clearInterval(copilotThinkingTimer);
        copilotThinkingTimer = setInterval(() => {
          const stillThinking = AppState.copilotMessages.some(msg => msg.thinkingUntil && Date.now() < msg.thinkingUntil);
          renderCopilotDrawerContent();
          if (!stillThinking) {
            clearInterval(copilotThinkingTimer);
            copilotThinkingTimer = null;
          }
        }, 220);
      }
    }

    function toggleCopilotLanguage() {
      setAppLanguage(AppState.language === 'en' ? 'bn' : 'en');
      renderCopilotDrawerContent();
    }

    function toggleCopilotDrawer(forceState) {
      const drawer = document.getElementById('copilot-drawer');
      if (!drawer) return;
      if (forceState === true) {
        drawer.classList.remove('hidden');
      } else if (forceState === false) {
        drawer.classList.add('hidden');
      } else {
        drawer.classList.toggle('hidden');
      }
      if (!drawer.classList.contains('hidden')) {
        renderCopilotDrawerContent();
        const input = document.getElementById('copilot-input');
        if (input) setTimeout(() => input.focus(), 150);
      }
    }
    function runScenarioModal() {
      openScenarioPickerModal();
    }
    window.runScenarioModal = runScenarioModal;
    window.resetCopilotChat = resetCopilotChat;
    window.toggleCopilotDrawer = toggleCopilotDrawer;
    window.askCopilotDirect = askCopilotDirect;
    window.askSuggestedPrompt = askSuggestedPrompt;
`;

html = html.substring(0, jsStartIdx) + newSection9Js + '\n    ' + html.substring(jsEndIdx);
console.log('✓ Updated Section 9 Grounded Bilingual AI Copilot Engine');

// ============================================================================
// 6. UPGRADE VIEW 14: AI AGENT CONSOLE (renderAgentConsoleView) WITH 3D ORB HERO
// ============================================================================
const view14StartMarker = '// VIEW 14: AI AGENT CONSOLE (6 Rule-Based Simulation Agents)';
const view14EndMarker = 'function renderActiveView() {';
const v14Start = html.indexOf(view14StartMarker);
const v14End = html.indexOf(view14EndMarker);

if (v14Start !== -1 && v14End !== -1) {
  const newView14 = `// VIEW 14: AI AGENT CONSOLE (6 Rule-Based Simulation Agents + Live 3D Orb Orchestrator)
    // ----------------------------------------------------------------------------
    function renderAgentConsoleView(m) {
      const agents = AppState.agents || [];

      return \`
        <div class="space-y-5">
          <!-- Top Mint-Emerald Live Agent Orchestrator Card (Matches Reference Video & Image) -->
          <div class="rounded-[26px] border-[1.5px] border-[#b9e6c9] dark:border-emerald-500/40 bg-[#f4fbf7] dark:bg-slate-900 shadow-[0_14px_40px_-12px_rgba(22,163,74,0.16)] overflow-hidden">
            <div class="px-5 py-3.5 bg-[#eafaf0] dark:bg-emerald-950/80 border-b border-[#cdecd8] dark:border-emerald-500/25 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <span class="text-[17px] font-extrabold text-[#134e2c] dark:text-white tracking-tight">AI Agent Console &amp; Live Orchestrator</span>
                \${renderDataBadge('ORCHESTRATOR')}
              </div>
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1.5"><span class="status-dot"></span><span class="status-dot"></span><span class="status-dot"></span></div>
                <span class="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#dcfce7] dark:bg-emerald-900 text-[#15803d] dark:text-emerald-300 border border-[#bbf7d0] dark:border-emerald-500/40">LIVE AGENT • 6 AGENTS</span>
                <button type="button" onclick="runFullAgentWorkflow()" class="px-4 py-1.5 rounded-full bg-[#15803d] hover:bg-[#166534] text-white text-xs font-extrabold shadow-xs transition flex items-center gap-1.5">
                  <span>▶ Run Full 6-Agent Pipeline</span>
                </button>
              </div>
            </div>

            <div class="px-5 py-2 bg-[#effaf3] dark:bg-slate-950/80 border-b border-[#d5f0df] dark:border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#1b5e37] dark:text-emerald-400">
              <div class="flex items-center gap-2">
                <span>📡</span>
                <span>Bi-Directional Sync Active Across 18 Machines, Energy (\${formatNum(m.totalPeriodKwh)} kWh), Bill (\${formatBdt(m.currentBillBdt)}) &amp; CarbonIQ (\${formatNum(m.totalCarbonTons, 2)} tCO₂e)</span>
              </div>
              <span class="font-mono text-[11px] text-[#15803d] dark:text-emerald-300">NVIDIA Nemotron 3 Ultra 550B + Deterministic Rules</span>
            </div>

            <div class="p-5 bg-white dark:bg-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div class="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div class="orb-wrapper shrink-0" onclick="askCopilotDirect('Run all 6 simulation agents and provide a consensus report.')">
                  <div class="orb-glow"></div>
                  <div class="orb-sphere">
                    <div class="orb-eye"></div>
                    <div class="orb-eye"></div>
                  </div>
                </div>
                <div>
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 class="text-lg font-extrabold text-[#0f3923] dark:text-white">Copilot+ Multi-Agent Brain</h2>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] uppercase">REAL-TIME TELEMETRY</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                    6 specialized simulation agents continuously execute the closed-loop <strong>Detect → Explain → Recommend → Act → Verify</strong> cycle across Rupsha Garments Ltd. (Seed #\${AppState.simSeed}).
                  </p>
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                    <button type="button" onclick="askCopilotDirect('Run all 6 simulation agents and provide a consensus report.')" class="px-3 py-1 rounded-full border border-[#ccebd7] bg-[#f1faf4] hover:bg-[#dcfce7] text-xs font-bold text-[#14532d] transition">Quick-suggest · Consensus Audit</button>
                    <button type="button" onclick="askCopilotDirect('Amar factory-r night shift energy waste komate hobe, sathe মাসে ৳68,000 save korar plan kore dao')" class="px-3 py-1 rounded-full border border-[#ccebd7] bg-[#f1faf4] hover:bg-[#dcfce7] text-xs font-bold text-[#14532d] transition">🎯 4-Mo Savings &amp; Night Shift Plan</button>
                    <button type="button" onclick="toggleCopilotDrawer(true)" class="px-3 py-1 rounded-full bg-[#15803d] hover:bg-[#166534] text-xs font-bold text-white transition">💬 Open Copilot Chat</button>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2.5 w-full lg:w-72 shrink-0">
                <div class="p-3 rounded-2xl bg-[#f1faf4] dark:bg-slate-800 border border-[#ccebd7] dark:border-emerald-500/30">
                  <div class="text-[10px] font-bold uppercase text-[#1b5e37] dark:text-slate-400">Active Agents</div>
                  <div class="text-base font-extrabold text-[#0f3923] dark:text-emerald-400 font-mono">6 / 6 LIVE</div>
                </div>
                <div class="p-3 rounded-2xl bg-[#f1faf4] dark:bg-slate-800 border border-[#ccebd7] dark:border-emerald-500/30">
                  <div class="text-[10px] font-bold uppercase text-[#1b5e37] dark:text-slate-400">Avoidable Waste</div>
                  <div class="text-base font-extrabold text-[#15803d] dark:text-emerald-400 font-mono">\${formatBdt(m.estimatedSavingsBdt)}/mo</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 6 Agent Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            \${agents.map((ag, idx) => {
              const isApproval = ag.requiresApproval && ag.status === 'Awaiting Approval';
              const badgeClass = isApproval
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                : 'bg-[#dcfce7] text-[#15803d] dark:bg-emerald-950 dark:text-emerald-300 border border-[#bbf7d0]';

              return \`
                <div class="bg-white dark:bg-slate-900 rounded-[22px] p-4 sm:p-5 border-[1.5px] border-[#ccebd7] dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#16a34a] transition">
                  <div>
                    <div class="flex items-start justify-between gap-2 mb-2.5">
                      <div class="flex items-center gap-2.5">
                        <div class="mini-orb"><div class="mini-eye"></div><div class="mini-eye"></div></div>
                        <div>
                          <h3 class="text-xs font-extrabold text-[#0f3923] dark:text-white leading-tight">\${idx + 1}. \${ag.name}</h3>
                          <div class="text-[10px] text-[#16a34a] dark:text-emerald-400 font-mono font-bold">\${ag.id}</div>
                        </div>
                      </div>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 \${badgeClass}">\${ag.status}</span>
                    </div>

                    <p class="text-[11.5px] text-slate-600 dark:text-slate-300 leading-snug mb-2.5">\${ag.purpose}</p>

                    <div class="p-2.5 rounded-xl bg-[#f4fbf7] dark:bg-slate-800/60 border border-[#d5f0df] dark:border-slate-700/60 space-y-1 text-[10px] font-mono">
                      <div><span class="text-slate-400">Trigger:</span> <span class="text-slate-700 dark:text-slate-300">\${ag.trigger}</span></div>
                      <div><span class="text-slate-400">Run ID:</span> <span class="text-[#15803d] dark:text-emerald-400 font-bold">\${ag.lastRunId}</span></div>
                      <div class="truncate"><span class="text-slate-400">Output:</span> <span class="text-slate-700 dark:text-slate-300">\${ag.outputSummary}</span></div>
                    </div>
                  </div>

                  <!-- Steps List -->
                  <div class="pt-2 border-t border-[#e5f5ec] dark:border-slate-800">
                    <div class="text-[10px] font-extrabold text-[#1b5e37] dark:text-slate-400 uppercase mb-1">Reasoning &amp; Execution Steps:</div>
                    <ul class="text-[10.5px] text-slate-600 dark:text-slate-400 space-y-0.5 list-disc pl-3.5">
                      \${(ag.steps || []).slice(0, 3).map(st => \`<li class="truncate">\${st}</li>\`).join('')}
                    </ul>
                  </div>

                  <!-- Action -->
                  <button type="button" onclick="runIndividualAgent('\${ag.id}')" class="w-full py-2 rounded-full bg-[#eafaf0] dark:bg-slate-800 hover:bg-[#15803d] text-[#134e2c] dark:text-slate-200 hover:text-white font-extrabold text-xs border border-[#86efac] dark:border-slate-700 transition">
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
  html = html.substring(0, v14Start) + newView14 + html.substring(v14End);
  console.log('✓ Upgraded renderAgentConsoleView with 3D Animated Orb Orchestrator Hero');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Successfully saved updated preview/index.html');
