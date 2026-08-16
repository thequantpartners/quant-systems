# SOP 03 — Landing page de sistemas de ventas

## Objetivo

Construir la landing que convierta academias y comunidades premium de formación que ya operan en
Telegram en solicitudes calificadas para evaluar una Mini App y un sistema operativo desde US$1,000.

## Prerrequisitos

- Definición de ICP confirmada: academias y comunidades premium de formación que operan en Telegram,
  tienen una oferta pagada y sufren un problema repetitivo de onboarding, acceso, soporte, cohortes
  o renovaciones.
- Copy base del problema/promesa de Quant Setters (mensaje único, sin detalle técnico completo).
- Acceso al repo `QuantSetters` (stack Next.js del dashboard existente) para crear la página.
- [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md) leído
  antes de redactar el copy (evitar afirmaciones/urgencia que violen políticas).
- SOP 06 (tracking) revisado antes de publicar, para no perder eventos desde el día 1.

## Pasos

1. **Definir ruta**: crear la página en `/` (o `/acceso-anticipado`) dentro del proyecto Next.js,
   como página estática/simple, sin dependencias nuevas del backend de producto.
2. **Estructurar el contenido** (mobile-first, una sola columna en `base`, ajustando en `md+`):
   - **Hero**: título centrado en convertir una comunidad existente en una operación de inscripción,
     acceso y seguimiento dentro de Telegram; mostrar implementación desde US$1,000 y CTA primario.
   - **Orden narrativo**: abrir con el resultado buscado, hacer visible el costo de dejar el
     problema igual, explicar qué recibe el cliente, mostrar beneficios concretos, describir el
     proceso y resolver objeciones con FAQs antes del CTA final.
   - **Cómo funciona** (breve, 3-4 pasos, sin revelar arquitectura técnica): se identifica dónde
     se pierden horas u oportunidades en Telegram, se define una métrica antes/después, se diseña
     el sistema con las herramientas existentes y se mide el cambio.
   - **Para quién es** (academias, cohortes, membresías premium y formación profesional con Telegram)
     y para quién no es.
   - **FAQs**: responder alcance, beneficio diario, medición, precio, integración, garantías y
     límites de la oferta con lenguaje directo, sin promesas de ingresos o ROI.
   - **Objeciones y confianza**: incluir un bloque breve de "lo que sí / lo que no" para aclarar
     que no es un bot genérico ni una promesa de ventas automáticas; el disclaimer debe reforzar
     confianza cerca de la oferta, no interrumpir el hero.
   - **Oferta**: bloque con el CTA hacia `/implementar`, donde vive el diagnóstico y formulario
     (ver SOP 04).
   - **Gobernanza y confianza**: explicar propiedad de datos, permisos, exportación, retención,
     supervisión humana de IA y revisión legal cuando corresponda.
   - **Footer**: contacto `partners@thequantpartners.com`, enlace a `/privacidad` y disclaimer
     de que no se garantizan matrículas, ingresos, ROI, cumplimiento legal ni resultados específicos.
3. **CTA primario**: usar un texto orientado a conversación y alcance, como
   **"Diagnosticar mi operación"**,
   estado `hover`/`focus-visible`/`active` definidos, sin depender solo del color para indicar
   interactividad.
4. **Responsive y accesibilidad**:
   - Mobile-first: `base` → `sm` → `md` → `lg`. Prohibido scroll horizontal (usar `max-w-*`,
     `min-w-0`, `break-words`).
   - Labels reales para cualquier input visible en el hero (si hay mini-formulario ahí), y
     jerarquía de encabezados en orden (`h1` único, `h2` por sección).
   - Contraste AA mínimo en textos sobre fondo de color.
5. **Captura de `gclid`/UTMs de entrada**: al cargar la página, leer parámetros de la URL
   (`gclid`, `utm_source`, `utm_campaign`, `utm_medium`, `utm_content`, `utm_term`) y persistirlos
   (ej. `localStorage`/cookie de corta duración) para adjuntarlos al enviar el formulario (SOP 04)
   y para el evento `view_landing` (SOP 06).
6. **QA visual**: revisar en mobile real o emulado (375px), tablet (768px) y desktop (1280px+).
7. **QA de políticas**: repasar el checklist de
   [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md)
   (HTTPS, aviso de privacidad, sin urgencia falsa, contenido original suficiente) antes de
   publicar.

## Entregable

- Página `/` (o `/acceso-anticipado`) publicada y accesible vía la URL final que usará el anuncio.
- Copy final aprobado (problema, promesa, cómo funciona, para quién es, oferta).
- Captura de `gclid`/UTMs funcionando (verificable en consola/localStorage).

## Checklist de validación

- [ ] CTA visible sin hacer scroll en mobile (above the fold).
- [ ] Ningún elemento genera scroll horizontal en 375px de ancho.
- [ ] `gclid` y UTMs se capturan correctamente al entrar con una URL de prueba con esos parámetros.
- [ ] El anuncio, la landing y el CTA describen la misma oferta y el mismo perfil de cliente.
- [ ] Aviso de privacidad/consentimiento visible antes del formulario.
- [ ] El disclaimer comercial no contiene garantías ni cifras no demostradas.
- [ ] El sitio corre sobre HTTPS.

## Notas/Riesgos

- No usar `window`/`document` durante el render del servidor si el componente es SSR; usar
  `useEffect` o guards para la lectura de `gclid`/UTMs.
- Mantener el copy simple: el objetivo es medir intención, no explicar toda la arquitectura del
  sistema (evitar sobre-prometer detalles técnicos que aún no existen).
