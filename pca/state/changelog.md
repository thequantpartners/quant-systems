# Changelog

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
