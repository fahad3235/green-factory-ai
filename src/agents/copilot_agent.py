"""Live LLM Copilot (Groq Llama-3.3-70B / Gemini 2.5 Flash) + Autonomous Workflow Agent."""

from __future__ import annotations

import json
import time
from typing import Any

import httpx

from src.core.calculations import (
    calc_payback_months,
    calc_scope2_tons,
    calculate_carbon_credit_forecast,
)
from src.core.config import Settings
from src.models.schemas import (
    AutonomousWorkflowResponse,
    CopilotChatRequest,
    CopilotChatResponse,
)


SCENARIO_PLAYBOOK: dict[str, dict[str, Any]] = {
    "night_idle": {
        "machineId": "MCH-SEW-03",
        "severity": "Warning",
        "agentPipeline": "AGT-ENERGY -> AGT-SAVINGS -> Confirmation Gate",
        "alertTitle": "Autonomous Alert: Night-Shift Idle Power Waste (+14% Sewing Idle Load)",
        "mitigationTitle": "Deploy Night-Shift Auto-Standby Lockout & Motor Cutoff Relays",
        "monthlySavingsBdt": 109664,
        "monthlySavedKwh": 8844,
        "estCostBdt": 145000,
        "safetyGuardrail": "HUMAN APPROVAL GATE: Auto-cutoff arms only outside scheduled shift hours (22:00-06:00 BST).",
    },
    "peak_grid": {
        "machineId": "UTL-CHL-01",
        "severity": "Critical",
        "agentPipeline": "AGT-FORECAST -> AGT-SAVINGS -> Confirmation Gate",
        "alertTitle": "Autonomous Alert: DPDC Peak Grid Tariff Surge (14.88 BDT/kWh Active)",
        "mitigationTitle": "Shift Chiller & Heavy Cutting Load Off-Peak + Enable Solar Buffer",
        "monthlySavingsBdt": 116970,
        "monthlySavedKwh": 9284,
        "estCostBdt": 210000,
        "safetyGuardrail": "HUMAN APPROVAL GATE: Protects active sewing line SLA while capping peak HVAC/utility chiller draw.",
    },
    "tariff_change": {
        "machineId": "UTL-CHL-01",
        "severity": "Critical",
        "agentPipeline": "AGT-FORECAST -> AGT-SAVINGS -> Confirmation Gate",
        "alertTitle": "Autonomous Alert: DPDC Peak Grid Tariff Surge (14.88 BDT/kWh Active)",
        "mitigationTitle": "Shift Chiller & Heavy Cutting Load Off-Peak + Enable Solar Buffer",
        "monthlySavingsBdt": 116970,
        "monthlySavedKwh": 9284,
        "estCostBdt": 210000,
        "safetyGuardrail": "HUMAN APPROVAL GATE: Protects active sewing line SLA while capping peak HVAC/utility chiller draw.",
    },
    "compressor_leak": {
        "machineId": "COMP-01",
        "severity": "Critical",
        "agentPipeline": "AGT-ENERGY -> AGT-RECOMMEND -> Confirmation Gate",
        "alertTitle": "Autonomous Alert: Critical Air Leak on COMP-01 (31.2 kW / 74.5C)",
        "mitigationTitle": "Dispatch Acoustic Leak Sealing + Header Pressure Setpoint Trim",
        "monthlySavingsBdt": 90940,
        "monthlySavedKwh": 7334,
        "estCostBdt": 68000,
        "safetyGuardrail": "HUMAN APPROVAL GATE: Maintains minimum 6.2 bar header floor so pneumatic cutters operate safely.",
    },
}


def _build_system_prompt(telemetry: dict[str, Any], language: str) -> str:
    lang_note = (
        "Respond in crisp executive English with BDT (৳) and exact engineering units."
        if language != "bn"
        else "Respond in natural Bangla mixed with exact numerical engineering units."
    )
    return (
        "You are Green Factory Brain AI Copilot for Rupsha Garments Ltd. (Gazipur, Bangladesh). "
        "Ground EVERY number strictly in the live telemetry JSON below; never invent readings. "
        "Format concisely with sections: [REASONING TRACE], [AUTONOMOUS RECOMMENDATION & ROI], and [SAFETY GUARDRAIL]. "
        f"{lang_note}\n"
        f"LIVE TELEMETRY JSON:\n{json.dumps(telemetry, ensure_ascii=False)}"
    )


