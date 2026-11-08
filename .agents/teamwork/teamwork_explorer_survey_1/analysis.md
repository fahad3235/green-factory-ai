# Architectural Survey & Hallmark Design Audit
**Project**: Green Factory Brain AI — Industrial Energy, CarbonIQ & 3D EPMS Digital Twin Simulation  
**Target Enterprise**: Rupsha Garments Ltd., Gazipur, Dhaka, Bangladesh  
**Working Directory**: `c:\AI HACATHON CLOUD CAMP PROJECT\.agents\teamwork\teamwork_explorer_survey_1\`  
**Date & UTC Timestamp**: 2026-11-07T01:15:00Z  
**Survey Agent**: `teamwork_explorer`

---

## 1. Executive Summary & Problem Boundary

Green Factory Brain AI is a specialized industrial energy intelligence, voluntary carbon credit registry (VERRA VCS VM0008), and 3D EPMS (Electrical Power Monitoring System) digital twin platform designed for Rupsha Garments Ltd., a 1,250-employee textile and garment manufacturing facility in Gazipur, Bangladesh.

The platform consists of three core web interfaces:
1. **`preview/index.html`** (1,257,402 bytes / 8,710 lines): The primary single-page enterprise web application containing 15 distinct navigation routes, bilingual English/Bengali UI, an AI Agent Console with 6 rule-based simulation agents, a bilingual AI Copilot, interactive charts, and machine fleet telemetry.
2. **`preview/simulation.html`** (96,293 bytes / 1,479 lines): The standalone Canonical Simulation Control Center generating real-time sub-meter telemetry (18 virtual meters + master switchgear), shift patterns, peak demand surge events, boiler breakdown events, and power cut scenarios.
3. **`preview/digital-twin.html`** (165,015 bytes / 2,363 lines): The 3D Three.js WebGL industrial digital twin with 30 multi-joint NPC plant workers, network control panel (NCP-01), single-line electrical schematic (SLD), and Picture-in-Picture (PiP) CCTV monitoring.

### Baseline Status:
All domain calculations and functional test suites currently execute with **100% pass rates**:
- `preview/tests/domain-calculations.test.mjs`: 8/8 test suites pass.
- `preview/tests/e2e-routes-and-flows.test.mjs`: 10/10 test suites pass.
- `scripts/verify_all_15_routes.js`: 15/15 routes pass.
- `scripts/test_carbon_credit_integration.js`: Passed with 0 syntax errors.
- `scripts/test_simulation_carbon_scenarios.js`: 100% scenario test pass.

### Core Problem:
While functionally complete and mathematically sound, the frontend exhibits substantial visual and structural "AI slop" — traits characteristic of model-generated code rather than authentic enterprise industrial engineering software. These include:
- Visual gimmicks: floating cartoon mascots with glowing radial eyes, expanding pulse rings, ambient aurora blobs.
- Template punctuation and pseudo-icons: 80+ unicode glyphs (`→`, `←`, `▲`, `▼`, `●`, `›`, `▶`, `⬇`) serving as makeshift icons instead of crisp, accessible SVGs.
- Nested box syndrome (card inside a card) and inconsistent visual containment.
- Massive asset bloat: ~650 KB of inline base64 JPEGs directly inside `index.html`.
- Disconnected typography and design tokens across the three pages (`Inter` + `Hind Siliguri` + `JetBrains Mono` vs. `Sora` + `Manrope` + `IBM Plex Mono`).
- Accessibility violations: 75 out of 76 SVGs across `simulation.html` and `digital-twin.html` lack `aria-hidden="true"`, missing `:focus-visible` styling, and viewport zoom restrictions (`user-scalable=no`).

---

## 2. File-by-File Technical Survey

### 2.1. `preview/index.html` (Primary Single-Page Application)
- **Role**: Main portal, hosting 15 routes, session management, copilot drawer, and simulation synchronization.
- **Architecture**:
  - Pure zero-framework vanilla JavaScript with a centralized reactive state store (`AppState`).
  - Runtime libraries loaded via CDN: Tailwind CSS 3.4.17, Chart.js 4.4.1, Three.js r128, Lucide 0.460.0.
  - Fonts: Google Fonts (`Inter`, `Hind Siliguri`, `JetBrains Mono`).
- **Heavy Bloat**:
  - Over 650 KB of the 1.25 MB file is composed of three giant inline base64 JPEG strings:
    * Line 942: 228 KB base64 string on the Login screen background.
    * Line 1602: 228 KB base64 string in `factoryImgBase64` for 2D fallback rendering.
    * Line 2539: 203 KB base64 string in the Dashboard Hero Banner.
- **Visual Elements**:
  - 159 SVGs (all currently have basic aria attributes).
  - 39 instances of `→`, 18 instances of `›`, 5 instances of `⬇`, 4 instances of `▶`, 2 instances of `▲`, 2 instances of `●`.
  - Cartoon Copilot Orb (lines 191-239) with radial gradient glow, floating keyframes, and blinking eyes.
  - Line 2394 contains a prohibited `transition: all 0.15s ease;` in SVG crosshair style.
  - `body` has `overflow-x: clip`, but `html` does not declare `overflow-x: clip`.

### 2.2. `preview/simulation.html` (Simulation Engine & Control Center)
- **Role**: Telemetry generation and engine control center; pushes live telemetry to main website via BroadcastChannel and localStorage.
- **Styling & Structure**:
  - Embedded CSS with dark/light themes declared via CSS variables.
  - Fonts: `Sora` (headings), `Manrope` (body), `IBM Plex Mono` (data/metrics).
  - Background has multiple heavy `radial-gradient` aurora blooms (lines 98-100).
  - Nested card syndrome: `.card` containers wrap `.stat`, `.alert`, `.term`, and `.meter-total` boxes with distinct backgrounds, borders, and radii.
- **Hallmark Gate Issues**:
  - Missing Hallmark CSS stamp (Gate 20).
  - Eyebrows & template punctuation: `STEP 1 · SOURCE`, `STEP 2 · ENGINE`, `STEP 3 · API`, `STEP 4 · WEBSITE` with middle dots (Gates 54, 63).
  - Tracked caps labels: `.flow-node .fn-tag` (letter-spacing: .15em), `.ctl-label` (letter-spacing: .14em; uppercase), `.stat span` (letter-spacing: .04em) (Gate 67).
  - 29 of 30 SVGs lack `aria-hidden="true"` (Gate 33).
  - Unicode navigation arrows: `← Main Dashboard`, `3D Digital Twin ↗`, `▶ Run the 60-second judge story` (Gate 30a, 63).
  - Hover lift effects: `transform: translateY(-1px)` across all scenario cards and buttons (Gate 11).
  - Neither `html` nor `body` declares `overflow-x: clip` (Gate 34).

### 2.3. `preview/digital-twin.html` (3D EPMS Three.js WebGL Twin)
- **Role**: 3D interactive substation & factory floor simulation, NPC roster, and single-line diagram (SLD).
- **Styling & Scripts**:
  - Loads 10 external scripts via CDN (Three.js r128, OrbitControls, GLTFExporter, EffectComposer, RenderPass, ShaderPass, CopyShader, LuminosityHighPassShader, UnrealBloomPass).
  - Hardcoded color literals (`#1e3a5f`, `#070c16`, `rgba(56, 189, 248, 0.28)`) without a `:root` design token block (Gate 48 Floor violation).
  - Viewport restricts mobile users: `user-scalable=no, maximum-scale=1.0` (accessibility violation).
  - All 46 SVGs lack `aria-hidden="true"` (Gate 33).
  - Missing `:focus-visible` on interactive buttons and controls (Gate 26a).
  - Missing `@media (prefers-reduced-motion: reduce)` block (Gate 27).
  - Unicode glyphs used extensively: `⬇.GLB`, `← Portal`, `Switch Cam ›`, `▲ HIGH`, `● MED`, `ℹ LOW`, `▲ BESS`, `↻ Orbit` (Gates 30a, 63).
  - Strained typography: `text-[7px]`, `text-[8px]`, `text-[9px]` throughout (Gate 75).

