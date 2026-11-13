"""Runtime configuration loaded safely from environment variables."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    app_env: str = field(default_factory=lambda: os.getenv("APP_ENV", "development"))
    host: str = field(default_factory=lambda: os.getenv("HOST", "0.0.0.0"))
    port: int = field(default_factory=lambda: int(os.getenv("PORT", "8000")))
    llm_provider: str = field(default_factory=lambda: os.getenv("LLM_PROVIDER", "groq").lower())
    groq_api_key: str = field(default_factory=lambda: os.getenv("GROQ_API_KEY", "").strip())
    groq_model: str = field(default_factory=lambda: os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile").strip())
    gemini_api_key: str = field(default_factory=lambda: os.getenv("GEMINI_API_KEY", "").strip())
    gemini_model: str = field(default_factory=lambda: os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip())
    allowed_origins: list[str] = field(
        default_factory=lambda: [
            o.strip()
            for o in os.getenv(
                "ALLOWED_ORIGINS",
                "http://localhost:8000,http://127.0.0.1:4321,https://fahad3235.github.io",
            ).split(",")
            if o.strip()
        ]
    )

    # Calibrated industrial domain constants (Single Source of Truth parity)
    grid_emission_factor_kg_per_kwh: float = 0.560
    gas_emission_factor_kg_per_m3: float = 2.020
    blended_tariff_bdt_per_kwh: float = 12.40
    peak_tariff_bdt_per_kwh: float = 14.88
    usd_to_bdt_rate: float = 120.0


def get_settings() -> Settings:
    return Settings()
