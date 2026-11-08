# Technical Analysis: Backend Architecture, 15 API Routes & 3D EPMS Digital Twin / Simulation Integration

**Project**: Green Factory Brain AI  
**Facility**: Rupsha Garments Ltd., Gazipur, Bangladesh  
**Investigator**: `teamwork_explorer_survey_3`  
**Date**: 2026-11-07  

---

## 1. Executive Summary

This investigation provides a comprehensive architectural survey of the Green Factory Brain AI system, focusing on:
1. **Backend Server Architecture (`server.js`)**: A zero-dependency, high-throughput Node.js HTTP server managing clean URL routing, security-gated package distribution, static file delivery, and redirect contracts.
2. **The 15 Application Routes**: Both the 15 client-side view/data routes verified by `scripts/verify_all_15_routes.js` and their underlying state/data persistence models.
3. **3D EPMS Digital Twin Architecture**: Deep analysis of both the standalone Ultra-HD 3D Digital Twin (`preview/digital-twin.html` featuring Three.js r128, UnrealBloom post-processing, 15 industrial asset assemblies, 30 articulated multi-joint NPCs, and CCTV PiP) and the embedded native Three.js WebGL scene within `preview/index.html` (with 2D isometric/SLD fallbacks).
4. **Deterministic Simulation Engine**: Exploration of the physics/load simulation model in `preview/simulation.html` and `preview/index.html`, driven by Mulberry32 PRNG (`seed = 20261018`), multi-scenario handling, and real-time synchronization with Verra VCS VM0008 / ISO 14064-2 carbon credit minting.
5. **Cross-Boundary Interface Contracts**: Complete mapping of inter-process communication channels (`BroadcastChannel`, `postMessage`, `localStorage`, and HTTP redirects).

All five project test suites pass with a **100% pass rate** (`npm run test:all`).

---

## 2. Backend Server Architecture (`server.js`) & Route Inventory

### 2.1 Architectural Characteristics
- **Runtime & Dependencies**: Pure Node.js standard libraries (`http`, `fs`, `path`, `crypto`). Zero external npm runtime dependencies, ensuring zero supply-chain attack surface and instant container startup (< 50ms).
- **Environment Hydration**: Custom zero-dependency `.env` file loader (`loadEnv()`) searching root and `preview/` directories.
- **Delivery Strategy**: Dual serving architecture:
  - Serves static assets directly from `preview/` with exact MIME type resolution.
  - Generates dynamic developer/portal status cards with real-time SHA256 checksums of deployment ZIP packages.
  - Performs clean 302 redirects for canonical application routes (`/dashboard`, `/simulation`, `/login`).

### 2.2 Backend HTTP Route Inventory

| Route Path | HTTP Method | Expected Inputs | Response Content-Type | Status Code | Data Persistence / Side Effects | Error Handling |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves `preview/index.html` | Streams file; 404 if missing |
| `/index.html` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves `preview/index.html` | Streams file; 404 if missing |
| `/preview` & `/preview/` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves `preview/index.html` | Streams file; 404 if missing |
| `/preview/index.html` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves `preview/index.html` | Streams file; 404 if missing |
| `/app` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves `preview/index.html` | Streams file; 404 if missing |
| `/dashboard` & `/dashboard/` | `GET` | None | `text/plain` (empty) | 302 | Redirects to `/#/dashboard` | Clean HTTP redirect |
| `/login` & `/login/` | `GET` | None | `text/plain` (empty) | 302 | Redirects to `/#/login` | Clean HTTP redirect |
| `/simulation` & `/simulation/` | `GET` | None | `text/plain` (empty) | 302 | Redirects to `/#/simulation` | Clean HTTP redirect |
| `/simulation.html` | `GET` | Query params (e.g. `?embed=1`) | `text/html; charset=utf-8` | 200 | Serves standalone Simulation Control Center | Streams file; 404 if missing |
| `/digital-twin.html` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves Ultra-HD 3D Digital Twin | Streams file; 404 if missing |
| `/digital-twin` & `/digital-twin/` | `GET` | None | `text/html; charset=utf-8` | 200 | Serves Ultra-HD 3D Digital Twin | Streams file; 404 if missing |
| `/portal` & `/info` | `GET` | None | `text/html; charset=utf-8` | 200 | Dynamic HTML delivery portal with SHA256 stats | On-the-fly rendering |
| `/download` | `GET` | None | `application/zip` | 200 | Serves `green_factory_brain_ai_full_project.zip` as attachment | Content-Disposition attachment; 404 if missing |
| `/project.zip` | `GET` | None | `application/zip` | 200 | Alias for `/download` | Content-Disposition attachment; 404 if missing |
| `/green_factory_brain_ai_full_project.zip` | `GET` | None | `application/zip` | 200 | Direct package file download | Content-Disposition attachment; 404 if missing |
| `/netlify_deploy_green_factory_brain.zip` | `GET` | None | `application/zip` | 200 | Serves Netlify deployment package | Content-Disposition attachment; 404 if missing |
| `/*` (Static Files) | `GET` | File path in URL | `.html`, `.css`, `.js`, `.mjs`, `.json`, `.svg`, `.png`, etc. | 200 / 404 | Serves matched static file from `preview/` | Strict path normalization; 404 if outside `PREVIEW_DIR` or non-existent |