def synthesize_telemetry_fallback(req: CopilotChatRequest) -> str:
    t = req.telemetry or {}
    q = req.query.lower()
    scenario = str(t.get("activeScenario", "baseline"))
    total_kwh = t.get("totalPeriodKwh", 52300)
    total_kw = t.get("totalCurrentKw", 142.3)
    bill_bdt = t.get("currentBillBdt", 648750)
    tariff = t.get("effectiveTariffBdtPerKwh", 12.40)
    total_co2 = t.get("totalCarbonTons", 34.20)
    assets = t.get("keyAssets", {}) or {}
    comp = assets.get("COMP-01", {"currentKw": 18.4, "tempC": 58.2, "status": "Running"})
    cut = assets.get("MCH-CUT-02", {"currentKw": 24.6, "tempC": 68.4, "status": "Fault"})
    sew3 = assets.get("MCH-SEW-03", {"currentKw": 4.8, "tempC": 44.1, "status": "Idle"})

    if "compressor" in q or "leak" in q or "comp-01" in q:
        comp_kw = float(comp.get("currentKw", 18.4))
        comp_temp = float(comp.get("tempC", 58.2))
        comp_status = str(comp.get("status", "Running"))
        leak_delta = max(2.6, comp_kw - 15.8)
        leak_kwh = round(leak_delta * 120)
        leak_bdt = max(18200, round(leak_kwh * float(tariff)))
        pb = calc_payback_months(68000, leak_bdt)
        return (
            f"[REASONING TRACE]\n"
            f"- Active Scenario: {scenario} | Fleet Load: {total_kw} kW ({total_kwh:,} kWh/mo)\n"
            f"- COMP-01 Live Sensor: {comp_kw:.1f} kW ({comp_status}), Temp: {comp_temp:.1f}C, Delta above nominal (15.8 kW): +{leak_delta:.1f} kW (~{leak_kwh:,} kWh/mo loss)\n"
            f"[AUTONOMOUS RECOMMENDATION & ROI]\n"
            f"- Action (REC-02): Ultrasonic air leak sealing & pressure setpoint trim saves ~{leak_bdt:,} BDT/mo ({leak_kwh:,} kWh/mo, {calc_scope2_tons(leak_kwh):.2f} tCO2e/mo). Est. CapEx 68,000 BDT, Payback {pb} mo.\n"
            f"[SAFETY GUARDRAIL]\n"
            f"- Simulation sandbox only; requires Manager Confirmation Gate and >=6.2 bar floor."
        )

    if "night" in q or "waste" in q or "sew" in q or "peak" in q or "tariff" in q:
        sew_kw = float(sew3.get("currentKw", 4.8))
        bi = t.get("businessImpact", {}) or {}
        monthly_sav = bi.get("monthlySavingsBdt", t.get("estimatedSavingsBdt", 68000))
        return (
            f"[REASONING TRACE]\n"
            f"- Active Scenario: {scenario} | Tariff: {tariff} BDT/kWh | Monthly Bill: {bill_bdt:,} BDT\n"
            f"- Idle / Peak Sensor Readout: MCH-SEW-03={sew_kw:.1f} kW ({sew3.get('status', 'Idle')}), MCH-CUT-02={cut.get('currentKw', 24.6)} kW ({cut.get('status', 'Fault')}), COMP-01={comp.get('currentKw', 18.4)} kW.\n"
            f"[AUTONOMOUS RECOMMENDATION & ROI]\n"
            f"- Trigger Confirmation Gate to authorize standby relay & off-peak scheduling: Est. {monthly_sav:,} BDT/mo savings.\n"
            f"[SAFETY GUARDRAIL]\n"
            f"- Zero autonomous breaker shutdown without Factory Manager Confirmation Gate sign-off."
        )

    return (
        f"[REASONING TRACE]\n"
        f"- Active Scenario: {scenario} | Fleet Demand: {total_kw} kW | Period Energy: {total_kwh:,} kWh | Est. Bill: {bill_bdt:,} BDT (@ {tariff} BDT/kWh)\n"
        f"- CarbonIQ Scope 1+2: {total_co2} tCO2e/mo | Priority Hotspots: MCH-CUT-02 ({cut.get('currentKw', 24.6)} kW, {cut.get('tempC', 68.4)}C), COMP-01 ({comp.get('currentKw', 18.4)} kW), MCH-SEW-03 ({sew3.get('currentKw', 4.8)} kW).\n"
        f"[AUTONOMOUS RECOMMENDATION & ROI]\n"
        f"- Combined monthly savings potential: {t.get('estimatedSavingsBdt', 68000):,} BDT/mo.\n"
        f"[SAFETY GUARDRAIL]\n"
        f"- Digital Twin sandbox mode; human Manager Confirmation Gate governs all actuator recommendations."
    )


async def _call_groq(req: CopilotChatRequest, settings: Settings, system_prompt: str) -> str:
    model = req.model or settings.groq_model or "llama-3.3-70b-versatile"
    payload = {
        "model": model,
        "temperature": 0.2,
        "max_tokens": 550,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": req.query},
        ],
    }
    async with httpx.AsyncClient(timeout=12.0) as client:
        resp = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.groq_api_key}",
                "Content-Type": "application/json",
            },
            json=payload,
        )
        resp.raise_for_status()
        data = resp.json()
        return str(data["choices"][0]["message"]["content"]).strip()


