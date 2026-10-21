const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../preview/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Identify and replace the copilot aside block
let asideStartMarker = '<!-- RIGHT PERSISTENT AI COPILOT DRAWER';
if (!html.includes(asideStartMarker)) {
  asideStartMarker = '<!-- RIGHT PERSISTENT / FLOATING AI COPILOT DRAWER';
}
const asideEndMarker = '</aside>';

const startIdx = html.indexOf(asideStartMarker);
if (startIdx === -1) {
  console.error('Could not find asideStartMarker!');
  process.exit(1);
}

const endIdx = html.indexOf(asideEndMarker, startIdx);
if (endIdx === -1) {
  console.error('Could not find asideEndMarker!');
  process.exit(1);
}

const oldAside = html.substring(startIdx, endIdx + asideEndMarker.length);

const newAside = `<!-- RIGHT PERSISTENT / FLOATING AI COPILOT DRAWER ("Ask Green AI" — Matches Reference Video) -->
    <aside id="copilot-drawer" aria-label="Ask Green AI Copilot" class="fixed inset-y-0 right-0 sm:right-4 sm:top-16 sm:bottom-4 w-full sm:w-[410px] xl:w-[430px] bg-slate-900/98 dark:bg-slate-950/98 backdrop-blur-xl border border-emerald-500/30 sm:rounded-2xl flex flex-col justify-between shrink-0 transition-all duration-300 z-50 shadow-2xl shadow-emerald-950/80 text-slate-100 overflow-hidden">
      <!-- Top Bar Header with Badges & Agents Button -->
      <div class="p-3.5 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-teal-950/70 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 border border-emerald-300/50 flex items-center justify-center text-lg shadow-md shadow-emerald-950/50 shrink-0">
            🤖
          </div>
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <h2 class="font-bold text-xs text-white" data-i18n="ask_green_ai">Ask Green AI</h2>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">DEMO RULE-BASED</span>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span id="copilot-mode-status">Grounded in Shared Simulation State</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <!-- Agents Button -->
          <button type="button" onclick="navigateTo('agent-console')" class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600/25 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 transition flex items-center gap-1 shadow-sm" title="Open AI Agent Console (6 Rule-Based Agents)">
            <span class="text-xs">🤖</span> Agents
          </button>
          <!-- Close / Minimize Button -->
          <button type="button" onclick="toggleCopilotDrawer(false)" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition" aria-label="Close Ask Green AI">
            ✕
          </button>
        </div>
      </div>

      <!-- Header Sub-strip: Tracking Fleet, Energy, Carbon & 18 Machines Live • 6 SIMULATION AGENTS -->
      <div class="px-3.5 py-1.5 bg-slate-950/80 border-b border-emerald-500/20 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Tracking Fleet, Energy, Carbon &amp; 18 Machines Live</span>
        </div>
        <div class="text-slate-400 font-semibold">6 SIMULATION AGENTS</div>
      </div>

      <!-- Copilot Conversation Thread with Welcome Hero Card -->
      <div id="copilot-messages" class="flex-1 overflow-y-auto custom-scroll p-3.5 space-y-3 bg-slate-950/60">
        <!-- Grounded messages rendered dynamically by renderCopilotDrawerContent() -->
      </div>

      <!-- Bottom Area: Prompt Suggestion Banner, Quick Chips & Input Form -->
      <div class="p-3 border-t border-emerald-500/20 bg-slate-900/95 space-y-2">
        <!-- Floating Banner Above Input: Red Pulse Dot + Bangla Question -->
        <div onclick="askCopilotDirect('এই মাসে বিদ্যুৎ খরচ কেন বেড়েছে? কোন কোন মেশিনে বেশি বিদ্যুৎ খরচ হচ্ছে?')" class="cursor-pointer p-2 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900/60 to-emerald-950/40 border border-red-500/30 hover:border-red-500/60 flex items-center justify-between transition group shadow-sm">
          <div class="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span class="group-hover:text-emerald-300 transition">🔴 কেন রাতে বিদ্যুৎ অপচয় হচ্ছে? (Why is energy wasted at night shift?)</span>
          </div>
          <span class="text-[10px] text-emerald-400 font-bold group-hover:translate-x-0.5 transition">Send →</span>
        </div>

        <!-- Suggested Grounded Prompts Header & Language Switcher -->
        <div class="flex items-center justify-between pt-0.5">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400" data-i18n="copilot_suggested">Suggested Grounded Prompts</span>
          <button type="button" onclick="toggleCopilotLanguage()" id="copilot-lang-pill" class="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline">
            Switch to বাংলা / EN
          </button>
        </div>

        <!-- Horizontal Quick Chips Box -->
        <div id="copilot-prompt-chips" class="flex items-center gap-1.5 overflow-x-auto custom-scroll pb-1">
          <!-- Chips rendered dynamically -->
        </div>

        <!-- Input Pill Form with Circular Green Send Button with White Up Arrow -->
        <form id="copilot-form" onsubmit="handleCopilotSubmit(event)" class="flex items-center gap-2 pt-1">
          <input
            type="text"
            id="copilot-input"
            placeholder="আপনার প্রশ্ন লিখুন / Ask about energy, bill, CO₂, machines..."
            aria-label="Ask Green AI Copilot question"
            class="flex-1 px-4 py-2 text-xs rounded-full bg-slate-950/80 border border-emerald-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
          />
          <button type="submit" class="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition shrink-0" aria-label="Send message to Copilot">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </form>
      </div>
    </aside>`;