### 2.4. `server.js` (Zero-Dependency Node HTTP Server)
- Serves `preview/index.html` at `/`, `/preview`, `/dashboard`, `/app`.
- Serves `preview/simulation.html` at `/simulation.html` and redirects `/simulation` to `/#/simulation`.
- Serves `preview/digital-twin.html` at `/digital-twin.html` and `/digital-twin`.
- Handles zip downloads and developer portal at `/portal`.

---

## 3. Systematic Audit: AI Slop vs. Hallmark Design Principles

| Hallmark Gate | Tier | Current State & Violations | Specific Remediation Plan |
|---|---|---|---|
| **Gate 2a / 2b** (Color Gradients) | Floor / Reflex | Radial gradient aurora blobs in `simulation.html` (lines 98-100), neon copilot orb glow in `index.html` (line 195). | Replace radial blurs and neon gradients with solid, tinted enterprise ground surfaces mixed in OKLCH/sRGB. |
| **Gate 4** (Card in a Card) | Floor | `simulation.html` nests `.stat`, `.alert`, and `.term` inside `.card`. `digital-twin.html` nests multiple sub-boxes inside `.card`. | Enforce single containment layer. Use subtle hairline dividers (`border-t border-slate-800/60`) and table rows instead of nested floating cards. |
| **Gate 6a / 6b** (Hero Structure) | Floor / Reflex | Hero banner in `simulation.html` has colloquial phrasing ("pretends to be the factory — and the main website believes it") and em-dashes. | Tighten copy to crisp industrial statement: "Simulation telemetry engine for Rupsha Garments Ltd. Feeds live EPMS, CarbonIQ, and sub-meter models." |
| **Gate 10a** (Transitions) | Floor | Line 2394 of `index.html` has `style="transition: all 0.15s ease;"` on chart crosshair. | Explicitly transition only `opacity` and `stroke-dashoffset`. Never `transition: all`. |
| **Gate 11 / 12** (Hover Effects & Easing) | Reflex | `translateY(-1px)` hover lift on buttons in `simulation.html` (line 188); `scale(1.1)` hover transform on pins in `digital-twin.html` (lines 84, 86). | Remove hover translation/scaling. Use discrete border-color and background shifts (`transition-colors duration-150`). |
| **Gate 19** (Copy Tells & Clichés) | Floor | Colloquial language ("The backend that pretends to be the factory — and the main website believes it", "Run the 60-second judge story"). | Adopt technical, accurate industrial documentation tone matching IEC/ISO/EPMS engineering standards. |
| **Gate 20** (Hallmark Stamp) | Floor | Present in `index.html`, but completely missing from `simulation.html` and `digital-twin.html`. | Insert standard Hallmark stamp and critique header at the top of CSS in both files. |
| **Gate 26a** (Focus Visible) | Floor | Missing `:focus-visible` styling in `digital-twin.html` and on buttons in `simulation.html`. | Add global `:focus-visible { outline: 2px solid #10b981; outline-offset: 2px; }` appearing instantly without fade. |
| **Gate 27** (Reduced Motion) | Floor | Missing in `digital-twin.html`. Keyframe pulse animations in `digital-twin.html` and `simulation.html`. | Add `@media (prefers-reduced-motion: reduce)` block to `digital-twin.html`, zeroing animation durations. |
| **Gate 29** (Glow & Wash) | Reflex | Radial glow blobs, blurred orb eyes, and neon shadows in `index.html` and `simulation.html`. | Replace with crisp industrial status LED indicators, clean elevation borders, and subtle shadow offsets. |
| **Gate 30a** (Emojis & Pseudo-Icons) | Floor | Over 80 unicode glyphs (`→`, `←`, `▲`, `▼`, `●`, `›`, `▶`, `⬇`, `ℹ`) used across all 3 files. | Replace every unicode glyph with dedicated 16px/20px inline SVG icons from Lucide. |
| **Gate 33** (Accessible SVGs) | Floor | 29/30 SVGs in `simulation.html` and 46/46 SVGs in `digital-twin.html` lack `aria-hidden="true"`. | Add `aria-hidden="true"` to every decorative SVG; ensure interactive icon buttons have descriptive `aria-label`s. |
| **Gate 34** (Overflow-x Clip) | Floor | `html` lacks `overflow-x: clip` in `index.html`. Both `html` and `body` lack `overflow-x: clip` in `simulation.html`. `digital-twin.html` uses `overflow: hidden`. | Set `overflow-x: clip` on both `html` and `body` across all files. |
| **Gate 40 / 41** (Contrast) | Floor | Low contrast in `simulation.html` (`--faint: #5f7f8d` on `--panel: #0a2534` is ~2.9:1, below 4.5:1). | Adjust muted/faint text tokens to `#94a3b8` or lighter, ensuring strict WCAG AA 4.5:1 compliance. |
| **Gate 48** (Token Discipline) | Floor | `digital-twin.html` has zero `:root` token declarations and hardcodes colors everywhere. | Introduce unified `:root` design token block in `digital-twin.html`. |
| **Gate 54** (The Eyebrow) | Floor | `STEP 1 · SOURCE`, `STEP 2 · ENGINE`, etc., in `simulation.html` (lines 407, 414, 421, 428). | Open sections directly with clear functional headings without inert decorative eyebrows. |
| **Gate 63** (Template Punctuation) | Floor | Middle dots (`A · B · C`), arrows glued to button text (`Open Main Dashboard ↗`, `Next Insight ›`). | Replace middle dots with structural dividers or badges; replace glued text arrows with semantic SVGs. |
| **Gate 67** (Tracked Caps) | Floor | Uppercase text with large tracking: `.fn-tag`, `.ctl-label`, `stat span`, `ULTRA-HD 4K SHADOWS • 30 NPCs • NCP-01`. | Use sentence case in body font at a smaller size (e.g. 12px), untracked. |
| **Gate 75** (Text Straining) | Reflex | `digital-twin.html` has extensive `text-[7px]`, `text-[8px]`, `text-[9px]`. | Increase base secondary text to 11px/12px minimum, ensuring legible information density. |
| **Gate F9** (Fake Human Avatars) | Finish | Unsplash stock photo of a person (`photo-1534528741775-53994a69daeb`) hotlinked as the factory manager's avatar. | Replace with authentic industrial monogram badge (`MF` for Md. Fahad) and clean SVG executive silhouette. |

