import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

console.log('Running Green Factory Brain AI — Route, Flow & UI Integrity Verification Suite...');

const htmlPath = new URL('../index.html', import.meta.url);
const html = fs.readFileSync(htmlPath, 'utf8');

// 1. Verify all 12 required routes + agent-console exist in VALID_ROUTES and navigation buttons
const requiredRoutes = [
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
  'agent-console'
];

for (const route of requiredRoutes) {
  assert.ok(html.includes(`data-route="${route}"`), `Navigation button for route "${route}" must exist`);
  assert.ok(html.includes(`case '${route}':`), `Router switch case for "${route}" must exist`);
}
console.log('✓ PASS: All 12 required navigation views + AI Agent Console route & switch cases verified');

// 2. Verify persistent Truth & Safety banners exist
assert.ok(html.includes('SIMULATION — NO PHYSICAL EQUIPMENT CONTROL'), 'Persistent simulation safety banner must be present');
assert.ok(html.includes('SIMULATION REPORT — NOT AUDITED OR CERTIFIED'), 'CarbonIQ unaudited simulation watermark must be present');
assert.ok(html.includes('Rupsha Garments Ltd.'), 'Fictional demo factory Rupsha Garments Ltd. must be present');
console.log('✓ PASS: Truthful simulation labels and safety disclosures verified');

// 3. Verify 18 fleet machines + BREAKER_CBX-305 exist in seed data
const expectedMachines = [
  'MCH-SEW-01', 'MCH-SEW-02', 'MCH-SEW-03', 'MCH-SEW-04',
  'MCH-SEW-05', 'MCH-SEW-06', 'MCH-SEW-07', 'MCH-SEW-08',
  'MCH-CUT-01', 'MCH-CUT-02', 'MCH-CUT-03',
  'MCH-FIN-01', 'MCH-FIN-02', 'MCH-FIN-03', 'MCH-FIN-04',
  'COMP-01', 'BOIL-01', 'LGT-ZN-01', 'BREAKER_CBX-305'
];
for (const mId of expectedMachines) {
  assert.ok(html.includes(mId), `Asset ${mId} must be defined in shared state`);
}
console.log('✓ PASS: All 18 fleet machines + BREAKER_CBX-305 EPMS asset verified');

// 4. Verify all 8 suggested Copilot prompts and bilingual support (English & Bangla)
assert.ok(html.includes('Why did energy use rise this week?'), 'Suggested prompt 1 present');
assert.ok(html.includes('Which machine wastes the most energy during night shift?'), 'Suggested prompt 2 present');
assert.ok(html.includes('What is next month’s bill estimate if we do nothing?'), 'Suggested prompt 3 present');
assert.ok(html.includes('Compare the three highest-impact recommendations.'), 'Suggested prompt 4 present');
assert.ok(html.includes('Show the assumptions behind this carbon estimate.'), 'Suggested prompt 5 present');
assert.ok(html.includes('What changed after the simulated intervention?'), 'Suggested prompt 6 present');
assert.ok(html.includes('Explain this in Bangla.'), 'Suggested prompt 7 present');
assert.ok(html.includes('Which data is live and which is simulated?'), 'Suggested prompt 8 present');
assert.ok(html.includes('এই মাসে বিদ্যুৎ খরচ কেন বেড়েছে?'), 'Bangla Copilot prompt & response present');
console.log('✓ PASS: Bilingual English/Bangla AI Copilot & all 8 required suggested prompts verified');

// 5. Verify 6 rule-based simulation agents in Agent Console
const expectedAgents = ['AGT-ENERGY', 'AGT-FORECAST', 'AGT-CARBON', 'AGT-RECOMMEND', 'AGT-SAVINGS', 'AGT-REPORT'];
for (const ag of expectedAgents) {
  assert.ok(html.includes(ag), `Agent ${ag} must be defined in Agent Console`);
}
console.log('✓ PASS: All 6 Rule-Based Simulation Agents verified');

