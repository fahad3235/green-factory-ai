"""FastAPI entrypoint serving both live LLM/Carbon APIs and static Digital Twin UI."""

from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from src.api.routes import router as api_router
from src.core.config import get_settings

BASE_DIR = Path(__file__).resolve().parents[2]


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Green Factory Brain AI API",
        version="2.0.0",
        description="Industrial Energy Intelligence, Live LLM Copilot (Llama-3.3-70B / Gemini 2.5 Flash), and Carbon Credit Forecast API.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router)

    preview_dir = BASE_DIR / "preview"
    docs_dir = BASE_DIR / "docs"
    if preview_dir.exists():
        app.mount("/preview", StaticFiles(directory=str(preview_dir), html=True), name="preview")
    if docs_dir.exists():
        app.mount("/docs-assets", StaticFiles(directory=str(docs_dir)), name="docs-assets")

    @app.get("/", include_in_schema=False)
    async def serve_root() -> FileResponse:
        root_html = BASE_DIR / "index.html"
        fallback_html = BASE_DIR / "preview" / "index.html"
        return FileResponse(str(root_html if root_html.exists() else fallback_html))

    @app.get("/digital-twin.html", include_in_schema=False)
    async def serve_digital_twin() -> FileResponse:
        p = BASE_DIR / "digital-twin.html"
        return FileResponse(str(p if p.exists() else (BASE_DIR / "preview" / "digital-twin.html")))

    @app.get("/simulation.html", include_in_schema=False)
    async def serve_simulation() -> FileResponse:
        p = BASE_DIR / "simulation.html"
        return FileResponse(str(p if p.exists() else (BASE_DIR / "preview" / "simulation.html")))

    return app


app = create_app()
