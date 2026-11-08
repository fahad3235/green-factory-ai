# Comprehensive Domain Calculation, Mathematical Engine & Test Suite Survey Report
**Project**: Green Factory Brain AI (Industrial Energy, CarbonIQ & 3D EPMS Digital Twin Simulation for Rupsha Garments Ltd., Gazipur, Bangladesh)  
**Agent**: teamwork_explorer (`teamwork_explorer_survey_2`)  
**Date**: 2026-11-07  
**Status**: Complete  

---

## 1. Executive Summary

A comprehensive investigation was conducted across all test suites, domain calculation engines, mathematical formulas, and verification mechanisms of the **Green Factory Brain AI** platform.

### Core Survey Findings:
1. **100% Test Pass Rate Verified**: All 5 mandatory test suites pass with zero failures:
   - `node preview/tests/domain-calculations.test.mjs` (8/8 PASS)
   - `node preview/tests/e2e-routes-and-flows.test.mjs` (10/10 PASS)
   - `node scripts/verify_all_15_routes.js` (15/15 PASS)
   - `node scripts/test_carbon_credit_integration.js` (PASS — syntax and 0 emoji check)
   - `node scripts/test_simulation_carbon_scenarios.js` (7/7 PASS — 100% scenario & credit sync)
   - *Additional test*: `node scripts/test_30_ticks_strict_increase.js` (PASS — 30 ticks monotonic increase)
2. **Mathematical Soundness**: Core domain formulas (active power vs. energy integration, apparent power and power factor, BDT electricity tariffs, Scope 1 natural gas combustion, Scope 2 location-based grid emissions, payback periods with edge-case handling, and machine fleet aggregation) are mathematically consistent and robust against null, NaN, and negative inputs.
3. **Discrepancies Identified**:
   - **Grid Emission Factor Variations**: `0.560 kg CO₂e/kWh` is used in `preview/src/domain/calculations.mjs` and `preview/index.html` (DoE Bangladesh Grid Factor v2025.2), while `0.654 kg CO₂e/kWh` is hardcoded in `preview/simulation.html`. The national benchmark/IEA factor is cited as `~0.634 kg CO₂/kWh`.
   - **Scope 1 Partition in `simulation.html`**: `preview/simulation.html` uses `BASE.scope1 = 12.8` and `BASE.scope2 = 21.4` (sum = 34.2 tCO₂e), whereas `preview/index.html` and `calculations.mjs` calculate the physically grounded values `4.91 tCO₂e` Scope 1 (from 2,431 m³ natural gas) and `29.29 tCO₂e` Scope 2 (from 52,300 kWh @ 0.560).
   - **Fixed Charge in Bill**: `preview/index.html` calculates active consumption bill `52,300 × 12.40 = ৳ 6,48,520`, whereas `simulation.html` includes a ৳ 230 meter demand charge resulting in `৳ 6,48,750`.
   - **Scope of `test_carbon_credit_integration.js`**: The script checks emoji count and JS script syntax, not carbon credit calculation logic (which is tested in `test_simulation_carbon_scenarios.js`).
   - **File Mirroring**: The primary deployment target is `preview/index.html` (1.25 MB); the root `index.html` is an older snapshot. All test suites correctly target `preview/index.html`.

---

## 2. Mandatory Test Suite Execution & Evaluation

| # | Test Suite Command | Execution Status | Exit Code | Assertions / Modules Tested |
|---|---|---|---|---|
| 1 | `node preview/tests/domain-calculations.test.mjs` | **PASS (8/8)** | 0 | kW vs kWh separation, apparent power (kVA) & power factor (PF), tariff billing, Scope 1 & 2 conversions, comparable period savings, payback edge cases, fleet reconciliation, deterministic Mulberry32 PRNG. |
| 2 | `node preview/tests/e2e-routes-and-flows.test.mjs` | **PASS (10/10)** | 0 | 12 routes + agent console, simulation disclosures, 18 machines + BREAKER_CBX-305, bilingual Copilot prompts, 6 agents, 3D WebGL + 2D SLD fallbacks, 3D Orb UI, Phase 2 features, Phase 3 security/SVG brand icons, Carbon Credit System (Verra VCS VM0008, 0 emojis). |
| 3 | `node scripts/verify_all_15_routes.js` | **PASS (15/15)** | 0 | Headless VM rendering of all 15 routes (`dashboard`, `energy-analytics`, `factory-operations`, `bill-carbon-forecast`, `ai-recommendations`, `savings-tracker`, `carboniq-report`, `sustainability-reports`, `machine-monitoring`, `digital-twin`, `inventory-production`, `simulation`, `simulation-control`, `settings`, `agent-console`). |
| 4 | `node scripts/test_carbon_credit_integration.js` | **PASS** | 0 | Zero emoji verification in `preview/index.html` + syntax parsing of all 3 `<script>` blocks via Node `vm.Script`. (0 syntax errors, 0 emojis). |
| 5 | `node scripts/test_simulation_carbon_scenarios.js` | **PASS (7/7)** | 0 | Baseline abatement (4.72 tCO₂e, ৳ 12,178), energy intervention (+20.18 tCO₂e, ৳ 52,064), +5 tick stepping (+80.78 kWh avoided, +0.05 tCO₂e), credit minting (+39.33 tCO₂e minted), CarbonIQ report rendering, bilingual Copilot grounding, live wallet sync. |
| + | `node scripts/test_30_ticks_strict_increase.js` | **PASS** | 0 | Monotonic strict increase over 30 continuous simulation ticks (credits strictly $\ge$ previous tick, zero regression). |

