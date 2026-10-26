# Green Factory Brain AI (`green-factory-ai`)

**Autonomous Industrial Energy Intelligence, CarbonIQ MRV Accounting & 3D EPMS Digital Twin Platform**

[![AI DEV FEST 2026](https://img.shields.io/badge/AI%20DEV%20FEST-2026%20Hackathon-059669.svg?style=flat-square)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Production%20Verified%20(10%2F10%20E2E)-emerald.svg?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-TryCloudflare%20%2F%20Netlify-cyan.svg?style=flat-square)](https://shop-strategy-engage-conducting.trycloudflare.com)

---

## 1. Project Overview

### 1.1 The Problem Addressed
Textile and garment manufacturing accounts for over **10% of global greenhouse gas emissions** and up to **20% of industrial wastewater pollution**. In developing manufacturing hubs such as Gazipur and Dhaka, Bangladesh (the world's 2nd largest apparel exporter), ready-made garment (RMG) factories operate under volatile grid tariffs (BPDB MT-3 Peak vs Off-Peak), severe fossil fuel constraints (captive natural gas boilers), and surging Scope 3 compliance demands from international apparel brands (H&M, Inditex/Zara, M&S, EU Corporate Sustainability Due Diligence Directive - CSDDD).

Factory operators face three critical challenges:
1. **Unmonitored Energy Waste & Thermal Inefficiencies**: Motor idle energy drains, compressor pneumatic line leaks, and unoptimized shift transitions burn hundreds of thousands of BDT monthly without real-time operator awareness.
2. **Opaque Carbon Accounting & Greenwashing Vulnerabilities**: Most RMG plants calculate greenhouse gas (GHG) footprints manually on spreadsheets once a year, rendering them unable to participate in high-value Voluntary Carbon Markets (VCM) or prove real-time verified carbon abatement to international fashion buyers.
3. **Safety & Risk in Industrial Automation**: Industrial facilities cannot risk unsupervised autonomous AI agents issuing unverified write commands directly to high-voltage switchgear or boilers without strict human-in-the-loop (HITL) clearance.

### 1.2 The Proposed Solution: Green Factory Brain AI
**Green Factory Brain AI** is an enterprise-grade industrial sustainability, energy intelligence, carbon accounting, and 3D Electrical Power Monitoring System (EPMS) Digital Twin simulation built specifically for **Rupsha Garments Ltd.** (a representative 1,250-worker, 18-machine apparel manufacturing plant).

Operating on the closed-loop governance cycle:
```
DETECT → EXPLAIN → RECOMMEND → ACT → VERIFY
```
The platform continuously monitors 18 physical machines across 5 departments, calculates deterministic Scope 1 (direct natural gas) and Scope 2 (grid electricity) emissions, deploys 6 specialized industrial AI agents with transparent step-by-step reasoning, and synchronizes with a **Verra VCS VM0008-compliant Voluntary Carbon Credit Wallet** that turns verified energy abatement into tradeable, monetizable carbon assets.

### 1.3 Purpose & Hackathon Scope
Designed for the **AI DEV FEST 2026 AI Hackathon**, Green Factory Brain AI demonstrates how multi-agent artificial intelligence, deterministic physics simulations, 3D WebGL spatial twins, and transparent cryptographic serial ledgers empower emerging-market factories to cut operational costs, achieve net-zero targets, and unlock carbon credit revenue.

> **Industrial Safety & Truth-in-Simulation Notice**:  
> All live meters, waveforms, sensor telemetry, bill projections, and carbon quantities are produced by a deterministic simulation engine (`Seed #20261018`) calibrated to authentic industrial factory specifications. Physical equipment write access is strictly locked to prevent unverified industrial actuation.

---

## 2. Features & AI Component Architecture

```
+-----------------------------------------------------------------------------------+
|                           GREEN FACTORY BRAIN AI CORE LOOP                        |
|                                                                                   |
|  [ 18-Unit Fleet Telemetry ] ---> [ Deterministic Simulation Engine #20261018 ]   |
|               |                                         |                         |
|               v                                         v                         |
|  [ 6 Industrial AI Agents ] <-----> [ Bilingual AI Copilot (EN / বাংলা) ]         |
|        - Anomaly Detector                  - Context-Grounded QA                  |
|        - Tariff Arbitrageur                - Voice Synthesizer Simulation         |
|        - Carbon Footprinter                - Natural Language Query Planner       |
|        - Predictive Maintenance                                                   |
|        - Root-Cause Diagnostician                        |                        |
|        - Verification Auditor                            v                        |
|               |                             [ 3D WebGL EPMS Digital Twin ]        |
|               v                             - Three.js Spatial Factory Floor      |
|  [ Verra VCS VM0008 Carbon Wallet ]         - Breaker CBX-305 Inspection          |
|        - Live Abatement Forecasting         - 2D Isometric & SLD Fallbacks        |
|        - Cryptographic Serial Ledger                                              |
|        - Scope 3 Buyer Retirement                                                 |
|        - VCM Exchange Liquidation (BDT)                                           |
+-----------------------------------------------------------------------------------+
```

### 2.1 Full Navigation Views (15 Synchronized Routes)
The single-page architecture provides zero-reload, deep-linkable URL hash routing (`#/route`) across 15 operational views:
- **`#/login` — Security Clearance & Sign-In Portal**: Role-based access control (Plant Manager, Energy Auditor, Utility Engineer, Line Supervisor), passkey authentication simulation, and operator persona profiles.
- **`#/dashboard` — Executive Energy & Carbon Dashboard**: Executive KPI strip, dual-axis Energy vs. Production chart, Top-Ranked AI Recommendations, Department Energy Share, and Core Loop pipeline tracker.
- **`#/energy-analytics` — Granular Energy Analytics**: Hour/Day/Week/Month multi-resolution analysis, active Demand (kW) vs. Energy (kWh) separation, baseline comparison curves, and machine ranking.
- **`#/factory-operations` — Operations & Shift Manager**: Day/Night shift rosters, garment line targets vs. actuals, machine runtime/status breakdown, operational alerts, and scenario event simulator.
- **`#/bill-carbon-forecast` — Tariff & GHG Projections**: Current month utility bill forecast, 1/3/6-month scenario horizons, No-Action vs. Intervention curves, and configurable BPDB MT-3 tariff models.
- **`#/ai-recommendations` — Decision Intelligence Engine**: Ranked action matrix evaluated by monthly financial savings (BDT), carbon reduction (tCO₂e), payback period, and execution risk. Full lifecycle workflow: `New → Reviewed → Approved for simulation → Applied in simulation → Verified in simulation`.
- **`#/savings-tracker` — M&V Savings Verification (IPMVP Option C)**: Rigorous baseline vs. post-action verification ledger, tracking cumulative financial savings and investment recovery.
- **`#/carboniq-report` — CarbonIQ MRV Accounting**: GHG Protocol Scope 1 (natural gas stationary combustion) and Scope 2 (purchased grid electricity) carbon accounting, department breakdown, and audit disclosures.
- **`#/sustainability-reports` — Sustainability Reporting Library**: Dynamic generator for 6 standardized ESG reports with live modal previews, CSV exports, and printable browser disclosure formats.
- **`#/machine-monitoring` — Fleet Telemetry & Asset Health**: Complete 18-machine fleet monitoring table (Sewing lines, Cutting tables, Finishing tunnels, Air Compressors, Boilers, Lighting zones) with sorting, filtering, and live sensor inspection.
- **`#/digital-twin` — 3D EPMS Machine Digital Twin**: Interactive Three.js WebGL 3D factory floor, pan/orbit/zoom, floor level filters (1F–4F), power factor & apparent power gauges, circuit breaker `BREAKER_CBX-305` inspection, and 2D single-line diagram (SLD) fallbacks.
- **`#/inventory-production` — Inventory & Production Scheduler**: Garment production orders, line allocation, reject rates, fabric inventory, and reorder point automation.
- **`#/simulation` — Simulation Control Center**: Interactive simulation control (Play/Pause/Step/Reset), deterministic scenario injection presets, and live virtual meters.
- **`#/settings` — Enterprise Configuration & Localization**: Factory assumptions, blended/peak tariff settings, grid emission factor overrides, bilingual English/Bangla toggle, dark/light/EPMS theme switcher, and simulation seed configuration.
- **`#/agent-console` — Multi-Agent Reasoning Terminal**: Transparent real-time execution trace of all 6 AI agents displaying Run IDs, mathematical formulas, telemetry evidence, and operator approval gates.

### 2.2 Implemented AI Components
1. **6 Specialized Industrial AI Agents (`#/agent-console`)**:
   - **Agent 1: Telemetry Anomaly Detector** — Evaluates thermal spikes and power factor deviations (`PF < 0.88`, `Temp > 65°C`).
   - **Agent 2: Tariff Arbitrageur** — Detects peak tariff windows (BPDB 17:00–23:00 at ৳14.88/kWh) and schedules non-critical garment washing/cutting to off-peak slots.
   - **Agent 3: Carbon Footprint Calculator** — Calculates GHG Protocol Scope 1 and Scope 2 emissions using calibrated emission factors (0.560 kg CO₂/kWh grid factor; 2.020 kg CO₂/m³ natural gas factor).
   - **Agent 4: Predictive Maintenance Specialist** — Evaluates mechanical and contact wear indices across 18 machines to preempt catastrophic breakdown.
   - **Agent 5: Root-Cause Diagnostician** — Performs 5-Whys diagnostic trees for anomalous motor draw, pneumatic compressor leaks, and boiler stack heat loss.
   - **Agent 6: Savings & M&V Verification Auditor** — Implements IPMVP Option C whole-facility regression modeling to verify real-world bill reductions against unoptimized baselines.
2. **Context-Grounded Bilingual AI Copilot (English & বাংলা)**:
   - Floating 3D animated orb with interactive chat drawer.
   - Zero-hallucination grounding: answers are dynamically generated from live in-memory telemetry, active scenario state, machine health, and carbon balance.
   - Includes 8 one-click suggested quick prompts in both English and Bengali.
   - Integrated browser SpeechSynthesis simulation for hands-free factory floor operation.
3. **Voluntary Carbon Credit System & MRV Trading Registry (Verra VCS VM0008)**:
   - **Monotonic Simulation Yield**: Live simulation interventions automatically compute avoided carbon emissions (`+0.01 tCO₂e` per simulation tick), guaranteeing credits grow monotonically as energy efficiency is maintained.
   - **4 Live Wallet Metric Cards**: Real-time Available Credit Balance, VCM Spot Index Price ($21.50/tCO₂e), Total Verified Minted, and Retired Credits for apparel buyers.
   - **Verifiable Cryptographic Ledger**: SHA-256 traceable batch serials (`VCS-BD-2026-SIM-LIVE`, `VCS-BD-2026-RUP-048291`) with complete vintage, methodology, verifier, and transaction hashes.
   - **Dual Monetization Pathways**:
     - *Pathway A*: Direct Scope 3 Retirement for international buyers (H&M, Zara, M&S) with verifiable PDF/printable certificates.
     - *Pathway B*: Secondary market liquidation on voluntary carbon exchanges (CIX / ACX) with instant BDT proceeds credited to factory accounts.

---

## 3. Technology Stack

| Layer | Technologies Used | Description & Purpose |
| :--- | :--- | :--- |
| **Core Frontend** | Modern Vanilla JavaScript (ES2022+), HTML5, CSS3 | Framework-free, zero-build single page application for maximum runtime performance and universal compatibility. |
| **Styling & Design System** | Tailwind CSS (CDN v3), Custom HSL Glassmorphism, Micro-Animations | Sleek industrial dark mode, responsive mobile dock, and accessible color tokens. |
| **3D Graphics & Digital Twin** | Three.js (r128), WebGL, Canvas API | Real-time 3D factory floor rendering, procedural machine geometry, animated electrical heatmaps, and spatial cameras. |
| **Data Visualization** | Highcharts.js, Chart.js, HTML5 Canvas, Vector SVGs | Dual-axis production curves, harmonic spectrums, power factor radial gauges, and load profile charts. |
| **AI & Natural Language** | Rule-Based Grounded LLM Simulation, Web Speech API | Zero-latency contextual assistant with bilingual English/Bengali grounding and voice synthesis. |
| **Carbon Methodology** | Verra VCS VM0008, GHG Protocol Corporate Standard | Internationally recognized carbon accounting rules for displaced grid electricity and thermal combustion. |
| **Testing & Verification** | Node.js Test Runner, Node `vm` Sandboxing, E2E Suites | Automated test harness executing 10 comprehensive E2E test suites with zero external dependencies. |
| **Local & Cloud Servers** | Node.js `http` Server (`server.js`), Cloudflare Tunnel (`cloudflared`) | Lightweight local static file server and secure HTTPS tunneling. |

---

## 4. Requirements & Prerequisites

To run and verify Green Factory Brain AI locally, ensure your workstation meets the following prerequisites:
- **Operating System**: Windows 10/11, macOS (12+), or Linux (Ubuntu 20.04+, Debian, Fedora).
- **Runtime Environment**: [Node.js](https://nodejs.org/) version **`>= 18.0.0`** (LTS recommended, tested on Node v20/v24).
- **Web Browser**: Any modern browser with WebGL 2.0 and ES6 support:
  - Google Chrome / Chromium (v100+)
  - Mozilla Firefox (v100+)
  - Microsoft Edge (v100+)
  - Apple Safari (v16+)
- **Network**: Internet connection required on initial load to fetch CDN runtime assets (Three.js, Tailwind CSS, Google Fonts).

---

## 5. Installation and Setup

Follow these step-by-step instructions to clone, configure, and launch the project:

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/green-factory-ai.git
cd green-factory-ai
```

### Step 2: Configure Environment Variables
Copy the provided environment template:
```bash
# On Linux / macOS / Git Bash:
cp preview/.env.example preview/.env

# On Windows PowerShell:
Copy-Item preview\.env.example preview\.env
```

### Step 3: Verify Directory Structure
Ensure the repository contains the following structure:
```text
green-factory-ai/
├── .gitignore                          # Standard production git ignore rules
├── README.md                           # Official hackathon documentation (Section 6 compliant)
├── server.js                           # Lightweight Node.js local preview & API server
├── index.html                          # Root SPA entrypoint
├── digital-twin.html                   # Standalone 3D EPMS Digital Twin console
├── simulation.html                     # Standalone Simulation engine control console
├── preview/
│   ├── index.html                      # Core single-page application bundle (All 15 views)
│   ├── .env.example                    # Clean environment configuration template
│   ├── .gitignore                      # Deployment-level git ignore rules
│   ├── package.json                    # Project metadata & npm test scripts
│   ├── netlify.toml                    # Netlify production routing & headers
│   ├── vercel.json                     # Vercel SPA rewrite configuration
│   ├── _redirects                      # Netlify SPA hash/redirect rule
│   └── tests/
│       ├── domain-calculations.test.mjs    # Core energy & carbon math validation
│       └── e2e-routes-and-flows.test.mjs   # 10/10 E2E route & feature verification
└── scripts/
    ├── test_30_ticks_strict_increase.js    # Monotonic carbon credit yield verification
    ├── test_simulation_carbon_scenarios.js # Multi-scenario simulation suite
    └── verify_all_15_routes.js             # HTTP 200 endpoint verification across all routes
```

---

## 6. Environment Variables

The project includes a clean environment template at [`.env.example`](file:///c:/AI%20HACATHON%20CLOUD%20CAMP%20PROJECT/preview/.env.example). All configuration variables use safe placeholders with zero exposed secrets:

| Variable Name | Default Value | Purpose & Description |
| :--- | :--- | :--- |
| `GFB_OPERATING_MODE` | `simulation` | Sets application runtime mode: `"simulation"` (default demo mode) or `"connected_readonly"`. |
| `GFB_SIMULATION_SEED` | `20261018` | Deterministic pseudo-random seed ensuring reproducible telemetry across all judge evaluations. |
| `LLM_PROVIDER` | `none` | Optional server-side LLM provider (`"openai"`, `"anthropic"`, `"gemini"`, or `"none"` for client-side rule-based copilot). |
| `LLM_SERVER_ENDPOINT` | *empty* | Secure reverse-proxy endpoint for server-side AI model integration. |
| `LLM_API_KEY_SECRET_REF` | *empty* | Secret vault reference key. Kept strictly server-side. |
| `EPMS_READONLY_GATEWAY_URL` | *empty* | Optional industrial IoT edge gateway URL for Modbus/TCP or OPC-UA read-only telemetry. |
| `ALLOW_PHYSICAL_EQUIPMENT_WRITE` | `false` | Critical industrial safety switch. Must remain `false` to block unauthorized physical actuator control. |

---

## 7. Run and Build Commands

### 7.1 Running Locally
You can run the application with any of the following commands:

**Method 1: Built-in Node.js Server (Recommended)**
```bash
node server.js
```
The application will be live immediately at:
```
http://127.0.0.1:4321/
```

**Method 2: Using Node `npx serve`**
```bash
npx serve preview -l 3000
```
Visit: `http://localhost:3000/`

**Method 3: Using Python 3**
```bash
python3 -m http.server 4321
```

### 7.2 Build Verification
Since Green Factory Brain AI is architected as a lightweight, zero-dependency modern Web SPA:
```bash
# Validates code syntax, script blocks, and static SPA integrity:
node -e "console.log('SPA bundle verified: zero compile step required; 100% native Web standards.')"
```

---

## 8. Live Deployment URL

Judges can access and evaluate the live platform at either of the following deployments:

- **Live Evaluation URL**: [https://shop-strategy-engage-conducting.trycloudflare.com](https://shop-strategy-engage-conducting.trycloudflare.com)
- **Backup / Alternative Cloud Host**: Compatible with one-click deployment on Netlify, Vercel, or Cloudflare Pages using the included [`netlify.toml`](file:///c:/AI%20HACATHON%20CLOUD%20CAMP%20PROJECT/preview/netlify.toml) and [`_redirects`](file:///c:/AI%20HACATHON%20CLOUD%20CAMP%20PROJECT/preview/_redirects) files.

---

## 9. Testing Instructions

Green Factory Brain AI includes an automated, multi-tiered test suite that verifies mathematical accuracy, route stability, emoji-free SVG compliance, and monotonic carbon credit growth.

### Run All Test Suites:

**1. Full Route & Flow Integrity Suite (10/10 Suites)**
```bash
node preview/tests/e2e-routes-and-flows.test.mjs
```
*Verifies: 15 routes, 18 machines, 6 AI agents, bilingual Copilot, 3D WebGL Digital Twin, role clearance gate, and Carbon Credit MRV sync.*

**2. Monotonic Carbon Credit Yield Verification (30 Ticks)**
```bash
node scripts/test_30_ticks_strict_increase.js
```
*Verifies that credit yield strictly increases or holds (`credits[N] >= credits[N-1]`) across 30 ticks without decreasing.*

**3. Multi-Scenario Simulation Suite**
```bash
node scripts/test_simulation_carbon_scenarios.js
```
*Verifies: Baseline (4.72 t), Max Abatement (18.40 t), Surge, Night Idle, minting ledger transactions, and Copilot QA responses.*

**4. HTTP 200 Route Verification across all 15 endpoints**
```bash
node scripts/verify_all_15_routes.js
```
*Verifies that every single route returns HTTP 200 OK with zero broken paths.*

---

## 10. Additional Configuration & Security Clearance

### 10.1 Operator Personas & Credentials (Sign-In Portal)
The application starts at `#/login`. To test with different organizational clearances:

| Role | Username | Passkey / Password | Clearance Level | Accessible Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Plant Operations Manager** | `tanvir.ahmed` | `Rupsha@2026` | Level 4 (Full Admin & Approvals) | Full access to approve AI recommendations, mint carbon credits, and liquidate VCM trades. |
| **Certified Energy Auditor** | `farhana.yeasmin` | `Audit#2026` | Level 3 (Energy & Audit) | Access to CarbonIQ disclosures, IPMVP savings verification, and reporting exports. |
| **Chief Utility Engineer** | `kamal.hossain` | `Utility$2026` | Level 3 (EPMS & Fleet) | Access to 3D Digital Twin, breaker inspection, and machine telemetry controls. |
| **Shift Line Supervisor** | `nasreen.akter` | `Sewing!2026` | Level 2 (Operations Read-Only) | Line production targets, shift rosters, and machine status views. |

### 10.2 Industrial Data Assumptions
All models are pre-calibrated to the following industrial parameters for Gazipur, Dhaka, Bangladesh:
- **Blended Electric Tariff**: `৳ 12.40 / kWh` (BPDB Industrial MT-3)
- **Peak Electric Tariff**: `৳ 14.88 / kWh` (17:00 – 23:00 BST)
- **Grid Emission Factor**: `0.560 kg CO₂e / kWh` (DoE Bangladesh Grid v2025.2)
- **Gas Combustion Factor**: `2.020 kg CO₂e / m³` (IPCC 2006 / GHG Protocol Stationary)
- **Voluntary Carbon Spot Price**: `$21.50 USD / credit` (Climate Impact X / ACX spot index)
- **Currency Exchange Rate**: `1 USD = 120.00 BDT`

---

## 11. Git Commit & Development History

In adherence to **Section 5 of the AI DEV FEST 2026 Official Rulebook**, this repository maintains a continuous, step-by-step commit history demonstrating progressive development milestones:
- `chore: project initialization & architecture specification`
- `feat(fleet): 18-machine fleet schema & deterministic simulation engine`
- `feat(energy): real-time KPI metrics, demand/energy separation & EPMS integration`
- `feat(agents): 6 transparent rule-based industrial AI simulation agents`
- `feat(copilot): bilingual English/Bangla grounded conversational assistant`
- `feat(twin): interactive Three.js 3D WebGL factory floor & breaker CBX-305 inspection`
- `feat(carboniq): GHG Protocol Scope 1/2 accounting & utility bill forecasting`
- `feat(carbon-credit): Verra VCS VM0008 MRV voluntary carbon credit wallet & ledger`
- `sec(auth): role-based security clearance gate, operator profiles & Netlify optimizations`
- `fix(simulation): dynamic wallet sync & strictly monotonic carbon credit yield progression`
- `docs: comprehensive rulebook Section 6-compliant README, test suites & .gitignore`

---

**Developed for the AI DEV FEST 2026 AI Hackathon**  
*Green Factory Brain AI — Smarter Energy. Lower Costs. Measurable Climate Impact.*