---

## 4. Tailored Hallmark Design System for Green Factory Brain AI

To establish an authentic, world-class industrial enterprise user interface for **Rupsha Garments Ltd., Gazipur, Bangladesh**, the platform should adhere to the following design system:

### 4.1. Design Tokens (`tokens.css` Architecture)

```css
:root {
  /* Surface Ladder (Dark Mode - Primary Industrial EPMS Ground) */
  --color-surface-ground: #070f18;
  --color-surface-panel: #0c1824;
  --color-surface-elevated: #112233;
  --color-surface-hover: #162c42;

  /* Surface Ladder (Light Mode - Enterprise Clean Ground) */
  --color-surface-light-ground: #f4f7f9;
  --color-surface-light-panel: #ffffff;
  --color-surface-light-elevated: #eaf0f5;
  --color-surface-light-hover: #e0e9f0;

  /* Borders & Hairlines */
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-distinct: rgba(255, 255, 255, 0.16);
  --color-border-focus: #10b981;
  --color-border-light-subtle: #e2e8f0;
  --color-border-light-distinct: #cbd5e1;

  /* Typography Colors */
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-tertiary: #64748b;
  --color-text-light-primary: #0f172a;
  --color-text-light-secondary: #475569;
  --color-text-light-tertiary: #64748b;

  /* ISA-101 / IEC 60073 Semantic Industrial Status Tokens */
  --status-normal: #10b981;       /* Operational, Balanced */
  --status-normal-ink: #022c22;
  --status-normal-bg: rgba(16, 185, 129, 0.12);
  --status-info: #0ea5e9;         /* Advisory, BESS / Grid Tied */
  --status-info-ink: #082f49;
  --status-info-bg: rgba(14, 165, 233, 0.12);
  --status-warning: #f59e0b;      /* Surge, Thermal Threshold, Maintenance */
  --status-warning-ink: #451a03;
  --status-warning-bg: rgba(245, 158, 11, 0.14);
  --status-critical: #ef4444;     /* Arc Flash, Loss of Phase, Overload */
  --status-critical-ink: #450a0a;
  --status-critical-bg: rgba(239, 68, 68, 0.14);
  --status-offline: #64748b;      /* De-energized, Disconnected */
  --status-offline-bg: rgba(100, 116, 139, 0.14);

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  /* Geometry & Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-control: 8px;
  --radius-card: 12px;

  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-bangla: 'Hind Siliguri', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
}
```

