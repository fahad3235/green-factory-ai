## 2026-11-07T01:22:49Z

You are the Implementation Worker for Milestone 1 (M1).
Your Identity: teamwork_worker
Your Working Directory: c:\AI HACATHON CLOUD CAMP PROJECT\.agents\teamwork\worker_m1\
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

OBJECTIVE — MILESTONE 1 (M1): Hallmark Design Tokens & CSS Architecture
Execute the following precise architectural refactorings:

1. `preview/index.html`:
   - Fix Hallmark Gate 10a: Locate line 2394 (`<line id="chart-crosshair" ... style="transition: all 0.15s ease;" />`). Replace with `style="transition: opacity 0.15s ease, stroke 0.15s ease;"`.
   - Fix Hallmark Gate 34: In the `<style>` block around lines 118–123, update the selector from `body { ... }` to `html, body { font-family: 'Inter', 'Hind Siliguri', system-ui, -apple-system, sans-serif; background-color: #F3F6F8; color: #0F172A; overflow-x: clip; }`.
   - Add standard Hallmark CSS stamp at the very beginning of the main `<style>` block (around line 78):
     `/* [HALLMARK-SYSTEM: ISA-101 / IEC-60073 INDUSTRIAL EPMS DESIGN SYSTEM - RUPSHA GARMENTS LTD., GAZIPUR] */`
   - Add `:focus-visible { outline: 2px solid #0284C7; outline-offset: 2px; }` and `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }`.

2. `preview/simulation.html`:
   - Fix Hallmark Gate 34: Ensure `html, body { overflow-x: clip; }`.
   - Fix Hallmark Gate 29: In `body` background (lines 98–100), eliminate the radial gradient aurora washes (`radial-gradient(1100px 480px at 85% -120px...`). Replace with clean authentic industrial surface styling: `background: #0B1120; color: #F1F5F9;`.
   - Fix Hallmark Gate 11: Remove `transform: translateY(-1px)` and hover button scale effects in `.btn:hover` and `.scen button:hover` (lines 188, 213).
   - Add standard Hallmark CSS stamp at the top of the `<style>` block:
     `/* [HALLMARK-SYSTEM: ISA-101 SIMULATION CONSOLE DESIGN TOKENS] */`
   - Add `:focus-visible { outline: 2px solid #0284C7; outline-offset: 2px; }` and `@media (prefers-reduced-motion: reduce)`.

3. `preview/digital-twin.html`:
   - Fix Viewport Accessibility: At line 5, replace `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />` with `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
   - Fix Hallmark Gate 34: Ensure `html, body { overflow-x: clip; }`.
   - Fix Hallmark Gate 48: Add an industrial `:root` design token block in `<style>`:
     ```css
     :root {
       --epms-bg: #070C16;
       --epms-panel: #0E1726;
       --epms-line: #1E293B;
       --epms-text-pri: #F8FAFC;
       --epms-text-sec: #94A3B8;
       --epms-status-ok: #10B981;
       --epms-status-warn: #F59E0B;
       --epms-status-alarm: #EF4444;
       --epms-accent: #0284C7;
     }
     ```
   - Add `:focus-visible { outline: 2px solid var(--epms-accent); outline-offset: 2px; }` and `@media (prefers-reduced-motion: reduce)`.
   - Add standard Hallmark CSS stamp at the top of `<style>`:
     `/* [HALLMARK-SYSTEM: IEC-60073 3D EPMS DIGITAL TWIN DESIGN SYSTEM] */`

4. VERIFICATION:
   Execute all 5 mandatory test suites via run_command:
   - `node preview/tests/domain-calculations.test.mjs`
   - `node preview/tests/e2e-routes-and-flows.test.mjs`
   - `node scripts/verify_all_15_routes.js`
   - `node scripts/test_carbon_credit_integration.js`
   - `node scripts/test_simulation_carbon_scenarios.js`
   Confirm 100% pass rate. Ensure zero regressions.

5. HANDOFF:
   Write c:\AI HACATHON CLOUD CAMP PROJECT\.agents\teamwork\worker_m1\handoff.md documenting all exact changes and test execution outputs.
   Send a message to recipient 2d15a99d-556a-4cd0-a4bc-37272d603ad9 when complete.
