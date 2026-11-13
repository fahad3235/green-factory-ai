"""Pydantic v2 request and response contracts for Green Factory Brain AI API."""

from __future__ import annotations

from typing import Any
from pydantic import BaseModel, Field


class CopilotChatRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=2000, description="User question for AI Copilot")
    language: str = Field(default="en", pattern="^(en|bn)$")
    provider: str = Field(default="groq", description="Preferred LLM provider: groq | gemini | backend")
    model: str | None = Field(default=None, description="Optional model override")
    telemetry: dict[str, Any] = Field(default_factory=dict, description="Live factory telemetry snapshot")


class CopilotChatResponse(BaseModel):
    reply: str
    providerLabel: str
    model: str
    isHtml: bool = False
    usedFallback: bool = False
    latencyMs: float = 0.0


class CarbonForecastRequest(BaseModel):
    monthlyAvoidedTons: float = Field(default=3.07, ge=0.0, le=1000.0)
    monthlyEnergySavingsBdt: float = Field(default=68000.0, ge=0.0)
    monthlySavedKwh: float = Field(default=5484.0, ge=0.0)
    baselineAnnualTons: float = Field(default=458.3, gt=0.0)
    residualMonthlyTons: float = Field(default=34.20, ge=0.0)
    customPriceUsdPerTon: float = Field(default=18.0, ge=1.0, le=150.0)
    usdToBdt: float = Field(default=120.0, gt=0.0)
    implementationCapexBdt: float = Field(default=350000.0, ge=0.0)
    annualTargetTons: float = Field(default=55.0, ge=1.0)
    cbamRateUsdPerTon: float = Field(default=75.0, ge=0.0, le=200.0)
    gridFactorKgPerKwh: float = Field(default=0.560, gt=0.0)


class AutonomousWorkflowRequest(BaseModel):
    scenarioKey: str = Field(..., min_length=1, max_length=64)
    telemetry: dict[str, Any] = Field(default_factory=dict)


class AutonomousWorkflowResponse(BaseModel):
    scenarioKey: str
    alertId: str
    machineId: str
    severity: str
    agentPipeline: str
    alertTitle: str
    mitigationTitle: str
    monthlySavingsBdt: int
    annualSavingsBdt: int
    potentialCreditMonthlyBdt: int
    estCostBdt: int
    paybackMonths: float | None
    roi12Pct: float
    requiresManagerConfirmation: bool = True
    safetyGuardrail: str
