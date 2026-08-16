# SOP 09 — Checklist de lanzamiento

## Objetivo

Última verificación antes de encender la campaña de Google Ads, asegurando que políticas,
landing, tracking y campaña están correctamente configurados para no perder los primeros días de
datos (el presupuesto y tiempo de prueba son limitados: S/60 / 3 días).

## Prerrequisitos

- SOPs 01 a 07 completados.

## Checklist

### Políticas de Google Ads (SOP 01)
- [ ] Checklist de [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md)
      revisado sin incumplimientos pendientes (Misrepresentation, Data collection and use,
      Destination Requirements, Abusing the ad network).
- [ ] Si se menciona un cupo, es real y está documentado internamente. Si no existe, no se publica.

### Fundamentos técnicos (SOP 02)
- [ ] Tipo de campaña, estrategia de puja y concordancia de keywords configurados según
      [02-fundamentos-tecnicos-google-ads.md](/SOPs/02-fundamentos-tecnicos-google-ads.md)
      (Search, Maximize Clicks/Manual CPC, frase/exacta).

### Landing (SOP 03)
- [ ] Página publicada en la URL final que usarán los anuncios.
- [ ] CTA principal describe el diagnóstico de la operación y coincide con los anuncios.
- [ ] Responsive verificado en mobile (375px), tablet (768px) y desktop.
- [ ] Sin scroll horizontal en ningún breakpoint.
- [ ] Aviso de privacidad/consentimiento visible antes del formulario.
- [ ] Sitio corre sobre HTTPS.

### Formulario (SOP 04)
- [ ] Los campos definidos están presentes y validan correctamente, incluido el consentimiento.
- [ ] El teléfono se normaliza a formato E.164.
- [ ] El envío exitoso muestra la pantalla de éxito y el CTA al bot de Telegram.
- [ ] Los leads quedan guardados y son consultables por el equipo.
- [ ] `gclid`/UTMs de la URL de entrada llegan correctamente al lead guardado.

### Pantalla de éxito y CTA (SOP 05)
- [ ] El CTA 2 describe el siguiente paso sin garantías ni escasez artificial.
- [ ] El botón de Telegram abre el bot correcto.

### Tracking (SOP 06)
- [ ] GTM/GA4 publicado en modo "Live" (no solo Preview).
- [ ] Los eventos (`view_landing`, `submit_implementation_request`,
      `view_implementation_success`, `click_telegram_implementation`) se confirmaron en una
      prueba end-to-end manual.
- [ ] Conversiones vinculadas/disponibles en la cuenta de Google Ads.
- [ ] Convención de UTMs coincide entre lo que la landing espera y lo que llevarán los anuncios.

### Campaña (SOP 07)
- [ ] Facturación activa en la cuenta de Google Ads.
- [ ] Presupuesto diario configurado en S/20 (tope S/60 total).
- [ ] Ubicación geográfica restringida a Perú (o Lima, según decisión).
- [ ] Negativas básicas aplicadas.
- [ ] URLs finales de los anuncios verificadas manualmente (abren la landing con UTMs correctos).
- [ ] Al menos 1 RSA activo por ad group, sin advertencias de aprobación pendiente.
- [ ] Keyword Planner revisado y CPC compatible con el presupuesto de S/60.

### Operación durante la prueba
- [ ] Responsable asignado para revisar alertas y responder manualmente por Telegram
      durante los 3 días (mientras no existe automatización de respuesta).
- [ ] SLA de revisión definido y probado con un lead de prueba.
- [ ] Revisión diaria de gasto y clics programada (no esperar al día 3 para la primera revisión).

## Entregable

- Checklist completo marcado, sin pendientes críticos, antes de activar la campaña.

## Notas/Riesgos

- Cualquier ítem sin marcar en "Políticas", "Tracking" o "Formulario" debe resolverse **antes**
  de lanzar: con solo 3 días de prueba, un día sin datos correctos es el 33% de la muestra
  perdida, y un incumplimiento de políticas puede rechazar los anuncios y retrasar el arranque.
- Si algo del checklist de campaña no puede resolverse a tiempo (ej. facturación pendiente de
  aprobación), posponer el lanzamiento en vez de arrancar con configuración incompleta.