html = html.substring(0, startIdx) + newAside + html.substring(endIdx + asideEndMarker.length);
console.log('✓ Replaced aside #copilot-drawer successfully');

// 2. Add the Floating AI Launcher widget before </body> if not present
if (!html.includes('id="floating-ai-launcher"')) {
  const launcherMarkup = `
  <!-- FLOATING AI WIDGET LAUNCHER ("flotingai" — Fixed Docked FAB) -->
  <div id="floating-ai-launcher" class="fixed bottom-5 right-5 z-40 flex items-center print:hidden">
    <button
      type="button"
      id="btn-floating-ai-toggle"
      onclick="toggleCopilotDrawer()"
      class="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-2xl shadow-emerald-950/60 hover:shadow-emerald-500/40 border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
      title="Ask Green AI Copilot (Demo Rule-Based • Grounded in Shared Simulation State)"
    >
      <!-- Animated Green Ping Beacon -->
      <span class="relative flex h-3.5 w-3.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-white"></span>
      </span>

      <!-- Glowing 3D Orb Avatar -->
      <div class="w-6 h-6 rounded-full bg-emerald-950/50 border border-emerald-400/50 flex items-center justify-center text-sm shadow-inner group-hover:rotate-12 transition">
        🤖
      </div>

      <!-- Label & Live Badge -->
      <div class="flex items-center gap-1.5">
        <span class="font-extrabold text-xs tracking-wide">Ask Green AI</span>
        <span class="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/80 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider">LIVE</span>
      </div>
    </button>
  </div>
`;
  const bodyCloseIdx = html.lastIndexOf('</body>');
  if (bodyCloseIdx !== -1) {
    html = html.substring(0, bodyCloseIdx) + launcherMarkup + '\n' + html.substring(bodyCloseIdx);
    console.log('✓ Added #floating-ai-launcher before </body>');
  }
}

// 3. Update the JavaScript functions in Section 9
const jsStartMarker = '// 9. GROUNDED BILINGUAL AI COPILOT ENGINE';
const jsEndMarker = '// 10. SIMULATION LOOP, SCENARIOS, MODALS';

const jsStartIdx = html.indexOf(jsStartMarker);
const jsEndIdx = html.indexOf(jsEndMarker);

if (jsStartIdx === -1 || jsEndIdx === -1) {
  console.error('Could not find JS section markers!');
  process.exit(1);
}

