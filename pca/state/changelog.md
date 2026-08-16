# Changelog

## 2026-08-14

- Repositioned the commercial offer from WhatsApp-first to Telegram-first.
- Kept Google Ads as the initial acquisition channel and removed Telegram Ads from the launch plan because TON/wallet funding is an avoidable operational barrier.
- Grouped the first market message around trading, forex, and financial-education communities; excluded betting from the public paid offer.
- Updated the landing storytelling to lead with the operator's pain: mixed Telegram conversations, repeated support, missed next steps, and manual coordination.
- Changed the visual accent from green to strong Telegram blue and removed crossed-out/reference pricing.
- Added a modular-monolith direction with shared backend capabilities and vertical-specific modules.
- Verified `npm run build` from `landings/` and reviewed the local landing in the browser.
- Replaced the landing's vertical-solution index with a ten-platform integration section and added a "Consultar con ventas" anchor to `/implementar`.
- Fixed mobile overflow in `/implementar` at 375px and removed the duplicated `Quant Systems` suffix from the privacy-page title.
- Completed synthetic production E2E validation: Railway returned HTTP 201, the lead was persisted, `notification_sent=true`, the success screen rendered, the Telegram CTA pointed to `https://t.me/quantsystems_bot`, and attribution/events were present.

## 2026-08-13

- Configured Telegram Bot API alerts for qualified implementation requests.
- Stored `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as private Railway variables without adding secrets to the repository.
- Sent a Telegram test message and redeployed the backend successfully.
- Verified the production backend build, startup logs, and `/health` response.

## 2026-08-11

- Created the root `modules/` directory for n8n projects.
- Added `modules/AGENTS.md` with shared n8n module conventions, documentation requirements, and safety rules.
- Documented the hierarchy where the root `AGENTS.md` provides global context and each module can provide specific context.

## 2026-08-10

- Updated landing consent to authorize commercial contact through WhatsApp and email.
- Added `/privacidad` with data-use, contact, and consent-withdrawal information.
- Replaced the footer contact with `partners@thequantpartners.com`.
- Added disclaimers covering non-guaranteed results, third-party affiliation, pricing scope, and Ads management.
- Enforced `consentAccepted` in the leads API.
- Updated SOPs 00, 01, 03, 04, 05, and 09 to match the current ICP and compliance language.
- Verified production build and confirmed the endpoint rejects submissions without consent.
