# Journey de adquisicion dentro de Telegram

## Objetivo

Convertir trafico de anuncios en una primera experiencia de valor sin enviar al usuario a una
landing externa.

## Flujo principal

`anuncio -> deep link -> bienvenida -> consentimiento -> precalificacion -> clasificacion -> demo -> activacion -> primer valor`

## Estados

1. `started`: el usuario abrio el bot.
2. `consent_pending`: falta explicar automatizacion y tratamiento de datos.
3. `qualifying`: el bot hace preguntas cortas.
4. `classified`: existe un nicho y problema candidatos.
5. `accepted`: cumple las condiciones iniciales.
6. `needs_review`: requiere una persona antes de mostrar acciones sensibles.
7. `demo_opened`: se abrio la Mini App recomendada.
8. `activation_started`: el usuario inicio la configuracion.
9. `activated`: se completo la primera configuracion util.
10. `first_value`: el usuario ejecuto la accion que representa valor para el nicho.
11. `declined`, `opted_out` o `expired`: salida controlada.

## Deep links

El deep link debe identificar la fuente de adquisicion y la variante de mensaje sin incluir datos
personales. El backend debe validar, expirar y registrar el parametro antes de asociarlo al evento
`bot_started`.

## Conversacion

### Bienvenida

- Explicar en una frase que QuantSetters ayuda a operar y vender dentro de Telegram.
- Indicar que el usuario conversa con un bot automatizado.
- Mostrar que puede solicitar una persona.
- Pedir consentimiento solo para las finalidades necesarias.

### Precalificacion

Usar botones o respuestas cortas para reducir friccion:

1. Que operas en Telegram?
2. Que vendes, entregas o administras?
3. Que espacio usas: bot, canal, grupo o comunidad?
4. Que quieres mejorar primero: captar, calificar, vender, dar soporte, controlar acceso o renovar?
5. En que pais operas?

Permitir volver atras, corregir y abandonar sin penalizacion.

### Resultado

El bot debe mostrar:

- nicho detectado o incertidumbre;
- problema que entendio;
- por que recomienda una demo;
- que ocurrira al abrirla;
- boton para abrir la Mini App;
- boton para hablar con una persona.

No mostrar datos inventados como si fueran resultados reales.

## Handoff humano

Activar handoff si el usuario lo solicita, si el caso cae en `needs_review`, si hay conflicto de
respuestas o si aparecen alertas de finanzas, spam, datos o permisos. El operador recibe el resumen
estructurado y el consentimiento asociado.

## Recuperacion

- Si el usuario abandona, permitir `/start` para continuar desde el ultimo estado valido.
- Expirar sesiones incompletas y eliminar datos no necesarios segun la politica de retencion.
- No enviar recordatorios comerciales sin consentimiento y limite de frecuencia.
- Si la Mini App falla, mostrar una ruta de soporte y registrar el error.

## Eventos

- `telegram_ad_open`
- `bot_started`
- `qualification_started`
- `qualification_completed`
- `niche_detected`
- `prospect_accepted`
- `prospect_needs_review`
- `demo_opened`
- `activation_started`
- `activation_completed`
- `first_value_reached`
- `human_handoff_requested`
- `opt_out_requested`
- `qualification_abandoned`
- `mini_app_error`

## Criterios de aceptacion del prototipo

- Un usuario puede llegar desde un deep link y completar el bot sin salir de Telegram.
- El usuario entiende que conversa con automatizacion y puede pedir ayuda humana.
- El sistema clasifica o marca incertidumbre sin activar acciones sensibles automaticamente.
- El resultado abre la Mini App correspondiente con contexto del bot.
- Cada paso produce eventos trazables por tenant y sesion.
- El flujo puede reanudarse, cancelarse y expirar de forma controlada.
