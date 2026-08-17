# Modelo inicial de precalificacion inteligente

## Objetivo

Detectar si el prospecto opera un negocio real en Telegram, identificar cual de los tres nichos
encaja mejor y recomendar una Mini App sin depender solo de palabras clave.

## Datos minimos solicitados

El bot debe pedir la minima informacion necesaria:

- tipo de negocio y oferta;
- uso actual de Telegram: bot, canal, grupo, comunidad o combinacion;
- audiencia aproximada y frecuencia de nuevos contactos;
- principal cuello de botella;
- accion comercial que quiere mejorar;
- pais de operacion;
- consentimiento para continuar y recibir seguimiento.

No pedir datos financieros sensibles ni conversaciones completas si no son necesarios para decidir la
demo.

## Salida estructurada

La clasificacion debe producir un objeto interno con:

- `niche`: uno de los tres nichos o `unknown`;
- `confidence`: valor entre 0 y 1;
- `operates_on_telegram`: booleano;
- `has_offer`: booleano;
- `problem_type`: ventas, soporte, acceso, renovacion, comunidad u otro;
- `eligibility`: `accepted`, `needs_review` o `not_fit`;
- `recommended_demo`;
- `reasons`: señales legibles para el operador;
- `next_step`;
- `policy_flags`: posibles riesgos de promesas, finanzas, spam o datos.

La salida del modelo no debe activar acciones irreversibles por si sola.

## Reglas de decision

### Aceptado

Requiere, como minimo:

- operacion activa en Telegram;
- una oferta, servicio, membresia o proceso que mejorar;
- un problema identificable;
- ausencia de una alerta que requiera revision humana previa.

### Revision humana

Usar `needs_review` si:

- la confianza es baja o hay respuestas contradictorias;
- el caso involucra recomendaciones financieras, pagos sensibles o acceso masivo;
- el usuario solicita acciones sobre un grupo/canal sin demostrar permisos;
- aparecen promesas de rentabilidad o patrones de spam.

### No apto

No mostrar una demo operativa si no existe negocio, oferta o uso real de Telegram. Ofrecer una
explicacion clara y una alternativa no engañosa.

## Experiencia de confianza

- Informar que el usuario conversa con un sistema automatizado.
- Explicar por que se recomienda una demo en lenguaje simple.
- Permitir corregir el nicho detectado.
- Ofrecer hablar con una persona.
- Registrar consentimiento y opt-out.
- No usar la clasificacion para negar servicios de forma opaca o tomar decisiones de alto impacto.

## Handoff

El handoff debe incluir para el operador:

- resumen de respuestas;
- nicho sugerido y confianza;
- problema principal;
- demo recomendada;
- alertas y preguntas pendientes;
- consentimiento y hora del evento.

## Evaluacion antes de produccion

Crear un conjunto de conversaciones anonimizadas y etiquetadas por humanos para medir:

- precision de nicho;
- tasa de `needs_review`;
- falsos positivos de elegibilidad;
- abandono por pregunta;
- tasa de apertura de demo;
- correcciones hechas por el usuario;
- tiempo hasta primer valor.

No desplegar el clasificador como unica barrera comercial hasta alcanzar un umbral definido y
revisado por una persona.