### 4.2. Professional SVG Iconography Standards
- Replace all raw character glyphs with semantic 16px/20px SVGs.
- Example replacements:
  - `→` → `<svg aria-hidden="true" class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
  - `←` → `<svg aria-hidden="true" class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`
  - `▲ HIGH` → `<span class="inline-flex items-center gap-1.5 text-rose-400"><svg aria-hidden="true" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 16H3L12 3z"/></svg> High</span>`
  - `● Running` → `<span class="inline-flex items-center gap-1.5 text-emerald-400"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Running</span>`
  - `⬇.GLB` → `<button class="inline-flex items-center gap-1.5 ..."><svg aria-hidden="true" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Export GLB</button>`

### 4.3. Authentic Engineering AI Copilot Design
- Replace the floating cartoon orb mascot with an authentic industrial instrumentation visualizer:
  - Clean industrial status pill: `AI Copilot · Grounded on Rupsha Substation Model`.
  - Signal analyzer waveform or discrete telemetry pulse line rather than eyes that blink and look around.
  - Clear provenance tagging on every response (`Source: BPDB MT-3 Tariff Schedule`, `Source: DoE Bangladesh 2025 Grid Factor`).

---

## 5. UI Feature Inventory Across Views

### Global Navigation & Header:
- Facility Brand Bar: "Rupsha Garments Ltd. · Gazipur, Bangladesh".
- Real-Time Simulation Status Pill (`Sim Tick #N`, `18/18 Meters Online`).
- Bilingual Language Switcher (`EN` / `বাংলা`).
- Theme Switcher (`Dark` / `Light`).
- Security Clearance Status: Level-4 Executive Manager (`Md. Fahad`).
- Profile Photo Upload & Persistent Storage Modal.
- Secure Sign-Out Handler with Session Protection.