---

## 3. Client-Side Application Route Inventory (All 15 Routes)

The frontend is an Edge Single Page Application (SPA). `scripts/verify_all_15_routes.js` verifies that every designated application route instantiates and renders without throwing syntax or DOM execution errors.

### 3.1 Detailed Route Specifications

#### 1. `dashboard`
- **Purpose**: Factory Overview, live demand, carbon intensity, sustainability score, and live sync strip.
- **Key Metrics**: Active Demand (199.2 kW), Period Energy (52,300 kWh), Projected Bill (৳ 648,520 BDT), Total Emissions (34.2 tCO2e), Sustainability Index (82.4/100).
- **Data Source**: Reconciled from `AppState.fleet` and `getDerivedMetrics()`.
- **Error Handling**: Graceful fallback values for missing sensor streams.

#### 2. `energy-analytics`
- **Purpose**: High-resolution load curves, peak vs off-peak tariff breakdown, power factor analysis, and SEC.
- **Key Metrics**: BPDB MT-3 tariff slots (Peak ৳ 14.88, Off-Peak ৳ 11.16, Flat ৳ 12.40), Specific Energy Consumption (kWh / 100 garments).
- **Visualization**: Chart.js canvas rendering with dark/light theme awareness.

#### 3. `factory-operations`
- **Purpose**: Departmental operational status across Sewing, Cutting, Finishing, and Utilities.
- **Key Metrics**: Hourly garment throughput, operator staffing levels, machine availability percentage (88.9%).
- **Data Source**: `AppState.fleet` aggregated via `aggregateFleetMetrics()`.

#### 4. `bill-carbon-forecast`
- **Purpose**: Forward-looking 30-day and 90-day utility cost and greenhouse gas emissions forecasting.
- **Key Metrics**: Scope 1 (natural gas stationary combustion = 4.91 tCO2e) and Scope 2 (grid electricity = 29.288 tCO2e).
- **Compliance**: Follows GHG Protocol Corporate Standard with explicit DoE Bangladesh emission factors.

#### 5. `ai-recommendations`
- **Purpose**: Energy Conservation Measures (ECMs) prioritized by cost-benefit and payback.
- **Records**: 
  - `REC-01`: Sewing Line 3 Idle Cut & Compressor Leak Fix (+৳ 18,500/mo, 2.1 mo payback).
  - `REC-02`: Boiler Pressure & Pre-heat Scheduling (+৳ 12,400/mo, 3.8 mo payback).
  - `REC-03`: Daylight-Linked LED Lighting (+৳ 8,600/mo, 4.5 mo payback).
- **State Lifecycle**: `New` → `Approved for simulation` → `Applied in simulation` → `Verified in simulation`.

#### 6. `savings-tracker`
- **Purpose**: Measurement and Verification (M&V) tracking of accrued financial and energy savings.
- **Key Metrics**: Cumulative saved BDT, avoided kWh, and avoided CO2 tons against baseline.

#### 7. `carboniq-report`
- **Purpose**: CarbonIQ Voluntary Carbon Credit MRV Accounting & Trading Platform.
- **Methodology Standards**: Verra VCS VM0008 & ISO 14064-2 verified.
- **Wallet Metrics**: Available Verified Credits (tCO2e), Retired Credits, Total Minted Credits, BDT Market Valuation (৳ 2,580/tCO2e).
- **Dynamic Ledger**: Cryptographic batch tracking (e.g. `VCS-BD-2026-RUP-048291`, `VCS-BD-2026-SIM-LIVE`).
- **Interactive Modals**: Retirement with cryptographic certificate generation, secondary market trade simulation, CSV ledger export.