### Verbatim Test Execution Outputs:
- **Suite 1**:
  ```text
  Running Green Factory Brain AI — Domain Calculation & Simulation Tests...
  ✓ PASS: kW vs kWh separation & validation
  ✓ PASS: Apparent Power (kVA) and Power Factor formula
  ✓ PASS: Tariff x kWh expected cost calculation
  ✓ PASS: Scope 1 & Scope 2 emissions factor & unit conversion
  ✓ PASS: Comparable period savings reconciliation
  ✓ PASS: Payback zero/missing/negative edge cases
  ✓ PASS: Machine fleet aggregates reconcile to exact totals
  ✓ PASS: Deterministic seed replay consistency
  ALL 8 DOMAIN CALCULATION TEST SUITES PASSED (8/8).
  ```
- **Suite 2**:
  ```text
  Running Green Factory Brain AI — Route, Flow & UI Integrity Verification Suite...
  ✓ PASS: All 12 required navigation views + AI Agent Console route & switch cases verified
  ✓ PASS: Truthful simulation labels and safety disclosures verified
  ✓ PASS: All 18 fleet machines + BREAKER_CBX-305 EPMS asset verified
  ✓ PASS: Bilingual English/Bangla AI Copilot & all 8 required suggested prompts verified
  ✓ PASS: All 6 Rule-Based Simulation Agents verified
  ✓ PASS: 3D WebGL Digital Twin + 2D Isometric & SLD fallbacks verified
  ✓ PASS: 3D Animated Orb AI Copilot & Live Agent UI verified
  ✓ PASS: Phase 2 Full-Website Enhancements verified
  ✓ PASS: Hardened Security Gate (Manager/Owner Only), No ZIP Download UI, Profile Photo Upload, Sign Out & Best SVG Icon verified
  ✓ PASS: Carbon Credit System & Real-Time Simulation Synchronization verified
  ALL 10 E2E ROUTE & FLOW VERIFICATION SUITES PASSED (10/10).
  ```
- **Suite 3**:
  ```text
  ✓ PASS: dashboard
  ✓ PASS: energy-analytics
  ✓ PASS: factory-operations
  ✓ PASS: bill-carbon-forecast
  ✓ PASS: ai-recommendations
  ✓ PASS: savings-tracker
  ✓ PASS: carboniq-report
  ✓ PASS: sustainability-reports
  ✓ PASS: machine-monitoring
  ✓ PASS: digital-twin
  ✓ PASS: inventory-production
  ✓ PASS: simulation
  ✓ PASS: simulation-control
  ✓ PASS: settings
  ✓ PASS: agent-console
  Result: 15/15 routes passed!
  ```
- **Suite 4**:
  ```text
  Emoji count in preview/index.html: 0
  Script block #1: Syntax OK (731 chars)
  Script block #2: Syntax OK (1400 chars)
  Script block #3: Syntax OK (909534 chars)
  ✓ All script blocks passed syntax check with 0 errors!
  ```