// 6. Verify 3D WebGL Digital Twin + 2D Isometric & SLD fallbacks
assert.ok(html.includes('initEpms3dScene'), '3D WebGL scene initializer present');
assert.ok(html.includes('renderEpms2dOrSldFallback'), '2D Isometric & Single-Line Diagram fallback present');
console.log('✓ PASS: 3D WebGL Digital Twin + 2D Isometric & SLD fallbacks verified');

// 7. Verify 3D Animated Orb AI Copilot & Live Agent UI, Thinking Animation & Banglish/Bilingual Support
assert.ok(html.includes('orb-sphere') && html.includes('orb-eye'), '3D animated glowing orb avatar with blinking eyes present');
assert.ok(html.includes('mini-orb') && html.includes('status-dot'), 'Mini-orb avatar and 3 wave status dots present');
assert.ok(html.includes('LIVE AGENT'), 'LIVE AGENT badge present');
assert.ok(html.includes('LIVE AGENT • LLAMA-3.3'), 'LIVE AGENT • LLAMA-3.3 badge present');
assert.ok(!html.includes('DEMO RULE-BASED'), 'DEMO RULE-BASED badge must be removed');
assert.ok(!html.includes('NVIDIA NEMOTRON'), 'Legacy NVIDIA NEMOTRON string must be removed');
assert.ok(html.includes('DIGITAL TWIN SANDBOX'), 'Production-grade DIGITAL TWIN SANDBOX badge present');
assert.ok(html.includes('Thought for ') && html.includes('View reasoning process'), 'Collapsible reasoning process accordion present');
assert.ok(html.includes('AI Copilot Thinking...'), 'Live step-by-step thinking animation present');
assert.ok(html.includes('Quick-suggest · 4-Mo Savings Plan'), 'Quick-suggest pills present');
assert.ok(html.includes('Build a night-shift energy waste reduction and ৳ 68,000/mo savings plan'), 'Clean English target prompt present');
assert.ok(!html.includes('Amar factory-r night shift'), 'Legacy Banglish marquee string must be removed');
console.log('✓ PASS: 3D Animated Orb AI Copilot & Live Agent UI verified');

// 8. Verify Phase 2 Full-Website Enhancements (Auto-Demo, Voice Synthesis, Dashboard Sync Strip, Quick Persona & Expanded Copilot Intents)
assert.ok(html.includes('function runCopilotAutoDemo()'), 'Copilot Auto-Demo function present');
assert.ok(html.includes('function speakCopilotLastReply()'), 'Copilot Voice Synthesis function present');
assert.ok(html.includes('function selectQuickPersona('), 'Sign-In Portal 1-click persona switcher present');
assert.ok(html.includes('LIVE COPILOT+ & 6-AGENT BI-DIRECTIONAL TELEMETRY SYNC STRIP'), 'Dashboard Live Copilot+ Telemetry Sync Strip present');
assert.ok(html.includes('3D EPMS Digital Twin &amp; BREAKER_CBX-305 Diagnostics'), 'Expanded 3D Digital Twin Copilot intent present');
console.log('✓ PASS: Phase 2 Full-Website Enhancements verified');

// 9. Verify Phase 3 Security Hardening, ZIP Removal, Manager/Owner Credentials, Profile Photo Upload, Sign Out & SVG Brand Icon
assert.ok(!html.includes('download="green_factory_brain_ai_full_project.zip"'), 'No .ZIP download button should exist in preview/index.html');
assert.ok(!html.includes('Return to Dashboard ✕'), 'No unauthenticated bypass button should exist on login portal');
assert.ok(html.includes('GFB-MGR-2026') && html.includes('PASSKEY-MGR-8899'), 'Factory Manager demo password and passkey present');
assert.ok(html.includes('GFB-OWN-2026') && html.includes('PASSKEY-OWN-9900'), 'Factory Owner demo password and passkey present');
assert.ok(html.includes('Alhaj Tariqul Islam') && html.includes('Factory Owner'), 'Factory Owner persona present');
assert.ok(!html.includes('Nusrat Jahan — Lead Energy'), 'Unauthorized non-Manager/Owner persona removed from login select');
assert.ok(html.includes('function handleProfilePhotoUpload(') && html.includes('function openUserProfileModal('), 'Profile photo upload & modal functions present');
assert.ok(html.includes('function handleSignOut()'), 'Sign Out function present');
assert.ok(html.includes('rel="icon" type="image/svg+xml"'), 'High-definition SVG favicon present');
console.log('✓ PASS: Hardened Security Gate (Manager/Owner Only), No ZIP Download UI, Profile Photo Upload, Sign Out & Best SVG Icon verified');