#### 8. `sustainability-reports`
- **Purpose**: Executive and regulatory ESG disclosure generator (GRI 302 Energy, GRI 305 Emissions).
- **Disclosures**: Explicit watermarks: `SIMULATION REPORT — NOT AUDITED OR CERTIFIED`.

#### 9. `machine-monitoring`
- **Purpose**: Telemetry grid for all 18 industrial assets + `BREAKER_CBX-305`.
- **Parameters**: Active kW, Period kWh, Status (`Running`, `Idle`, `Fault`, `Maintenance`), Temp (°C), Contact/Mech/Control wear.
- **Interactivity**: Machine telemetry drawer with live historical sparklines.

#### 10. `digital-twin`
- **Purpose**: 3D EPMS Interactive Digital Twin.
- **Implementation**: Embeds `digital-twin.html` via high-performance iframe while retaining native Three.js WebGL canvas engine and 2D isometric/SLD fallbacks.

#### 11. `inventory-production`
- **Purpose**: Garment batch tracking, work-in-progress (WIP) inventories, fabric yield, and unit energy intensity.

#### 12. `simulation`
- **Purpose**: Full-featured Simulation Control Center within the main SPA.
- **Controls**: Play/Pause, +1 Tick step, Speed selection (1x, 2x, 5x, 12x), Reset, Scenario injection (`baseline`, `night_idle`, `production_surge`, `grid_outage`, `machine_overload`, `energy_intervention`).
- **Bridge**: Communicates with `preview/simulation.html` via `BroadcastChannel` and `postMessage`.

#### 13. `simulation-control`
- **Purpose**: Secondary/alias route referenced in route verification suites.
- **Behavior**: Mapped to simulation control capabilities.

#### 14. `settings`
- **Purpose**: Factory configuration, baseline parameters, emission factor calibration (0.560 kg/kWh, 2.020 kg/m3), user access control, and dark/light mode toggle.

#### 15. `agent-console`
- **Purpose**: 6-Agent Autonomous Industrial AI Operations Console.
- **Agents**:
  - `AGT-ENERGY`: Load balancing & power quality.
  - `AGT-FORECAST`: Peak load & billing forecast.
  - `AGT-CARBON`: Scope 1 & 2 MRV accounting.
  - `AGT-RECOMMEND`: Autonomous ECM identification.
  - `AGT-SAVINGS`: Financial payback verification.
  - `AGT-REPORT`: ESG disclosure compliance.

---

## 4. 3D EPMS Digital Twin Architecture Audit

The platform contains two complementary 3D implementations:

### 4.1 Standalone Ultra-HD 3D Digital Twin (`preview/digital-twin.html`)
- **Technology Stack**:
  - Three.js r128 with `OrbitControls` and `GLTFExporter`.
  - Post-processing pipeline: `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `ShaderPass` (`CopyShader`, `LuminosityHighPassShader`).
  - Tailwind CSS for responsive HUD overlays.
- **Scene Hierarchy**:
  - `THREE.Scene`: Dark navy industrial environment (`#1e3a5f`), exponential depth fog (`FogExp2`).
  - **Lighting Architecture**:
    - Ambient lighting (`0x88aacc`, 0.75 intensity).
    - Key directional sun light (`0xe2f1ff`, 1.15 intensity) cast from `(12, 22, 14)`.
    - Warm point lights (`0xf59e0b`) simulating furnace radiant glow.
    - Cyan accent point lights (`0x38bdf8`) highlighting cleanroom and substation busbars.