- **Suite 5**:
  ```text
  Testing Simulation Carbon Credit System...
  1. Baseline Simulation Abatement: 4.72 tCO2e | Credits: 4.72 | Revenue: ৳12178
  2. Applying Energy Efficiency Intervention Scenario...
  Intervention Simulation Abatement: 20.18 tCO2e | Credits: 20.18 | Revenue: ৳52064
  3. Stepping Simulation Forward (+5 ticks)...
  After 5 ticks (Tick #5): Avoided kWh: 80.78 Avoided CO2: 0.05 tCO2e
  4. Minting Simulated Carbon Credits...
  New Available: 84.33 New Total Minted: 123.43 New Ledger Batches: 6
  5. Rendering CarbonIQ Report View...
  6. Testing AI Copilot Grounded Responses...
  AI Copilot EN reply snippet: <strong>Voluntary Carbon Credit System &amp; MRV Registry [VERRA VCS VM0008]:</strong>...
  AI Copilot BN reply snippet: <strong>সিমুলেশন ইন্টারভেনশন ফলাফল [SIMULATION]:</strong>...
  7. Testing Wallet Cards Live Simulation Sync...
     ✓ Card 1 live available credits: 104.56 tCO₂e (Base: 84.33 + Sim: 20.23)
     ✓ Card 3 live total minted: 143.66 tCO₂e
     ✓ Cryptographic ledger contains VCS-BD-2026-SIM-LIVE live simulation batch
  ========================================================
  ✓ ALL SIMULATION CARBON CREDIT SCENARIO TESTS PASSED 100%
  ========================================================
  ```

---

## 3. Mathematical & Domain Calculation Audit

### A. Energy & Power Calculations
1. **Power vs. Energy Separation**:
   - **Active Power ($P$ in kW)**: Instantaneous rate of energy consumption.
   - **Energy ($E$ in kWh)**: Time-integral of active power:
     $$E = \int P(t)\,dt \approx P_{\text{avg}} \times \Delta t_{\text{hours}}$$
   - **Implementation**:
     - `calculations.mjs`: `calculateEnergyKwh(powerKw, hours)` enforces `typeof === 'number'`, rejects `NaN` and negative inputs via `RangeError`.
     - `preview/index.html`: `calcEnergyKwh(powerKw, hours)` uses `Math.max(0, Number(powerKw) || 0) * Math.max(0, Number(hours) || 0)`.
   - **Verification**: `calculateEnergyKwh(18.5, 10) === 185.0 kWh`.

2. **Apparent Power ($S$ in kVA) & Power Factor ($PF$)**:
   - **Formula**:
     $$S = \frac{P}{PF} \quad (kVA = kW / PF)$$
   - **Feeder Parameters (`BREAKER_CBX-305`)**:
     $$P = 1,910 \text{ kW}, \quad PF = 0.92$$
     $$S = \frac{1,910}{0.92} = 2,076.0869565 \text{ kVA} \approx 2,076 \text{ kVA}$$
   - **Defensive Safeguard**: `safePf = Math.min(1, Math.max(0.1, Number(pf) || 0.92))` prevents division by zero or negative power factors.

3. **Tariff Schedules & Energy Cost**:
   - **Tariff Structure**: BPDB MT-3 Industrial Medium Voltage Schedule (v2026.1):
     - Flat Blended Tariff: $\text{BDT } 12.40 / \text{kWh}$
     - Peak Tariff (17:00–23:00): $\text{BDT } 14.88 / \text{kWh}$ ($+20\%$)
     - Off-Peak Tariff (23:00–17:00): $\text{BDT } 11.16 / \text{kWh}$ ($-10\%$)
   - **Baseline Cost**:
     $$\text{Cost} = 52,300 \text{ kWh} \times 12.40 \text{ BDT/kWh} = \text{BDT } 648,520$$

4. **Machine Fleet Aggregation & Availability**:
   - 18 Fleet Units across 4 departments:
     - Sewing: `MCH-SEW-01` to `08` ($23,500 \text{ kWh}$)
     - Cutting: `MCH-CUT-01` to `03` ($12,190 \text{ kWh}$)
     - Finishing: `MCH-FIN-01` to `04` ($9,900 \text{ kWh}$)
     - Utilities & Aux: `COMP-01` ($2,950 \text{ kWh}$), `BOIL-01` ($1,620 \text{ kWh}$), `LGT-ZN-01` ($1,300 \text{ kWh}$)
     - **Exact Sum**: $23,500 + 12,190 + 9,900 + 2,950 + 1,620 + 1,300 = 52,300 \text{ kWh}$
   - **Availability Ratio**:
     $$\text{Availability } \% = \frac{\text{Running} + \text{Idle}}{\text{Total Units}} \times 100\% = \frac{14 + 2}{18} \times 100\% = 88.89\%$$

---

