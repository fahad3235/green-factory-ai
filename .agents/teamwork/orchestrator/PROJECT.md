# Project: Green Factory Brain AI — Hallmark Industrial Hardening & 100% Test Verification

## Architecture
- **Facility**: Rupsha Garments Ltd., Gazipur, Bangladesh (Tier-1 LEED Platinum Ready Export Garment Facility).
- **Core Stacks**:
  - Frontend SPA: `preview/index.html` (15 application views, responsive EPMS dashboard, bilingual EN/BN Copilot, reactive state machine).
  - 3D Digital Twin: `preview/digital-twin.html` (Three.js r128, 15 industrial equipment assemblies, 30 articulated real-life NPCs with tools and pathfinding, 4-channel live CCTV PiP, PBR/Thermal/X-ray shading, interactive SLD, 2D isometric fallback).
  - Simulation Engine: `preview/simulation.html` (Mulberry32 deterministic PRNG `seed = 20261018`, 6 operational scenarios, microgrid dispatch with BESS and 2,000 kVA diesel generator, BPDB MT-3 tariff engine, DoE Bangladesh v2025.2 grid emission factor).
  - Inter-Process Communication: Bi-directional event bus via `BroadcastChannel('gfb_simulation_sync')`, `postMessage`, and `localStorage('gfb_simulation_state')`.
  - Edge Static Server: `server.js` (Zero-dependency Node.js HTTP server, static asset delivery, redirect router, SHA-256 developer portal, package download endpoints).
  - Testing & Verification Track: 5 automated test suites + 30-tick monotonic increase suite.

## Code Layout
- `preview/index.html`: Main SPA application, router, view renderers, domain calculations, SVG icon system.
- `preview/simulation.html`: Standalone simulation control center and scenario testing console.
- `preview/digital-twin.html`: Standalone Three.js 3D EPMS digital twin.
- `preview/src/domain/calculations.mjs`: Pure domain mathematics (kW, kVA, PF, BPDB tariffs, GHG Protocol Scope 1 & 2).
- `preview/tests/domain-calculations.test.mjs`: Unit tests for mathematical engine (8 suites).
- `preview/tests/e2e-routes-and-flows.test.mjs`: E2E route switching, bilingual prompts, 6 rule agents, 18 machines (10 suites).
- `scripts/verify_all_15_routes.js`: Comprehensive route verification across all 15 application views.
- `scripts/test_carbon_credit_integration.js`: Zero-emoji syntax verification suite.
- `scripts/test_simulation_carbon_scenarios.js`: Simulation carbon credit, minting, and wallet live synchronization tests.
- `scripts/test_30_ticks_strict_increase.js`: Strict monotonic increase validation for carbon credits.
- `server.js`: Node.js HTTP server.