- **Asset Hierarchy (15 Industrial Assemblies)**:
  1. `BREAKER_CB8-300` / `BREAKER_CBX-305`: Substation Air Circuit Breaker with high alarm state (92% load, 61.4°C, 318A).
  2. `NCP_01`: Network Control Panel (Master PLC, ATS & SCADA bus).
  3. `Hall_A`: Vacuum Furnaces (10 units, 24m × 8m, bridge crane, 535 kW).
  4. `Hall_B`: ISO-6 Cleanroom (wafer lithography, 172 kW, 21.5°C).
  5. `Hall_C`: VI Line Workshop (brazing ovens, coil winders, 382 kW).
  6. `Hall_E`: High-Speed Stamping Presses (114 kW, 120 strokes/min).
  7. `Hall_F`: Smart Robotics Assembly Line (62 drills, 6-axis robots, 229 kW).
  8. `Hall_G`: ACB Final Test Lab (Marx high-voltage impulse tower, 250 kV BIL, 76 kW).
  9. `Tank_H1`: Pressurized Process Chemical & Acid Tanks (98 kW).
  10. `Silo_1`: Vertical Raw Material Silos (h = 5m, 45 kW).
  11. `Cooling_1`: Hyperbolic Evaporative Cooling Towers 1–2 (125 kW).
  12. `Chimney_1`: HV Switchyard, Flue Stacks & Wind-01 300 kW turbine.
  13. `BESS_01`: 1.2 MWh Battery Energy Storage System (Megapacks) + 2,000 kVA Diesel Generator.
  14. `Admin_HQ`: 2-story curtain-glass executive & NOC center (64 kW).
  15. Helipad & Emergency Muster Station.
- **30 Multi-Joint Articulated Real-Life NPCs**:
  - Hierarchical human meshes: Torso, head, hard hat, high-vis vest, arms, and legs.
  - Active equipment tools: `tablet`, `multimeter`, `welder`, `wrench`, `clipboard`, `forklift`.
  - Roles: Lead NCP Engineer (Eng. Tariq), Switchgear Specialist (Supr. Kenji), Master Welder (Tech. Maya), Furnace Metallurgist (Opr. Carlos), Cleanroom Lead (Dr. Elena), Robotics Coordinator (Tech. Liam), Forklift Driver (Opr. Rafiq), Flight Marshall (Capt. Karim), etc.
  - Pathfinding: Waypoint loops with smooth kinematic interpolation.
  - Interactive speech bubbles and worker telemetry pins.
  - Modes: Overview orbit, "Follow NPC" camera lock, and First-Person POV ("Eyes View" + WASD walking controls).
- **CCTV Security & Substation Picture-in-Picture (PiP)**:
  - 4 cameras: CAM-01 (NCP/CB8), CAM-02 (Foundry), CAM-03 (Robotics), CAM-04 (Helipad).
  - Off-screen secondary canvas rendering with live frame timing and infrared modes.
- **Rendering Modes**:
  - PBR Rendered, Wireframe, Solid, Thermal (false-color temperature heatmap), and X-Ray.
- **Single Line Diagram (SLD) Mode**:
  - Interactive SVG overlay showing transformer coupling, 11kV/400V bus ties, generator sync, and feeder status.

### 4.2 Embedded 3D Digital Twin (`preview/index.html` `initEpms3dScene`)
- **Integration**:
  - Rendered when navigating to `#/digital-twin`. Embeds `digital-twin.html` in an iframe for full fidelity and provides a native in-page WebGL scene option.
- **Native Scene Composition**:
  - 18 Rupsha Garments machines positioned on an isometric factory floor grid.
  - Glowing status beacons positioned above each machine, levitating with harmonic oscillation (`1.62 + sin(t + pos.x) * 0.07`).
  - `BREAKER_CBX-305` highlighted in electric blue emissive material.
  - Raycaster click interaction: clicking any machine highlights it and opens its telemetry inspector.
  - Disposal protocol: `disposeEpms3dScene()` cancels animation frames and disposes WebGL contexts to prevent memory leaks during navigation.
  - 2D Isometric & SLD Fallback (`renderEpms2dOrSldFallback()`): Activated automatically if WebGL context creation fails or Three.js CDN is unavailable.

---

## 5. Simulation Engine Architecture Audit

### 5.1 Simulation Core (`preview/simulation.html` & `preview/src/domain/calculations.mjs`)
- **Deterministic PRNG**:
  - Uses Mulberry32 algorithm (`seed = 20261018`). Produces mathematically reproducible pseudo-random sequences for all machine load oscillations, guaranteeing test stability.