### B. CarbonIQ GHG Accounting (Corporate Standard)
1. **Scope 1 (Direct Stationary Combustion)**:
   - Source: Natural Gas fired in Boiler `BOIL-01`.
   - Emission Factor: $2.020 \text{ kg CO}_2\text{e} / \text{m}^3$ (IPCC 2006 / GHG Protocol Stationary Combustion v2025).
   - Monthly Consumption: $2,430.693 \text{ m}^3$ (displayed as $2,431 \text{ m}^3$).
   - Calculation:
     $$\text{Scope 1} = \frac{2,430.693 \text{ m}^3 \times 2.020 \text{ kg/m}^3}{1,000} = 4.910 \text{ tCO}_2\text{e}$$

2. **Scope 2 (Purchased Grid Electricity)**:
   - Source: Grid electricity purchased from BPDB.
   - Emission Factor: $0.560 \text{ kg CO}_2\text{e} / \text{kWh}$ ($0.00056 \text{ tCO}_2\text{e/kWh}$, DoE Bangladesh Grid Factor v2025.2 Location-Based).
   - Monthly Consumption: $52,300 \text{ kWh}$.
   - Calculation:
     $$\text{Scope 2} = \frac{52,300 \text{ kWh} \times 0.560 \text{ kg/kWh}}{1,000} = 29.288 \text{ tCO}_2\text{e}$$

3. **Total Monthly Emissions**:
   $$\text{Total GHG} = 4.910 \text{ (Scope 1)} + 29.288 \text{ (Scope 2)} = 34.198 \text{ tCO}_2\text{e} \approx 34.20 \text{ tCO}_2\text{e}$$

4. **Scope 3 Exclusions & Brand Offsetting**:
   - Scope 3 operational exclusions are explicitly disclosed (cotton farming, wet chemical processing, international ocean logistics, staff commuting).
   - Scope 3 decarbonization value is modeled through brand credit retirement for export apparel buyers (H&M, Zara, Marks & Spencer).

5. **Garment Energy & Carbon Intensity**:
   - Formula:
     $$\text{Energy Intensity} = \frac{\text{Line Energy (kWh)}}{\text{Actual Output (pcs)}} \quad (\text{kWh/garment})$$
   - Line Values:
     - `LN-SEW-A`: $13,230 \text{ kWh} / 6,960 \text{ pcs} = 1.90 \text{ kWh/pc}$
     - `LN-SEW-B`: $11,110 \text{ kWh} / 6,040 \text{ pcs} = 1.84 \text{ kWh/pc}$
     - `LN-CUT-1`: $12,190 \text{ kWh} / 12,450 \text{ pcs} = 0.98 \text{ kWh/pc}$
     - `LN-FIN-1`: $9,900 \text{ kWh} / 12,450 \text{ pcs} = 0.80 \text{ kWh/pc}$
   - Edge case guard: `actualPcs > 0 ? kwh / actualPcs : 0`.

---

### C. Carbon Credit Trading & Financial Valuation Logic
1. **Methodology Standard**:
   - Verra VCS Methodology VM0008 & ISO 14064-2 verified.
   - Registry ID: `VCS-REG-BD-8902`.

2. **Valuation Math**:
   - Spot Price: $\$21.50 \text{ USD} / \text{tCO}_2\text{e}$
   - FX Rate: $120.0 \text{ BDT/USD}$
   - Price in BDT: $\$21.50 \times 120.0 = \text{BDT } 2,580 / \text{tCO}_2\text{e}$
   - Base Available Balance: $64.10 \text{ tCO}_2\text{e}$
     - USD Valuation: $64.10 \times 21.50 = \$1,378.15 \text{ USD}$
     - BDT Valuation: $\$1,378.15 \times 120.0 = \text{BDT } 165,378$
   - Cumulative Realized Earnings:
     - Retired: $39.10 \text{ tCO}_2\text{e}$ across 3 batches (`048291`, `048292`, `048293`)
     - Realized BDT: $\text{BDT } 469,200$

3. **Simulation Carbon Yield & Monotonic Growth**:
   - Total Abatement:
     $$\text{Sim Abatement} = \text{ScenarioBase} + \text{LiveAvoided} + \text{AppliedRecs}$$
   - Monotonic guarantee: Every tick adds $\approx 16.15 \text{ kWh}$ ($+0.01 \text{ tCO}_2\text{e}$). Credits strictly increase ($\Delta \ge 0$), proven across 30 ticks.

