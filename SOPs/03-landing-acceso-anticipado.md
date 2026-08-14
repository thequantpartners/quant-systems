# SOP 03 — Landing page de sistemas de ventas

## Objetivo

Construir la landing que reciba tráfico de campañas de clientes potenciales y convierta visitantes
calificados en solicitudes de conversación sobre un sistema de ventas instalado desde US$500.

## Prerrequisitos

- Definición de ICP confirmada: empresas de servicios medio-alto/high-ticket que ya ejecutan
  campañas de generación de clientes potenciales en Google Ads y/o Meta Ads, reciben leads por
  WhatsApp/CRM y tienen equipo comercial para dar seguimiento.
- Copy base del problema/promesa de Quant Setters (mensaje único, sin detalle técnico completo).
- Acceso al repo `QuantSetters` (stack Next.js del dashboard existente) para crear la página.
- [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md) leído
  antes de redactar el copy (evitar afirmaciones/urgencia que violen políticas).
- SOP 06 (tracking) revisado antes de publicar, para no perder eventos desde el día 1.

## Pasos

1. **Definir ruta**: crear la página en `/` (o `/acceso-anticipado`) dentro del proyecto Next.js,
   como página estática/simple, sin dependencias nuevas del backend de producto.
2. **Estructurar el contenido** (mobile-first, una sola columna en `base`, ajustando en `md+`):
   - **Hero**: título con el problema, subtítulo en segunda persona, precio de implementación
     visible y CTA primario claro.
   - **Cómo funciona** (breve, 3-4 pasos, sin revelar arquitectura técnica): de dónde vienen los
     leads (Google Ads), qué hace el sistema (atribuye y responde/organiza por WhatsApp), qué gana
     el negocio (no perder leads, responder rápido, medir de dónde vienen las ventas).
   - **Para quién es** (bullets del ICP: inmobiliarias, clínicas, colegios, servicios profesionales).
   - **Oferta**: bloque con el CTA y el formulario embebido (ver SOP 04).
   - **Footer**: contacto `partners@thequantpartners.com`, enlace a `/privacidad` y disclaimer
     de que no se garantizan ventas, ingresos, leads ni ROAS y que la gestión de Ads es aparte.
3. **CTA primario**: usar un texto orientado a conversación y alcance, como
   **"Quiero revisar mi sistema de ventas"**,
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
