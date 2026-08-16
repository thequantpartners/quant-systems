# SOP 04 — Diagnóstico y captura de solicitudes

## Objetivo

Capturar el flujo de formación, su frecuencia, consecuencia y métrica objetivo, y dejar un registro
atribuible (`gclid`/UTMs) para medir la campaña, con consentimiento explícito para el contacto.

## Prerrequisitos

- Landing publicada con el diagnóstico y el bloque de contacto (SOP 03).
- Endpoint FastAPI de producción y tabla `implementation_requests` disponibles.
- La ruta local de Next.js es solo un fallback de desarrollo y no debe recibir tráfico pagado.

## Campos del diagnóstico y formulario

| Campo | Tipo | Obligatorio | Validación |
|-------|------|-------------|------------|
| Situación a ordenar | select | Sí | onboarding, acceso, soporte, cohortes o renovaciones |
| Herramientas actuales | texto largo | Sí | respuesta concreta |
| Cuello de botella | texto largo | Sí | respuesta concreta |
| Frecuencia | select | Sí | frecuencia del problema |
| Consecuencia | texto largo | Sí | impacto operativo actual |
| Métrica objetivo | texto largo | Sí | métrica antes/después |
| Resultado deseado | texto largo | Sí | mejora operativa concreta |
| Ingreso mensual de la oferta/comunidad | select | Sí | rango aproximado |
| Presupuesto de implementación | select | Sí | desde US$1,000 |
| Nombre | texto | Sí | mínimo 2 caracteres |
| Empresa | texto | Sí | mínimo 2 caracteres |
| Email | email | Sí | formato email válido |
| WhatsApp/Teléfono | tel | Sí | `+51 9XXXXXXXX`, guardar en E.164 |
| Consentimiento de evaluación | checkbox | Sí | enlace a `/privacidad` |
| Consentimiento de contacto | checkbox | Sí | correo, WhatsApp o llamada |

## Pasos

1. **Implementar el diagnóstico** en dos pasos: contexto operativo y datos de contacto.
2. **Validar en frontend** con las reglas existentes; no agregar dependencias nuevas.
3. **Validar consentimiento** en navegador y backend; guardar ambos consentimientos.
4. **Normalizar el teléfono** a formato E.164 (`+519XXXXXXXX`) antes de enviar/guardar.
5. **Adjuntar atribución** (`gclid` y UTMs) capturada al entrar a la landing.
6. **Guardar la solicitud** en `implementation_requests`, con timestamp, consentimientos,
   atribución y resumen del impacto. La persistencia ocurre antes de la alerta de Telegram.
7. **Disparar** `submit_implementation_request` inmediatamente después de un guardado exitoso.
8. **Mostrar el éxito** en el mismo flujo y ofrecer el deep link del bot de Telegram (SOP 05).
9. **Notificar internamente**: el backend intenta enviar una alerta al chat privado de Telegram
   después del commit; un fallo de Telegram no debe borrar la solicitud guardada.
10. **Mostrar errores claros** sin perder los datos escritos por el usuario.

## Entregable

- Diagnóstico y formulario funcionales, con validación y estados accesibles.
- Solicitudes persistidas y consultables por el equipo.
- Atribución y consentimientos almacenados junto a cada solicitud.

## Checklist de validación

- [ ] Cada control tiene un `label` asociado y estados `focus-visible`, `disabled` y `error`.
- [ ] El teléfono se guarda normalizado en formato E.164.
- [ ] `gclid`/UTMs llegan correctamente al registro guardado.
- [ ] El envío muestra éxito y CTA de Telegram sin perder la atribución.
- [ ] `submit_implementation_request` aparece en GTM/GA4.
- [ ] El registro conserva ambos consentimientos.
- [ ] La landing usa el FastAPI de Railway y no el sink local.

## Notas/Riesgos

- No construir aún el backend completo del producto; esta tabla cubre la validación.
- Verificar `NEXT_PUBLIC_API_BASE_URL` antes de comprar tráfico. Si falta, el fallback local no es
  persistencia de producción.
- Recordar el requisito de HTTPS y aviso de privacidad de
  [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md).
