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
- [ ] El cupo "10 empresas" es real y documentado internamente.

### Fundamentos técnicos (SOP 02)
- [ ] Tipo de campaña, estrategia de puja y concordancia de keywords configurados según
      [02-fundamentos-tecnicos-google-ads.md](/SOPs/02-fundamentos-tecnicos-google-ads.md)
      (Search, Maximize Clicks/Manual CPC, frase/exacta).

### Landing (SOP 03)
- [ ] Página publicada en la URL final que usarán los anuncios.
- [ ] CTA principal con el texto exacto acordado.
- [ ] Responsive verificado en mobile (375px), tablet (768px) y desktop.
- [ ] Sin scroll horizontal en ningún breakpoint.
- [ ] Aviso de privacidad/consentimiento visible antes del formulario.
- [ ] Sitio corre sobre HTTPS.

### Formulario (SOP 04)
- [ ] Los campos definidos están presentes y validan correctamente, incluido el consentimiento.
- [ ] El teléfono se normaliza a formato E.164.
- [ ] El envío exitoso redirige a la página de agradecimiento/upsell.
- [ ] Los leads quedan guardados y son consultables por el equipo.
- [ ] `gclid`/UTMs de la URL de entrada llegan correctamente al lead guardado.

### Página de upsell (SOP 05)
- [ ] El CTA 2 describe el siguiente paso sin garantías ni escasez artificial.
- [ ] Botón de WhatsApp abre el chat correcto con mensaje prellenado.
- [ ] Enlace de Cal.com funciona y muestra franjas horarias correctas (zona horaria Perú).

### Tracking (SOP 06)
- [ ] GTM/GA4 publicado en modo "Live" (no solo Preview).
- [ ] Los 5 eventos (`view_landing`, `submit_form_early_access`, `view_thankyou_upsell`,
      `click_whatsapp_vip`, `schedule_calcom`) se confirmaron en una prueba end-to-end manual.
- [ ] Conversiones vinculadas/disponibles en la cuenta de Google Ads.
- [ ] Convención de UTMs coincide entre lo que la landing espera y lo que llevarán los anuncios.

### Campaña (SOP 07)
- [ ] Facturación activa en la cuenta de Google Ads.
- [ ] Presupuesto diario configurado en S/20 (tope S/60 total).
- [ ] Ubicación geográfica restringida a Perú (o Lima, según decisión).
- [ ] Negativas básicas aplicadas.
- [ ] URLs finales de los anuncios verificadas manualmente (abren la landing con UTMs correctos).
- [ ] Al menos 1 RSA activo por ad group, sin advertencias de aprobación pendiente.

### Operación durante la prueba
- [ ] Responsable asignado para revisar leads entrantes y responder manualmente por WhatsApp
      durante los 3 días (mientras no existe automatización de respuesta).
- [ ] Revisión diaria de gasto y clics programada (no esperar al día 3 para la primera revisión).

## Entregable

- Checklist completo marcado, sin pendientes críticos, antes de activar la campaña.

## Notas/Riesgos

- Cualquier ítem sin marcar en "Políticas", "Tracking" o "Formulario" debe resolverse **antes**
  de lanzar: con solo 3 días de prueba, un día sin datos correctos es el 33% de la muestra
  perdida, y un incumplimiento de políticas puede rechazar los anuncios y retrasar el arranque.
- Si algo del checklist de campaña no puede resolverse a tiempo (ej. facturación pendiente de
  aprobación), posponer el lanzamiento en vez de arrancar con configuración incompleta.
