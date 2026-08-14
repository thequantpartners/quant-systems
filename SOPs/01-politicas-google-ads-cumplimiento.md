# SOP 01 — Políticas de Google Ads y cumplimiento (anti-baneo)

## Objetivo

Asegurar que la landing, la página de upsell y los anuncios de la campaña de validación cumplan
las políticas de publicidad de Google Ads **antes** de escribir el copy final y lanzar, para
evitar rechazo de anuncios o, en el peor caso, suspensión de la cuenta. Este SOP debe leerse
**antes** de [03-landing-acceso-anticipado.md](/SOPs/03-landing-acceso-anticipado.md) y de
[07-campana-google-ads-search.md](/SOPs/07-campana-google-ads-search.md).

## Prerrequisitos

- Ninguno técnico; solo lectura atenta antes de redactar copy o publicar la landing.

## Fuentes oficiales (Centro de Políticas de Publicidad de Google Ads)

> La versión en inglés es la oficial para efectos de cumplimiento; los enlaces abren la página
> en el idioma configurado por el navegador.

- Visión general de políticas: https://support.google.com/adspolicy/answer/6008942
- **Misrepresentation** (tergiversación): https://support.google.com/adspolicy/answer/6020955
- **Data collection and use** (recolección y uso de datos): https://support.google.com/adspolicy/answer/6020956
- **Destination Requirements** (requisitos del destino/landing): https://support.google.com/adspolicy/answer/6368661
- **Abusing the ad network** (abuso de la red publicitaria / cloaking / páginas puente): https://support.google.com/adspolicy/answer/6020954
- **Suspensiones de cuenta y sistema de strikes**: https://support.google.com/adspolicy/answer/9841640

## Pasos (checklist de cumplimiento por política)

### 1. Misrepresentation (tergiversación / ofertas engañosas)

Prohíbe: omitir información relevante, ofertas que en realidad no están disponibles,
afirmaciones poco realistas o engañosas, no mostrar datos de contacto/dirección cuando aplica.

- [ ] No usar contadores, cupos ni mensajes de escasez salvo que exista una restricción real,
      definida y actualizada por el equipo.
- [ ] La landing no promete resultados de negocio garantizados ni cifras de ganancia/ROI que no
      se puedan sostener (evitar frases tipo "aumenta tus ventas 300%" sin evidencia).
- [ ] Se muestra el contacto real `partners@thequantpartners.com` en la landing.
- [ ] La oferta de implementación desde US$500 coincide con el anuncio y el alcance comercial
      aprobado; no presentar n8n como el producto ni prometer resultados.

### 2. Data collection and use (recolección y uso de datos)

Aplica porque el formulario (SOP 04) recolecta nombre, empresa, cargo, email y teléfono —
información personal que Google Ads exige manejar con cuidado.

- [ ] El sitio corre sobre **HTTPS** (certificado SSL válido) antes de publicar el formulario.
- [ ] Existe un aviso de privacidad/consentimiento visible antes de enviar el formulario,
      explicando qué datos se recolectan y para qué se usarán.
- [ ] No se recolecta información sensible adicional a la necesaria (no pedir DNI, RUC personal,
      datos financieros, etc. — solo lo definido en SOP 04).
- [ ] Los datos se almacenan en un canal razonablemente seguro (no expuestos públicamente, no en
      hojas de cálculo sin control de acceso compartidas abiertamente).

### 3. Destination Requirements (requisitos del destino/landing)

- [ ] **Destination not working**: la landing carga correctamente en navegadores y dispositivos
      comunes (probar mobile y desktop), sin errores HTTP.
- [ ] **Destination mismatch**: el dominio final de la landing coincide con el dominio que se
      mostrará en el anuncio (display URL); no hay redirecciones a un dominio distinto del anunciado.
- [ ] **Destination not crawlable**: la landing no bloquea a los rastreadores de Google (revisar
      `robots.txt` y que no haya muro de login/paywall que impida el acceso).
- [ ] **Destination not accessible**: la landing es accesible públicamente desde Perú (sin
      geo-bloqueo accidental, sin requerir VPN corporativa, etc.).
- [ ] **Destination experience**: navegación simple, sin pop-ups intrusivos, sin descargas
      automáticas de archivos, sin anuncios que no cumplan los Better Ads Standards
      (https://www.betterads.org/standards/).
- [ ] **Insufficient original content**: la landing tiene contenido propio y sustantivo (hero,
      cómo funciona, para quién es), no es solo un formulario aislado sin contexto (evitar parecer
      una "página puente").

### 4. Abusing the ad network (cloaking / páginas puente)

- [ ] La landing muestra a los usuarios exactamente el mismo contenido que vería el rastreador de
      Google (no hay "cloaking": contenido distinto para bots vs. usuarios reales).
- [ ] La landing no es una página cuyo único propósito sea redirigir a otro sitio o mostrar
      anuncios de terceros (no es una página "puente"/"gateway").

### 5. Buenas prácticas editoriales de los anuncios (RSA)

- [ ] Títulos y descripciones sin mayúsculas excesivas, sin signos de exclamación repetidos, sin
      símbolos decorativos que simulen alertas oficiales.
- [ ] No se usan marcas de terceros/competencia en los títulos sin autorización.
- [ ] No se afirma ser "#1" o usar superlativos no verificables sin evidencia sustentable.

## Aplicación específica a QuantSetters

- La landing debe filtrar servicios de ticket medio-alto/high-ticket que ya ejecuten campañas de
  generación de clientes potenciales en Google Ads y/o Meta Ads. No prometer ROAS, ventas,
  ingresos ni resultados específicos.
- El formulario (SOP 04) debe exigir consentimiento explícito para evaluación comercial y contacto
  por WhatsApp o correo, enlazando `/privacidad`. La landing debe estar en HTTPS desde el día 1.
- El deep link de WhatsApp (SOP 05) no debe usarse como "final URL" del anuncio (los anuncios de
  Search deben apuntar a la landing, no directo a `wa.me`), para evitar problemas de "Destination
  mismatch"/"Destination not crawlable" con un enlace que no es una página web rastreable.

## Entregable

- Checklist de esta política marcado y resuelto antes de publicar la landing y lanzar la campaña.

## Checklist de validación

- [ ] Las 5 categorías de política anteriores fueron revisadas y no hay incumplimientos pendientes.
- [ ] HTTPS activo y verificado con candado en el navegador.
- [ ] Aviso de privacidad visible antes del formulario.
- [ ] No hay claims de escasez o resultados sin evidencia verificable.
- [ ] El contacto real, el aviso de privacidad y el disclaimer comercial están visibles.

## Notas/Riesgos

- Las políticas de Google Ads pueden actualizarse; ante cualquier duda, revisar directamente el
  Centro de Políticas de Publicidad (enlaces arriba) en vez de asumir que este resumen sigue
  vigente al 100%.
- Un rechazo de anuncio se puede corregir y reenviar sin penalización grave; una suspensión de
  cuenta por violaciones graves (ej. misrepresentation reiterada) es mucho más costosa de
  revertir — priorizar prevención sobre corrección posterior.
