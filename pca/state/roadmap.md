# Roadmap

## In Process
- [Prepare Google Ads campaign and launch operations checklist]

## Pending

- [Identify the first validated workflow/tool for trading, forex, or financial-education communities]
- [Confirm Google Ads conversion actions, billing, campaign settings, and human lead-review ownership before activation]
- [Create the first vertical backend/n8n workflow only after a measurable problem is validated]

## Done
- [2026-08-14] Repositioned the landing around Telegram as the horizontal and trading/forex/financial education as the initial market grouping; excluded Telegram Ads from acquisition because of TON/wallet funding friction.
- [2026-08-14] Added the modular-monolith skeleton: shared backend namespaces, `backend/app/verticals/finanzas_educativas/AGENTS.md`, and `modules/finanzas-educativas/AGENTS.md`.
- [2026-08-14] Reworked landing storytelling around manual time, operational capacity, qualified conversations, and conversion-process metrics; added policy-safe disclaimers and removed artificial reference pricing.
- [2026-08-14] Set the landing accent system to strong Telegram blue and verified the local preview at `http://localhost:3000`.
- [2026-08-13] Configured production Telegram lead alerts: discovered the authenticated chat from `/start`, stored private Railway variables, sent a test message, redeployed the FastAPI backend, and verified `/health`.
- [2026-08-14] Completed production smoke testing with Playwright and direct API verification: the diagnostic form persisted a lead and returned `notification_sent=true`; the Telegram CTA and conversion events were verified.
- [2026-08-14] Completed synthetic production E2E validation with QA data: Railway returned HTTP 201, persisted lead `2f838d80-836b-4f9d-9d66-3a0884f10ffc`, returned `created=true` and `notification_sent=true`, and the landing rendered the success state with the correct Telegram CTA.
- [2026-08-14] Closed the final landing technical audit: ten verified integration targets, consultation anchor, concise disclaimer, mobile overflow fix, clean privacy metadata, successful build, and no horizontal overflow across the public conversion routes at 375px.
- [2026-08-14] Published GTM version 2 with the GA4 base tag and four custom-event tags/triggers; fixed early `dataLayer` event loss in the landing tracker.
- [2026-08-14] Reconciled Telegram credentials: Railway now uses the bot from the supplied credential file and the validated private chat; corrected the production CTA to the active bot username.
- [2026-08-11] Created `modules/` as the root for n8n projects, added shared module guidance in `modules/AGENTS.md`, and documented the global-to-module context hierarchy in the root `AGENTS.md`.
- [2026-08-10] Landing legal/compliance closure: explicit WhatsApp/email consent, privacy notice route, footer disclaimer, real contact email, server-side consent validation, and SOP alignment.
