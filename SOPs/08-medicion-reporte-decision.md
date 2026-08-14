# SOP 08 — Medición, reporte y decisión go/no-go

## Objetivo

Consolidar los resultados de los 3 días de campaña y decidir, con datos, si se retoma la
construcción del producto (según [plan.md](/plan.md)) o se ajusta la oferta/mensaje/ICP antes de
invertir en desarrollo.

## Prerrequisitos

- Campaña finalizada o en curso avanzado (SOP 07), con al menos 1 día completo de datos para
  revisiones intermedias.
- Tracking de eventos funcionando desde el día 1 (SOP 06).

## Métricas a revisar

### Nivel campaña (Google Ads)
- Impresiones, clics, CTR, CPC promedio, costo total gastado.
- Search terms reales (qué buscó la gente) — identificar términos irrelevantes para negativizar
  si se corre una segunda ronda.
- Impression share (si disponible) para saber si el presupuesto fue el límite o el ranking/QS.

### Nivel embudo (GA4 / eventos)
| Etapa | Evento | Qué responde |
|-------|--------|---------------|
| Entrada | `view_landing` | ¿Cuánta gente llegó desde el anuncio? |
| Lead tibio | `submit_form_early_access` | ¿Cuántos dejaron datos? (tasa de conversión landing → form) |
| Vista upsell | `view_thankyou_upsell` | Confirma que el form funcionó correctamente |
| Lead caliente WhatsApp | `click_whatsapp_vip` | ¿Cuántos escribieron por WhatsApp? |
| Lead caliente agenda | `schedule_calcom` | ¿Cuántos agendaron llamada? |

### Métricas derivadas clave
- **Costo por lead calificado** = gasto total / cantidad de `submit_form_early_access`.
- **Costo por lead caliente** = gasto total / (`click_whatsapp_vip` + `schedule_calcom`).
- **Tasa de calor** = (leads calientes / leads tibios) — indica qué tan urgente resulta la oferta.
- **Entradas y salidas**: usar GA4 (tiempo en página, tasa de rebote de la landing) para detectar
  si el problema es de tráfico (mal targeting) o de oferta/copy (llegan pero no convierten).

## Pasos

1. **Exportar datos de Google Ads**: campaña, ad groups, keywords, search terms (últimos 3 días).
2. **Exportar datos de GA4**: conteo de cada uno de los 5 eventos, por día.
3. **Armar tabla de reporte corto** (ver plantilla abajo).
4. **Calcular métricas derivadas** (costo por lead calificado, costo por lead caliente, tasa de
   calor).
5. **Revisar search terms** para identificar intención real vs. ruido (candidatos a negativas o
   a nuevas keywords si se repite la prueba).
6. **Aplicar criterio de decisión** (sección siguiente) y documentar la conclusión.

## Plantilla de reporte

```
Periodo: [fecha inicio] - [fecha fin] (3 días)
Presupuesto gastado: S/ ___ de S/60
Impresiones: ___   Clics: ___   CTR: ___%   CPC prom.: S/ ___

Embudo:
  view_landing:                ___
  submit_form_early_access:    ___   (tasa vs. view_landing: ___%)
  view_thankyou_upsell:        ___
  click_whatsapp_vip:          ___
  schedule_calcom:             ___

Costo por lead calificado:  S/ ___
Costo por lead caliente:    S/ ___
Tasa de calor (caliente/tibio): ___%

Top 5 search terms:
  1. ...
  2. ...

Conclusión: GO / AJUSTAR / NO-GO
```

## Criterio de decisión (go/no-go)

- **GO (construir el producto)**: hubo al menos algunos leads calificados (`submit_form_early_access`)
  con costo razonable y **al menos 1-2 leads calientes reales** (WhatsApp o agenda) que confirman
  intención de compra, no solo curiosidad.
- **AJUSTAR (segunda ronda antes de construir)**: hay tráfico y clics, pero pocos o ningún lead
  calificado — revisar copy/oferta/formulario antes de gastar más presupuesto, o el CTR es muy
  bajo — revisar anuncios/keywords.
- **NO-GO / repensar oferta**: prácticamente no hubo tráfico relevante (mala señal de demanda de
  búsqueda) o hubo tráfico pero cero intención real (ningún lead calificado ni caliente) tras
  ajustar una vez.

## Entregable

- Reporte corto completado (plantilla anterior) con conclusión explícita GO/AJUSTAR/NO-GO.
- Lista de search terms relevantes para la siguiente ronda de campaña o para el copy del producto.

## Checklist de validación

- [ ] Los 5 eventos del embudo tienen datos consistentes (no hay huecos por fallas de tracking).
- [ ] El gasto reportado por Google Ads coincide aproximadamente con el presupuesto configurado.
- [ ] La conclusión (GO/AJUSTAR/NO-GO) está documentada y comunicada al equipo antes de tomar la
      siguiente acción (retomar [plan.md](/plan.md) o ajustar oferta).

## Notas/Riesgos

- Con una muestra pequeña (3 días, S/60) es normal tener pocos datos: dar más peso a la *calidad*
  de los leads (¿son del ICP real?) que a la cantidad.
- Si el tracking falló parcialmente, priorizar revisar el registro directo de leads (SOP 04) como
  fuente de verdad antes que solo GA4.
