# SOP 07 — Campaña Google Ads Search (S/60 / 3 días)

## Objetivo

Definir y lanzar una campaña de Google Ads Search acotada en presupuesto y tiempo, orientada a
generar tráfico calificado hacia la landing (SOP 03) y medir intención real del ICP definido.

## Prerrequisitos

- **Lectura obligatoria previa**: [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md)
  (para no violar políticas de Google Ads) y
  [02-fundamentos-tecnicos-google-ads.md](/SOPs/02-fundamentos-tecnicos-google-ads.md) (para
  configurar tipo de campaña, puja, concordancia de keywords y estructura con criterio de
  experto, no adivinando).
- Cuenta de Google Ads activa con facturación configurada.
- Landing (SOP 03), formulario (SOP 04) y página de upsell (SOP 05) publicadas y con tracking
  verificado (SOP 06).
- Vínculo GA4↔Google Ads configurado o en proceso (SOP 06).

## ICP y targeting

- **Ubicación**: Perú (evaluar si concentrar en Lima Metropolitana para mayor densidad de clics
  con presupuesto bajo, o dejar nacional si el volumen de búsquedas lo justifica).
- **Idioma**: Español.
- **Verticales objetivo** (ICP): inmobiliarias, clínicas/consultorios, colegios/institutos,
  servicios profesionales (estudios legales, contables, agencias) — empresas que ya invierten en
  Google Ads y reciben leads por WhatsApp.

## Estructura de campaña propuesta

> Decisiones de tipo de campaña, puja y concordancia de keywords tomadas según
> [02-fundamentos-tecnicos-google-ads.md](/SOPs/02-fundamentos-tecnicos-google-ads.md).

```
Campaña: QuantSetters - Search - Validación
  Tipo: Solo Red de Búsqueda (Search), sin Red de Display
  Presupuesto: S/20/día x 3 días = S/60 total
  Estrategia de puja: Maximizar clics (fase de aprendizaje, sin datos de conversión aún)
                      o CPC manual con tope bajo si se prefiere más control del gasto
  Ubicación: Perú (o Lima Metropolitana si se busca mayor concentración)
  Idioma: Español
  Extensiones: Sitelinks (ej. "Cómo funciona", "Acceso anticipado"), Llamada (si aplica), Frase destacada

  Ad Group 1: Inmobiliarias
    Keywords (frase/exacta, intención alta):
      - "leads whatsapp inmobiliaria"
      - "responder leads google ads whatsapp"
      - "automatizar whatsapp inmobiliaria"
    Negativas sugeridas: gratis, curso, empleo, trabajo

  Ad Group 2: Clínicas / consultorios
    Keywords:
      - "leads whatsapp clinica"
      - "citas whatsapp google ads"
      - "automatizar whatsapp consultorio"
    Negativas sugeridas: gratis, curso, empleo, trabajo

  Ad Group 3: Servicios profesionales / colegios
    Keywords:
      - "gestionar leads whatsapp"
      - "no perder leads google ads"
      - "responder rapido whatsapp leads"
    Negativas sugeridas: gratis, curso, empleo, trabajo
```

> Nota: las keywords propuestas son punto de partida; deben validarse/ajustarse con Google
> Keyword Planner antes de lanzar, priorizando volumen mínimo viable y CPC compatible con el
> presupuesto de S/60/3 días. Ningún ad group debe compartir keywords con otro (ver estructura de
> cuenta en SOP 02).

## Anuncios (RSA — Responsive Search Ads)

Por cada ad group, crear 1 RSA (idealmente 2, ver SOP 02) con:
- 5-8 títulos (incluir variantes con "WhatsApp", "Google Ads", "leads", "no pierdas clientes"),
  respetando el límite de 30 caracteres por título.
- 2-3 descripciones (mencionar la promesa central y el CTA de acceso anticipado), máximo 90
  caracteres cada una.
- URL final: landing de SOP 03, con UTMs según convención definida en SOP 06:
  `?utm_source=google&utm_medium=cpc&utm_campaign=quantsetters-search-<vertical>&utm_content=<nombre_anuncio>&utm_term={keyword}`
- Revisar el checklist editorial de
  [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md) antes
  de enviar los anuncios a revisión.

## Pasos

1. **Validar keywords** en Keyword Planner: volumen de búsqueda y CPC estimado por término,
   ajustando la lista si el CPC promedio no permite al menos ~15-20 clics con S/60.
2. **Crear la campaña** en la interfaz de Google Ads con la estructura anterior (3 ad groups).
3. **Configurar conversiones** apuntando a las importadas de GA4 (SOP 06) antes de lanzar.
4. **Configurar negativas a nivel de campaña** (términos genéricos no relacionados: "gratis",
   "curso", "empleo", "trabajo", "pdf", "que es").
5. **Revisar checklist de lanzamiento** (SOP 09) antes de activar la campaña.
6. **Lanzar** con presupuesto diario S/20 durante 3 días (pausar automáticamente al día 3 o
   revisar manualmente para no exceder el gasto).
7. **Monitorear diariamente**: revisar gasto, clics, CTR y search terms cada día de la prueba
   (no esperar al final de los 3 días para la primera revisión).

## Entregable

- Campaña activa en Google Ads con la estructura, keywords, negativas y anuncios definidos.
- UTMs coherentes con lo que la landing espera capturar (SOP 03/06).
- Reporte diario mínimo de gasto y clics durante los 3 días.

## Checklist de validación

- [ ] Presupuesto diario configurado en S/20 (tope S/60 total en 3 días).
- [ ] Ubicación geográfica restringida a Perú (o Lima, según decisión final).
- [ ] Conversiones de GA4 visibles como opción al configurar el seguimiento de conversiones.
- [ ] Negativas básicas aplicadas antes de lanzar.
- [ ] URLs finales de los anuncios llevan a la landing con UTMs correctos (probar cada URL).
- [ ] Extensiones de anuncio (sitelinks al menos) configuradas.
- [ ] Tipo de campaña, estrategia de puja y concordancia de keywords coinciden con lo definido en
      SOP 02.

## Notas/Riesgos

- Con S/60/3 días el volumen de datos será bajo: priorizar señal cualitativa (search terms,
  leads reales) sobre significancia estadística.
- Si el CPC del ICP resulta muy alto para el presupuesto, considerar acotar a una sola vertical
  (la de mayor intención/menor CPC) en vez de repartir entre 3 ad groups.