4. **Payback Period Logic**:
   - Formula:
     $$\text{Payback (months)} = \frac{\text{CapEx Cost (BDT)}}{\text{Monthly Savings (BDT)}}$$
   - Edge Cases Tested & Handled:
     - Null/undefined cost $\to$ `{ status: 'MISSING_COST', formatted: 'Not provided' }`
     - Negative cost $\to$ `{ status: 'INVALID_COST', formatted: 'Invalid cost' }`
     - Zero or negative savings $\to$ `{ status: 'NON_POSITIVE_SAVINGS', formatted: 'Insufficient data' }`
     - Zero cost $\to$ `{ status: 'VALID', formatted: 'Immediate (0.0 months)' }`
     - Positive values $\to$ `{ status: 'VALID', formatted: '2.1 months' }`

---

### D. Simulation Scenario Math
1. **Scenarios**:
   - `baseline`: $52,300 \text{ kWh}$, $34.20 \text{ tCO}_2\text{e}$, $4.72 \text{ tCO}_2\text{e}$ abatement.
   - `energy_intervention`: Consumption scaled by $0.882$ ($-11.8\%$), idle power clamped to $0.4 \text{ kW}$, `MCH-CUT-02` fixed ($18.2 \text{ kW}$, $51^\circ\text{C}$), first 3 recommendations applied, abatement increases to $20.18 \text{ tCO}_2\text{e}$.
   - `production_surge`: Running units $kW \times 1.22$, $kWh \times 1.14$, output pcs $\times 1.22$, abatement drops to $2.80 \text{ tCO}_2\text{e}$.
   - `night_idle`: Sewing units idle at $5.4 \text{ kW}$, waste cost increases, abatement drops to $1.85 \text{ tCO}_2\text{e}$.
   - `compressor_leak`: `COMP-01` draw $31.2 \text{ kW}$, $+1,850 \text{ kWh}$, temp $74.5^\circ\text{C}$.
   - `machine_overload`: `MCH-CUT-02` draw $28.4 \text{ kW}$, $+1,200 \text{ kWh}$, temp $78.2^\circ\text{C}$.
   - `shift_change`: Alternating idle transitions.
   - `tariff_change`: Peak tariff $14.88 \text{ BDT/kWh}$ applied.
   - `maintenance_downtime`: Finishing hall shut down ($0 \text{ kW}$).

2. **Microgrid & Peak Shaving Dispatch (`digital-twin.html`)**:
   - Grid Transformer: `TR-01` ($2,500 \text{ kVA}$)
   - Diesel Backup Generator: `GEN-01` ($2,000 \text{ kVA}$)
   - Battery Energy Storage System (BESS): `BESS-01` ($1.2 \text{ MWh}$, $185 \text{ kW}$, $265 \text{ A}$)
   - Automatic Transfer Switch (ATS): Toggles seamlessly between 110 kV grid and GEN-01+BESS-01 microgrid.
   - APFC Bank: Capacitor bank stage 3 lifts $PF$ from $0.92$ to $0.96$, reducing apparent demand by $-58 \text{ kVA}$.

---

## 4. Discrepancies, Numerical Inaccuracies, and Edge Cases

### Discrepancy Matrix

| Item | Component A | Component B | Analysis & Recommended Action |
|---|---|---|---|
| **Grid Emission Factor** | `calculations.mjs` & `index.html`: `0.560 kg CO₂e/kWh` (DoE v2025.2) | `simulation.html`: `0.654 kg CO₂e/kWh`; Prompt note: `~0.634 kg CO₂/kWh` | Keep `0.560` as the official location-based factory standard; clarify that `0.654` in `simulation.html` and `0.634` represent historical/alternative national grid averages. |
| **Scope 1 Partition** | `index.html`: `4.91 tCO₂e` (Boiler Gas) + `29.29 tCO₂e` (Grid) = `34.20 t` | `simulation.html`: `BASE.scope1 = 12.8`, `BASE.scope2 = 21.4` = `34.20 t` | Total matches (34.2 tCO₂e), but `simulation.html` uses an arbitrary split. Harmonize `simulation.html` to reflect the 4.91 / 29.29 split. |
| **Fixed Demand Charge in Bill** | `index.html`: `৳ 6,48,520` ($52,300 \times 12.40$) | `simulation.html`: `৳ 6,48,750` ($648,520 + 230$ fixed charge) | Document the ৳ 230 demand charge difference; both are accurate under their respective formulas. |
| **Test 4 Scope Misnomer** | Script named `test_carbon_credit_integration.js` | Content validates emoji count and `<script>` syntax | Rename or document that Test 4 is a syntax and emoji integrity guard, while Test 5 (`test_simulation_carbon_scenarios.js`) tests carbon credit integration. |
| **Root vs `preview/` HTML** | `preview/index.html` (1.257 MB, updated 07-Nov) | Root `index.html` (1.253 MB, older snapshot) | All tests and server routing correctly target `preview/index.html`. Maintain `preview/` as the single canonical source. |

