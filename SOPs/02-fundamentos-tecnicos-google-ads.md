# SOP 02 — Fundamentos técnicos de Google Ads (referencia experta)

## Objetivo

Servir como referencia técnica para que cualquier persona o agente que ejecute
[07-campana-google-ads-search.md](/SOPs/07-campana-google-ads-search.md) construya la campaña
con criterio de experto (tipos de campaña, puja, concordancia de keywords, Quality Score,
anuncios, estructura de cuenta, conversiones/atribución), en vez de adivinar configuraciones.

## Prerrequisitos

- Ninguno técnico; se recomienda leer junto con
  [01-politicas-google-ads-cumplimiento.md](/SOPs/01-politicas-google-ads-cumplimiento.md) antes
  de crear la campaña.

## Fuentes oficiales (Centro de Ayuda de Google Ads)

- Tipos de campaña: https://support.google.com/google-ads/answer/2567043
- Estrategias de puja: https://support.google.com/google-ads/answer/2472725
- Quality Score: https://support.google.com/google-ads/answer/6167118
- Responsive Search Ads (RSA): https://support.google.com/google-ads/answer/7684791
- Campañas Display (contexto/comparación): https://support.google.com/google-ads/answer/2404190
- Modelos de atribución: https://support.google.com/google-ads/answer/6259715

## 1. Tipos de campaña

| Tipo | Objetivo típico | Cuándo usar |
|------|------------------|-------------|
| **Search** | Texto en resultados de búsqueda | Captar demanda existente/activa (usuarios que ya buscan la solución); control total de keywords; setup simple, sin necesidad de assets ricos. |
| **Performance Max** | Todos los canales de Google desde una campaña, optimizado por IA | Cuando ya existe historial de conversiones/datos para que la IA optimice; requiere assets variados (imágenes, video, texto). No recomendado sin historial de conversión. |
| **Display** | Anuncios de imagen en sitios/apps/YouTube/Gmail | Awareness/remarketing a gran escala; no apto para captar intención de búsqueda activa. |
| **Video** | Anuncios en YouTube | Awareness, consideración o "Drive conversions" con video; requiere producción de video. |
| **Demand Gen** | Anuncios visuales en feeds de Google (Discover, YouTube, Gmail) | Generar demanda nueva con creatividades atractivas, más orientado a descubrimiento que a intención activa. |
| **Shopping** | Anuncios de producto con feed | E-commerce con catálogo de productos; no aplica (QuantSetters no vende producto físico vía feed). |
| **App** | Promoción de instalación/acciones en apps | Solo si el objetivo es instalar una app; no aplica a esta validación. |

**Decisión para esta validación**: **Search**, porque el objetivo es captar intención activa de
búsqueda ("leads whatsapp inmobiliaria", etc.) del ICP definido, con control total de keywords y
sin necesidad de historial de conversiones ni assets de video/imagen que las campañas
automatizadas (Performance Max/Demand Gen) requieren para funcionar bien.

## 2. Estrategias de puja (bidding)

| Estrategia | Tipo | Cuándo usarla |
|------------|------|----------------|
| **Manual CPC** | Manual | Control total del CPC por keyword/grupo; recomendable cuando se quiere limitar gasto exacto sin datos previos. |
| **Maximize Clicks** | Automatizada (Smart) | Maximizar clics dentro de un presupuesto diario fijo; ideal para cuentas nuevas sin historial de conversión, como esta validación. |
| **Enhanced CPC (ECPC)** | Híbrida | Ajusta automáticamente las pujas manuales al alza/baja según probabilidad de conversión; útil como paso intermedio antes de Smart Bidding completo. |
| **Target CPA** | Smart Bidding | Optimiza conversiones a un costo por adquisición objetivo; requiere historial de conversiones suficiente para aprender. |
| **Target ROAS** | Smart Bidding | Optimiza valor de conversión a un retorno de inversión publicitaria objetivo; requiere seguimiento de valor de conversión e historial. |
| **Maximize Conversions** | Smart Bidding | Gasta el presupuesto completo maximizando conversiones sin CPA objetivo; requiere algo de historial para no aprender "a ciegas". |
| **Maximize Conversion Value** | Smart Bidding | Igual que el anterior pero optimizando valor total de conversión. |

