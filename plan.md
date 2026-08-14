# Plan: AttribWA + SpeedLead WA (MVP) — evolución de QSS/GoogleMaker en QuantSetters

## Problema y enfoque

El plan original (ecosistema Google Ads + WhatsApp multi-tenant) se adapta para construirse
como una **evolución** del sistema ya existente en `GoogleMaker` (QSS — Quant Sales System),
no como un monorepo Node nuevo desde cero. QSS ya tiene, en producción/desarrollo:

- Backend FastAPI + SQLAlchemy (SQLite local / Postgres en Railway), con `User` actuando como
  tenant/cliente, `Lead` con `gclid`/UTMs, `GoogleAdsCredential` (OAuth cifrado).
- `services/google_ads_service.py` con `upload_offline_conversion` (ConversionUploadService)
  ya funcionando, pero solo con GCLID crudo (sin wbraid/gbraid, sin enhanced conversions).
- `baileys-server` (Node, WhatsApp no oficial) + `services/baileys_service.py` para notificar/enviar.
- `routers/webhooks.py` con un **hack de atribución**: extrae `gclid--utm_source--utm_campaign`
  de un texto `Ref: ...` embebido en el mensaje de WhatsApp vía regex. Esto es exactamente lo que
  la Fase 1 del plan (AttribWA) debe reemplazar por un tracking redirect propio.
- Dashboard Next.js (`dashboard/app/dashboard`) con setup-guide, campaigns, logs, planes.
- Pagos vía Mercado Pago, agenda vía Cal.com — fuera de alcance de este MVP.

### Decisiones ya confirmadas con el usuario

1. **Ubicación**: copiar/mover el código relevante de `GoogleMaker` (backend, dashboard,
   baileys-server) hacia `QuantSetters` y continuar el desarrollo ahí.
2. **Backend**: se mantiene Python/FastAPI + SQLAlchemy (no se migra a Node/Fastify/BullMQ).
3. **WhatsApp MVP**: se mantiene Baileys (no oficial) para velocidad; migración a WhatsApp
   Cloud API oficial de Meta queda para Fase 2 (junto con Call2WA).
4. **Multi-tenant**: se mantiene el modelo actual `User` = tenant/cliente (sin tabla `tenants`
   separada) para el MVP; se reevalúa si aparece necesidad de equipos por cliente.

### Gaps identificados (código actual vs. plan objetivo)

- Atribución frágil: regex `Ref: gclid--utm_source--utm_campaign` dentro del texto de WhatsApp,
  sin `tracking_session`, sin TTL, sin redirect propio.
- Conversión offline solo con GCLID crudo: falta soporte `wbraid`/`gbraid`, enhanced conversions
  for leads (hash SHA-256 de email/teléfono normalizado E.164), y persistencia de diagnóstico
  (`accepted`/`pending`/`partial_failure`/`failed`).
- Webhooks ejecutan lógica inline + `asyncio.create_task` "fire and forget": sin idempotencia,
  sin reintentos con backoff, sin dead-letter, sin auditoría.
- No existen tablas `inbound_events`, `outbound_deliveries`, `job_attempts`, `audit_logs`.
- No hay integración de Google Lead Forms todavía.
- El dashboard no muestra el embudo `lead -> conversación -> calificado -> venta`, ni latencia,
  ni estado de sincronización de conversiones.

## Arquitectura de destino (adaptada al stack existente)

- Se preserva el monorepo simple: `backend/` (FastAPI), `dashboard/` (Next.js), `baileys-server/`
  (Node). No se crea una estructura `apps/`+`packages/` Node nueva.
- Se introduce **Redis + RQ** (worker Python) como cola ligera para desacoplar los webhooks
  (que deben responder rápido y solo validar/deduplicar/encolar) de las llamadas externas
  (Google Ads upload, envío WhatsApp, reintentos). Es la adaptación más simple de "BullMQ" al
  stack Python ya existente; puede ajustarse a Celery si en implementación se prefiere.
- Nuevas tablas (vía Alembic): `tracking_sessions`, `inbound_events`, `outbound_deliveries`,
  `job_attempts`, `audit_logs`; se extiende `Lead` con `consent_at`, `source_confidence`,
  `wbraid`, `gbraid`, `funnel_stage`.
- Nuevos módulos de servicio: `services/tracking.py` (captura/redirect), `services/queue.py`
  (enqueue/dequeue RQ), mejora de `services/google_ads_service.py` (enhanced conversions).

## Fases y entregables (orden)

0. **Migrar base de código**: copiar `backend/`, `dashboard/`, `baileys-server/` de GoogleMaker
   a QuantSetters; ajustar `.env`/remotes/CORS; smoke test local (`docker-compose up`).
1. **ADR corto**: alcance MVP, ICP inicial, países, modelo de atribución con niveles de
   confianza, política de datos y retención (documento corto en `docs/`).
2. **Esquema de datos**: migraciones Alembic para las tablas nuevas y extensión de `Lead`.
3. **Cola/worker (Redis + RQ)**: mover llamadas externas del `asyncio.create_task` inline a
   jobs con reintentos exponenciales, límite por tenant y dead-letter queue.
4. **Tracking redirect propio**: endpoint/página que captura `gclid`/`wbraid`/`gbraid`/UTMs en
   un `tracking_session` (TTL) antes de abrir el deep link `wa.me`; reemplaza el regex `Ref:`.
5. **Conversión offline mejorada**: soporte `wbraid`/`gbraid`, enhanced conversions for leads
   (datos hasheados) cuando no hay click id, y persistencia de `conversion_events` con estado.
6. **Idempotencia de webhooks**: cada endpoint entrante (Baileys/WhatsApp, Google, Mercado Pago)
   valida firma, calcula clave `(tenant_id, provider, external_event_id)`, inserta en
   `inbound_events` único antes de encolar; responde 200/202 sin ejecutar llamadas externas.
7. **Google Lead Forms**: nuevo router webhook, dedup, crea `Lead`, encola plantilla de
   bienvenida por WhatsApp vía Baileys (SpeedLead WA).
8. **Dashboard de embudo**: nueva vista en `dashboard/app/dashboard` con
   `lead -> conversación -> calificado -> venta`, latencia p95, errores de atribución y estado
   de sync (`accepted`/`pending`/`partial_failure`/`failed`).
9. **Seguridad/consentimiento**: reutilizar `encryption.py` para tokens; agregar campos de
   consentimiento/fuente/opt-out y retención configurable por tenant.
10. **Pruebas**: unitarias (normalización/hash, dedupe, firma, cálculo de clave idempotente),
    integración (webhook -> cola -> worker -> mock Google Ads/Baileys), piloto con una cuenta
    por vertical antes de habilitar multi-cuenta masivo.

### Fuera de alcance de este MVP (Fase 2+, no se planifica en detalle aún)

- Migración de WhatsApp a Cloud API oficial de Meta (plantillas aprobadas, Business verification).
- Call2WA (integración de telefonía/llamadas perdidas).
- MicroCheckout WA (catálogo, pagos, Shopify).

## Notas

- Redis + RQ es una recomendación de simplicidad; puede reevaluarse por Celery si el equipo
  lo prefiere durante la implementación.
- El regex `Ref: gclid--utm--campaign` en `routers/webhooks.py` debe purgarse una vez el
  tracking redirect esté operativo (regla de auditoría proactiva del `AGENTS.md` de QSS).
