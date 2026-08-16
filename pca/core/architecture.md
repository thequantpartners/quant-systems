# Architecture

# Architecture

The repository uses a simple modular monolith. Do not create a separate backend per vertical by
default.

```text
landings/                         # Next.js validation/acquisition surface
backend/app/
  core/                            # config, security, tenancy, errors
  shared/                          # leads, conversations, tracking, metrics, jobs
  integrations/                    # shared provider adapters
  verticals/
    finanzas_educativas/           # vertical-specific domain, prompts, schemas, workflows
modules/
  finanzas-educativas/             # n8n workflows and operating documentation
```

Capabilities used by two or more verticals belong in `core`, `shared`, or `integrations`.
Vertical-specific rules, prompts, schemas, adapters, and workflows stay in the vertical namespace.
Each vertical has an `AGENTS.md` in both its backend and n8n module directories.

Current state:

- `landings/` is the only complete product surface.
- `backend/` is a small FastAPI/SQLAlchemy skeleton with implementation-request persistence and
  Telegram alerting.
- `modules/` has shared conventions plus the initial financial-education module documentation.
- `dashboard/` and `baileys-server/` are not currently present and must not be assumed to exist.
- The landing's local API still has a temporary sink; production paid traffic waits for approved
  persistent storage and privacy/analytics closure.
