# SOP 05 — Página de agradecimiento y siguiente paso

## Objetivo

Convertir al lead tibio (ya dejó sus datos) en lead caliente, con una acción directa de contacto
(WhatsApp) o agenda (Cal.com), sin introducir urgencia artificial.

## Prerrequisitos

- Formulario del SOP 04 funcionando y redirigiendo correctamente tras un envío exitoso.
- Enlace de agenda Cal.com configurado (evento tipo "Llamada Quant Setters - Acceso anticipado",
  duración sugerida 15-20 min).
- Número de WhatsApp de negocio definido para el deep link.

## Pasos

1. **Crear la ruta** `/gracias` (o `/acceso-anticipado/gracias`) en el mismo proyecto Next.js.
2. **Mensaje principal**: confirmación de que sus
   datos fueron recibidos.
3. **Siguiente paso (CTA 2)**: invitar a revisar el tramo entre el anuncio y la venta, sin prometer
   resultados ni usar escasez no documentada.
4. **Botón de WhatsApp**: deep link `https://wa.me/51XXXXXXXXX?text=...` con mensaje prellenado
   que incluya referencia a "acceso anticipado" para reconocer el origen en la conversación
   manual (mientras no existe atribución automática vía backend).
5. **Enlace/botón de agenda Cal.com**: como alternativa al WhatsApp directo, embebido o como botón
   que abre el enlace de Cal.com en nueva pestaña.
6. **Disparar evento** `view_thankyou_upsell` al cargar la página, y `click_whatsapp_vip` /
   `schedule_calcom` al hacer clic en cada botón respectivo (ver SOP 06).
7. **Diseño**: mantener consistencia visual con la landing (SOP 03), jerarquía clara, botones con
   estados `hover`/`focus-visible`/`active`, responsive mobile-first.

## Entregable

- Página de agradecimiento/upsell publicada y alcanzable solo tras completar el formulario (o
  accesible directamente para pruebas QA).
- Botones de WhatsApp y Cal.com funcionando y con tracking de clic.

## Checklist de validación

- [ ] El CTA 2 coincide con la oferta de implementación y no contiene garantías.
- [ ] El botón de WhatsApp abre la app/web de WhatsApp con el número y mensaje correctos.
- [ ] El enlace de Cal.com abre el calendario correcto (verificar zona horaria Perú).
- [ ] Los eventos `view_thankyou_upsell`, `click_whatsapp_vip` y `schedule_calcom` se disparan
      correctamente (verificar en GTM preview/GA4 DebugView).
- [ ] La página es responsive y no genera scroll horizontal en mobile.

## Notas/Riesgos

- No añadir cupos, contadores ni mensajes de urgencia sin una restricción real documentada.
- Esta página es el punto de mayor señal de intención: priorizar que cargue rápido y sin
  fricción, ya que el usuario ya demostró interés en el paso anterior.
