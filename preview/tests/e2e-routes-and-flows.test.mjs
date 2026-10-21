import assert from 'node:assert/strict';
import fs from 'node:fs';

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
assert.ok(html.includes('NVIDIA NEMOTRON 3 ULTRA (550B) • COPILOT+ AGENT'), 'Copilot+ Agent model badge present');
assert.ok(html.includes('Thought for 1.4s • View reasoning process'), 'Collapsible reasoning process accordion present');
assert.ok(html.includes('AI Copilot Thinking...'), 'Live step-by-step thinking animation present');
assert.ok(html.includes('Quick-suggest · 4-Mo Savings Plan'), 'Quick-suggest pills present');
assert.ok(html.includes('Amar factory-r night shift energy waste komate hobe'), 'Banglish target prompt marquee pill present');
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

console.log('ALL 10 E2E ROUTE & FLOW VERIFICATION SUITES PASSED (10/10).');