- **Mathematical Formulations**:
  - Active Power: $P = \text{rated} \times \text{loadFactor} \times (1 + \frac{\text{adj}}{100}) \times (1 + 0.03 \sin(1.7t + \text{rated}))$
  - Apparent Power: $S = \frac{P}{PF}$
  - Integrated Energy: $E = \int P \, dt \approx \sum P_i \times \Delta t_i$
  - Electricity Bill: $\text{Bill} = E \times \text{Tariff} + \text{Fixed Charges} + \text{Demand Charges}$
  - Carbon Accounting:
    - Scope 1: $\text{Scope 1} = \frac{\text{Gas } (\text{m}^3) \times 2.020}{1000} \text{ tCO}_2\text{e}$
    - Scope 2: $\text{Scope 2} = \frac{E \times 0.560}{1000} \text{ tCO}_2\text{e}$
    - Avoided Emissions: $\text{Avoided tCO}_2\text{e} = \frac{\text{Avoided kWh} \times 0.560}{1000}$
    - Potential Carbon Credits: $1 \text{ Credit} = 1 \text{ tCO}_2\text{e avoided}$
    - Projected Carbon Revenue: $\text{Revenue} = \text{Credits} \times ৳ 2,580 \text{ BDT}$

### 5.2 Scenario State Model

| Scenario ID | Name | Trigger Condition | Industrial Physics Impact |
| :--- | :--- | :--- | :--- |
| `baseline` | Standard Operation | Default | 52,300 kWh, 199.2 kW, PF 0.92, 34.2 tCO2e |
| `night_idle` | Night-Shift Idle Waste | Shift = Night (22:00–06:00) | Sewing Line 3 draws 4.8 kW idle; COMP-01 draws +15% due to pneumatic leaks |
| `production_surge` | Rush Order Surge | Operator trigger | +25% active load across Cutting and Sewing lines |
| `grid_outage` | Grid Outage + Gen Backup | Operator trigger | Grid draw drops to 0; Diesel Gen picks up essential lighting (35% load); machines halt |
| `machine_overload` | CNC Cutter Fault | Operator trigger | `MCH-CUT-02` faults; temperature rises to 68.4°C; contact wear jumps to 54% |
| `energy_intervention` | AI ECM Implementation | Operator applies REC-01, 02, 03 | Idle waste eliminated; avoided kWh accumulates monotonically; carbon credit yield jumps to +20.18 tCO2e |

### 5.3 Monotonic Credit Accumulation Guarantee
- Tested via `scripts/test_30_ticks_strict_increase.js`: over 30 successive simulation ticks, avoided kWh and carbon credits strictly increase or hold with **0 decreases**, guaranteeing that financial and carbon accounting ledgers never experience backwards drift.

---

## 6. Frontend-Backend Interface Contracts

### 6.1 Communication Matrix

```
┌────────────────────────────────────────────────────────┐
│                      server.js                         │
│  - Static Asset Delivery                               │
│  - Clean URL 302 Redirects                             │
│  - Package Downloads (/download)                       │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP GET
                           ▼
┌────────────────────────────────────────────────────────┐
│                 preview/index.html                     │
│  - Reactive State Store (AppState)                     │
│  - 15 Application Views                                │
│  - AI Copilot & 6-Agent Console                        │
│  - In-Page 3D WebGL Engine & 2D Fallbacks              │
└──────────────┬──────────────────────────▲──────────────┘
               │                          │
  BroadcastChannel: 'gfb_simulation_sync' │  localStorage: 'gfb_simulation_state'
  window.postMessage('GFB_SIM_SYNC')      │  BroadcastChannel events
               │                          │
               ▼                          │
┌─────────────────────────────────────────┴──────────────┐
│                preview/simulation.html                 │
│  - Deterministic Mulberry32 Engine                     │
│  - 8-Machine Model & Equipment Physics                 │
│  - Scenario Injectors & Interventions                  │
└────────────────────────────────────────────────────────┘
```

### 6.2 Data Payloads
- **Outbound Actions** (`preview/index.html` → `simulation.html`):
  - `{ action: 'togglePlay' }`
  - `{ action: 'step', stepMin: 60 }`
  - `{ action: 'setSpeed', speed: 1 | 5 | 12 }`
  - `{ action: 'setScenario', scenario: 'baseline' | 'night_idle' | 'production_surge' | ... }`
  - `{ action: 'applyFix', fixId: 'f1' | 'f2' | 'f3' }`
  - `{ action: 'setFault', machineId: 'm3', fault: boolean }`
  - `{ action: 'setTariff', tariff: number }`
  - `{ action: 'requestState' }`
