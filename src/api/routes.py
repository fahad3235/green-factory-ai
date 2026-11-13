"""REST API routes for Copilot LLM reasoning, Carbon Forecast, Telemetry & Workflows."""

from __future__ import annotations

from fastapi import APIRouter, Depends

from src.agents.copilot_agent import evaluate_autonomous_workflow, run_copilot_agent
from src.core.calculations import (
    calc_bill_bdt,
    calc_scope1_tons,
    calc_scope2_tons,
    calculate_carbon_credit_forecast,
)
from src.core.config import Settings, get_settings
from src.models.schemas import (
    AutonomousWorkflowRequest,
    AutonomousWorkflowResponse,
    CarbonForecastRequest,
    CopilotChatRequest,
    CopilotChatResponse,
)

router = APIRouter()


@router.get("/health")
async def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "green-factory-brain-api",
        "version": "2.0.0",
    }


@router.post("/api/copilot", response_model=CopilotChatResponse)
@router.post("/api/v1/copilot/chat", response_model=CopilotChatResponse)
async def copilot_chat(
    request: CopilotChatRequest,
    settings: Settings = Depends(get_settings),
) -> CopilotChatResponse:
    return await run_copilot_agent(request, settings)


@router.get("/api/v1/carbon/forecast")
async def get_carbon_forecast(
    monthlyAvoidedTons: float = 3.07,
    monthlyEnergySavingsBdt: float = 68000.0,
    monthlySavedKwh: float = 5484.0,
    customPriceUsdPerTon: float = 18.0,
    implementationCapexBdt: float = 350000.0,
    annualTargetTons: float = 55.0,
    cbamRateUsdPerTon: float = 75.0,
) -> dict:
    return calculate_carbon_credit_forecast(
        monthly_avoided_tons=monthlyAvoidedTons,
        monthly_energy_savings_bdt=monthlyEnergySavingsBdt,
        monthly_saved_kwh=monthlySavedKwh,
        custom_price_usd_per_ton=customPriceUsdPerTon,
        implementation_capex_bdt=implementationCapexBdt,
        annual_target_tons=annualTargetTons,
        cbam_rate_usd_per_ton=cbamRateUsdPerTon,
    )


@router.post("/api/v1/carbon/forecast")
async def post_carbon_forecast(payload: CarbonForecastRequest) -> dict:
    return calculate_carbon_credit_forecast(
        monthly_avoided_tons=payload.monthlyAvoidedTons,
        monthly_energy_savings_bdt=payload.monthlyEnergySavingsBdt,
        monthly_saved_kwh=payload.monthlySavedKwh,
        baseline_annual_tons=payload.baselineAnnualTons,
        residual_monthly_tons=payload.residualMonthlyTons,
        custom_price_usd_per_ton=payload.customPriceUsdPerTon,
        usd_to_bdt=payload.usdToBdt,
        implementation_capex_bdt=payload.implementationCapexBdt,
        annual_target_tons=payload.annualTargetTons,
        cbam_rate_usd_per_ton=payload.cbamRateUsdPerTon,
        grid_factor_kg_per_kwh=payload.gridFactorKgPerKwh,
    )


@router.post("/api/v1/workflow/trigger", response_model=AutonomousWorkflowResponse)
async def trigger_autonomous_workflow(payload: AutonomousWorkflowRequest) -> AutonomousWorkflowResponse:
    return evaluate_autonomous_workflow(payload.scenarioKey, payload.telemetry)


@router.get("/api/v1/telemetry/summary")
async def get_telemetry_summary(settings: Settings = Depends(get_settings)) -> dict:
    kwh = 52300.0
    gas_m3 = 2430.0
    scope2 = calc_scope2_tons(kwh, settings.grid_emission_factor_kg_per_kwh)
    scope1 = calc_scope1_tons(gas_m3, settings.gas_emission_factor_kg_per_m3)
    return {
        "facility": "Rupsha Garments Ltd.",
        "seed": 20261018,
        "operatingMode": "DIGITAL_TWIN_SANDBOX",
        "periodKwh": kwh,
        "estimatedBillBdt": calc_bill_bdt(kwh, settings.blended_tariff_bdt_per_kwh),
        "scope1Tons": round(scope1, 2),
        "scope2Tons": round(scope2, 2),
        "totalCarbonTons": round(scope1 + scope2, 2),
        "emissionFactors": {
            "gridKgCo2ePerKwh": settings.grid_emission_factor_kg_per_kwh,
            "gasKgCo2ePerM3": settings.gas_emission_factor_kg_per_m3,
            "benchmark286MwhScope2Tons": round(calc_scope2_tons(286000.0, settings.grid_emission_factor_kg_per_kwh), 1),
        },
    }