---

## 5. Feature Inventory: Calculation Engines & Test Suites

### Calculation Engines Inventory
1. **Active Energy & Demand Engine**:
   - Instantaneous kW tracking
   - Numerical integration to kWh
   - Machine-level and departmental aggregation
   - Substation peak demand tracking ($1,910 \text{ kW} / 2,076 \text{ kVA}$)
2. **Electrical Power Quality Engine**:
   - Power factor calculation ($0 < PF \le 1.0$)
   - Apparent power ($kVA$) determination
   - APFC capacitor bank step switching compensation
3. **Utility Billing & Tariff Optimization Engine**:
   - BPDB MT-3 industrial tariff rates (flat, peak, off-peak)
   - Baseline monthly bill calculation
   - Dynamic scenario-adjusted bills
   - Demand charge and fixed fee handling
4. **GHG Protocol CarbonIQ Accounting Engine**:
   - Scope 1 stationary fuel combustion (natural gas boiler)
   - Scope 2 location-based grid electricity emissions
   - Scope 3 value chain exclusions and export brand retirement
   - Garment production energy and carbon intensity ($kWh/pc$)
   - 4-component transparent Sustainability Score ($0–100$)
5. **Verra VCS VM0008 Carbon Credit Registry Engine**:
   - IoT MRV credit generation from verified avoided energy
   - VCM spot price valuation ($\$21.50 / \text{tCO}_2\text{e}$)
   - USD to BDT currency conversion ($120.0 \text{ BDT/USD}$)
   - Real-time simulation yield synchronization and monotonic growth
   - Cryptographic serial batch ledger (SHA-256)
   - Export brand retirement certificates (H&M, Zara, M&S)
   - CSV export functionality
6. **EPMS Digital Twin & Microgrid Physics Engine**:
   - 3D WebGL Three.js factory digital twin
   - 2D isometric and Single-Line Diagram (SLD) fallbacks
   - 18 fleet machines + `BREAKER_CBX-305` switchgear telemetry
   - Standby diesel generator (`GEN-01`, $2,000 \text{ kVA}$) and BESS (`BESS-01`, $1.2 \text{ MWh}$)
   - ATS automatic transfer switch simulation
   - 30 multi-joint NPC worker models and thermal heatmaps
7. **Rule-Based Simulation Agents & Bilingual Copilot Engine**:
   - 6 rule-based agents (`AGT-ENERGY`, `AGT-FORECAST`, `AGT-CARBON`, `AGT-RECOMMEND`, `AGT-SAVINGS`, `AGT-REPORT`)
   - Bilingual English / Bengali grounded AI Copilot with 3D animated orb UI
   - Human approval gate for CapEx recommendations

---

## 6. Recommendations for Hardening and 100% Test Pass Maintenance

1. **Maintain Deterministic Test Seeds**:
   - The Mulberry32 PRNG seed (`20261018`) must remain stable across test executions to ensure reproducible assertions.
2. **Harmonize Grid Emission Factor References**:
   - Add explicit inline documentation across `preview/index.html`, `preview/simulation.html`, and `calculations.mjs` clarifying the standard factor:
     - `0.560 kg CO₂e/kWh`: DoE Bangladesh 2025.2 (Scope 2 factory baseline)
     - `0.634 kg CO₂e/kWh`: National historical grid factor / CDM benchmark
     - `0.654 kg CO₂e/kWh`: Legacy simulation test harness factor
3. **Preserve Zero-Emoji Policy**:
   - All navigation items, badges, alerts, and cards must strictly use inline SVGs (`AppIcons`). Never introduce unicode emojis into `preview/index.html`.
4. **Synchronize Root Files on Release**:
   - Maintain `preview/` as the single authoritative development directory, and update build scripts (`scripts/rebuild_zip.js`) to mirror changes to root if needed.
5. **Add Continuous Regression Script (`npm run test:all`)**:
   - Run the unified suite `npm run test:all` (covering domain, e2e, carbon scenarios, 30-tick monotonicity, and 15 routes) before every commit.
