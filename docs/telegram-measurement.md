# Medicion del producto Telegram-native

## Objetivo

Medir si el sistema produce activacion y primer valor dentro de Telegram, no solo aperturas del bot
o conversaciones iniciadas.

## Identidad de medicion

Cada evento debe incluir:

- `event_id` idempotente;
- `occurred_at`;
- `tenant_id` cuando exista;
- `session_id`;
- `telegram_user_id` pseudonimizado o referenciado de forma segura;
- `bot_id` o `bot_connection_id`;
- `chat_id` solo cuando sea necesario y con controles de acceso;
- `source` y variante de deep link;
- `niche`;
- `template_id`;
- `consent_state`;
- `schema_version`.

No enviar tokens, mensajes completos, datos financieros ni contenido sensible a herramientas de
analitica.

## Eventos del embudo

| Evento | Definicion | Pregunta |
| --- | --- | --- |
| `telegram_ad_open` | El deep link fue abierto | La fuente atrae usuarios? |
| `bot_started` | El usuario inicio el bot | El anuncio convierte a una conversacion? |
| `qualification_started` | Inicio de preguntas | La bienvenida reduce friccion? |
| `qualification_completed` | Completo las preguntas minimas | El flujo se entiende? |
| `niche_detected` | Se produjo una clasificacion | El sistema entiende el contexto? |
| `prospect_accepted` | Cumplio condiciones iniciales | Atraemos prospectos aptos? |
| `demo_opened` | Se abrio la Mini App | El resultado se presenta bien? |
| `demo_action_completed` | Completo la accion central de demo | La demo demuestra valor? |
| `activation_started` | Inicio configuracion de plantilla | Quiere usar el sistema? |
| `activation_completed` | Completo configuracion minima | Puede llegar al primer resultado? |
| `first_value_reached` | Ejecuto la accion de valor del nicho | El producto resuelve algo real? |
| `human_handoff_requested` | Solicito una persona | Donde falla la automatizacion? |
| `qualification_abandoned` | Abandono antes de clasificar | Que pregunta o paso genera fuga? |
| `opt_out_requested` | Solicito dejar de recibir automatizacion | Estamos respetando preferencias? |
| `mini_app_error` | La Mini App no pudo completar una accion | Hay fallas tecnicas o de compatibilidad? |

## Definiciones de primer valor

- Educadores/coaches: ficha de prospecto calificado y siguiente accion de inscripcion.
- Crypto: onboarding o caso de soporte organizado, sin decision financiera automatizada.
- Trading/forex: estado de membresia o renovacion pendiente con siguiente accion operativa, sin
  generar senales ni recomendaciones.

## Metricas de activacion

### Adquisicion

- tasa de `bot_started` por apertura;
- costo por bot iniciado;
- tasa de `qualification_started`.

### Calificacion

- finalizacion de preguntas;
- abandono por paso;
- distribucion de nicho y confianza;
- porcentaje `accepted`, `needs_review` y `not_fit`;
- correcciones del usuario.

### Demo

- apertura por nicho;
- finalizacion de accion principal;
- tiempo hasta accion;
- porcentaje que inicia activacion;
- handoff solicitado.

### Producto

- activacion completada;
- primer valor alcanzado;
- tiempo desde bot hasta primer valor;
- errores por dispositivo y Mini App;
- retencion de activados a 7 y 30 dias;
- tareas manuales reportadas como reducidas.

## Panel inicial

El primer panel debe mostrar por nicho y fuente:

1. usuarios que iniciaron el bot;
2. prospectos aceptados;
3. demos abiertas;
4. demos completadas;
5. activaciones completadas;
6. primer valor;
7. handoffs;
8. opt-outs y errores.

No mezclar usuarios de prueba con usuarios reales. No usar una conversion agregada si no se puede
trazar hasta una sesion y tenant.

## Criterios de experimento

Antes de construir las tres demos de produccion:

- probar al menos una demo con operadores y prospectos de cada nicho;
- definir un umbral de finalizacion de demo;
- definir un umbral de activacion;
- registrar manualmente si el operador identifica ahorro de tiempo o una oportunidad comercial;
- revisar falsos positivos y casos sensibles.

La decision go/no-go debe combinar senal cuantitativa y entrevistas, no solo volumen de clics.