const newJsSection = `// 9. GROUNDED BILINGUAL AI COPILOT ENGINE (ENGLISH & বাংলা — SECTION 18)
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

    function buildGroundedBanglaDefaultAnswer(m) {
      const sewPct = formatNum(m.deptSharePct.Sewing, 0);
      const cutPct = formatNum(m.deptSharePct.Cutting, 0);
      const finPct = formatNum(m.deptSharePct.Finishing, 0);
      return \`এই মাসে মোট বিদ্যুৎ ব্যবহার <strong>\${formatNum(m.totalPeriodKwh)} kWh</strong> [SIMULATION]। বিভাগ ও মেশিনভিত্তিক বিশ্লেষণে দেখা যাচ্ছে মূলত নিচের ৩টি বিভাগে সবচেয়ে বেশি বিদ্যুৎ খরচ হচ্ছে:<br/>
      1. <strong>সেলাই মেশিন (Sewing Dept):</strong> প্রায় \${sewPct}% (\${formatNum(m.deptKwh.Sewing)} kWh — নাইট শিফটে MCH-SEW-03 আইডল লোড 4.8 kW)<br/>
      2. <strong>কাটিং মেশিন (Cutting Dept):</strong> প্রায় \${cutPct}% (\${formatNum(m.deptKwh.Cutting)} kWh — MCH-CUT-02 ওভারলোড 24.6 kW)<br/>
      3. <strong>ফিনিশিং মেশিন (Finishing Dept):</strong> প্রায় \${finPct}% (\${formatNum(m.deptKwh.Finishing)} kWh)<br/>
      <span class="text-[10px] font-mono text-emerald-400">Formula: Σ Machine Period kWh | Grounded in Shared Simulation State</span>\`;
    }

    function generateGroundedCopilotReply(queryText) {
      const m = getDerivedMetrics();
      const a = AppState.assumptions;
      const q = queryText.toLowerCase();
      const useBn = AppState.language === 'bn' || q.includes('বাংলা') || q.includes('bangla') || /[\u0980-\u09FF]/.test(queryText);

      // Greetings handling
      if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('সালাম') || q === 'hello ai' || q === 'hi ai') {
        return useBn
          ? \`স্বাগতম! আমি <strong>Ask Green AI</strong> — গ্রিন ফ্যাক্টরি ব্রেইনের নিয়ম-ভিত্তিক ডেমো এআই সহকারী।<br/>
          • <strong>লাইভ ফ্যাক্টরি স্থিতি:</strong> ১৮টি মেশিনের মধ্যে ১৭টি সক্রিয় (উপলব্ধতা \${formatNum(m.availabilityPct, 1)}%)।<br/>
          • <strong>মোট বিদ্যুৎ ও বিল:</strong> \${formatNum(m.totalPeriodKwh)} kWh (চলতি বিল: \${formatBdt(m.currentBillBdt)})।<br/>
          • <strong>সম্ভাব্য অপচয় সাশ্রয়:</strong> \${formatBdt(m.estimatedSavingsBdt)}/মাস (৫টি এআই সুপারিশ)।<br/>
          আপনি বিদ্যুৎ অপচয়, নাইট শিফট আইডল মেশিন, কম্প্রেসার লিক, কার্বন হিসাব বা সিমুলেশন ইন্টারভেনশন সম্পর্কে যেকোনো প্রশ্ন করতে পারেন।\`
          : \`Hello! I am <strong>Ask Green AI</strong> — your deterministic rule-based assistant grounded directly in the 18-machine shared simulation state.<br/>
          • <strong>Fleet Status:</strong> 17/18 machines active (\${formatNum(m.availabilityPct, 1)}% availability).<br/>
          • <strong>Current Period Energy:</strong> \${formatNum(m.totalPeriodKwh)} kWh (Bill: \${formatBdt(m.currentBillBdt)} @ ৳ \${formatNum(m.effectiveTariff, 2)}/kWh).<br/>
          • <strong>Identified Avoidable Waste:</strong> \${formatBdt(m.estimatedSavingsBdt)}/month across 5 prioritized interventions.<br/>
          Ask me about night-shift waste, compressor leaks, carbon accounting, or running simulation agents.\`;
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

      if (q.includes('savings') || q.includes('68,000') || q.includes('68000') || q.includes('সাশ্রয়')) {
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

      if (q.includes('compare') || q.includes('recommendation') || q.includes('সুপারিশ')) {
        const r1 = AppState.recommendations[0];
        const r2 = AppState.recommendations[1];
        const r3 = AppState.recommendations[2];
        return useBn
          ? \`<strong>শীর্ষ ৩টি এআই সুপারিশের তুলনা [ESTIMATE/FORECAST]:</strong><br/>1. <strong>\${r1.id}:</strong> সাশ্রয় \${formatBdt(r1.estSavedBdt)}/মাস (\${formatNum(r1.estSavedKwh, 0)} kWh) • Payback: 2.1 মাস।<br/>2. <strong>\${r2.id}:</strong> সাশ্রয় \${formatBdt(r2.estSavedBdt)}/মাস (\${formatNum(r2.estSavedKwh, 0)} kWh) • Payback: 3.8 মাস।<br/>3. <strong>\${r3.id}:</strong> সাশ্রয় \${formatBdt(r3.estSavedBdt)}/মাস (\${formatNum(r3.estSavedKwh, 0)} kWh) • Payback: 4.5 মাস।\`
          : \`<strong>Top 3 Evidence-Backed Recommendations Comparison [ESTIMATE/FORECAST]:</strong><br/>1. <strong>\${r1.id} (\${r1.machineId}):</strong> Saves <strong>\${formatBdt(r1.estSavedBdt)}/mo</strong> (\${formatNum(r1.estSavedKwh, 0)} kWh, \${formatNum(r1.estSavedCo2Tons, 2)} tCO₂e) • Cost: \${formatBdt(r1.implementationCostBdt)} • Payback: <strong>2.1 months</strong>.<br/>2. <strong>\${r2.id} (\${r2.machineId}):</strong> Saves <strong>\${formatBdt(r2.estSavedBdt)}/mo</strong> (\${formatNum(r2.estSavedKwh, 0)} kWh, \${formatNum(r2.estSavedCo2Tons, 2)} tCO₂e) • Cost: \${formatBdt(r2.implementationCostBdt)} • Payback: <strong>3.8 months</strong>.<br/>3. <strong>\${r3.id} (\${r3.machineId}):</strong> Saves <strong>\${formatBdt(r3.estSavedBdt)}/mo</strong> (\${formatNum(r3.estSavedKwh, 0)} kWh, \${formatNum(r3.estSavedCo2Tons, 2)} tCO₂e) • Cost: \${formatBdt(r3.implementationCostBdt)} • Payback: <strong>4.5 months</strong>.\`;
      }

      if (q.includes('intervention') || q.includes('changed') || q.includes('পরিবর্তন')) {
        return useBn
          ? \`<strong>সিমুলেশন ইন্টারভেনশন ফলাফল [SIMULATION]:</strong><br/>• বর্তমান সিনারিও: <strong>\${AppState.activeScenario}</strong>।<br/>• বেসলাইন (\${formatNum(a.baselineMonthlyKwh)} kWh) থেকে বর্তমান ব্যবহার <strong>\${formatNum(m.totalPeriodKwh)} kWh</strong> (\${formatNum(m.energyDeltaPct, 1)}% পরিবর্তন)।<br/>• সিমুলেশনে অনুমোদিত সাশ্রয়: <strong>\${formatBdt(m.appliedRecSavedBdt)}/মাস</strong>।\`
          : \`<strong>Post-Intervention Simulation Delta [SIMULATION]:</strong><br/>• <strong>Active Scenario:</strong> <code class="font-mono">\${AppState.activeScenario}</code>.<br/>• <strong>Period Energy:</strong> \${formatNum(m.totalPeriodKwh)} kWh vs. \${formatNum(a.baselineMonthlyKwh)} kWh comparable 720h baseline (\${formatNum(m.energyDeltaPct, 1)}%).<br/>• <strong>Applied Simulation Actions:</strong> \${formatBdt(m.appliedRecSavedBdt)}/mo active in current state. Note: All interventions modify local simulation state only; no physical equipment was actuated.\`;
      }

      return useBn
        ? buildGroundedBanglaDefaultAnswer(m)
        : \`<strong>Current Shared Simulation Summary (Oct 2026 • 720h Window) [SIMULATION]:</strong><br/>• <strong>Total Energy:</strong> \${formatNum(m.totalPeriodKwh)} kWh (Instantaneous fleet demand: \${formatNum(m.totalCurrentKw, 1)} kW).<br/>• <strong>Estimated Bill:</strong> \${formatBdt(m.currentBillBdt)} (@ ৳ \${formatNum(m.effectiveTariff, 2)}/kWh).<br/>• <strong>Carbon Emissions:</strong> \${formatNum(m.totalCarbonTons, 2)} tCO₂e (Scope 1: \${formatNum(m.scope1Tons, 2)}t, Scope 2: \${formatNum(m.scope2Tons, 2)}t).<br/>• <strong>Top Anomaly:</strong> <code class="font-mono">MCH-CUT-02</code> Fault (24.6 kW, 68.4°C) &amp; <code class="font-mono">MCH-SEW-03</code> Idle draw (4.8 kW).\`;
    }

    function renderCopilotDrawerContent() {
      const m = getDerivedMetrics();
      const msgBox = document.getElementById('copilot-messages');
      if (msgBox) {
        // Welcome Hero Card with 3D Emerald Sphere Avatar & KPI Counters (Matches Reference Video)
        const welcomeHeroHtml = \`
          <div class="p-3.5 rounded-2xl bg-gradient-to-b from-emerald-950/60 via-slate-900/80 to-slate-900/90 border border-emerald-500/30 shadow-xl relative overflow-hidden mb-3">
            <div class="absolute -top-10 -left-10 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-10 -right-10 w-28 h-28 bg-teal-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <!-- Glowing 3D Emerald Sphere Avatar -->
            <div class="flex items-center gap-3">
              <div class="relative shrink-0">
                <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-400 to-teal-200 shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-emerald-200/60 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                  <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-slate-900"></span>
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                  <h3 class="text-xs font-bold text-white tracking-wide truncate">Ask Green AI</h3>
                  <span class="px-1.5 py-0.2 rounded text-[8px] font-black bg-emerald-900/70 text-emerald-300 border border-emerald-400/40">LIVE</span>
                </div>
                <div class="text-[10px] text-emerald-300/80 font-mono">Grounded in 18-Machine State (Seed #\${AppState.simSeed})</div>
              </div>
            </div>

            <!-- 4 Live Telemetry KPI mini-cards -->
            <div class="grid grid-cols-2 gap-2 mt-3 text-left">
              <div class="p-2 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <div class="text-[9px] text-slate-400 uppercase font-semibold">Availability</div>
                <div class="text-xs font-extrabold text-emerald-400 font-mono">\${formatNum(m.availabilityPct, 1)}% <span class="text-[9px] font-normal text-slate-400">(17/18)</span></div>
              </div>
              <div class="p-2 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <div class="text-[9px] text-slate-400 uppercase font-semibold">Total Energy</div>
                <div class="text-xs font-extrabold text-cyan-400 font-mono">\${formatNum(m.totalPeriodKwh)} <span class="text-[9px] font-normal text-slate-400">kWh</span></div>
              </div>
              <div class="p-2 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <div class="text-[9px] text-slate-400 uppercase font-semibold">Projected Bill</div>
                <div class="text-xs font-extrabold text-amber-400 font-mono">\${formatBdt(m.currentBillBdt)}</div>
              </div>
              <div class="p-2 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <div class="text-[9px] text-slate-400 uppercase font-semibold">Monthly Savings</div>
                <div class="text-xs font-extrabold text-emerald-400 font-mono">\${formatBdt(m.estimatedSavingsBdt)}<span class="text-[9px] font-normal text-slate-400">/mo</span></div>
              </div>
            </div>

            <!-- Horizontal Quick-Suggest Action Chips -->
            <div class="flex items-center gap-1.5 overflow-x-auto custom-scroll pt-2.5 pb-0.5">
              <button type="button" onclick="askCopilotDirect('Why is energy wasted at night shift? Which machine is idle?')" class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/70 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/40 whitespace-nowrap transition flex items-center gap-1">⚡ Night Shift Waste</button>
              <button type="button" onclick="askCopilotDirect('Show air compressor leak status and pressure loss.')" class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/40 whitespace-nowrap transition flex items-center gap-1">💨 Compressor Leak</button>
              <button type="button" onclick="askCopilotDirect('How can we achieve ৳ 68,000 monthly savings? Compare the top recommendations.')" class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/40 whitespace-nowrap transition flex items-center gap-1">💰 ৳ 68,000 Savings</button>
              <button type="button" onclick="askCopilotDirect('Show Scope 1 and Scope 2 carbon emissions with calculation formulas.')" class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-teal-950/60 hover:bg-teal-900 text-teal-300 border border-teal-500/40 whitespace-nowrap transition flex items-center gap-1">🌿 Scope 2 Carbon</button>
              <button type="button" onclick="askCopilotDirect('Run all 6 simulation agents and provide a consensus report.')" class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 whitespace-nowrap transition flex items-center gap-1">🤖 Run 6 Agents</button>
              <button type="button" onclick="askCopilotDirect('Which machine wastes the most energy right now?')" class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 whitespace-nowrap transition flex items-center gap-1">📊 Fleet Live Status</button>
            </div>
          </div>
        \`;

        // Map conversation messages with Thinking Accordion & Badges
        const messagesHtml = AppState.copilotMessages.map((msg, index) => {
          const bodyHtml = msg.isDynamicInitial ? buildGroundedBanglaDefaultAnswer(m) : msg.text;
          if (msg.sender === 'user') {
            return \`
              <div class="flex justify-end">
                <div class="max-w-[88%] rounded-2xl rounded-tr-xs px-3.5 py-2.5 bg-emerald-600/25 border border-emerald-500/30 text-white text-xs leading-relaxed shadow-sm">
                  \${bodyHtml}
                </div>
              </div>
            \`;
          }

          // Collapsible Thinking Accordion for Assistant Responses
          const thinkingHtml = \`
            <details class="mb-2 bg-slate-900/80 border border-emerald-500/30 rounded-xl p-2.5 text-[11px] text-emerald-300 shadow-sm" \${index === AppState.copilotMessages.length - 1 ? 'open' : ''}>
              <summary class="cursor-pointer font-medium flex items-center justify-between select-none hover:text-emerald-200">
                <span class="flex items-center gap-1.5">
                  <span class="animate-spin text-xs">⚙️</span>
                  <span>Thought for 1.2s • View reasoning process</span>
                </span>
                <span class="text-[9px] text-emerald-400/80 font-mono">6 Agents Evaluated ▼</span>
              </summary>
              <div class="mt-2 pl-3 border-l-2 border-emerald-500/40 space-y-1 text-slate-300 font-mono text-[10px] leading-relaxed">
                <div class="text-emerald-400">▸ [State Query] Polling 18 fleet machines from shared AppState...</div>
                <div>▸ [Telemetry Analysis] MCH-CUT-02 load=24.6kW (Fault), MCH-SEW-03 idle=4.8kW.</div>
                <div>▸ [Rules Engine] AGT-ENERGY &amp; AGT-SAVINGS evaluated deterministic rules.</div>
                <div class="text-teal-300">▸ [Verification] Grounded in \${formatNum(m.totalPeriodKwh)} kWh &amp; ৳ \${formatNum(m.effectiveTariff, 2)}/kWh tariff.</div>
              </div>
            </details>
          \`;

          return \`
            <div class="flex items-start gap-2.5">
              <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-emerald-950/50">🤖</div>
              <div class="max-w-[92%] rounded-2xl rounded-tl-xs px-3.5 py-2.5 bg-slate-900/90 border border-emerald-500/30 text-slate-100 text-xs leading-relaxed space-y-2 shadow-lg">
                \${thinkingHtml}
                <!-- Badges -->
                <div class="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">DEMO RULE-BASED</span>
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">REAL-TIME TELEMETRY</span>
                </div>
                <div>\${bodyHtml}</div>
                <!-- Quick Interactive Action Buttons -->
                <div class="flex items-center gap-1.5 pt-2 border-t border-emerald-500/20 flex-wrap">
                  <button type="button" onclick="runScenarioModal()" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition">⚡ Run Scenario</button>
                  <button type="button" onclick="navigateTo('carbon-accounting')" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 transition">🌿 CarbonIQ</button>
                  <button type="button" onclick="navigateTo('agent-console')" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 transition">🤖 Agent Console</button>
                  <button type="button" onclick="navigateTo('machine-monitoring')" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">⚙️ Fleet Monitoring</button>
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
          <button type="button" onclick="askSuggestedPrompt(\${idx})" class="px-2.5 py-1 rounded-full text-[10px] bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 text-left transition whitespace-nowrap shrink-0">
            \${isBn ? p.bn : p.en}
          </button>
        \`).join('');
      }
    }

    function askCopilotDirect(queryText) {
      if (!queryText) return;
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
      AppState.copilotMessages.push({
        id: 'MSG-' + Date.now(),
        sender: 'user',
        text: questionText
      });
      const reply = generateGroundedCopilotReply(questionText);
      AppState.copilotMessages.push({
        id: 'MSG-' + (Date.now() + 1),
        sender: 'assistant',
        text: reply
      });
      renderCopilotDrawerContent();
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
    window.toggleCopilotDrawer = toggleCopilotDrawer;
    window.askCopilotDirect = askCopilotDirect;
    window.askSuggestedPrompt = askSuggestedPrompt;
`;

html = html.substring(0, jsStartIdx) + newJsSection + '\n    ' + html.substring(jsEndIdx);
console.log('✓ Replaced Section 9 JS successfully');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Successfully wrote updated preview/index.html');
