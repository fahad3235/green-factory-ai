"""Deterministic Industrial Energy, Carbon Accounting, and Credit Forecast Engine.

Maintains strict numeric parity with preview/src/domain/calculations.mjs.
"""

from __future__ import annotations

from typing import Any


GRID_EF_KG_PER_KWH = 0.560
GAS_EF_KG_PER_M3 = 2.020


def calc_energy_kwh(power_kw: float, hours: float) -> float:
    p = max(0.0, float(power_kw))
    h = max(0.0, float(hours))
    return round(p * h, 4)


def calc_bill_bdt(kwh: float, tariff_bdt_per_kwh: float) -> float:
    return round(max(0.0, float(kwh)) * max(0.0, float(tariff_bdt_per_kwh)), 2)


def calc_scope2_tons(kwh: float, kg_co2_per_kwh: float = GRID_EF_KG_PER_KWH) -> float:
    return round((max(0.0, float(kwh)) * max(0.0, float(kg_co2_per_kwh))) / 1000.0, 4)


def calc_scope1_tons(gas_m3: float, kg_co2_per_m3: float = GAS_EF_KG_PER_M3) -> float:
    return round((max(0.0, float(gas_m3)) * max(0.0, float(kg_co2_per_m3))) / 1000.0, 4)


def calc_payback_months(implementation_cost_bdt: float, monthly_savings_bdt: float) -> float | None:
    cost = float(implementation_cost_bdt)
    savings = float(monthly_savings_bdt)
    if cost <= 0 or savings <= 0:
        return None
    return round(cost / savings, 1)


