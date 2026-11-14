# Green Factory Brain AI

**Industrial energy intelligence for garment factories: a deterministic energy simulation, a carbon-credit forecaster, and an AI copilot — with a human approval gate on every automated action.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10b981.svg?style=flat-square)](https://fahad3235.github.io/green-factory-ai/)
[![CI](https://github.com/fahad3235/green-factory-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/fahad3235/green-factory-ai/actions/workflows/ci.yml)
[![Python](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python%203.12-009688.svg?style=flat-square)](src/api/main.py)
[![Node](https://img.shields.io/badge/Frontend-Node%2018%2B%20%2B%20TypeScript-339933.svg?style=flat-square)](package.json)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

> **Demo data notice.** Green Factory Brain AI runs on a **simulated factory**. Rupsha Garments Ltd. is a fictional pilot facility, all meters and telemetry are deterministic simulation values, and no physical equipment is ever controlled. Nothing here is a certification, an audit, or a verified carbon-credit claim. See [Demo data & honesty](#demo-data--honesty).

---

## The problem

Bangladesh's ready-made garment (RMG) sector runs on thin margins and rising energy costs. Most factories cannot see, hour by hour, where their electricity goes — idle machines running overnight, compressed-air leaks, and peak-tariff exposure quietly add up to a large share of the monthly bill. At the same time, international buyers increasingly ask for auditable Scope 1 + Scope 2 emission reporting, and factory owners need a clear financial case before approving any change.

Energy waste is invisible, so it never gets fixed.

## The solution

Green Factory Brain AI makes energy waste visible and actionable:

1. **See it** — a live dashboard and 3D digital twin of the factory floor, with 18 simulated machines, sub-meter telemetry, and ISO 10816-3 vibration views.
2. **Understand it** — a deterministic calculation engine converts kWh into bills and CO₂e with published formulas, so every number can be checked by hand.
3. **Fix it** — autonomous agents detect waste scenarios (night-shift idle load, peak tariffs, compressor leaks), compute savings and payback, and propose a fix.
4. **Approve it** — nothing is applied without a human. Every proposed mitigation goes through a **Manager Confirmation Gate** before the simulation state changes.
5. **Prove it** — CarbonIQ reports, a savings tracker, and a carbon-credit forecaster turn the fix into money, tonnes, and payback months.

---

## Try the live demo

| View | Link |
| :--- | :--- |
| **Main app** (15 views) | [fahad3235.github.io/green-factory-ai](https://fahad3235.github.io/green-factory-ai/) |
| **3D digital twin** (standalone) | [fahad3235.github.io/green-factory-ai/digital-twin.html](https://fahad3235.github.io/green-factory-ai/digital-twin.html) |
| **Telemetry simulator** (standalone) | [fahad3235.github.io/green-factory-ai/simulation.html](https://fahad3235.github.io/green-factory-ai/simulation.html) |

### Demo logins

Use the 1-click **Enter as Manager / Enter as Owner** buttons, or sign in manually:

| Role | Username | Password | Access code |
| :--- | :--- | :--- | :--- |
| Factory Operations Manager | `manager_demo` | `GFB-MGR-2026` (or `demo123`) | `DEMO-MGR-2026` |
| Factory Owner | `owner_demo` | `GFB-OWN-2026` (or `demo123`) | `DEMO-OWN-2026` |

These are public demo credentials for a simulation sandbox. They unlock nothing real.

### 60-second walkthrough

1. **Enter as Manager.** The dashboard shows the factory's live business impact: monthly savings, annual savings, potential carbon-credit revenue, and payback months.
2. **Trigger a scenario.** On the Business Impact card, click **Peak Grid Tariffs** or **Night Shift Waste**. Watch the alert appear, the ROI breakdown compute, and the **Manager Confirmation Gate** open.
3. **Approve or reject.** Only your decision changes the simulated plant state.
4. **Open the forecaster.** Go to **CarbonIQ Report** (`#/carboniq-report`) for the 12-month projection, CapEx payback, carbon goal tracker, and the carbon-tax what-if simulator.
5. **Press `P`** anywhere for the 5-slide interactive pitch deck. The 6-slide PDF version is in [`docs/pitch-deck.pdf`](docs/pitch-deck.pdf).

---

## How it works

```
  ┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
  │  SEEDED SIMULATOR   │     │  CALCULATION ENGINE  │     │  AGENTS & COPILOT   │
  │  Seed #20261018     │────▶│  One formula set,    │────▶│  6 rule-based agents│
  │  18 machines, 8     │     │  three implementations│    │  + LLM copilot      │
  │  sub-meters, solar  │     │  Python = TS = JS    │     │  (optional, keyed)  │
  └─────────────────────┘     └──────────────────────┘     └──────────┬──────────┘
         │                                                            │
         │ telemetry ticks                                            │ proposed fix
         ▼                                                            ▼
  ┌─────────────────────┐                              ┌──────────────────────────┐
  │  3 VIEWS, 1 STATE   │                              │  MANAGER CONFIRMATION    │
  │  Dashboard SPA ·    │◀──── human decision ────────│  GATE (human-in-the-loop)│
  │  3D twin · Simulator│                              └──────────────────────────┘
  └─────────────────────┘
```

### 1. A seeded, replayable factory

The simulator generates telemetry from a fixed seed (`20261018`), so every run reproduces the same factory day. 18 machines (cutting, sewing, finishing, utilities, lighting) and 8 virtual sub-meters produce kW load, runtime, temperature, and health signals. Six scenario modes — normal baseline, rooftop solar surge, night-shift waste, peak grid tariffs, compressor leak, and more — change the load curves deterministically.

### 2. One calculation engine, three implementations

Every energy, cost, and emission figure comes from a single formula set implemented three times with verified parity:

- **Python** — [`src/core/calculations.py`](src/core/calculations.py) (backend)
- **TypeScript** — [`preview/src/domain/calculations.ts`](preview/src/domain/calculations.ts) (typed source)
- **JavaScript** — [`preview/src/domain/calculations.mjs`](preview/src/domain/calculations.mjs) (browser)

A parity test suite (26 checks, 0 differences) guarantees all three agree. If the Python backend and the browser ever disagreed, CI would fail.

### 3. Agents detect, the copilot explains

Six rule-based agents watch the telemetry (energy, savings, forecast, carbon, machine health, compliance). When a waste scenario triggers, the agent pipeline raises an alert, computes monthly savings, CapEx payback, and 12-month ROI, and drafts a mitigation.

The **AI copilot** explains all of this in plain English or Bangla, grounded in the live telemetry JSON — machine IDs, active tariff, Scope 1 + 2 carbon, and business impact. Its answers follow a fixed structure: reasoning trace → recommendation with ROI → safety guardrail.

**Honest note on the AI:** the live LLM (Groq Llama-3.3-70B primary, Gemini 2.5 Flash fallback) runs only when the FastAPI backend is deployed with an API key. The static GitHub Pages demo has no keys, so it uses a deterministic telemetry-grounded responder instead — same structure, same live numbers, no model calls, no hallucinated sensor values.

### 4. A human always decides

No mitigation applies itself. The Manager Confirmation Gate shows the alert, the computed savings, the cost, and the safety guardrail, and waits for a manager's explicit approval. The simulation's safety notice is absolute: physical PLC/breaker writes are disabled by design.

---

## Features

| Area | What it does |
| :--- | :--- |
| **Live dashboard** | Business Impact card (monthly → annual savings, potential credit revenue, payback), 15 app views, bilingual English/Bangla UI |
| **3D digital twin** | Three.js factory floor with live machine states, plus 2D isometric and single-line-diagram fallbacks |
| **Machine monitoring** | Per-machine telemetry, ISO 10816-3 vibration severity zones, animated FFT spectrogram, health scores |
| **Autonomous workflows** | Night-shift waste, peak grid tariffs, and compressor-leak scenarios with alerts, ROI math, and the confirmation gate |
| **CarbonIQ reporting** | Scope 1 + Scope 2 inventory, GHG reports, BERC Form S-12 style audit sheet, buyer compliance risk score |
| **Credit forecaster** | $10 / $18 / $30 per-tonne scenarios plus a custom $1–$150 price slider, 12-month trajectory, CapEx payback, carbon goal tracker, carbon-tax what-if simulator |
| **AI copilot** | Bilingual copilot with 8 suggested prompts, grounded in live telemetry; live LLM via backend, deterministic fallback on static hosting |
| **Savings tracker** | Fix-by-fix tracking of realised savings against the baseline |
| **Pitch mode** | Press `P` for the 5-slide interactive deck |

---

## The demo factory & the math

All figures below are **demo values** for the fictional Rupsha Garments Ltd. pilot (Gazipur, Bangladesh). Every one of them can be recomputed from the formulas shown.

### Baseline month (October 2026)

| Figure | Value | How it is computed |
| :--- | :--- | :--- |
| Electricity use | **52,300 kWh** | Simulated meter total |
| Electricity bill | **৳648,520** | 52,300 × ৳12.40/kWh |
| Scope 2 emissions (grid) | **29.29 tCO₂e** | 52,300 × 0.560 kg/kWh = 29,288 kg |
| Scope 1 emissions (gas boiler) | **4.91 tCO₂e** | Natural gas × 2.020 kg/m³ |
| **Total emissions** | **34.2 tCO₂e/mo** (410.4 t/yr) | 29.29 + 4.91 |

### Conversion factors (as configured in the demo)

| Parameter | Value | Label in the app |
| :--- | :--- | :--- |
| Standard tariff | 12.40 BDT/kWh | BPDB Industrial MT-3, Demo Schedule v2026.1 |
| Peak tariff | 14.88 BDT/kWh | Standard × 1.2, peak window |
| Grid emission factor | 0.560 kg CO₂e/kWh | Bangladesh DoE grid factor, as configured |
| Natural gas factor | 2.020 kg CO₂e/m³ | Boiler combustion |
| Benchmark check | 286 MWh × 0.560 = **160.2 tCO₂e** | Sidebar carbon figure, covered by tests |

These are **demo-configured values**, not current official schedules. Real BERC tariffs are published as ranges and change over time; a production deployment must load the current schedule and the current grid factor instead of these constants.

### Carbon credits & CBAM — read this before quoting numbers

- **Carbon-credit revenue is illustrative potential revenue** (`সম্ভাব্য আয়`), not a market quote. Real credit income requires MRV (measurement, reporting, verification), an approved baseline, and registration under a standard such as Verra VCS or Gold Standard. The app labels it as potential revenue in English and Bangla.
- **The CBAM simulator is a what-if tool.** The EU Carbon Border Adjustment Mechanism does not currently apply to finished garments. The slider models hypothetical future exposure so factory owners can see what a carbon border cost *would* mean — it is not a current tax, and this project makes no claim that it is.
- **No certification is claimed.** References to ISO 10816-3, Higg FEM, BERC Form S-12, Verra, and Gold Standard describe report formats and frameworks the demo models. The demo is not certified, audited, or endorsed by any of them.

---

## Architecture

![Green Factory Brain AI system architecture](docs/architecture.png)

| Layer | Technology |
| :--- | :--- |
| Frontend | Single-page app (hash routing, 15 views), Three.js 3D twin, Chart.js projections, Tailwind-style utility classes |
| Domain engine | TypeScript + JavaScript modules, parity-tested against Python |
| Backend | FastAPI + Pydantic v2, Uvicorn, httpx for LLM provider calls |
| AI | Groq `llama-3.3-70b-versatile` (primary), Google `gemini-2.5-flash` (fallback), deterministic fallback responder |
| Simulation | Seeded PRNG (`20261018`), 30-tick progression, 6 scenario modes |
| Deployment | Docker + Docker Compose, GitHub Pages (static frontend), GitHub Actions CI |
| Contract | OpenAPI 3.1 schema in [`docs/api-schema.json`](docs/api-schema.json) |

---

## Repository structure

```text
green-factory-ai/
├── .github/workflows/ci.yml            # CI: Node 18/20/22 + Python 3.12
├── .env.example                        # Safe environment template (no real keys)
├── Dockerfile / docker-compose.yml     # Containerised FastAPI + static UI
├── requirements.txt / package.json     # Python and Node dependencies
├── server.js                           # Zero-dependency static preview server
├── index.html                          # GitHub Pages SPA entrypoint (synced copy)
├── digital-twin.html                   # Standalone 3D twin (synced copy)
├── simulation.html                     # Standalone simulator (synced copy)
├── docs/
│   ├── architecture.png                # System architecture diagram
│   ├── pitch-deck.pdf                  # 6-slide judge walkthrough deck
│   └── api-schema.json                 # FastAPI OpenAPI 3.1 specification
├── src/
│   ├── core/                           # Settings loader + Python math engine
│   ├── models/schemas.py               # Pydantic v2 API models
│   ├── agents/copilot_agent.py         # LLM copilot + autonomous workflow agent
│   ├── api/{routes.py,main.py}         # FastAPI endpoints + static UI mounting
│   └── frontend/                       # Synced SPA, twin, simulator, domain modules
├── preview/                            # SOURCE of truth for frontend files
│   ├── index.html / digital-twin.html / simulation.html
│   ├── src/domain/calculations.{mjs,ts}
│   └── tests/                          # Domain + E2E verification suites
├── tests/test_pipeline.py              # FastAPI + calculation pytest suite
├── scripts/                            # Carbon parity, tick, route + TS parity checks
└── SUBMISSION_DOSSIER.md               # Hackathon submission dossier
```

> **Editing the frontend?** Edit files under `preview/` (and `preview/src/domain/`), then run `npm run sync`. The root and `src/frontend/` copies are byte-identical synced outputs — never edit them directly.

---

## Quick start

### Option 1 — Docker (recommended, full stack)

```bash
cp .env.example .env
# Optional: add GROQ_API_KEY or GEMINI_API_KEY for the live LLM copilot.
# Without keys, the copilot uses the deterministic telemetry responder.
docker compose up --build
```

Open <http://127.0.0.1:8000/> — API docs at <http://127.0.0.1:8000/docs>.

### Option 2 — Python backend + live frontend

```bash
pip install -r requirements.txt
cp .env.example .env
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```

### Option 3 — Static frontend only (zero dependencies)

```bash
npm start
# Serves at http://127.0.0.1:4321/
```

No API keys, no backend — the deterministic simulation and fallback copilot run entirely in the browser.

---

## API reference

Base URL: `http://127.0.0.1:8000` (local) — interactive docs at `/docs`.

| Method & path | Purpose |
| :--- | :--- |
| `GET /health` | Liveness check |
| `POST /api/copilot` | Copilot chat (legacy path) |
| `POST /api/v1/copilot/chat` | Copilot chat — telemetry-grounded, LLM or deterministic fallback |
| `GET /api/v1/carbon/forecast` | Carbon-credit forecast with default parameters |
| `POST /api/v1/carbon/forecast` | Carbon-credit forecast with custom parameters |
| `POST /api/v1/workflow/trigger` | Trigger an autonomous scenario (`night_idle`, `peak_grid`, `compressor_leak`) |
| `GET /api/v1/telemetry/summary` | Current simulated telemetry summary |

Full request/response schemas: [`docs/api-schema.json`](docs/api-schema.json).

---

## Configuration

Copy `.env.example` to `.env`. Only the LLM keys are optional — everything else works without them.

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `LLM_PROVIDER` | `groq` | `groq` or `gemini` |
| `GROQ_API_KEY` | *(empty)* | Groq Cloud key for Llama-3.3-70B (free tier available) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Groq model name |
| `GEMINI_API_KEY` | *(empty)* | Google AI Studio key for Gemini 2.5 Flash |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Gemini model name |
| `APP_ENV` / `HOST` / `PORT` | `development` / `0.0.0.0` / `8000` | Runtime settings |
| `ALLOWED_ORIGINS` | localhost + GitHub Pages | CORS origins |

**Never commit a real `.env` file.** Keys entered in the UI's Live LLM Gateway Settings are stored only in browser `localStorage`, never in source control.

---

## Verification & tests

```bash
# Node: domain math, E2E routes/flows, carbon scenarios, tick progression, route parity
npm run test:all
npm run test:ts        # TypeScript/JavaScript formula parity (26 checks)

# Python: FastAPI backend + formula parity suite
pytest -v

# Type check
npm run typecheck
```

CI runs the same suites on every push to `main`: Node 18, 20, and 22 plus Python 3.12. Current status: [![CI](https://github.com/fahad3235/green-factory-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/fahad3235/green-factory-ai/actions/workflows/ci.yml)

What the tests actually assert: the 286 MWh benchmark (160.2 tCO₂e), the 52,300 kWh baseline bill (৳648,520), Scope 1 + 2 separation, all 15 routes, all 18 machines, deterministic seed replay, strictly increasing carbon ticks, and Python/TypeScript/JavaScript formula parity.

---

## Roadmap

- [ ] Live tariff + grid-factor configuration (replace demo constants with a current schedule loader)
- [ ] Real sub-meter ingestion (Modbus/MQTT) behind the same calculation engine
- [ ] MRV-ready export: timestamped, auditable savings ledger per fix
- [ ] Multi-factory comparison view
- [ ] Bangla-first mobile walkthrough for floor managers

---

## Contributing

1. Fork the repo and create a feature branch.
2. Edit frontend sources under `preview/` only, then run `npm run sync`.
3. Keep the formula set in parity: any change to `calculations.py` needs the matching change in `calculations.ts` and `calculations.mjs`, and vice versa.
4. Run `npm run test:all`, `npm run test:ts`, and `pytest` before opening a PR.
5. Label every new figure as demo or real, and show its formula. Numbers without a formula do not merge.

---

## Demo data & honesty

This repository is a **hackathon demonstration**, built for the International AI Builders Congress 2026 (CloudCamp Bangladesh). It is not a commercial product, not an energy audit, and not a carbon-credit issuing tool.

- The factory, the meters, the bills, the reports, and the people are fictional.
- The formulas are real and checkable; the inputs are simulated.
- Savings and credit-revenue figures are scenario outputs, not measured results or guarantees.
- If any number in this README disagrees with the code, the code — and its tests — win. Please open an issue.

---

## Team

Built by **Team Probaho** — Ishan Ahmed Fahad (Lead System Developer), Md. Muhsinul Islam (Product Manager, Documentation & Pitch Lead), and Shihab Sarker (AI Product Strategist).

## License

[MIT](LICENSE) — free to use, modify, and build on, with attribution.

---

*Green Factory Brain AI — Smarter energy. Lower costs. Verifiable climate impact.*