**Decisión para esta validación**: **Maximize Clicks** o **Manual CPC** con tope bajo. Los
Smart Bidding orientados a conversión (Target CPA/ROAS, Maximize Conversions/Value) necesitan
historial de conversiones para aprender bien — con solo 3 días y S/60 no hay datos suficientes,
y usarlos prematuramente puede gastar el presupuesto "aprendiendo" en vez de generando clics
medibles.

## 3. Concordancia de keywords (match types)

| Tipo | Sintaxis | Comportamiento |
|------|----------|-----------------|
| **Amplia (Broad)** | `palabra clave` | Alcance más amplio; Google usa señales de intención para decidir qué búsquedas activan el anuncio (puede incluir búsquedas no literalmente relacionadas). Requiere vigilancia estrecha de search terms. |
| **De frase (Phrase)** | `"palabra clave"` | Coincide con búsquedas que incluyen el significado de la keyword, en cualquier orden/con palabras adicionales, pero manteniendo la intención central. |
| **Exacta (Exact)** | `[palabra clave]` | Coincide con búsquedas que tienen el mismo significado o intención que la keyword, de forma más restringida. |
| **Negativas (Negative)** | `-palabra` o listas negativas | Excluye búsquedas que contienen esos términos; no activan el anuncio. |

**Decisión para esta validación**: empezar con **frase y exacta** (mayor control de gasto e
intención, dado el presupuesto acotado) y aplicar negativas básicas desde el día 1; evitar
concordancia amplia sin supervisión diaria de search terms.

## 4. Quality Score

Puntaje de diagnóstico (escala 1-10) a nivel de keyword, calculado a partir de 3 componentes:

1. **Expected CTR** (CTR esperado): probabilidad de que el anuncio reciba clic.
2. **Ad relevance** (relevancia del anuncio): qué tan bien el anuncio coincide con la intención
   de búsqueda.
3. **Landing page experience** (experiencia de la landing): qué tan relevante y útil es la
   landing para quien hace clic.

**Importante**: Quality Score **no es un input directo de la subasta** ni un KPI a optimizar
per se; es una herramienta de diagnóstico. Se usa aquí para detectar si el problema de una
keyword es de anuncio (relevancia/CTR) o de landing (experiencia), y así saber qué ajustar.

## 5. Anuncios RSA (Responsive Search Ads)

- Hasta **15 títulos** (30 caracteres cada uno) y hasta **4 descripciones** (90 caracteres cada
  una); rutas de visualización (paths) hasta 15 caracteres cada una.
- Recomendación oficial: al menos **2-3 RSA por grupo de anuncios**, con **Ad Strength**
  "Good"/"Excellent" (mejorar de "Poor" a "Excellent" se asocia a ~15% más clics/conversiones en
  promedio, según Google).
- Si hay texto que debe aparecer siempre (ej. marca "Quant Setters"), se puede **fijar (pin)** a
  una posición específica de título o descripción; usar con moderación para no limitar las
  combinaciones que prueba Google.

**Decisión para esta validación**: 1 RSA por ad group como mínimo viable en 3 días de prueba,
apuntando a 2 si el tiempo lo permite, revisando Ad Strength antes de lanzar.

## 6. Extensiones / assets

- **Sitelinks**: enlaces adicionales (ej. "Cómo funciona", "Acceso anticipado").
- **Callouts**: frases destacadas cortas (ej. "Respuesta rápida por WhatsApp").
- **Structured snippets**: listas categorizadas (ej. Servicios: Atribución, WhatsApp, Reportes).
- **Call**: extensión de llamada, si se define un número de contacto telefónico además de WhatsApp.

