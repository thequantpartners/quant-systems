# Quant Setters — Contexto para agentes

## Objetivo

Quant Setters valida una oferta para empresas de Peru que invierten en Google Ads y reciben leads
por WhatsApp. La validacion ocurre antes de construir el producto completo:

`Google Ads -> lead -> WhatsApp -> conversacion calificada -> venta`

La oferta inicial es acceso anticipado a **AttribWA + SpeedLead WA**, descritos en
[`plan.md`](./plan.md).

## Estado actual

- La superficie comercial implementada es [`landings/`](./landings/); el backend FastAPI de
  validación ya está desplegado en Railway.
- La landing vive en una app independiente Next.js + TypeScript.
- Rutas actuales: `/`, `/soluciones`, `/implementar`, `/gracias` y `/privacidad`.
- La landing captura `gclid` y UTMs en `localStorage` y el formulario de implementación envía al
  backend Railway.
- Eventos de la oferta vigente: `view_landing`, `submit_implementation_request`,
  `view_implementation_success` y `click_telegram_implementation`.
- El backend persiste `implementation_requests` en Postgres e intenta alertar al chat privado de
  Telegram después del commit.
- El dominio de producción es `https://quantsystems.thequantpartners.com/`; GA4/GTM requiere
  terminar la creación del contenedor y publicar su configuración.

## Arquitectura objetivo

Monorepo simple, sin `apps/` ni `packages/`:

- `backend/`: FastAPI + SQLAlchemy; `User` funciona como tenant en MVP.
- `dashboard/`: Next.js para setup, campañas, logs, planes y futuro embudo.
- `baileys-server/`: Node/Baileys para WhatsApp durante el MVP.
- Fases siguientes: Alembic, Redis + RQ, tracking redirect propio, idempotencia de webhooks,
  conversiones offline mejoradas y dashboard de embudo.

No migrar el backend a Node/Fastify ni reemplazar Baileys durante el MVP. WhatsApp Cloud API,
Call2WA y MicroCheckout quedan fuera de alcance.

## Reglas de trabajo

1. Leer primero [`plan.md`](./plan.md) y los SOPs relevantes en [`SOPs/`](./SOPs/).
2. Para la validacion seguir el orden: políticas → fundamentos → landing → formulario → gracias →
   tracking → campaña → checklist.
3. No prometer resultados garantizados ni usar escasez falsa. El cupo de “primeras 10 empresas”
   debe ser real.
4. No agregar dependencias sin necesidad. La landing usa las dependencias declaradas en su propio
   `package.json`.
5. Mantener mobile-first, accesibilidad, foco visible y cero scroll horizontal.
6. No guardar secretos. Usar variables `NEXT_PUBLIC_*` solo para valores publicables y variables de
   servidor para integraciones privadas.
7. El sink temporal de [`landings/app/api/leads/route.ts`](./landings/app/api/leads/route.ts) no es
   persistencia de producción; el flujo operativo usa el endpoint FastAPI de implementación.
8. No implementar el backend completo de AttribWA/SpeedLead WA dentro de `landings/`.

## Comandos

Desde `landings/`:

```bash
npm install
npm run dev
npm run build
npm run start
```

## Criterio de finalizacion de la validacion

Antes de lanzar anuncios deben estar definidos el almacenamiento de leads, WhatsApp, Cal.com,
GA4/GTM, aviso de privacidad, dominio HTTPS y el responsable de revisar leads durante la prueba.

## Estructura de modulos n8n

- `modules/` contiene los proyectos y automatizaciones n8n del sistema.
- Este archivo define el contexto y las reglas generales de todo QuantSetters.
- Cada modulo debe tener su propio `AGENTS.md` con su objetivo, alcance, arquitectura,
  variables de entorno, credenciales requeridas, workflows y comandos de operacion.
- Las reglas de un `AGENTS.md` mas especifico aplican dentro de su carpeta, siempre que no
  contradigan las reglas globales de este archivo.
