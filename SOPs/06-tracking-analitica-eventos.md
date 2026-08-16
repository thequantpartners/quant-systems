# SOP 06 — Tracking, analítica y eventos

## Objetivo

Instrumentar la landing y la pantalla de éxito para medir el embudo de Google Ads Search y atribuir
solicitudes y conversaciones de Telegram, sin construir el sistema completo de atribución del
producto final.

## Prerrequisitos

- Cuenta de Google Analytics 4 (GA4) creada o reutilizable.
- Google Tag Manager (GTM) instalado en el proyecto Next.js (o `gtag.js` directo si se prefiere
  evitar una dependencia/contenedor adicional).
- Acceso a la cuenta de Google Ads donde correrá la campaña (SOP 07), para vincular conversiones.

## Eventos a definir

| Evento | Dónde se dispara | Qué mide |
|--------|-------------------|----------|
| `view_landing` | Carga de la landing (SOP 03) | Tráfico que llegó desde el anuncio |
| `submit_implementation_request` | Envío exitoso del formulario (SOP 04) | Solicitud calificada |
| `view_implementation_success` | Carga de la pantalla de éxito (SOP 05) | Confirmación de conversión del form |
| `click_telegram_implementation` | Clic en el bot de Telegram (SOP 05) | Lead caliente vía Telegram |

## Pasos

1. **Instalar GTM** (o `gtag.js`) en el `layout`/`_app` del proyecto Next.js, cargando solo en
   cliente (evitar `window`/`document` en render SSR).
2. **Configurar GA4** dentro de GTM (o directo), con los eventos anteriores como eventos
   personalizados de GA4. La conversión principal es `submit_implementation_request` y la
   conversión de intención alta es `click_telegram_implementation`.
3. **Capturar `gclid`/UTMs**: reutilizar la captura de SOP 03 para adjuntar estos valores
   como parámetros de `submit_implementation_request` y `click_telegram_implementation`, permitiendo
   cruce posterior con Google Ads.
4. **Vincular GA4 con Google Ads**: activar el vínculo de cuentas en la configuración de Google
   Ads (Herramientas > Configuración > Cuentas vinculadas) para importar conversiones de GA4.
5. **Definir conversiones a importar en Google Ads**:
   - Conversión principal: `submit_implementation_request` (solicitud calificada).
   - Conversión secundaria/valor alto: `click_telegram_implementation` (lead caliente).
6. **Verificar con modo Preview/DebugView**: probar el flujo completo (landing → diagnóstico →
   solicitud → éxito → clic Telegram) y confirmar los eventos en GTM Preview y GA4 DebugView.
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

- [ ] Los eventos se disparan en el orden correcto durante una prueba manual del embudo.
- [ ] `gclid` llega correctamente a `submit_implementation_request` en al menos una prueba con URL
      de anuncio real o simulada.
- [ ] GA4 muestra los eventos en tiempo real (Informes > Tiempo real).
- [ ] Las conversiones importadas aparecen disponibles en Google Ads (pueden tardar hasta 24h en
      poblarse con datos reales, pero deben existir configuradas antes de lanzar la campaña).

## Notas/Riesgos

- El vínculo GA4↔Google Ads y la disponibilidad de las conversiones deben confirmarse antes de
  lanzar. No iniciar tráfico pagado si solo existe el modo Preview.
- Evitar sobre-instrumentar: estos 4 eventos son suficientes para esta validación; no agregar
  eventos adicionales que compliquen el análisis en 3 días de prueba.
