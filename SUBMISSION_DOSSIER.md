# Green Factory Brain AI v2.0 — Hackathon Submission Dossier

> **Pilot Facility Model:** Rupsha Garments Ltd. (Gazipur, Bangladesh)  
> **Live Frontend (GitHub Pages):** https://fahad3235.github.io/green-factory-ai/  
> **Repository:** https://github.com/fahad3235/green-factory-ai  
> **Architecture & Pitch Artifacts:** [`docs/architecture.png`](docs/architecture.png) • [`docs/pitch-deck.pdf`](docs/pitch-deck.pdf) • [`docs/api-schema.json`](docs/api-schema.json)

---

## 1. Executive Summary

**Green Factory Brain AI v2.0** is an industrial energy intelligence, carbon-credit revenue forecaster, and autonomous plant optimization copilot built for Bangladesh's Ready-Made Garments (RMG) export sector.

International apparel buyers and EU CBAM regulations increasingly require auditable **Scope 1 + Scope 2** emission reductions, while factory owners need concrete financial justification before approving operational changes. Green Factory Brain AI bridges engineering telemetry and executive P&L by combining:

1. **Deterministic 18-Machine Digital Twin (`Seed #20261018`):** Simulates factory kW load, thermal diagnostics, DPDC Time-of-Use tariff exposure (`৳12.40/kWh` standard vs. `৳14.88/kWh` peak), and `COMP-01` air-leak faults across three synchronized views (`index.html`, `digital-twin.html`, `simulation.html`).
2. **Live Multi-Provider LLM Telemetry Copilot (`LIVE AGENT • LLAMA-3.3`):** FastAPI backend (`src/agents/copilot_agent.py`) integrating **Groq `llama-3.3-70b-versatile`** (primary) and **Google `gemini-2.5-flash`** (fallback), plus a deterministic live-telemetry grounded synthesizer so the UI always reasons over active machine state without hallucinating sensor values.
3. **Autonomous Anomaly Workflow + Mandatory Confirmation Gate:** Triggering **Night Shift Waste**, **Peak Grid Tariffs**, or **Compressor Air Leak** automatically raises an alert (`ALT-AUTO-*`), computes monthly BDT savings, CapEx payback, and 12-month ROI, and opens a mandatory Human-in-the-Loop **Confirmation Gate** for manager approval before any simulated control state changes.
4. **Calibrated Carbon Credit & Business Profit Predictor:** Calculates Low / Medium / High (`$10 / $18 / $30 per tCO₂e`) potential revenue scenarios with interactive price sliders, 12-month Chart.js cumulative savings trajectory, CapEx payback, year-end Target Tracker, Buyer Compliance Risk Score, and EU CBAM carbon-tax what-if simulator.

---

## 2. Calibrated Carbon Accounting & Transparency

All energy-to-emission conversions enforce strict **Scope 1 / Scope 2 separation** and **Single-Source-of-Truth parity** across Python (`src/core/calculations.py`), TypeScript (`preview/src/domain/calculations.ts`), and browser JavaScript (`preview/src/domain/calculations.mjs`):

| Parameter | Calibrated Value | Formula / Audit Basis |
| :--- | :--- | :--- |
| **Scope 2 Grid Emission Factor** | `0.560 kg CO₂e/kWh` | Bangladesh DoE Grid Baseline • `286 MWh × 0.560 = 160.2 tCO₂e` |
| **Scope 1 Natural Gas Factor** | `2.020 kg CO₂e/m³` | Boiler combustion (`BOIL-01`) direct emissions |
| **Monthly Baseline Split** | `34.2 tCO₂e/mo` (`410.4 tCO₂e/yr`) | Scope 1: `4.91 tCO₂e/mo` (`58.9/yr`) + Scope 2: `29.29 tCO₂e/mo` (`351.5/yr`) |
| **Credit Revenue Disclaimer** | Illustrative Pricing Only | Explicitly labeled in English & Bangla: *"এটি ধারণামূলক মূল্য, বাস্তব বাজারদর নয়"* and *"সম্ভাব্য আয়"* (Potential Revenue requiring MRV baseline verification) |

---

## 3. Judge Walkthrough (3 Clicks / 10 Seconds)

1. **Enter Demo Sandbox:** On the landing portal, click **1-Click Enter as Manager** (`#btn-quick-enter-manager`) or **Enter as Owner** (`#btn-quick-enter-owner`) — or use sandbox credential presets (`GFB-MGR-2026` / `PASSKEY-MGR-8899`).
2. **Trigger Autonomous Workflow:** On the Dashboard **Business Impact** card (`মাসিক সাশ্রয় ৳ → বছরের সাশ্রয় → সম্ভাব্য কার্বন ক্রেডিট আয় → পে-ব্যাক মাস`), click **Peak Grid Tariffs** or **Night Shift Waste**. Observe the live alert creation, ROI breakdown, and automatic **Confirmation Gate** modal.
3. **Inspect AI & Carbon Forecaster:**
   - Trigger **Compressor Air Leak** and ask the **Ask Green AI Copilot** drawer about `COMP-01` — inspect the structured `[REASONING TRACE]`, `[AUTONOMOUS RECOMMENDATION & ROI]`, and `[SAFETY GUARDRAIL]` blocks.
   - Open **CarbonIQ Report** (`#/carboniq-report`) to inspect the interactive Low/Med/High carbon credit scenarios, custom price slider, 12-month Chart.js trajectory, CapEx payback, Target Tracker, Buyer Compliance Score, and EU CBAM tax simulator.

---

## 4. Technical Stack & Repository Organization

- **Backend API & Agents (`src/`):** Python 3.12, FastAPI, Pydantic v2 (`src/models/schemas.py`), Groq & Gemini REST integration (`src/agents/copilot_agent.py`), deterministic carbon & ROI math (`src/core/calculations.py`).
- **Frontend SPA & 3D Twin (`preview/`, root, `src/frontend/`):** Tailwind CSS, Chart.js, Three.js (`digital-twin.html`), synchronized standalone factory simulator (`simulation.html`), and domain ES/TS modules (`calculations.mjs`, `calculations.ts`).
- **DevOps & Docs:** `Dockerfile`, `docker-compose.yml`, `.github/workflows/ci.yml`, `.env.example`, `docs/architecture.png`, `docs/pitch-deck.pdf`, `docs/api-schema.json`.

---

## 5. Ethical AI & Data Transparency

*Simulated synthetic dataset (Seed #20261018) representing Rupsha Garments Ltd. (Gazipur, Bangladesh). Carbon credit projections use illustrative pricing pending independent MRV verification. All AI recommendations require mandatory human operator confirmation; zero autonomous physical breaker actuation occurs.*
