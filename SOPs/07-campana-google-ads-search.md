# SOP 07 — Campaña Google Ads Search (S/60 / 3 días)

## Objetivo

Definir y lanzar una prueba acotada de Google Ads Search para medir demanda de implementaciones
operativas en Telegram para comunidades de trading, forex y educación financiera.

## Prerrequisitos

- SOPs 01 a 06 revisados y sin bloqueadores.
- Cuenta de Google Ads activa, facturación aprobada y conversiones disponibles.
- Landing publicada en `https://quantsystems.thequantpartners.com/`.
- Responsable asignado para revisar leads, Telegram y gasto diariamente.

## ICP y targeting

- **Ubicación**: Perú; concentrar en Lima solo si Keyword Planner muestra mejor densidad.
- **Idioma**: español.
- **Audiencia**: operadores o administradores de comunidades de trading, forex y educación
  financiera que usan Telegram y sufren seguimiento manual, soporte repetitivo o problemas de
  coordinación.
- No anunciar señales, recomendaciones de inversión, rentabilidad, apuestas o ganancias.

## Estructura de campaña propuesta

```text
Campaña: QuantSystems - Search - Validación Telegram
  Tipo: Solo Red de Búsqueda
  Presupuesto: S/20/día x 3 días = S/60 máximo
  Puja: Maximize Clicks o Manual CPC con tope bajo
  Ubicación: Perú (o Lima Metropolitana, según Keyword Planner)
  Idioma: Español

  Ad Group 1: Automatización Telegram
    "automatizar telegram comunidad"
    "agente telegram para comunidad"
    "organizar mensajes telegram"

  Ad Group 2: Soporte y seguimiento
    "automatizar soporte telegram"
    "seguimiento de leads telegram"
    "responder mensajes telegram negocio"

  Ad Group 3: Trading y educación
    "gestionar comunidad trading telegram"
    "automatizar comunidad forex"
    "gestionar alumnos telegram"
```

Validar cada término en Keyword Planner y eliminar búsquedas sin intención comercial. No repartir
el presupuesto entre tres grupos si el CPC estimado impide obtener una muestra útil; en ese caso,
concentrar la prueba en el grupo con mayor intención.

## Anuncios RSA

Crear al menos un RSA por grupo, con:

- 5-8 títulos de máximo 30 caracteres.
- 2-3 descripciones de máximo 90 caracteres.
- Mensaje centrado en reducir trabajo manual, ordenar conversaciones y medir una operación.
- Sin garantías, superlativos no demostrados, señales financieras ni marcas de terceros.
- URL final a la landing, nunca directamente a Telegram.

Convención de URL:

```text
https://quantsystems.thequantpartners.com/
  ?utm_source=google
  &utm_medium=cpc
  &utm_campaign=quantsystems-search-<grupo>
  &utm_content=<nombre_anuncio>
  &utm_term={keyword}
```

## Negativas iniciales

Aplicar a nivel de campaña y revisar diariamente:

```text
gratis, curso, empleo, trabajo, pdf, que es, señales, señal, resultados garantizados,
apuestas, casino, betting
```

## Pasos

1. Validar volumen y CPC en Keyword Planner.
2. Crear campaña, grupos, keywords, negativas, sitelinks y callouts.
3. Configurar `submit_implementation_request` como conversión principal y
   `click_telegram_implementation` como señal secundaria.
4. Probar manualmente cada URL con UTMs y verificar el formulario.
5. Completar el checklist del SOP 09.
6. Activar S/20 diarios y pausar al alcanzar S/60 o al terminar el tercer día.
7. Revisar diariamente gasto, clics, search terms, solicitudes y conversaciones de Telegram.

## Entregable

- Campaña activa con estructura, keywords, negativas, RSA y extensiones verificadas.
- UTMs coherentes con SOP 03 y SOP 06.
- Registro diario de gasto y métricas del embudo.

## Checklist de validación

- [ ] Keyword Planner revisado y CPC compatible con S/60.
- [ ] Facturación activa y presupuesto máximo configurado.
- [ ] Ubicación restringida a Perú o Lima según decisión documentada.
- [ ] Conversiones visibles en Google Ads.
- [ ] Negativas aplicadas.
- [ ] URLs finales probadas con UTMs.
- [ ] Al menos un RSA por grupo sin advertencias críticas.
- [ ] Responsable operativo confirmado.

## Notas/Riesgos

Con S/60 y tres días la muestra será pequeña. Priorizar la calidad de las búsquedas y de los leads
sobre la significancia estadística. Si el CPC es demasiado alto, reducir grupos antes de aumentar
presupuesto.
