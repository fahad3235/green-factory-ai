## 2026-11-07T01:35:36Z
You are the Implementation Worker for Milestone 2 (M2).
Your Identity: teamwork_worker
Your Working Directory: c:\AI HACATHON CLOUD CAMP PROJECT\.agents\teamwork\worker_m2\
Your Parent Orchestrator: 2d15a99d-556a-4cd0-a4bc-37272d603ad9

MANDATORY FIRST STEP:
Read the authoritative request file: c:\AI HACATHON CLOUD CAMP PROJECT\.agents\teamwork\ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

SCOPE & EXCLUSIVE WRITE OWNERSHIP:
You own edits to:
- preview/index.html
- preview/simulation.html
- preview/digital-twin.html

OBJECTIVE — MILESTONE 2 (M2): Visual Asset Hardening & AI Slop Elimination
Execute the following precise visual refactorings:

1. Hallmark Gate F9 (Fake Human Avatar Hotlink Elimination):
   - In `preview/index.html`, locate the Unsplash model image (`https://images.unsplash.com/photo-1534528741775-53994a69daeb...`) around line 50 and line 485.
   - Replace with an authentic industrial executive badge / monogram badge:
     Render a crisp SVG or styled container for Md. Fahad (`MF`), Level-4 Operations Manager, Rupsha Garments Ltd.
     Ensure the element with `id="sidebar-user-avatar"` or the corresponding container remains valid and styled cleanly.

2. Mascot Slop Refinement (Hallmark Gate 29):
   - CRITICAL TEST REQUIREMENT: `preview/tests/e2e-routes-and-flows.test.mjs` lines 76-78 assert:
     `assert.ok(html.includes('orb-sphere') && html.includes('orb-eye'), '3D animated glowing orb avatar with blinking eyes present');`
     `assert.ok(html.includes('mini-orb') && html.includes('status-dot'), 'Mini-orb avatar and 3 wave status dots present');`
   - Therefore, you MUST retain the DOM class names `orb-sphere`, `orb-eye`, `mini-orb`, and `status-dot` in `preview/index.html`.
   - Refactor the visual styling: instead of a cartoon mascot with bouncing goofy eye-blinking animations, style `orb-sphere` and `orb-eye` as an authentic precision industrial telemetry indicator (e.g. EPMS telemetry lens / pulse analyzer with clean industrial emerald/cyan telemetry ring).

3. Unicode Glyph Elimination (Hallmark Gates 30a, 63):
   - In `preview/index.html`, `preview/simulation.html`, and `preview/digital-twin.html`, replace unicode pseudo-icons (`→`, `←`, `▲`, `▼`, `●`, `›`, `▶`, `⬇`, `ℹ`) with clean, accessible inline SVGs from Lucide (`aria-hidden="true"`).
   - In navigation buttons and breadcrumbs, replace `→` and `›` with Lucide ChevronRight / ArrowRight SVGs.
   - In `digital-twin.html`, replace `⬇.GLB` with a clean download icon SVG + "Export GLB", `← Portal` with ArrowLeft SVG + "Portal", and status indicators `▲ HIGH`, `● MED`, `ℹ LOW` with accessible semantic badges.

4. SVG Accessibility (Hallmark Gate 33):
   - Ensure all decorative SVGs in `preview/simulation.html` and `preview/digital-twin.html` have `aria-hidden="true"`.

5. Card De-Nesting & Typography (Hallmark Gates 4, 54, 67):
   - In `preview/simulation.html` and `preview/digital-twin.html`, de-nest `.card` within `.card` into clean single-layer panels with subtle hairline borders (`border: 1px solid var(--line)`).
   - Eliminate awkward tracked-caps (`letter-spacing: .15em`) and eyebrow tags (`STEP 1 · SOURCE`, etc.).

6. VERIFICATION:
   Execute all 5 mandatory test suites via run_command:
   - `node preview/tests/domain-calculations.test.mjs`
   - `node preview/tests/e2e-routes-and-flows.test.mjs`
   - `node scripts/verify_all_15_routes.js`
   - `node scripts/test_carbon_credit_integration.js`
   - `node scripts/test_simulation_carbon_scenarios.js`
   Confirm 100% pass rate. Ensure zero regressions!

7. HANDOFF:
   Write c:\AI HACATHON CLOUD CAMP PROJECT\.agents\teamwork\worker_m2\handoff.md documenting all exact changes and test execution outputs.
   Send a message to recipient 2d15a99d-556a-4cd0-a4bc-37272d603ad9 when complete.

## 2026-11-07T01:46:24Z
[Message from Parent 2d15a99d-556a-4cd0-a4bc-37272d603ad9]
**Context**: Milestone 2 Implementation Tracking
**Content**: Checking in on status. How are the Milestone 2 refactorings progressing (avatar replacement, unicode glyphs to Lucide SVGs, telemetry visualizer styling, card de-nesting)?
**Action**: Please provide a brief status update on current task and estimated completion.