// 10. Verify Carbon Credit System (Verra VCS VM0008 / ISO 14064-2, 0 Emojis, Wallet, Modals & Copilot Grounding)
assert.ok(html.includes('carbon-credit-system-panel'), 'Carbon Credit System panel must exist in CarbonIQ view');
assert.ok(html.includes('VERRA VCS METHODOLOGY VM0008'), 'Verra VCS Methodology VM0008 badge present');
assert.ok(html.includes('ISO 14064-2 VERIFIED'), 'ISO 14064-2 standard badge present');
assert.ok(html.includes('VCS-REG-BD-8902'), 'Registry ID VCS-REG-BD-8902 present');
assert.ok(html.includes('function mintTelemetryCarbonCredits()'), 'mintTelemetryCarbonCredits function present');
assert.ok(html.includes('function openRetireCarbonCreditModal('), 'openRetireCarbonCreditModal function present');
assert.ok(html.includes('function openTradeCarbonCreditsModal()'), 'openTradeCarbonCreditsModal function present');
assert.ok(html.includes('function openCarbonCreditCertificateModal('), 'openCarbonCreditCertificateModal function present');
assert.ok(html.includes('function downloadCarbonCreditsLedgerCsv()'), 'downloadCarbonCreditsLedgerCsv function present');
assert.ok(html.includes('CERTIFICATE OF VOLUNTARY CARBON UNIT RETIREMENT'), 'Printable retirement certificate template present');
assert.ok(html.includes('VCS-BD-2026-RUP-048291'), 'Cryptographic serial ledger present');
assert.ok(html.includes("q.includes('credit')"), 'AI Copilot grounded Q&A branch present');
assert.ok(html.includes('আমাদের কার্বন ক্রেডিট ব্যালেন্স কত'), 'Bangla Copilot prompt chip present');

// Verify Real-time Simulation Carbon Credit Synchronization
assert.ok(html.includes('LIVE SIMULATION CARBON IMPACT'), 'Live simulation carbon impact hub present');
assert.ok(html.includes('function mintSimulatedCarbonCredits()'), 'mintSimulatedCarbonCredits function present');
assert.ok(html.includes('simTotalAbatementTons'), 'simTotalAbatementTons calculation present in getDerivedMetrics');
assert.ok(html.includes('Sim Carbon Credits'), 'Simulation Control Center KPI card shows Sim Carbon Credits');
assert.ok(html.includes('সিমুলেশন পরিবর্তন কীভাবে আমাদের কার্বন ক্রেডিট'), 'Bangla Copilot prompt for simulation carbon credits present');

// Strict Zero-Emoji Integrity Check
const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu;
const foundEmojis = html.match(emojiRegex);
assert.equal(foundEmojis, null, 'HTML must contain ZERO emojis (all icons must be refined SVGs)');
console.log('✓ PASS: Carbon Credit System & Real-Time Simulation Synchronization verified');

// 11. Verify Full Suite of Hackathon Enhancements (Live Mic STT, Pitch Deck Mode, Solar/BESS Microgrid, Spectrogram, BERC Audit)
// Feature 1: Live Mic Speech-to-Text for AI Copilot
assert.ok(html.includes('id="copilot-mic-btn"'), 'Microphone button #copilot-mic-btn must exist in Copilot drawer');
assert.ok(html.includes('id="copilot-mic-wave"'), 'Animated wave indicator #copilot-mic-wave must exist');
assert.ok(html.includes('SpeechRecognition') || html.includes('webkitSpeechRecognition'), 'Web Speech API interface supported');
assert.ok(html.includes('function sendCopilotMessage('), 'sendCopilotMessage function must accept parameter');