- **Inbound Telemetry** (`simulation.html` → `preview/index.html`):
  - Ingested by `ingestSimulationEngineTelemetry(payload)`.
  - Maps 8 simulation machines to 18 monitored fleet machines, with proportional scaling to preserve total plant demand and monthly energy totals.

### 6.3 Authentication & Session Security
- **Credentials Gate**:
  - `GFB-MGR-2026` / `PASSKEY-MGR-8899` (Factory Manager).
  - `GFB-OWN-2026` / `PASSKEY-OWN-9900` (Factory Owner).
- **Session State**:
  - `sessionStorage.getItem('gfb_authenticated') === 'true'`.
  - Non-authenticated requests are trapped at `#login`.

---

## 7. Feature Inventory

### 7.1 Backend Server Features
1. Native zero-dependency HTTP server (`server.js`).
2. Dual `.env` automatic parser (`.env` and `preview/.env`).
3. Stream-based static file pipeline with MIME mapping.
4. Clean URL redirection engine (`/dashboard`, `/simulation`, `/login`).
5. Real-time SHA256 checksum calculation for deployment ZIP packages.
6. Dynamic Developer / Delivery Portal card (`/portal`, `/info`).
7. Package build automation script (`scripts/rebuild_zip.js` via native `tar.exe`).
8. Cloudflare tunnel launcher for remote demo viewing (`scripts/start_tunnel.js`).

### 7.2 3D EPMS Digital Twin Features
1. Ultra-HD Three.js WebGL scene with PBR shading.
2. UnrealBloom post-processing glow pipeline.
3. 15 detailed factory asset assemblies (Breakers, Furnaces, Cleanroom, VI line, Stamping, Robotics, Marx Tower, Tanks, Silos, Cooling, BESS, Switchyard, Admin).
4. 30 articulated real-life NPCs with tools, vests, hard hats, and walking paths.
5. NPC Follow Camera and First-Person POV mode with WASD walk controls.
6. 4-channel live CCTV Picture-in-Picture (PiP) security monitor.
7. Shading modes: Wireframe, Solid, Thermal (Heatmap), X-Ray, PBR Rendered.
8. Real-time Single Line Diagram (SLD) interactive mode.
9. 3D GLB export capability via `THREE.GLTFExporter`.
10. Embedded 18-machine Three.js canvas in main SPA with raycaster picking.
11. 2D Isometric and SLD fail-safe fallback rendering when WebGL is absent.

### 7.3 Simulation & CarbonIQ Features
1. Deterministic Mulberry32 PRNG load engine.
2. 6 realistic factory operational scenarios.
3. Multi-speed clock multiplier (1x, 2x, 5x, 12x).
4. Real-time bi-directional telemetry synchronization via `BroadcastChannel`, `postMessage`, and `localStorage`.
5. Proportional load scaling across all 18 factory assets.
6. Verra VCS VM0008 & ISO 14064-2 verified Carbon Credit Wallet.
7. Dynamic cryptographic batch generation (`VCS-BD-2026-SIM-LIVE`).
8. Retirement certificates with SVG seals and serial numbering.
9. Interactive secondary market monetization simulation.
10. CSV ledger export.
11. Bilingual AI Copilot (English & Bangla) grounded in real-time simulation metrics.
12. 6-Agent Autonomous Industrial AI Operations Console.

---

## 8. Recommendations

1. **Route Aliasing Robustness**: In `preview/index.html` router (`renderActiveView()`), ensure `case 'simulation-control':` is explicitly grouped with `case 'simulation':` so that direct hash navigation to `#/simulation-control` renders the Simulation Control Center rather than falling through to `renderNotFoundView()`.
2. **HTTP Method Filtering**: In `server.js`, add explicit validation for `req.method === 'GET' || req.method === 'HEAD'`, returning `405 Method Not Allowed` for unsupported methods.
3. **CORS Headers**: For local development and multi-port setups (e.g. running simulation on port 3000 and server on port 4321), include standard permissive headers (`Access-Control-Allow-Origin: *`) on static assets.
4. **WebGL Context Guarding**: The current `disposeEpms3dScene()` implementation is clean; continue enforcing explicit canvas disposal to avoid exceeding maximum WebGL contexts on mobile browsers.