## Feature Inventory
Every feature identified during the Survey phase is inventoried below with its assigned milestone.
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Facility Brand Mast & Header | Authentic enterprise branding for Rupsha Garments Ltd., Gazipur, with meter telemetry indicator | M1 | Survey 1 (DONE) |
| 2 | Bilingual Language Engine | Instant toggle between English and Bengali across all UI strings, copilot, and reports | M1 | Survey 1 (DONE) |
| 3 | Enterprise Design Tokens & Theme | ISA-101 / IEC 60073 industrial semantic color tokens, elevation surfaces, and hairlines | M1 | Survey 1 (DONE) |
| 4 | Executive Clearance & Monogram Avatar | Authentic industrial executive badge (`MF`, Level-4 Manager) replacing stock human photos | M2 | Survey 1 (DONE) |
| 5 | Primary KPI Telemetry Cards | Active Power ($kW$), Apparent Power ($kVA$), Monthly Energy ($kWh$), Bill ($৳$), Carbon ($tCO_2e$) | M1 | Survey 1, 2 (DONE) |
| 6 | 24-Hour Load Curve & Tariff Slices | Canvas chart displaying 24h factory load curve with BPDB MT-3 Peak/Off-peak tariff shading | M1 | Survey 1, 2 (DONE) |
| 7 | Operational Alarms Drawer | Industrial alarm list with severity levels (Critical, Warning, Info) and resolution actions | M2 | Survey 1 (DONE) |
| 8 | 18-Machine Fleet Roster | Complete fleet table with `BREAKER_CBX-305`, active kW, PF, phase currents, and health indicators | M3 | Survey 1, 3 |
| 9 | AI Recommendations (REC-01..05) | Energy conservation measures with CapEx, monthly savings, and payback period calculations | M2 | Survey 1, 2 (DONE) |
| 10 | Energy Analytics Deep Dive | Department filter, Shift filter, Timeframe selector, and Specific Energy Consumption (kWh/pc) | M1 | Survey 1 (DONE) |
| 11 | Factory Operations Monitoring | 4 Production halls (Sewing Lines A & B, Cutting, Finishing) with sub-meter allocations | M1 | Survey 1 (DONE) |
| 12 | Bill & Carbon Forecast Model | BPDB MT-3 tariff calculator, blended rate, and GHG Scope 1 & Scope 2 projection curves | M1 | Survey 1, 2 (DONE) |
| 13 | Savings Tracker & Parity Ledger | ৳ 95,000 monthly target progress dial, 5 savings actions (SAV-101..105), 720h reconciliation | M1 | Survey 1, 2 (DONE) |
| 14 | CarbonIQ & Verra VCS VM0008 Registry | Voluntary carbon credit MRV system, cryptographic ledger batches, and modeled BDT revenue | M3 | Survey 1, 2, 3 |
| 15 | Sustainability Reporting Engine | BRSR Principle 6, GRI 302/305 disclosures, printable statement, and CSV data export | M1 | Survey 1 (DONE) |
| 16 | Machine Monitoring & Fault Injection | Telemetry inspector, threshold triggers, and remote reset controls for 18 fleet machines | M3 | Survey 1, 3 |
| 17 | 3D EPMS Digital Twin Engine | Dual WebGL/Three.js architecture (15 assemblies, 30 NPCs, CCTV) with 2D Isometric / SLD fallback | M3 | Survey 1, 3 |
| 18 | Inventory & Production Tracking | Production batch orders, raw material stocks, and embodied energy intensity metrics | M1 | Survey 1 (DONE) |
| 19 | Deterministic Simulation Engine | Mulberry32 PRNG (`seed=20261018`), 6 operational scenarios, and clock speed multipliers | M3 | Survey 2, 3 |
| 20 | Route Alias `simulation-control` | Aliasing `#/simulation-control` to `renderSimulationControlCenterView()` in router switch | M3 | Survey 3 |
| 21 | Facility Settings & Tariffs Editor | Gazipur location coordinates, BPDB tariff schedule editor, and DoE emission factor adjuster | M1 | Survey 1, 2 (DONE) |
| 22 | Autonomous AI Agent Console | 6 Rule-based simulation agents (Energy, EPMS, Carbon, Recommendations, Savings, Report) | M2 | Survey 1 (DONE) |
| 23 | Grounded Bilingual AI Copilot | Industrial AI copilot drawer with 8 pre-configured engineering prompts (English and Bangla) | M2 | Survey 1, 2 (DONE) |
| 24 | Hallmark Accessible SVG Iconography | Complete replacement of 80+ unicode glyphs with crisp, accessible 16px/20px Lucide SVGs | M2 | Survey 1 (DONE) |
| 25 | Elimination of AI Slop Artifacts | Removal of cartoon floating orbs, radial aurora washes, hover lift translateY, and glow washes | M1 | Survey 1 (DONE) |
| 26 | Accessible SVG Attributes | Addition of `aria-hidden="true"` to 75+ decorative SVGs in simulation.html & digital-twin.html | M2 | Survey 1 (DONE) |
| 27 | Viewport Zoom & WCAG Accessibility | Removal of `user-scalable=no` from digital-twin.html and enforcement of `:focus-visible` styles | M1 | Survey 1 (DONE) |
| 28 | Server HTTP Verb & Route Hardening | Verification and hardening of `server.js` for method handling and static delivery | M3 | Survey 3 |
| 29 | 100% E2E Test Suite Pass Guarantee | Zero regressions across all 5 verification test suites and 30-tick monotonic increase suite | M4 | Survey 2 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Hallmark Design Tokens & CSS Architecture | Unified `:root` tokens, anti-slop styling, removal of `transition: all`, viewport zoom fix, `overflow-x: clip`, typography standardization across index, simulation, and digital-twin | none | DONE (Gate passed, 100% verified) |
| M2 | Visual Asset Hardening & AI Slop Elimination | Replace 80+ unicode glyphs with Lucide SVGs, replace cartoon floating orb mascot with industrial telemetry badge, replace stock photo avatar with authentic monogram badge, de-nest card syndrome, SVG `aria-hidden` | M1 | DONE (Gate passed, 100% verified) |
| M3 | Route Routing & Twin/Simulation Hardening | Route alias `simulation-control` in index.html router, server.js HTTP method check, bi-directional IPC resilience, 2D fallback integrity | M2 | IN_PROGRESS |
| M4 | Final 100% E2E Test Pass & Adversarial Hardening | Phase 1: 100% pass on all 5 verification suites; Phase 2: Adversarial coverage hardening with Challenger & Forensic Auditor | M3 | PLANNED |

## Interface Contracts
### `preview/index.html` ↔ `preview/simulation.html`
- **Channel**: `BroadcastChannel('gfb_simulation_sync')`, `postMessage`, `localStorage('gfb_simulation_state')`
- **Payload Schema**:
  ```javascript
  {
    type: 'GFB_SIM_TICK',
    tick: Number,
    timestamp: String,
    scenario: String, // 'baseline' | 'night_idle' | 'production_surge' | 'grid_outage' | 'machine_overload' | 'energy_intervention'
    activeKw: Number,
    periodKwh: Number,
    avoidedKwh: Number,
    avoidedCo2Tons: Number,
    accumulatedCredits: Number,
    machines: Array<{ id: String, kw: Number, status: String }>
  }
  ```
- **Error Handling**: Graceful fallback to default baseline values ($52,300 \text{ kWh}$, $34.2 \text{ tCO}_2\text{e}$) if channel disconnected.

### `preview/index.html` ↔ `preview/digital-twin.html`
- **Channel**: Iframe `postMessage`
- **Payload**:
  ```javascript
  {
    type: 'SET_EPMS_TELEMETRY',
    feeders: Array<{ id: String, kw: Number, kva: Number, pf: Number, status: String }>,
    alarms: Array<{ id: String, severity: String, message: String }>
  }
  ```
- **Fallback**: Automated fallback to 2D Isometric SVG & Single Line Diagram if WebGL fails.

### `server.js` ↔ Frontend Clients
- **Protocol**: HTTP/1.1
- **Methods**: `GET`, `HEAD`
- **MIME Types**: `.html`, `.css`, `.js`, `.mjs`, `.json`, `.svg`, `.png`, `.jpg`, `.md`, `.zip`
- **Redirects**: 302 for `/dashboard`, `/simulation`, `/login`