def calculate_carbon_credit_forecast(
    *,
    monthly_avoided_tons: float = 3.994,
    monthly_energy_savings_bdt: float = 88435.0,
    monthly_saved_kwh: float = 7132.0,
    baseline_annual_tons: float = 458.3,
    residual_monthly_tons: float = 34.20,
    custom_price_usd_per_ton: float = 18.0,
    usd_to_bdt: float = 120.0,
    implementation_capex_bdt: float = 350000.0,
    annual_target_tons: float = 55.0,
    cbam_rate_usd_per_ton: float = 75.0,
    grid_factor_kg_per_kwh: float = GRID_EF_KG_PER_KWH,
) -> dict[str, Any]:
    monthly_avoided = max(0.0, float(monthly_avoided_tons))
    monthly_energy_bdt = max(0.0, float(monthly_energy_savings_bdt))
    saved_kwh = max(0.0, float(monthly_saved_kwh))
    baseline_annual = max(0.1, float(baseline_annual_tons))
    residual_monthly = max(0.0, float(residual_monthly_tons))
    custom_price_usd = min(150.0, max(1.0, float(custom_price_usd_per_ton)))
    fx_rate = max(1.0, float(usd_to_bdt))
    capex = max(0.0, float(implementation_capex_bdt))
    target_tons = max(1.0, float(annual_target_tons))
    cbam_rate = min(200.0, max(0.0, float(cbam_rate_usd_per_ton)))
    grid_ef = max(0.01, float(grid_factor_kg_per_kwh))

    scenarios = []
    for sid, label, usd_price in (
        ("low", "Conservative (Low)", 10.0),
        ("medium", "Assumed Base (Medium)", 18.0),
        ("high", "High-Integrity VCM (High)", 30.0),
    ):
        price_bdt = round(usd_price * fx_rate)
        m_rev_bdt = round(monthly_avoided * price_bdt)
        scenarios.append(
            {
                "id": sid,
                "label": label,
                "priceUsdPerTon": usd_price,
                "priceBdtPerTon": price_bdt,
                "monthlyRevenueBdt": m_rev_bdt,
                "annualRevenueBdt": m_rev_bdt * 12,
            }
        )

    custom_price_bdt = round(custom_price_usd * fx_rate)
    monthly_credit_bdt = round(monthly_avoided * custom_price_bdt)
    annual_credit_bdt = monthly_credit_bdt * 12

    annual_energy_bdt = round(monthly_energy_bdt * 12)
    projected_annual_tons = round(monthly_avoided * 12, 2)
    annual_total_benefit_bdt = annual_energy_bdt + annual_credit_bdt
    monthly_total_benefit_bdt = round(monthly_energy_bdt + monthly_credit_bdt)

    payback_energy_only = round(capex / monthly_energy_bdt, 1) if monthly_energy_bdt > 0 else None
    payback_with_credits = round(capex / monthly_total_benefit_bdt, 1) if monthly_total_benefit_bdt > 0 else None
    roi_12_pct = round(((annual_total_benefit_bdt - capex) / capex) * 100.0, 1) if capex > 0 else 0.0
    net_3yr_profit_bdt = round((annual_total_benefit_bdt * 3) - capex)

    seasonal_weights = [0.92, 0.94, 0.97, 1.00, 1.02, 1.04, 1.05, 1.04, 1.02, 1.01, 1.00, 0.99]
    monthly_series = []
    cum_tons = 0.0
    cum_bdt = 0
    for idx, w in enumerate(seasonal_weights, start=1):
        m_tons = round(monthly_avoided * w, 3)
        m_energy_bdt = round(monthly_energy_bdt * w)
        m_credit_bdt = round(monthly_credit_bdt * w)
        m_total_bdt = m_energy_bdt + m_credit_bdt
        cum_tons = round(cum_tons + m_tons, 2)
        cum_bdt += m_total_bdt
        monthly_series.append(
            {
                "month": f"M{idx}",
                "avoidedTons": m_tons,
                "cumulativeTons": cum_tons,
                "energySavingsBdt": m_energy_bdt,
                "creditRevenueBdt": m_credit_bdt,
                "totalBusinessValueBdt": m_total_bdt,
                "cumulativeBusinessValueBdt": cum_bdt,
            }
        )

    attainment_pct = round(min(200.0, (projected_annual_tons / target_tons) * 100.0), 1)
    shortfall_tons = round(max(0.0, target_tons - projected_annual_tons), 2)
    raw_prob = 35.0 + ((attainment_pct - 60.0) * 1.15)
    probability_pct = round(min(98.0, max(8.0, raw_prob)))
    on_track = projected_annual_tons >= target_tons

    reduction_pct = round((projected_annual_tons / baseline_annual) * 100.0, 1)
    compliance_score = round(min(99.0, max(15.0, (reduction_pct / 12.0) * 88.0)))
    risk_tier = "LOW" if compliance_score >= 75 else ("MODERATE" if compliance_score >= 50 else "HIGH")

    residual_annual_tons = round(residual_monthly * 12, 2)
    gross_exposure_annual_tons = round(residual_annual_tons + projected_annual_tons, 2)
    avoided_cbam_bdt = round(projected_annual_tons * cbam_rate * fx_rate)
    residual_cbam_bdt = round(residual_annual_tons * cbam_rate * fx_rate)
    gross_cbam_bdt = avoided_cbam_bdt + residual_cbam_bdt

    return {
        "monthlyAvoidedTons": round(monthly_avoided, 3),
        "projectedAnnualTons": projected_annual_tons,
        "monthlySavedKwh": round(saved_kwh),
        "gridFactorKgPerKwh": grid_ef,
        "formulaSummary": f"{round(saved_kwh):,} kWh * {grid_ef:.3f} kg CO2e/kWh / 1,000 = {monthly_avoided:.3f} tCO2e/mo",
        "customPriceUsdPerTon": custom_price_usd,
        "customPriceBdtPerTon": custom_price_bdt,
        "usdToBdt": fx_rate,
        "monthlyPotentialCreditBdt": monthly_credit_bdt,
        "annualPotentialCreditBdt": annual_credit_bdt,
        "monthlyEnergySavingsBdt": round(monthly_energy_bdt),
        "annualEnergySavingsBdt": annual_energy_bdt,
        "monthlyTotalBenefitBdt": monthly_total_benefit_bdt,
        "annualTotalBenefitBdt": annual_total_benefit_bdt,
        "implementationCapexBdt": capex,
        "paybackMonthsEnergyOnly": payback_energy_only,
        "paybackMonthsWithCredits": payback_with_credits,
        "roi12MonthPct": roi_12_pct,
        "net3YearProfitBdt": net_3yr_profit_bdt,
        "scenarios": scenarios,
        "monthlySeries": monthly_series,
        "targetTracker": {
            "annualTargetTons": target_tons,
            "projectedAnnualTons": projected_annual_tons,
            "attainmentPct": attainment_pct,
            "shortfallTons": shortfall_tons,
            "probabilityPct": probability_pct,
            "onTrack": on_track,
        },
        "buyerCompliance": {
            "reductionPct": reduction_pct,
            "complianceScore": compliance_score,
            "riskTier": risk_tier,
            "buyerBenchmarkPct": 10.0,
        },
        "cbamSimulation": {
            "cbamRateUsdPerTon": cbam_rate,
            "residualAnnualTons": residual_annual_tons,
            "grossExposureAnnualTons": gross_exposure_annual_tons,
            "avoidedCbamLiabilityBdt": avoided_cbam_bdt,
            "netResidualCbamCostBdt": residual_cbam_bdt,
            "grossAnnualCbamExposureBdt": gross_cbam_bdt,
        },
        "verificationStatus": "POTENTIAL_UNVERIFIED",
        "priceBasisDisclaimer": "Illustrative assumed carbon credit price — NOT spot market pricing. Bangladesh VCM verification & baseline MRV required.",
    }
