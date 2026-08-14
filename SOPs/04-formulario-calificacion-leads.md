# SOP 04 — Formulario de calificación de leads

## Objetivo

Capturar datos suficientes para calificar la intención del lead y dejar registro atribuible
(`gclid`/UTMs) para medir la campaña, con consentimiento explícito para el contacto comercial.

## Prerrequisitos

- Landing publicada con el bloque de oferta y espacio para el formulario (SOP 03).
- Definición de dónde se almacenará el lead (tabla simple o servicio ligero; no requiere el
  backend completo de producto).

## Campos del formulario

| Campo | Tipo | Obligatorio | Validación |
|-------|------|-------------|------------|
| Nombre | texto | Sí | mínimo 2 caracteres |
| Empresa | texto | Sí | mínimo 2 caracteres |
| Cargo | texto | Sí | mínimo 2 caracteres |
| Email | email | Sí | formato email válido |
| WhatsApp/Teléfono | tel | Sí | formato peruano (+51 9XXXXXXXX), normalizar a E.164 |
| Leads mensuales | select | Sí | rango aproximado |
| Canales de Ads | select | Sí | Google Ads, Meta Ads o ambos |
| Inversión mensual en Ads | select | Sí | rango aproximado |
| Valor promedio de una venta | select | Sí | rango aproximado |
| Consentimiento | checkbox | Sí | contacto por WhatsApp/correo y enlace a `/privacidad` |

## Pasos

1. **Implementar el formulario** en la landing (SOP 03), usando componentes existentes de
   `src/components/ui` si el proyecto ya los tiene (shadcn-ui) y `Label` + `htmlFor` en cada
   campo.
2. **Validación en frontend**: usar `zod` si el repo ya lo tiene disponible; si no, validar con
   reglas simples equivalentes (no agregar dependencia nueva sin justificarlo).
3. **Validar consentimiento**: el navegador y el endpoint deben rechazar el envío si no está marcado.
   Guardar el hecho del consentimiento junto al lead.
4. **Normalizar el teléfono** a formato E.164 (+51...) antes de enviar/guardar.
5. **Adjuntar atribución**: al enviar, incluir `gclid` y UTMs capturados en SOP 03 (paso 5) junto
   con los datos del formulario.
6. **Guardar el lead**: persistir en el almacenamiento definido (tabla `early_access_leads` simple
   o equivalente), con timestamp, `gclid`/UTMs, y los campos del formulario.
7. **Disparar evento de tracking** `submit_form_early_access` (ver SOP 06) inmediatamente después
   de un guardado exitoso.
8. **Redirigir** al usuario a la página de agradecimiento/upsell (SOP 05) tras el envío exitoso.
9. **Manejo de errores**: mostrar mensaje de error claro si falla la validación o el guardado
   (estado `error` visible, sin perder los datos ya escritos por el usuario).
9. **Notificación interna** (opcional pero recomendado): enviar aviso por email o WhatsApp al
   equipo cuando entra un nuevo lead, para poder darle seguimiento manual mientras no existe el
   producto automatizado.

## Entregable

- Formulario funcional integrado en la landing, con validación, guardado y redirect.
- Registro de leads accesible para revisión manual (tabla o export simple).

## Checklist de validación

- [ ] Cada input tiene `Label` asociado (accesible por lector de pantalla).
- [ ] Estados `hover`, `focus-visible`, `disabled` (durante envío) y `error` implementados.
- [ ] El teléfono se guarda normalizado en formato E.164.
- [ ] El `gclid`/UTMs de la URL de entrada llega correctamente al registro guardado (probar con
      una URL de prueba con `gclid` ficticio).
- [ ] Al enviar, redirige a la página de SOP 05 sin recargar toda la app de forma abrupta.
- [ ] El evento `submit_form_early_access` se ve disparado en el panel de depuración de GTM/GA4.
- [ ] El registro guarda que el consentimiento fue aceptado y los canales autorizados.

## Notas/Riesgos

- No se necesita backend de producción robusto todavía: priorizar velocidad de implementación
  sobre arquitectura (esto es validación, no el sistema final).
- Evitar pedir más campos de los definidos: cada campo extra reduce la tasa de conversión del
  formulario.
- Recordar el requisito de Data collection and use de
  [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md): HTTPS
  y aviso de privacidad antes de recolectar estos datos.
