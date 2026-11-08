# E2E Test Suite Ready: Green Factory Brain AI

## Test Runner
- **Command**: `npm run test:all`
- **Granular Commands**:
  - `node preview/tests/domain-calculations.test.mjs`
  - `node preview/tests/e2e-routes-and-flows.test.mjs`
  - `node scripts/verify_all_15_routes.js`
  - `node scripts/test_carbon_credit_integration.js`
  - `node scripts/test_simulation_carbon_scenarios.js`
  - `node scripts/test_30_ticks_strict_increase.js`
- **Expected**: All suites pass with exit code 0.

## Coverage Summary
| Tier | Count | Description |
|------|------:|-------------|
| 1. Feature Coverage | 45+ | All 15 routes, 18 machines, 6 simulation agents, bilingual prompts |
| 2. Boundary & Corner | 25+ | Clamped PF, zero/negative bounds, demand charge limits, edge tariffs |
| 3. Cross-Feature | 18+ | Simulation ↔ CarbonIQ ↔ 3D Digital Twin ↔ Billing |
| 4. Real-World Application | 5 | Grid outage, night idle waste, surge load, ECM retrofit, bilingual reporting |
| **Total** | **93+** | **100% Pass Rate Verified** |

## Feature Checklist
| Feature | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---------|:------:|:------:|:------:|:------:|
| Active & Apparent Power (kW, kVA, PF) | ✓ | ✓ | ✓ | ✓ |
| BPDB MT-3 Tariff Billing | ✓ | ✓ | ✓ | ✓ |
| GHG Scope 1 & Scope 2 Emissions | ✓ | ✓ | ✓ | ✓ |
| Verra VCS VM0008 Carbon Credits | ✓ | ✓ | ✓ | ✓ |
| 15 UI Navigation Routes | ✓ | ✓ | ✓ | ✓ |
| 18-Machine Fleet & Breaker CBX-305 | ✓ | ✓ | ✓ | ✓ |
| 3D Digital Twin & 2D Fallbacks | ✓ | ✓ | ✓ | ✓ |
| Bilingual AI Copilot (EN & BN) | ✓ | ✓ | ✓ | ✓ |
| 6 Autonomous Rule-Based Agents | ✓ | ✓ | ✓ | ✓ |