async def _call_gemini(req: CopilotChatRequest, settings: Settings, system_prompt: str) -> str:
    model = req.model or settings.gemini_model or "gemini-2.5-flash"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": f"{system_prompt}\n\nUser Question: {req.query}"}],
            }
        ],
        "generationConfig": {"temperature": 0.2, "maxOutputTokens": 550},
    }
    async with httpx.AsyncClient(timeout=12.0) as client:
        resp = await client.post(url, params={"key": settings.gemini_api_key}, json=payload)
        resp.raise_for_status()
        data = resp.json()
        return str(data["candidates"][0]["content"]["parts"][0]["text"]).strip()


async def run_copilot_agent(req: CopilotChatRequest, settings: Settings) -> CopilotChatResponse:
    t0 = time.perf_counter()
    system_prompt = _build_system_prompt(req.telemetry, req.language)
    preferred = (req.provider or settings.llm_provider or "groq").lower()

    try:
        if preferred == "groq" and settings.groq_api_key and not settings.groq_api_key.startswith("your_"):
            reply = await _call_groq(req, settings, system_prompt)
            return CopilotChatResponse(
                reply=reply,
                providerLabel="LIVE AGENT • GROQ LLAMA-3.3-70B",
                model=req.model or settings.groq_model,
                isHtml=False,
                usedFallback=False,
                latencyMs=round((time.perf_counter() - t0) * 1000, 1),
            )
        if preferred == "gemini" and settings.gemini_api_key and not settings.gemini_api_key.startswith("your_"):
            reply = await _call_gemini(req, settings, system_prompt)
            return CopilotChatResponse(
                reply=reply,
                providerLabel="LIVE AGENT • GEMINI 2.5 FLASH",
                model=req.model or settings.gemini_model,
                isHtml=False,
                usedFallback=False,
                latencyMs=round((time.perf_counter() - t0) * 1000, 1),
            )
    except Exception:
        # Resilient fallback below keeps real-time sensor grounding active if API quota/network fails
        pass

    fallback_reply = synthesize_telemetry_fallback(req)
    return CopilotChatResponse(
        reply=fallback_reply,
        providerLabel="LIVE TELEMETRY AGENT • DETERMINISTIC FALLBACK",
        model="telemetry-reasoning-fallback-v2",
        isHtml=False,
        usedFallback=True,
        latencyMs=round((time.perf_counter() - t0) * 1000, 1),
    )


def evaluate_autonomous_workflow(scenario_key: str, telemetry: dict[str, Any] | None = None) -> AutonomousWorkflowResponse:
    key = scenario_key.strip().lower()
    pb = SCENARIO_PLAYBOOK.get(
        key,
        {
            "machineId": "FLEET-MAIN",
            "severity": "Info",
            "agentPipeline": "AGT-ENERGY -> AGT-SAVINGS -> Confirmation Gate",
            "alertTitle": f"Autonomous Telemetry Review ({key})",
            "mitigationTitle": "Optimize Active Fleet Load & Schedule Standby Control",
            "monthlySavingsBdt": 68000,
            "monthlySavedKwh": 5484,
            "estCostBdt": 350000,
            "safetyGuardrail": "HUMAN APPROVAL GATE: Sandbox verification required before dispatch.",
        },
    )
    t = telemetry or {}
    saved_kwh = float(pb["monthlySavedKwh"])
    avoided_tons = calc_scope2_tons(saved_kwh)
    forecast = calculate_carbon_credit_forecast(
        monthly_avoided_tons=avoided_tons,
        monthly_energy_savings_bdt=float(t.get("monthlySavingsBdt", pb["monthlySavingsBdt"])),
        monthly_saved_kwh=saved_kwh,
        implementation_capex_bdt=float(pb["estCostBdt"]),
    )
    monthly_bdt = int(forecast["monthlyEnergySavingsBdt"])
    est_cost = int(pb["estCostBdt"])
    payback = calc_payback_months(est_cost, monthly_bdt)
    return AutonomousWorkflowResponse(
        scenarioKey=key,
        alertId=f"ALT-AUTO-{key.upper()}",
        machineId=str(pb["machineId"]),
        severity=str(pb["severity"]),
        agentPipeline=str(pb["agentPipeline"]),
        alertTitle=str(pb["alertTitle"]),
        mitigationTitle=str(pb["mitigationTitle"]),
        monthlySavingsBdt=monthly_bdt,
        annualSavingsBdt=int(forecast["annualEnergySavingsBdt"]),
        potentialCreditMonthlyBdt=int(forecast["monthlyPotentialCreditBdt"]),
        estCostBdt=est_cost,
        paybackMonths=payback,
        roi12Pct=float(forecast["roi12MonthPct"]),
        requiresManagerConfirmation=True,
        safetyGuardrail=str(pb["safetyGuardrail"]),
    )