### Route Catalog (15 Routes):
1. **`dashboard`**: Facility hero profile, 4 KPI cards (Active kW, Total kWh, Bill ৳ BDT, Carbon tCO₂e), 24h interactive load curve, live alert list, machine fleet quick summary, top 3 AI recommendations, and 4 bottom workspace launchers.
2. **`energy-analytics`**: Department and shift filters, timeframe selector (Day, Week, Month, Year), Peak vs Off-Peak energy split, hourly energy heatmap matrix, and SEC (kWh/pc) metrics.
3. **`factory-operations`**: 4 production halls (Sewing Line Cluster A, Sewing Line Cluster B, Cutting, Finishing), piece counts, defect percentages, and line sub-meter allocations.
4. **`bill-carbon-forecast`**: 1m/3m/6m forecast horizons, dynamic tariff adjustment range inputs, baseline vs forecast cost curves, and Scope 1 & 2 GHG trajectory.
5. **`ai-recommendations`**: 5 energy efficiency recommendations (REC-01 to REC-05) with financial impact, payback calculations, human-in-the-loop approval toggles, and simulation triggers.
6. **`savings-tracker`**: ৳ 95,000 monthly target progress gauge, 5 verified/pending savings actions (SAV-101 to SAV-105) with 720h window parity verification.
7. **`carboniq-report`**: Voluntary carbon credit MRV system (VERRA VCS VM0008), verified credit wallet, cryptographic ledger batches with SHA-256 hashes, interactive credit minting, and downloadable statements.
8. **`sustainability-reports`**: BRSR Principle 6, GRI 302/305, GHG Protocol Scope 1/2/3 disclosures, report search/filter, and instant CSV/print export.
9. **`machine-monitoring`**: 18-machine fleet roster + master switchgear BREAKER_CBX-305, multi-metric sorting, search filtering, and live telemetry (kW, kWh, PF, Current, Temp, Vibration, Health).
10. **`digital-twin`**: Embedded 3D Three.js WebGL simulation view, 2D isometric factory map, Single Line Diagram (SLD), and substation vs fleet power scope toggle.
11. **`inventory-production`**: Production line targets vs actuals, inventory spares/fabric ledger, and embedded energy intensity per unit.
12. **`simulation`**: Integrated embed of simulation control center with live clock, shift patterns, speed controls, scenario triggers, and JSON push inspector.
13. **`simulation-control`**: Dedicated full-screen launcher for Canonical Simulation Engine.
14. **`settings`**: Facility profile, utility rate schedule editor, carbon emission factor editor, role clearance matrix, and system baseline reset.
15. **`agent-console`**: 6 autonomous rule-based simulation agents (Energy Analyst, EPMS Twin, CarbonIQ, Recommendation, Savings Verification, Report Agent) with input/output ledgers and step-by-step logic chains.

