# Green Factory Brain AI — CloudCamp Submission Q&A

> Record of the questions and answers submitted to the International AI Builders Congress 2026 (CloudCamp Bangladesh) for Green Factory Brain AI — exactly as submitted, word for word.
>
> - **Submission:** https://cloudcampbd.com/submissions/1a0fd307-78b4-4aba-ab53-f662e74288a9
> - **Status:** Submitted 19 Nov 2026, 3:40 PM Dhaka — "Submitted — awaiting results"
> - **Pre-Judgment Score:** 411/425 (Basics 143/149 · AI Detail Usage 225/232 · Links 17/17 · Build Provenance 19/20 · Team 7/7)
> - **Submission Score:** 212/215 — "Master" (+22 bonus) (Story 30/30 · Proof 24/25 · AI-Native Build 110/110 · Data Lifecycle 23/25 · Ready to Submit 25/25)
> - **Judging:** off at time of reading; no judge feedback.
>
> **How to read this file.** These are the submitted answers. The submitted entry links the TeamPROBAHO repository (https://github.com/TeamPROBAHO/green-factory-brain-ai) and the Netlify demo (https://green-factory-brain-ai.netlify.app/), so some answers describe that deployment (React/Firebase/Netlify, 1,247 MWh/month, 132 machines). For **this** repository, the code and its tests are the authority — the demo factory here is the 52,300 kWh/month, 18-machine Rupsha pilot described in the README. This file adds the submission record only; nothing else in the repository was changed.

---

## Story

**Q: Project Name**
A: Green Factory Brain AI

**Q: Elevator Pitch**
A: Green Factory Brain AI gives every Bangladeshi garment factory a digital brain — it streams live energy, machine, emission and order data into one AI copilot that explains the plant in plain Bangla, predicts load and waste, simulates carbon-credit revenue, and turns factory operations into audit-ready decisions.

**Q: Public Summary**
A: Green Factory Brain AI is a bilingual AI copilot for Bangladesh's garment factories. It simulates real-time factory telemetry from a fictional, calibration-grounded factory (Rupsha Garments Ltd., Gazipur; Seed #20261018) to demonstrate a complete Factory AI Agent: live energy, production, emission and order streams; an analytics pipeline; and a Groq + Gemini copilot. Managers can ask, in English or Bangla, for load forecasts, energy waste, night-shift risk, carbon-credit impact and savings opportunities — and get sourced, grounded answers. All figures are simulated and labeled as such; no real factory data is used. The demo shows what a production rollout would look like once real IoT sensors are connected.

**Q: Domain**
A: Sustainability & Environment

**Q: Challenge**
A: Smart Manufacturing — Factory AI Agent

**Q: What problem does it solve?**
A: Bangladesh's garment factories — the backbone of the national economy — run on fragmented, paper-based and spreadsheet-based systems. Energy is wasted (12.4% night idle draw), machines fail without warning, and emissions are invisible until audit time. Small and mid-size factories cannot afford enterprise MES/EMS suites, and managers lack a single, plain-language view of the plant. Green Factory Brain AI solves this by giving any factory a low-cost digital twin: simulated live telemetry, an AI copilot that answers in Bangla or English, and carbon-credit simulation that turns sustainability into revenue. It makes energy, production and emissions visible, explainable and actionable — without new hardware.

**Q: How does your solution work?**
A: The app simulates a live factory digital twin in the browser: a seeded simulator (Seed #20261018) generates machine energy, production, emissions and order data every few seconds, stored in local state and Firebase. A backend FastAPI service proxies Groq and Gemini calls; the AI copilot receives a grounded context bundle (live KPIs, machine table, carbon factors) and answers only from that data, with citations to its sources. Managers see KPIs, charts, machine rankings and the Bangla/English copilot on one dashboard. An MCP layer exposes telemetry tools (sensor readings, threshold alerts, cloud sync) to AI agents, so future agents can query the factory the same way the copilot does.

---

## Proof — Demo / Live Links

**Q: Video (YouTube)**
A: https://www.youtube.com/watch?v=lD5YwB5N4bU

**Q: Live demo URL**
A: https://green-factory-brain-ai.netlify.app/

**Q: GitHub repo URL**
A: https://github.com/TeamPROBAHO/green-factory-brain-ai

**Q: Figma / design URL**
A: https://www.figma.com/design/P3E4lJgQmZ5kWnR7tYvB9x/Green-Factory-Brain-AI

**Other links (as submitted):**

- https://green-factory-brain-ai.netlify.app/
- https://green-factory-brain-ai.netlify.app/
- https://github.com/TeamPROBAHO/green-factory-brain-ai
- https://www.figma.com/design/P3E4lJgQmZ5kWnR7tYvB9x/Green-Factory-Brain-AI
- https://www.youtube.com/watch?v=lD5YwB5N4bU

### Test credentials for judges

| Role | Username | Password | Access note |
| :--- | :--- | :--- | :--- |
| Manager (demo) | manager@demo.local | GFB-MGR-2026 | Password GFB-MGR-2026. Demo access code DEMO-MGR-2026. Click Enter as Manager on the demo. Simulation only, sample data. |
| Owner (demo) | owner@demo.local | GFB-OWN-2026 | Password GFB-OWN-2026. Demo access code DEMO-OWN-2026. Click Enter as Owner on the demo. Simulation only, sample data. |

### Other links for reviewers

**Q: Submission dossier**
A: https://docs.google.com/document/d/1U4e5S6f7G8h9I0jKlMnOpQrStUvWxYzAbCdEfGhIjKlMn/edit?usp=sharing

**Q: OpenAPI schema**
A: https://green-factory-brain-ai.netlify.app/openapi.json

**Q: Architecture assumptions**
A: https://docs.google.com/document/d/1A2b3C4d5E6f7G8h9I0jKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQr/edit?usp=sharing

**Q: CI workflow**
A: https://github.com/TeamPROBAHO/green-factory-brain-ai/actions

**Q: Anything else for judges (e.g., setup notes, known limitations, what's next)?**
A: Setup: Open the demo URL above and click Enter as Manager or Enter as Owner. Everything runs in the browser with simulated data; no setup is needed. Known limitations: no live IoT sensors are connected; data is seeded from a simulator (Seed #20261018). The telemetry MCP server is documented but not deployed; the backend calls the Groq and Gemini REST APIs directly. Carbon-credit revenue is simulated and MRV-pending. Next: integrate real IoT sensor streams and deploy the telemetry MCP server.

---

## AI-Native Build

**Q: Prompt Usage**
A: The AI copilot is the product's core: it turns live factory telemetry into plain-language decisions. Each user question is wrapped in a structured prompt that includes a system role (factory energy analyst), the live KPI context (energy, production, emissions, orders), the machine table (top loads, idle machines, risk flags) and explicit grounding rules: answer only from the provided data, cite the source table or metric, say 'I don't know' when data is missing, and never invent a factory or a figure. Prompts are versioned in the repo (prompts/ directory) and in the Prompt Library tab. The copilot is bilingual: it answers in English or Bangla depending on the user's language, and it explains the same numbers twice — once as a short executive answer and once as a detailed breakdown. A second, smaller prompt handles follow-up questions by reusing the previous answer's context. A third prompt classifies the question (forecast, waste, carbon, savings, general) so the UI can show the right chart next to the answer. All prompts are in the Prompt Library; the most-used ones are listed below.

**Q: Token Optimization**
A: We keep token costs low by sending a compact context bundle instead of raw telemetry: the backend aggregates the simulator's per-machine readings into KPI summaries (total energy, idle draw, top 5 loads, carbon totals) and sends only those summaries plus the question. The system prompt is cached and reused across turns; follow-ups send only the new question and the previous answer's summary. We cap the machine table at 10 rows, truncate long numbers to 2 decimals, and use short Bangla labels where possible. The Groq model (llama-3.3-70b-versatile) is used for fast, cheap answers; Gemini is used only for longer, structured explanations. We also use prompt caching on Groq where supported, and we batch multiple small questions into one call when the user asks for a full report. Estimated cost: under $0.01 per conversation turn.

**Q: Token Optimization Tools** (7 selected)
A: AI-Native Context Engineering, Context Management, Context Window Management, Prompt Caching, Prompt Optimization, Semantic Chunking, Token Optimization

**Q: LLMs / Models you used** (8 selected)
A: Google Gemini 2.5 Pro, Google Gemini 2.5 Flash, Google Gemini 2.0 Flash, Google Gemini 2.5 Flash-Lite, OpenRouter, Groq, Qwen, Kimi

Additional models listed under the field (6): Llama-3.3-70B, Gemini 2.5 Flash, Qwen 4, Glm 5.3 flash, Gemini 4 carbon, Gemini 4 argon

**Q: How & why did you use LLMs / AI in your solution?**
A: We use LLMs because factory managers need plain-language answers, not dashboards full of numbers. A manager asks 'Which machines waste the most energy at night?' and the copilot answers in Bangla with the machine names, the kWh wasted, the cost in BDT and a concrete action. Rule-based code could compute the numbers, but only an LLM can explain them, compare them to last week, and suggest what to do next. We use Groq (llama-3.3-70b-versatile) for fast, cheap, grounded answers and Gemini 2.5 Pro for longer, structured explanations and Bangla translation. The LLM never sees raw telemetry — only aggregated KPIs — so it cannot leak sensor data and cannot hallucinate a machine that does not exist. Every answer is checked against the context bundle before it is shown; if the numbers do not match, the UI shows the raw data instead of the answer.

**Q: Retrieval & RAG techniques** (8 selected)
A: Chunking, Contextual Chunking, Embeddings, Hybrid Search, Knowledge Graph, Metadata Filtering, Reranking, Semantic Chunking

**Q: RAG Architecture & Knowledge**
A: The product uses a lightweight, in-browser RAG layer: the factory's static knowledge (machine manuals, energy-saving tips, carbon factors, compliance notes) is stored as Markdown files, chunked by section (semantic chunking, ~500 tokens per chunk), embedded with a local embedding model, and searched by hybrid retrieval (keyword + vector). The copilot's prompt includes the top 3 retrieved chunks alongside the live KPIs, so it can explain 'why' a machine is inefficient, not just 'how much' it wastes. A knowledge graph links machines to their processes, energy sources and maintenance history, so the copilot can answer 'Which machines share the same compressor?' The graph is stored in Neo4j in the production design; in the demo it is a JSON graph in the browser.

### MCP servers built (2)

**Server 1 — realtime-machine-data-mcp**

- Transport: stdio, Streamable HTTP
- Language / SDK: Python / mcp (FastMCP) (or TypeScript / [value as displayed, truncated in the field]
- Tool count: 6
- Purpose: This MCP server exposes the factory's real-time machine telemetry to AI agents and tools. It gives agents a single interface to read live sensor data, list machines, and check threshold alerts — instead of hard-coding sensor APIs into every agent.
- Tools exposed: get_latest_readings, list_machines, get_machine_energy, get_alerts, sync_to_cloud, get_production_summary

**Server 2 — Iot sensor mcp**

- Transport: stdio, Streamable HTTP
- Language / SDK: Python / FastMCP (or TypeScript / [as displayed]
- Tool count: (empty)
- Purpose: (empty)
- Tools exposed: ingest_raw_sensor_data, sync_to_cloud, get_latest_readings, query_sensor_history, list_sensor_devices, check_threshold_alerts

### MCP servers used (8)

Source / vendor and endpoint / connection count were empty for all 8 as submitted.

**1. OpenRouter MCP (openrouter-mcp)**
- Capabilities: search-docs, list-benchmarks, get-generation, send-message (plus generate-image [as displayed, unclosed parenthesis]
- How used: Called from OpenCode: a quick prompt to find the best model for each task before code changes. Search models and get generation and provider metrics first to choose the best-fit model for the task.

**2. Blender MCP (blender-mcp)**
- Capabilities: get_polyhaven_categories, get_polyhaven_assets, get_polyhaven_status, download_polyhaven_asset, set_polyhaven_categories, search_polyhaven_assets, list_scenes, get_scene_info, get_object_info, create_object, modify_object, delete_object, get_viewport_screenshot
- How used: Called from Claude Code to generate the 3D factory layout.

**3. Tripo MCP (tripo-mcp)**
- Capabilities: generate_model, get_task, poll_task (or convert_model / texture_model [as displayed]
- How used: (empty)

**4. Supabase MCP (supabase-mcp)**
- Capabilities: list_tables, list_extensions, list_migrations, apply_migration, execute_sql, get_logs, get_advisors, list_projects, get_project, create_branch, list_branches, merge_branch, reset_branch, rebase_branch, delete_branch, create_project, pause_project, restore_project
- How used: Project backend authentication

**5. Firebase MCP (firebase-mcp)**
- Capabilities: firebase_get_project, firebase_get_analytics, firebase_list_docs, firebase_query_collection, firebase_create_document, firebase_update_document, firebase_get_document
- How used: Called from OpenCode: query and manage Firebase Authentication, Firestore, and Storage for the demo project.

**6. Canva MCP (canva-mcp)**
- Capabilities: create-design, export-design, generate-image, generate-text, get-design, get-image, import-design, list-designs, resize-design, search-design-templates, update-design, upload-asset
- How used: Called from OpenCode: create the product banner and hero image for the demo.

**7. MetaMCP (metamcp-mcp)**
- Capabilities: list_built_in_servers, add_server, remove_server, get_server, list_tools, execute_tool, get_tool_schema, list_resources, get_resource, list_prompts, execute_prompt
- How used: Called from OpenCode to consolidate several MCP servers into one endpoint and manage them.

**8. OpenCode MCP (opencode-mcp)**
- Capabilities: get_project, get_directory, get_session, get_todos, get_agents, get_file_content, read_file
- How used: Called from OpenCode to explore the project directory, files and sessions.

**Q: Which MCP clients / hosts did you use?**
A: Claude desktop/codex etc

**Q: Transports used** (2 selected)
A: STDIO, Streamable HTTP

**Q: Anything else about your MCP use? (auth, rate limits, observability, gotchas, what's next)**
A: Composed a hybrid MCP layer: external tools are connected through a single MetaMCP aggregator; local MCP tools are registered in OpenCode, and the internal factory telemetry server is a direct in-process FastMCP tool (no network, no token auth). We hit a 'tool overload' problem early — dozens of tools from every MCP server slowed the model down — so we added keyword prefixing to scope tool calls per session. Auth: the telemetry server needs no auth because it runs in-process; the Supabase and Firebase servers use API keys in local config. Rate limits: the external MCP tools are slow and rate-limited, so we cache their results for 5 minutes. Observability: tool calls are logged to the browser console with timings.

**Q: How did you reuse / adapt MCP servers in this project?**
A: Separated direct httpx calls from the MCP wrapper so our own telemetry server never goes down because of a broken vendor API. This was adapted from an earlier project where the backend crashed when the API key expired. We documented the failure modes, retries, and fallback behaviour.

**Q: What open-source software / libraries were involved in your MCP / agent work?**
A: React & TypeScript for the frontend; FastAPI and httpx for the backend; Tailwind and shadcn for the UI; Vite and Vercel for build and deploy; Groq (llama-3.3-70b-versatile) and Gemini (gemini-2.5-pro, gemini-2.5-flash) for the AI models. MCP SDKs: Python mcp / FastMCP and the TypeScript MCP SDK for the telemetry server. Other libraries: Recharts for charts; Firebase for auth and database; the Supabase and Firebase MCP servers for backend tasks. All open-source dependencies are listed in package.json and requirements.txt.

**Q: What agentic frameworks, SDKs and orchestration tools did you use?**
A: We used OpenCode as the agent runtime and orchestration layer, with MetaMCP as the tool aggregator. The agent is a single OpenCode session that calls the factory telemetry MCP tools and the external MCP servers. We also used LangChain for prompt templating and LangGraph for the multi-step reasoning flow (classify question → fetch data → generate answer → check grounding). The agent framework is documented in the repo's docs/ folder.

**Q: Did you fine-tune or adapt any models? Describe how:**
A: No fine-tuning was done. We adapted the models by prompt engineering only: the system prompt, the grounding rules and the Bangla translation examples are all in the prompts/ directory. We tried a small LoRA fine-tune on a local Qwen model for Bangla factory terms, but the results were worse than prompt engineering, so we kept the base models.

**Q: How do you evaluate / measure AI quality in your solution?**
A: We evaluate the copilot with a manual test set of 20 questions (10 in English, 10 in Bangla) covering forecasts, waste, carbon, savings and general questions. Each answer is scored on three dimensions: correctness (does the number match the context bundle?), grounding (does it cite the right source?) and language (is the Bangla correct and natural?). The test set is in the repo (tests/copilot-eval.md). We also log every copilot call with the question, the context bundle hash and the answer, so we can replay failures. The current pass rate is 18/20; the two failures are Bangla questions about night-shift energy waste, where the model hallucinated a machine name. We fixed this by adding the machine table to every prompt.

**Q: What guardrails, safety, privacy and cost controls did you apply?**
A: Guardrails: the copilot can only answer from the provided context bundle; it must cite its source; it must say 'I don't know' when data is missing. The backend validates every number in the answer against the context bundle and replaces the answer with the raw data if it does not match. Privacy: no real factory data is used; all data is simulated and labeled as such. No personal data is sent to any LLM — only aggregated KPIs and machine names. Cost: the Groq model is used for most questions; Gemini is used only for long explanations. We cap the context bundle at 10 machine rows and 3 RAG chunks, and we cache the system prompt. Safety: the copilot cannot execute any action — it is read-only and cannot control machines.

**Q: Frontend AI / visual builders** (6 selected)
A: Claude Code, Cursor, Figma, Gemini, GitHub Copilot, Vercel v0

**Q: How did you use the frontend / visual AI builders above?**
A: The frontend was built with Claude Code and Cursor: we described the dashboard in natural language and the AI generated the React components, the charts and the Tailwind styling. Figma was used to design the layout and the color system before coding; the Figma file is linked in the Proof tab. Vercel v0 generated the first version of the KPI cards and the machine table. GitHub Copilot suggested code completions in VS Code. Gemini was used to generate the product banner and the hero image. The final UI was hand-tuned by the team — the AI generated the first draft, and we refined the spacing, colors and Bangla labels.

**Q: Workflow / automation engines** (4 selected)
A: GitHub Actions, Make, n8n, Zapier

**Q: How did you use workflow automation in this project?**
A: We used GitHub Actions for CI: every push runs the test suite, the linter and the build, and deploys to Netlify on the main branch. The workflow file is linked in the Proof tab. n8n is used to automate the weekly report: it fetches the simulator's weekly KPIs, generates a PDF report with the copilot, and emails it to the factory manager. Make and Zapier were used during development to prototype the report flow before we built the n8n workflow. The n8n workflow is documented in the repo's docs/ folder. We also use a scheduled GitHub Action to run the copilot evaluation test set every night and post the results to the team channel.

**Q: Local LLM runtimes** (5 selected)
A: LM Studio, Ollama, OpenCode, Open WebUI, VS Code

**Q: Local / open-weight models** (11 selected)
A: DeepSeek V3.1, DeepSeek V3.2, GLM-4.5, Kimi K2, Llama-3.3-70B, Qwen3, Qwen3-Coder, Qwen3-Max, Qwen3-VL, Qwen 4, Gml 5.3 flash (spelling "Gml" as submitted)

**Q: Local LLM hardware / quantization notes**
A: We run local models on a single laptop (Apple M3, 16 GB RAM) with Ollama and LM Studio. The models are quantized to 4-bit (Q4_K_M) so they fit in memory. We use Qwen3 and Llama-3.3-70B for offline Bangla translation and for testing prompts without API costs. The local models are slower than Groq but free, and they are used only for development — the production demo uses Groq and Gemini. We also use Open WebUI to test prompts locally before deploying them.

**Q: Agentic frameworks** (7 selected)
A: AutoGen, Claude Code, CrewAI, LangChain, LangGraph, OpenAgents, Semantic Kernel

**Q: AI-DLC frameworks** (7 selected)
A: BMAD-METHOD, Claude Code, Kiro, PROMPT, Spec Kit, Spec-Driven Development, Vibe Coding

**Q: How did you apply the AI Development Lifecycle (AI-DLC)?**
A: We followed a spec-driven AI-DLC: we wrote the product spec first (docs/spec.md), then the prompts (prompts/ directory), then the data model (docs/data-model.md), then the code. Each step was reviewed by the team before moving to the next. We used BMAD-METHOD for the planning phase, Spec Kit for the spec, and Kiro for the implementation. The lifecycle is documented in the repo's docs/ folder, and the MEMORY.md file in the repo is the living record of every decision.

**Q: Build /docs — did you generate docs with AI?**
A: Yes (checked)

**Q: Anything else about your AI usage?**
A: One more note: the 'no MCP servers' claim in the provenance section refers to the product's runtime — there is no MCP server in the deployed product. The MCP servers listed above were used during development (in OpenCode) and for the telemetry layer design. The product itself calls the Groq and Gemini REST APIs directly. We kept the development MCP list because the form asks for it, but the runtime does not depend on MCP.

---

## Data Lifecycle

**Q: Where did your data come from?** (6 selected)
A: Internal, Public Web, Open Datasets, Generated / Synthetic, User Input, Sensor / IoT (External not selected)

**Q: Describe your data sources in detail. Include where it came from, any calibration, and whether it used live data or synthetic data.**
A: Calibrated synthetic simulator data, Seed #20261018. Every number in the demo is derived from 5 fixed calibration anchors: (1) total energy use 1,247 MWh/month, (2) cost Tk 12,48,000/month (Tk 1,000/MWh), (3) 6,400 workers, (4) 11 production lines, 132 machines, (5) carbon 34.2 tCO2e/month (Scope 2 29.29 t at 0.800 kg/kWh grid factor, Scope 1 4.91 t natural gas at 2.020 kg/m3). No real factory data is used; Rupsha Garments Ltd. is fictional. Carbon-credit revenue figures are illustrative potential revenue (MRV-pending, no certification claimed); the CBAM simulator is a what-if tool, as the EU CBAM does not currently apply to finished garments.

**Q: How did you acquire the data?** (8 selected as shown in the heading; 9 checkboxes appeared checked)
A: Web Scraping, API, Web Crawling, Screen Scraping, Manual Entry, File Upload, Real-Time Stream, External Database, Generated / Synthetic

**Q: Describe how you acquired the data.**
A: Simulated sensor streams are generated in the browser (see simulator.js). The demo also loads static JSON datasets for the machine table and the carbon factors. No scraping is done at runtime; the scraping tools listed here were used during research to gather public benchmarks (BGMEA reports, energy tariffs, carbon factors).

**Q: Which scrapers / crawlers did you use?**
A: Python (requests + BeautifulSoup) for BGMEA reports and energy tariffs; Playwright for JavaScript-heavy pages; the GitHub MCP server for repo research; the Context7 MCP server for library documentation. All scraping was done during research, not at runtime.

**Q: MCP servers for data access**
A: The realtime-machine-data-mcp server exposes get_latest_readings, list_machines, get_machine_energy, get_alerts and sync_to_cloud. The telemetry MCP layer is documented in the repo but not deployed in the demo.

**Q: Data Formats** (7 selected)
A: JSON, CSV, XLSX, PDF, HTML, Images, Audio (not selected: Video, Parquet, Avro, XML, YAML, JSONL, Markdown, Protobuf)

**Q: Parsers used**
A: JSON.parse for the static datasets; PapaParse for CSV uploads; the browser's built-in DOMParser for HTML; a custom regex parser for the simulator's log format.

**Q: Formatters / converters**
A: Data is converted from the simulator's raw format to the dashboard's KPI format in the browser; CSV exports use PapaParse; PDF reports are generated with jsPDF.

**Q: Data cleaning & enrichment**
A: The simulator generates clean data by construction (seeded random). The research data was cleaned by hand: duplicate BGMEA entries were removed, energy tariffs were normalised to Tk/kWh, and carbon factors were checked against the IPCC defaults.

**Q: Schema validation**
A: The simulator's output is validated against a JSON schema (docs/schema.json) on every tick; invalid readings are dropped and logged. The static datasets are validated at build time.

**Q: What storage targets did you use?** (4 selected)
A: PostgreSQL, Local Storage, Firebase, File System (not selected: MongoDB, S3 / Cloud Storage, Pinecone / Vector DB)

Advanced storage: Graph DB (Neo4j, ArangoDB, etc.) — "Neo4j — Graph DB"; Vector DB (pgvector, Pinecone, etc.) — not selected; Lakehouse / Warehouse (Delta, Iceberg, BigQuery) — not selected.

**Q: Describe your storage setup.**
A: PostgreSQL is the production design (not deployed in the demo); the demo uses Firebase Firestore for auth and user data, and browser localStorage for the simulator state. The machine table and carbon factors are static JSON files. Neo4j is the production design for the knowledge graph; in the demo it is a JSON graph in the browser.

**Q: What visualization tools did you use?** (6 selected)
A: Recharts, Charts, Grafana, Tableau, Power BI, Custom D3.js

**Q: Describe your visualization setup.**
A: The dashboard uses Recharts for the energy, production and emission charts; the machine table is a custom React table with sorting and filtering; the carbon-credit simulator is a custom slider component. Grafana, Tableau and Power BI were used during research to prototype the dashboards before we built the React version.

**Q: Dashboards & reports**
A: The main dashboard shows KPIs, charts and the machine table; the weekly report is a PDF generated by n8n; the carbon-credit simulator is a separate view with sliders for price and volume.

**Q: Which ML / analytics methods did you use?** (6 selected)
A: Regression, Classification, Clustering, Time Series, NLP, Computer Vision

**Q: Describe your AI / ML analytics in detail.**
A: The copilot uses an LLM (Groq llama-3.3-70b-versatile) for natural-language answers. The load forecast is a simple time-series model (exponential smoothing) run in the browser. Energy waste is detected by comparing each machine's night-time draw to its daytime baseline (clustering). The carbon-credit simulation is a deterministic calculation, not ML. NLP is used for the Bangla translation and for classifying user questions. Computer vision is not used in the demo; it is listed here because the production design includes camera-based quality inspection.

**Q: Non-AI analytics (SQL, rules, thresholds, stats)**
A: Most of the analytics are non-AI: SQL-style aggregations in the browser, threshold alerts (e.g., night idle draw > 10% triggers a warning), and simple statistics (mean, median, p95) for the machine table. The AI copilot is only the explanation layer on top of these rules.

**Q: How are insights delivered to users?**
A: Insights are delivered on the dashboard (KPIs, charts, machine table), in the copilot's answers, and in the weekly PDF report. The copilot explains the numbers in plain Bangla or English; the dashboard shows the raw numbers for verification.

**Q: How do you orchestrate data pipelines?**
A: The demo has no server-side pipeline; the simulator runs in the browser and the backend is a thin FastAPI proxy for the LLM calls. The production design uses Airflow for orchestration: a daily DAG fetches sensor data, validates it, stores it in PostgreSQL, and updates the knowledge graph in Neo4j.

**Q: Scheduling / triggers**
A: The simulator ticks every 5 seconds; the copilot is triggered by user questions; the weekly report is scheduled by n8n (every Monday 9 AM).

**Q: Streaming / real-time details**
A: The simulator generates a new reading every 5 seconds and updates the dashboard via React state. The backend uses Server-Sent Events (SSE) to push updates to the frontend in the production design; in the demo the updates are local.

**Q: Outbound APIs**
A: The backend exposes a REST API (FastAPI) with endpoints for the copilot, the machine table and the carbon-credit simulation. The OpenAPI schema is linked in the Proof tab. The API is documented in the repo's docs/ folder.

**Q: Webhooks & exports**
A: The demo exports CSV and PDF reports from the dashboard. Webhooks are not used in the demo; the production design uses webhooks to notify the manager when a threshold alert fires.

**Q: Embeddings / model serving**
A: The RAG layer uses a local embedding model (all-MiniLM-L6-v2) to embed the Markdown knowledge files. The embeddings are stored in a JSON file in the browser; in production they would be in a vector DB. The LLM is served by Groq and Gemini, not self-hosted.

**Q: Open-source data stack**
A: PostgreSQL, Firebase, Neo4j, Airflow, Recharts, PapaParse, jsPDF, FastAPI, httpx, React, TypeScript, Tailwind, shadcn, Vite, Vercel. All open-source dependencies are listed in package.json and requirements.txt.

**Q: Data quality**
A: The simulator generates clean data by construction. The research data was checked against BGMEA reports and IPCC carbon factors. The copilot's answers are validated against the context bundle before they are shown.

**Q: Privacy & compliance**
A: No real factory data is used; all data is simulated and labeled as such. No personal data is sent to any LLM. The factory name (Rupsha Garments Ltd.) is fictional. The carbon-credit figures are illustrative and MRV-pending.

**Q: Lineage & observability**
A: Every simulator reading is tagged with the seed (#20261018) and a timestamp, so any number can be traced back to the simulator. Tool calls are logged to the browser console with timings.

**Q: Cost & performance**
A: The demo runs entirely in the browser and on free tiers (Netlify, Firebase, Groq free tier). The estimated cost is under $0.01 per copilot conversation. The simulator is lightweight and runs at 60 fps on a laptop.

**Q: Other data stack notes**
A: The data stack is designed to be low-cost and easy to replicate: a factory can start with the simulator and the dashboard, then connect real IoT sensors when ready. The production design uses PostgreSQL, Neo4j and Airflow, but the demo proves the concept with free tiers.

**Q: Publish local environment to internet** (3 selected)
A: ngrok, Cloudflare Tunnel, Localtunnel (not selected: Tailscale, Port Forwarding, Serveo, PageKite)

**Q: Tunneling usage notes**
A: ngrok is used to expose the local backend (FastAPI) to the internet during development and demos: the frontend (on Netlify) calls the backend through an ngrok URL. The ngrok tunnel is started with ngrok http 8000 and the URL is copied into the frontend's .env file. Cloudflare Tunnel is used as an alternative when ngrok is rate-limited: the tunnel is configured with cloudflared tunnel --url http://localhost:8000. Localtunnel was used early in development for quick sharing: lt --port 8000. Tunneling is only for development and demos; in production the backend is deployed to a cloud host (not a tunnel).

---

## Build Provenance

**Q: Data Sources**
A: Calibrated synthetic simulator data, Seed #20261018. Every number in the demo is derived from 5 fixed calibration anchors: (1) total energy use 1,247 MWh/month, (2) cost Tk 12,48,000/month (Tk 1,000/MWh), (3) 6,400 workers, (4) 11 production lines, 132 machines, (5) carbon 34.2 tCO2e/month (Scope 2 29.29 t at 0.560 kg/kWh grid factor; Scope 1 4.91 t natural gas at 2.020 kg/m3). No real factory data is used; Rupsha Garments Ltd. is fictional. Carbon-credit revenue figures are illustrative potential revenue (MRV-pending, no certification claimed); the CBAM simulator is a what-if tool, as the EU CBAM does not currently apply to finished garments.

> Note: the Data Lifecycle copy of this same field reads 0.800 kg/kWh for the grid factor; this Provenance copy reads 0.560 kg/kWh. Both are recorded as submitted.

**Q: AI Models**
A: Primary (runtime) — Groq: llama-3.3-70b-versatile for fast, cheap, grounded answers. Gemini: gemini-2.5-pro for long, structured explanations, gemini-2.5-flash for lighter queries, gemini-2.0-flash and gemini-2.5-flash-lite for fallback. OpenRouter is used in development to compare models. Local / offline — Qwen3, Llama-3.3-70B, DeepSeek V3.1/V3.2, GLM-4.5, Kimi K2 via Ollama / LM Studio (4-bit quantised). All models are listed in the AI-Native Build tab.

**Q: Responsible AI**
A: No real factory data; all data is simulated and labeled. No personal data is sent to any LLM. The copilot answers only from the provided context bundle, must cite its source, and must say 'I don't know' when data is missing. Carbon-credit revenue is illustrative (MRV-pending, no certification claimed). The factory name is fictional. The model can hallucinate — we mitigate this by validating every number against the context bundle before showing the answer.

**Q: IDE / Editor**
A: VS Code

**Q: Deployment**
A: Vercel: the frontend is deployed on Netlify (green-factory-brain-ai.netlify.app) and the backend is a FastAPI service (exposed via ngrok during demos).

**Q: Frameworks & Libraries**
A: React 18, TypeScript, Tailwind CSS, shadcn/ui, Vite, FastAPI, httpx, Recharts, Firebase, PapaParse, jsPDF

**Q: MCP servers list**
A: None used.

**Q: Tools Exposed**
A: The backend calls the Groq and Gemini REST APIs directly with httpx; there is no MCP server in the architecture.

**Q: Permissions**
A: Not applicable — no MCP server in the architecture; the backend calls the Groq and Gemini REST APIs directly.

**Q: Context / Memory Files**
A: MEMORY.md (15,121 chars) was submitted as the context file. It describes the Netlify deployment's calibration (1,247 MWh/month, 132 machines, Tk 12,48,000/month) and is not reproduced here in full — the figures in this repository's README are the authority for this codebase.

### Prompt Library (10 prompts, as submitted)

1. Carbon credits — simulation impact
2. Carbon credit balance — what's my balance?
3. Highest-load machines — top 5 by energy use
4. Night-shift energy waste — which machines waste the most?
5. Next month's bill — forecast
6. Three highest-impact energy savings
7. Assumptions & limitations — what are the caveats?
8. Change after maintenance — did it help?
9. Explain in Bangla — factory manager summary
10. Live data summary — current KPIs

---

## Team

**Team:** Team PROBAHO
**Team Code:** 582S2U4Y

Members (as submitted):

- Md Fahad Ahmed — Team Lead
- Md Muhsinul Islam — Member
- Nure musa hasan Patwary arnob — Member
- Ovishek Roy — Member
- Dilruba Haque Suzana — Member

---

*This file records the CloudCamp submission only. It does not change any code, test, or figure in this repository. Team phone numbers, empty form fields, and the full pasted MEMORY.md text were not included.*
