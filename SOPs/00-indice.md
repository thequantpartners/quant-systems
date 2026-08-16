# SOP 00 — Índice general: Validación "Ads First, Build Then"

## Objetivo

Servir de mapa y orden de ejecución para validar la oferta de **Quant Systems** con una landing
page + campaña de Google Ads Search, antes de construir automatizaciones verticales. La oferta
vigente es una implementación de agentes operativos para comunidades de trading, forex y educación
financiera que usan Telegram. Meta: gastar poco (S/60 en 3 días), medir bien y decidir con datos.

## Estrategia (resumen)

1. Un visitante llega a la **landing** vía anuncio de Google Ads Search.
2. Ve el problema/solución y un CTA para revisar su sistema de ventas.
3. Completa un **diagnóstico de calificación** y deja sus datos → se guarda con `gclid`/UTMs.
4. Tras el guardado, ve el resumen y un botón al bot privado de Telegram (lead caliente).
5. Se mide todo el embudo (landing → diagnóstico → solicitud → éxito → Telegram) para decidir go/no-go.

## Orden de ejecución de los SOPs

| # | SOP | Qué resuelve |
|---|-----|--------------|
| 1 | [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md) | Cumplir políticas de Google Ads (anti-rechazo/anti-baneo) — leer antes de escribir copy |
| 2 | [02-fundamentos-tecnicos-google-ads.md](/SOPs/02-fundamentos-tecnicos-google-ads.md) | Referencia técnica experta: tipos de campaña, puja, keywords, Quality Score, RSA — leer antes de crear la campaña |
| 3 | [03-landing-acceso-anticipado.md](/SOPs/03-landing-acceso-anticipado.md) | Construir la landing page y el CTA 1 |
| 4 | [04-formulario-calificacion-leads.md](/SOPs/04-formulario-calificacion-leads.md) | Definir campos, validación y almacenamiento del lead |
| 5 | [05-pagina-gracias-upsell-vip.md](/SOPs/05-pagina-gracias-upsell-vip.md) | Construir la página de agradecimiento/upsell con CTA 2 |
| 6 | [06-tracking-analitica-eventos.md](/SOPs/06-tracking-analitica-eventos.md) | Instrumentar eventos, GA4/GTM y conversiones de Google Ads |
| 7 | [07-campana-google-ads-search.md](/SOPs/07-campana-google-ads-search.md) | Armar y lanzar la campaña Search (S/60 / 3 días) |
| 8 | [08-medicion-reporte-decision.md](/SOPs/08-medicion-reporte-decision.md) | Leer resultados y decidir go/no-go |
| 9 | [09-checklist-lanzamiento.md](/SOPs/09-checklist-lanzamiento.md) | Checklist final antes de encender la campaña |
| 10 | [10-conexion-cli-google-ads.md](/SOPs/10-conexion-cli-google-ads.md) | Configurar y operar la conexión CLI/API reutilizable de Google Ads |

Ejecutar en este orden: **1 → 2 (leer antes de escribir copy/crear campaña) → 3 → 4 → 5 → 6 → 7 → 9
(checklist) → lanzar → 8 (después de 3 días)**.

## Alcance y no-alcance

**Sí incluye esta fase:**
- Landing + formulario + página de upsell (front simple, sin backend complejo).
- Tracking de eventos y atribución básica (`gclid`/UTMs) para leer resultados de campaña.
- Campaña Google Ads Search con presupuesto acotado (S/60 / 3 días).

**No incluye esta fase** (queda en [plan.md](/plan.md) como fase siguiente si hay demanda validada):
- Backend completo (colas, idempotencia de webhooks, enhanced conversions, multi-tenant real).
- Integración con Baileys/WhatsApp Cloud API para automatizar conversaciones.
- Dashboard de embudo del producto final.

## Criterio de decisión rápido

Si al final de los 3 días (ver [08-medicion-reporte-decision.md](/SOPs/08-medicion-reporte-decision.md))
hay señal suficiente de solicitudes calificadas y conversaciones iniciadas en Telegram, se retoma la
construcción según [plan.md](/plan.md).
Si no hay señal, se ajusta oferta/mensaje/ICP y se corre una segunda ronda antes de construir.

## Notas

- Todos los SOPs siguen el mismo formato: Objetivo → Prerrequisitos → Pasos → Entregable →
  Checklist de validación → Notas/Riesgos.
- Los SOPs 01 (políticas) y 02 (fundamentos técnicos) son documentos de referencia/consulta: se
  leen antes de escribir copy (01) y antes de crear la campaña en Google Ads (02), pero no tienen
  un "entregable" propio como los demás — sus decisiones se reflejan en los SOPs 03 y 07.
- Se recomienda crear/actualizar `docs/PROJECT_CONTEXT.md` con esta estrategia vigente una vez
  la landing y la campaña estén activas (fuera del alcance estricto de estos SOPs).
