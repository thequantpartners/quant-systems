# SOP 06 — Tracking, analítica y eventos

## Objetivo

Instrumentar la landing y la página de upsell para medir todo el embudo y poder atribuir
resultados a la campaña de Google Ads Search, sin construir el sistema completo de atribución
del producto final.

## Prerrequisitos

- Cuenta de Google Analytics 4 (GA4) creada o reutilizable.
- Google Tag Manager (GTM) instalado en el proyecto Next.js (o `gtag.js` directo si se prefiere
  evitar una dependencia/contenedor adicional).
- Acceso a la cuenta de Google Ads donde correrá la campaña (SOP 07), para vincular conversiones.

## Eventos a definir

| Evento | Dónde se dispara | Qué mide |
|--------|-------------------|----------|
| `view_landing` | Carga de la landing (SOP 03) | Tráfico que llegó desde el anuncio |
| `submit_form_early_access` | Envío exitoso del formulario (SOP 04) | Lead tibio (dejó datos) |
| `view_thankyou_upsell` | Carga de la página de gracias/upsell (SOP 05) | Confirmación de conversión del form |
| `click_whatsapp_vip` | Clic en botón WhatsApp (SOP 05) | Lead caliente vía WhatsApp |
| `schedule_calcom` | Clic en enlace/confirmación de agenda Cal.com (SOP 05) | Lead caliente vía agenda |

## Pasos

1. **Instalar GTM** (o `gtag.js`) en el `layout`/`_app` del proyecto Next.js, cargando solo en
   cliente (evitar `window`/`document` en render SSR).
2. **Configurar GA4** dentro de GTM (o directo), con las 5 métricas de eventos anteriores como
   eventos personalizados de GA4.
3. **Capturar `gclid`/UTMs**: reutilizar la captura de SOP 03 (paso 5) para adjuntar estos valores
   como parámetros de los eventos `submit_form_early_access` y `schedule_calcom` (los de mayor
   valor de conversión), permitiendo cruce posterior con Google Ads.
4. **Vincular GA4 con Google Ads**: activar el vínculo de cuentas en la configuración de Google
   Ads (Herramientas > Configuración > Cuentas vinculadas) para importar conversiones de GA4.
5. **Definir conversiones a importar en Google Ads**:
   - Conversión principal: `submit_form_early_access` (lead tibio calificado).
   - Conversión secundaria/valor alto: `click_whatsapp_vip` y/o `schedule_calcom` (lead caliente).
6. **Verificar con modo Preview/DebugView**: probar el flujo completo (landing → form → upsell →
   clic WhatsApp/Cal.com) y confirmar que los 5 eventos aparecen en GTM Preview y GA4 DebugView.
7. **Documentar UTMs de la campaña**: definir la convención de UTMs que usará el anuncio de
   Google Ads (ver SOP 07) para que coincidan con lo que la landing espera leer.

## Entregable

- GTM/GA4 configurado y publicado (contenedor en modo "Live", no solo Preview).
- Conversiones vinculadas en Google Ads listas para usarse como columna de "Conversiones" en los
  reportes de campaña.
- Documento corto de convención de UTMs (puede vivir en este mismo SOP, sección "Convención de
  UTMs" más abajo, actualizada una vez definida en SOP 07).

## Convención de UTMs (a completar al ejecutar SOP 07)

```
utm_source=google
utm_medium=cpc
utm_campaign=quantsetters-search-<vertical>
utm_content=<nombre_anuncio>
utm_term={keyword}
```

## Checklist de validación

- [ ] Los 5 eventos se disparan en el orden correcto durante una prueba manual del embudo.
- [ ] `gclid` llega correctamente a `submit_form_early_access` en al menos una prueba con URL
      de anuncio real o simulada.
- [ ] GA4 muestra los eventos en tiempo real (Informes > Tiempo real).
- [ ] Las conversiones importadas aparecen disponibles en Google Ads (pueden tardar hasta 24h en
      poblarse con datos reales, pero deben existir configuradas antes de lanzar la campaña).

## Notas/Riesgos

- Si no hay tiempo de configurar el vínculo GA4↔Google Ads antes de lanzar, lanzar igual y
  medir con GA4 directamente; no bloquear el lanzamiento de la campaña por esto, pero
  completarlo cuanto antes para no perder atribución de los primeros días.
- Evitar sobre-instrumentar: estos 5 eventos son suficientes para esta validación; no agregar
  eventos adicionales que compliquen el análisis en 3 días de prueba.