**Decisión para esta validación**: al menos sitelinks y callouts, ya que aportan Quality Score /
Ad Strength con bajo esfuerzo de implementación.

## 7. Estructura de cuenta

- Preferir **grupos de anuncios temáticamente ajustados** ("tightly themed"): cada ad group
  agrupa keywords de una sola intención/tema (ej. por vertical del ICP), no mezclar temas
  distintos en un mismo grupo.
- Evitar solapamiento de keywords entre ad groups de la misma campaña (compiten entre sí en la
  subasta interna, ineficiencia de presupuesto).
- Aplicar **negativas a nivel de campaña** para exclusiones válidas en todos los grupos (ej.
  "gratis", "empleo") y **negativas a nivel de grupo** para evitar canibalización entre grupos.

## 8. Seguimiento de conversiones y atribución

- El **conversion tracking** de Google Ads debe configurarse antes de lanzar (vía conversiones
  importadas de GA4, ver [06-tracking-analitica-eventos.md](/SOPs/06-tracking-analitica-eventos.md)),
  para poder leer resultados reales, no solo clics/impresiones.
- **Modelos de atribución**: el modelo por defecto actual de Google Ads es **Data-driven**
  (distribuye el crédito de conversión según el aporte real de cada interacción, usando datos
  históricos de la cuenta), a diferencia de **Last click** (100% del crédito al último clic).
  Con muy pocos datos (3 días), el modelo data-driven puede tener menos precisión — se recomienda
  no sobre-interpretar la atribución fina y enfocarse en los conteos brutos de eventos (SOP 08).

## 9. Segmentación de audiencias (contexto, no usado en esta validación)

Tipos disponibles en Google Ads (relevantes para fases futuras con más presupuesto/datos):
**in-market** (intención de compra activa detectada), **affinity** (intereses a largo plazo),
**segmentos personalizados** (custom intent, por keywords/URLs de interés), **remarketing**
(quienes ya visitaron el sitio), **customer match** (listas propias de contacto). En una campaña
Search pura y acotada como esta, se recomienda **no** añadir capas de audiencia todavía (mantener
el alcance abierto a toda búsqueda relevante); reevaluar en una fase posterior con más datos.

## Aplicación a QuantSetters (resumen de decisiones ya tomadas en el SOP de campaña)

| Elemento | Decisión |
|----------|----------|
| Tipo de campaña | Search |
| Estrategia de puja | Maximize Clicks o Manual CPC |
| Concordancia de keywords | Frase y exacta, negativas desde el día 1 |
| RSA por grupo | 1 (mínimo viable), idealmente 2 |
| Extensiones | Sitelinks + callouts |
| Estructura | 1 campaña, ad groups por vertical del ICP (sin solapamiento de keywords) |
| Audiencias | Ninguna (alcance abierto) |
| Atribución | Vigilar conteos brutos de eventos más que atribución fina data-driven |

## Entregable

- Este documento sirve de referencia; no genera un entregable propio, pero sus decisiones deben
  reflejarse literalmente en [07-campana-google-ads-search.md](/SOPs/07-campana-google-ads-search.md).

## Checklist de validación

- [ ] Quien configura la campaña leyó las secciones 1 a 8 antes de tocar la interfaz de Google Ads.
- [ ] Las decisiones de la tabla "Aplicación a QuantSetters" coinciden con lo configurado en la
      campaña real.

## Notas/Riesgos

- Este SOP resume conceptos estables del Help Center de Google Ads; ante cambios de producto
  (Google Ads actualiza frecuentemente nombres/funciones), verificar contra los enlaces oficiales
  si algo no coincide con la interfaz actual.
- No se debe usar Smart Bidding orientado a conversión (Target CPA/ROAS) en esta validación por
  falta de historial: forzarlo puede desperdiciar presupuesto en la fase de aprendizaje del
  algoritmo en vez de generar datos de clics/leads útiles.
