"""Integration and unit tests for Green Factory Brain AI FastAPI backend."""

from __future__ import annotations

from fastapi.testclient import TestClient

from src.api.main import app
from src.core.calculations import (
    calc_bill_bdt,
    calc_payback_months,
    calc_scope1_tons,
    calc_scope2_tons,
    calculate_carbon_credit_forecast,
)


client = TestClient(app)


def test_health_endpoint() -> None:
    res = client.get("/health")
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "ok"
    assert body["service"] == "green-factory-brain-api"


def test_emission_factor_math_and_286mwh_benchmark() -> None:
    # Verifies the corrected sidebar carbon figure: 286 MWh * 0.560 t/MWh = 160.2 tCO2e
    assert round(calc_scope2_tons(286000.0, 0.560), 1) == 160.2
    assert round(calc_scope2_tons(52300.0, 0.560), 2) == 29.29
    assert round(calc_scope1_tons(2430.0, 2.020), 2) == 4.91
    assert calc_bill_bdt(52300.0, 12.40) == 648520.0
    assert calc_payback_months(350000.0, 68000.0) == 5.1
    assert calc_payback_months(100000.0, 0.0) is None


def test_carbon_credit_forecast_parity() -> None:
    fc = calculate_carbon_credit_forecast(
        monthly_avoided_tons=3.994,
        monthly_energy_savings_bdt=88435.0,
        monthly_saved_kwh=7132.0,
        custom_price_usd_per_ton=18.0,
        implementation_capex_bdt=485000.0,
        annual_target_tons=52.0,
        cbam_rate_usd_per_ton=65.0,
    )
    assert fc["verificationStatus"] == "POTENTIAL_UNVERIFIED"
    assert len(fc["scenarios"]) == 3
    assert [s["priceUsdPerTon"] for s in fc["scenarios"]] == [10.0, 18.0, 30.0]
    assert len(fc["monthlySeries"]) == 12
    assert fc["monthlySeries"][-1]["cumulativeTons"] > fc["monthlySeries"][0]["cumulativeTons"]
    assert fc["paybackMonthsWithCredits"] is not None
    assert fc["paybackMonthsWithCredits"] <= fc["paybackMonthsEnergyOnly"]


def test_copilot_reads_live_compressor_leak_telemetry() -> None:
    res = client.post(
        "/api/copilot",
        json={
            "query": "Why is compressor energy high right now?",
            "language": "en",
            "provider": "groq",
            "telemetry": {
                "activeScenario": "compressor_leak",
                "totalCurrentKw": 160.8,
                "totalPeriodKwh": 54150,
                "effectiveTariffBdtPerKwh": 12.40,
                "currentBillBdt": 671460,
                "keyAssets": {
                    "COMP-01": {"currentKw": 31.2, "tempC": 74.5, "status": "Fault"},
                    "MCH-CUT-02": {"currentKw": 24.6, "tempC": 68.4, "status": "Fault"},
                    "MCH-SEW-03": {"currentKw": 4.8, "tempC": 44.1, "status": "Idle"},
                },
            },
        },
    )
    assert res.status_code == 200
    body = res.json()
    assert "31.2 kW" in body["reply"]
    assert "74.5C" in body["reply"] or "74.5" in body["reply"]
    assert "[REASONING TRACE]" in body["reply"]
    assert "[SAFETY GUARDRAIL]" in body["reply"]


def test_autonomous_workflow_trigger_night_and_peak() -> None:
    for scen in ("night_idle", "peak_grid", "compressor_leak"):
        res = client.post(
            "/api/v1/workflow/trigger",
            json={"scenarioKey": scen, "telemetry": {}},
        )
        assert res.status_code == 200
        body = res.json()
        assert body["scenarioKey"] == scen
        assert body["requiresManagerConfirmation"] is True
        assert body["monthlySavingsBdt"] > 0
        assert body["paybackMonths"] is not None and body["paybackMonths"] > 0


def test_telemetry_summary_and_carbon_endpoints() -> None:
    s_res = client.get("/api/v1/telemetry/summary")
    assert s_res.status_code == 200
    s_body = s_res.json()
    assert s_body["emissionFactors"]["benchmark286MwhScope2Tons"] == 160.2

    c_res = client.post(
        "/api/v1/carbon/forecast",
        json={"monthlyAvoidedTons": 5.0, "monthlyEnergySavingsBdt": 120000.0},
    )
    assert c_res.status_code == 200
    assert c_res.json()["projectedAnnualTons"] == 60.0
