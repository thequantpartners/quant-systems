# Active Decisions

- The commercial offer is positioned as an installed sales system for medium-high/high-ticket service businesses already running lead-generation campaigns, not as an n8n product.
- Lead forms must explicitly authorize evaluation and contact through WhatsApp or email, link to `/privacidad`, and be rejected server-side without consent.
- Marketing copy must not guarantee leads, sales, revenue, ROAS, or specific results; Ads management is outside the implementation scope unless separately agreed.
- The lead API remains a temporary console sink and must be replaced with controlled persistence before production advertising.
- n8n projects live under root `modules/`; the root `AGENTS.md` defines global context, `modules/AGENTS.md` defines shared n8n conventions, and each module may add a more specific `AGENTS.md`.