// Feature 2: 1-Click Interactive Hackathon Pitch Deck Mode
assert.ok(html.includes('id="pitch-deck-modal"'), 'Modal #pitch-deck-modal must exist');
assert.ok(html.includes('id="btn-pitch-deck-mode"'), 'Header button #btn-pitch-deck-mode must exist');
assert.ok(html.includes('openPitchDeckModal'), 'openPitchDeckModal function must exist');
assert.ok(html.includes('closePitchDeckModal'), 'closePitchDeckModal function must exist');
assert.ok(html.includes('nextPitchSlide') && html.includes('prevPitchSlide'), 'Slide navigation functions must exist');
assert.ok(html.includes('Deterministic ISA-101 Physics'), 'Slide 2 Solution content verified');
assert.ok(html.includes('Verra VCS'), 'Slide 3 Impact content verified');
assert.ok(html.includes('Llama-3.3-70B') && html.includes('Gemini 2.5 Flash'), 'Slide 4 Live LLM Architecture content verified');
assert.ok(html.includes('id="dashboard-business-impact-card"'), 'Dashboard Business Impact Card present');
assert.ok(html.includes('id="carbon-profit-prediction-panel"'), 'Carbon Credit & Business Profit Prediction panel present');
assert.ok(html.includes('160.2 t'), 'Corrected 286 MWh * 0.560 = 160.2 t CO2e sidebar value present');
assert.ok(html.includes('এটি ধারণামূলক মূল্য, বাস্তব বাজারদর নয়'), 'Illustrative credit pricing disclaimer present');
assert.ok(html.includes('Manager Confirmation Gate'), 'Autonomous Confirmation Gate present');
assert.ok(html.includes('ethical-ai-transparency-footer'), 'Persistent Ethical AI Transparency footer present');

// Modal Structural Isolation Check: pitch-deck-modal must NOT be nested inside app-modal-backdrop
const backdropIdx = html.indexOf('id="app-modal-backdrop"');
const pitchIdx = html.indexOf('id="pitch-deck-modal"');
const normHtml = html.replace(/\r\n/g, '\n');
const backdropCloseIdx = normHtml.indexOf('</div>\n\n  <!-- 1-CLICK INTERACTIVE HACKATHON PITCH DECK MODAL -->');
assert.ok(backdropIdx !== -1 && pitchIdx !== -1, 'Both modals must exist');
assert.ok(backdropCloseIdx !== -1 && backdropCloseIdx < pitchIdx, 'app-modal-backdrop must be closed before pitch-deck-modal begins');
assert.ok(html.includes('onclick="if(event.target===this)closePitchDeckModal()"'), 'Pitch deck backdrop click dismiss must be present');

// Feature 3: Rooftop Solar PV & BESS Microgrid Simulator
assert.ok(html.includes('id="microgrid-sim-panel"'), 'Microgrid simulator panel must exist');
assert.ok(html.includes('calcMicrogridMetrics'), 'calcMicrogridMetrics calculation function must exist');
assert.ok(html.includes('id="mg-slider-solar"'), 'Solar capacity slider must exist');
assert.ok(html.includes('id="mg-slider-bess"'), 'BESS storage slider must exist');
assert.ok(html.includes('id="mg-slider-diesel"'), 'Diesel displacement slider must exist');
assert.ok(html.includes('applyMicrogridToSimulation'), 'applyMicrogridToSimulation function must exist');

// Feature 4: Machine Predictive Anomaly Vibration & Thermal Spectrogram
assert.ok(html.includes('id="machine-fft-canvas"'), 'Canvas #machine-fft-canvas must exist in inspectMachineDetail');
assert.ok(html.includes('ISO 10816-3'), 'ISO 10816-3 vibration severity classification present');
assert.ok(html.includes('initMachineFftCanvas'), 'initMachineFftCanvas rendering function present');
assert.ok(html.includes('Thermal Motor Dissipation') || html.includes('Stator Winding'), 'Thermal motor dissipation metrics present');