---

## 6. Defect, Interaction & Performance Diagnostics

1. **JavaScript Syntax & Execution**:
   - Zero syntax errors across all three files.
   - All 15 routes render without runtime exceptions when supplied with `getDerivedMetrics()`.
2. **Inline Asset Overhead**:
   - `preview/index.html` contains three redundant base64 JPEG images totaling ~650 KB.
   - Recommendation: Convert to external webp/jpeg files or lightweight scalable vector schematics to reduce HTML bundle size by over 50%.
3. **Viewport Scaling**:
   - `preview/digital-twin.html` includes `user-scalable=no, maximum-scale=1.0` which violates WCAG 1.4.4 (Resize Text).
   - Recommendation: Remove `user-scalable=no` and allow standard responsive viewport scaling.
4. **SVG Accessibility**:
   - 75 SVGs in `simulation.html` and `digital-twin.html` lack `aria-hidden="true"`.
   - Recommendation: Add `aria-hidden="true"` to all decorative SVGs.
5. **CSS Transitions**:
   - Line 2394 of `preview/index.html` has `transition: all`.
   - Recommendation: Replace with targeted `transition: opacity 0.15s ease, stroke-dashoffset 0.15s ease`.
6. **Focus Visibility**:
   - Missing `:focus-visible` in `digital-twin.html` and `simulation.html`.
   - Recommendation: Implement unified instant `:focus-visible` styling across all three files.

---

## 7. Actionable Refactoring Roadmap for Hallmark Implementation

1. **Design Tokens Unification**:
   - Add unified `:root` token blocks to `simulation.html` and `digital-twin.html`.
   - Standardize surface colors, semantic status colors (ISA-101), hairlines, and typography.
2. **Elimination of Template Punctuation & Unicode Glyphs**:
   - Batch replace all `→`, `←`, `▲`, `▼`, `●`, `›`, `▶`, `⬇`, `ℹ` with accessible Lucide SVG icons.
   - Add `aria-hidden="true"` to all decorative SVGs and proper `aria-label`s to interactive buttons.
3. **Typography & Hierarchy Cleanup**:
   - Remove eyebrow tags and tracked caps.
   - Replace small text (< 11px) with standard 12px secondary labels.
   - Remove colloquial copy in hero headers and replace with precise industrial terminology.
4. **Removal of Gimmicky Animations & Gradients**:
   - Replace cartoon copilot mascot orbs with authentic industrial AI telemetry badges.
   - Remove radial aurora glow blobs and expanding pulse ring shadows.
   - Remove hover lifts (`translateY(-1px)`) and jittery scale animations.
5. **Card De-Nesting**:
   - Flatten nested card-in-a-card structures in `simulation.html` and `digital-twin.html` using clean border hairlines and table row dividers.
6. **Accessibility & Hallmark Stamp Verification**:
   - Add Hallmark CSS stamp to all three files.
   - Set `overflow-x: clip` on both `html` and `body`.
   - Ensure `@media (prefers-reduced-motion: reduce)` is present and functional across all files.
   - Maintain 100% pass rates across all 5 existing test suites.
