# E2E Test Infra: Green Factory Brain AI

## Test Philosophy
- Opaque-box, requirement-driven. Zero dependency on internal implementation quirks.
- Grounded in official industrial standards: BPDB MT-3 tariff rules, DoE Bangladesh Grid Emission Factor v2025.2, IPCC stationary combustion, Verra VCS VM0008 carbon credit accounting, and ISO 14064-2 MRV principles.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing (Tiers 1–4).

## Test Architecture
- **Test Runners**:
  - `preview/tests/domain-calculations.test.mjs`: Pure math engine verification (Node.js ESM).
  - `preview/tests/e2e-routes-and-flows.test.mjs`: Route switching, bilingual prompt coverage, AI agent rules, digital twin fallbacks.
  - `scripts/verify_all_15_routes.js`: Automated verification of all 15 application routes.
  - `scripts/test_carbon_credit_integration.js`: Zero-emoji compliance and script syntax validation.
  - `scripts/test_simulation_carbon_scenarios.js`: Carbon credit scenario generation, minting, and wallet synchronization.
  - `scripts/test_30_ticks_strict_increase.js`: Monotonic accumulation verification.
- **Unified Test Command**:
  ```bash
  npm run test:all
  ```
  Runs all 5 mandatory suites and exits with code 0 on 100% pass.

## Coverage Across 4 Tiers
- **Tier 1 — Feature Coverage**: Covers all 15 UI routes, 18 factory machines, bilingual EN/BN prompts, 6 AI agents, and utility billing models.
- **Tier 2 — Boundary & Corner Cases**: Power factor clamping ($safePf \in [0.1, 1.0]$), zero division guards on payback, negative consumption protection, maximum demand surcharge limits.
- **Tier 3 — Cross-Feature Combinations**: Simulation scenario switching combined with carbon credit wallet minting, telemetry injection into 3D digital twin, and live bill recalculations.
- **Tier 4 — Real-World Application Scenarios**:
  1. Gazipur Grid Outage: Transition to 2,000 kVA diesel generator + 1.2 MWh BESS peak shaving.
  2. Night Shift Idle Waste: Automated detection and alert triggering for non-productive sewing line consumption.
  3. Production Surge: High-speed fabric processing with demand threshold warning.
  4. Energy Conservation Measure Intervention: Implementation of VFDs and LED retrofits with Verra VCS carbon credit yield.
  5. Bilingual Audit: Export of sustainability and CarbonIQ statements in both English and Bengali.

## Coordination Status
- Test Suite Baseline: 100% PASS (Verified in Survey Phase).
- Ready for test readiness sign-off after implementation milestones pass.