// Feature 5: BERC (Bangladesh Energy Regulatory Commission) Energy Audit Compliance Sheet
assert.ok(html.includes('openBercAuditComplianceModal'), 'openBercAuditComplianceModal function must exist');
assert.ok(html.includes('BERC/IND-GZP/2026/08492-R'), 'Official Gazipur registration number present');
assert.ok(html.includes('0.82 kWh/pc'), 'Specific Energy Consumption SEC (0.82 kWh/pc) present');
assert.ok(html.includes('FORM S-12') || html.includes('Form S-12 Compliance Sheet'), 'Form S-12 audit title present');

// Functional Execution Verification (Live VM Sandbox)
{
  const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let mainCode = '';
  while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].includes('const AppState = {')) {
      mainCode = match[1];
      break;
    }
  }
  assert.ok(mainCode.length > 0, 'Main script block must be found');

  const context = {
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Date,
    Math,
    Number,
    String,
    Array,
    Object,
    JSON,
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    window: null,
    document: {
      documentElement: { classList: { contains: () => true, add: () => {}, remove: () => {} } },
      getElementById: (id) => ({
        value: '',
        textContent: '',
        innerHTML: '',
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        focus: () => {},
        appendChild: () => {},
        closest: () => null
      }),
      querySelectorAll: () => [],
      createElement: () => ({ className: '', innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {} }),
      addEventListener: () => {},
      removeEventListener: () => {},
      body: { classList: { add: () => {}, remove: () => {} } }
    },
    navigator: { userAgent: 'test' },
    location: { hash: '#/dashboard' },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(mainCode, context);

  // Test Microgrid calculations directly
  const calcMg = vm.runInContext('calcMicrogridMetrics', context);
  const defRes = calcMg(320, 150, 45);
  assert.ok(!isNaN(defRes.annualSolarMwh) && defRes.annualSolarMwh === 448.0, 'Annual solar generation must be 448 MWh');
  assert.ok(!isNaN(defRes.gridBdtSavings) && defRes.gridBdtSavings > 0, 'Grid BDT savings must be positive');
  assert.ok(!isNaN(defRes.dieselBackupSavingsBdt) && defRes.dieselBackupSavingsBdt > 0, 'Diesel savings must be positive');
  assert.ok(!isNaN(defRes.vcsCarbonCreditsTons) && defRes.vcsCarbonCreditsTons > 0, 'VCS carbon credits must be positive');

  // Verify missing dieselPct does not yield NaN
  const missingPctRes = calcMg(320, 150);
  assert.ok(!isNaN(missingPctRes.dieselBackupSavingsBdt), 'Missing dieselPct must default safely without NaN');
  assert.ok(!isNaN(missingPctRes.totalAnnualSavingsBdt), 'totalAnnualSavingsBdt must not be NaN');

  // Verify zero values clamp properly
  const zeroRes = calcMg(0, 0, 0);
  assert.ok(zeroRes.solarKwp === 100, '0 solarKwp must clamp to 100');
  assert.ok(zeroRes.bessKwh === 50, '0 bessKwh must clamp to 50');
  assert.ok(zeroRes.dieselDisplacementPct === 0, '0 dieselPct must be 0');
  assert.ok(zeroRes.dieselBackupSavingsBdt === 0, '0 diesel displacement savings must be 0');

  // Test Pitch Deck slide navigation directly
  const openPitchDeck = vm.runInContext('openPitchDeckModal', context);
  const nextPitch = vm.runInContext('nextPitchSlide', context);
  const prevPitch = vm.runInContext('prevPitchSlide', context);
  const closePitch = vm.runInContext('closePitchDeckModal', context);
  const AppState = vm.runInContext('AppState', context);

  openPitchDeck(0);
  assert.equal(AppState.pitchDeck.isOpen, true, 'Pitch deck must be open');
  assert.equal(AppState.pitchDeck.activeSlide, 0, 'Active slide must be 0');

  nextPitch();
  assert.equal(AppState.pitchDeck.activeSlide, 1, 'Next slide must advance to 1');

  prevPitch();
  assert.equal(AppState.pitchDeck.activeSlide, 0, 'Prev slide must return to 0');

  closePitch();
  assert.equal(AppState.pitchDeck.isOpen, false, 'Pitch deck must close');

  // Test Autonomous Scenario Alert + ROI + Confirmation Gate & Live Compressor Telemetry Grounding
  const applyScen = vm.runInContext('applyScenarioState', context);
  const approveGate = vm.runInContext('approveAutonomousScenarioMitigation', context);
  const getMetrics = vm.runInContext('getDerivedMetrics', context);
  const copilotReply = vm.runInContext('generateGroundedCopilotReply', context);
  const updateCarbonCfg = vm.runInContext('updateCarbonPredictionConfig', context);
  const resetCarbonCfg = vm.runInContext('resetCarbonPredictionConfig', context);

  // Night Shift Waste triggers automatic alert + higher recoverable ROI
  const nightAlertId = applyScen('night_idle', 'Night Shift Waste');
  assert.equal(nightAlertId, 'ALT-AUTO-NIGHT_IDLE', 'Night Shift Waste must generate ALT-AUTO-NIGHT_IDLE alert');
  assert.ok(AppState.alerts.some(al => al.id === nightAlertId && al.status === 'Unacknowledged'), 'Night alert must be unacknowledged');
  const nightMetrics = getMetrics();
  assert.ok(nightMetrics.businessImpact.monthlySavingsBdt > 68000, 'Night Shift Waste recoverable ROI must exceed baseline 68,000 BDT');
  approveGate('night_idle', nightAlertId);
  assert.equal(AppState.alerts.find(al => al.id === nightAlertId).status, 'Acknowledged', 'Manager Confirmation Gate approval must acknowledge alert');

  // Peak Grid Tariffs applies 14.88 BDT/kWh peak rate and generates peak alert
  const peakAlertId = applyScen('peak_grid', 'Peak Grid Tariffs');
  assert.equal(peakAlertId, 'ALT-AUTO-PEAK_GRID', 'Peak Grid Tariffs must auto-generate ALT-AUTO-PEAK_GRID alert');
  assert.equal(getMetrics().effectiveTariff, 14.88, 'Peak Grid Tariffs must activate 14.88 BDT/kWh rate');

  // Rooftop Solar Surge increases clean offset savings & lowers residual grid carbon
  applyScen('solar_surge', 'Rooftop Solar Surge');
  const solarMetrics = getMetrics();
  assert.equal(solarMetrics.solarOffsetKwh, 10460, 'Rooftop Solar Surge must track 10,460 kWh offset');
  assert.ok(solarMetrics.businessImpact.monthlySavingsBdt > 150000, 'Rooftop Solar Surge monthly savings must jump cleanly');

  // Live Compressor Air Leak telemetry changes AI Copilot reasoning values dynamically
  applyScen('compressor_leak', 'Compressor Air Leak');
  const compReply = copilotReply('Why is COMP-01 compressor air leak drawing high power right now?');
  assert.ok(compReply.includes('31.2 kW') && compReply.includes('74.5'), 'Copilot must read live COMP-01 fault kW/temp during Compressor Leak scenario');
  assert.ok(compReply.includes('[REASONING TRACE]') && compReply.includes('[SAFETY GUARDRAIL]'), 'Copilot reply must include reasoning trace and safety guardrail');

  // Carbon prediction config updates live metrics
  applyScen('baseline', 'Normal Baseline');
  updateCarbonCfg('customPriceUsdPerTon', 30);
  const highPriceMetrics = getMetrics();
  assert.equal(highPriceMetrics.carbonForecast.customPriceUsdPerTon, 30, 'Carbon price slider/config must update live');
  resetCarbonCfg();
  assert.equal(getMetrics().carbonForecast.customPriceUsdPerTon, 18, 'Carbon price reset must restore 18 USD/t default');
}

console.log('✓ PASS: All 5 Full-Suite Hackathon Enhancements verified (static & functional VM execution)');

console.log('ALL 11 E2E ROUTE & FLOW VERIFICATION SUITES PASSED (11/11).');

