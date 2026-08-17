# Diseno de las tres Mini Apps demo

## Principios comunes

Las demos deben abrirse dentro de Telegram, usar datos de ejemplo claramente etiquetados y
demostrar una accion de negocio completa. No deben parecer dashboards genericos ni simular resultados
reales de clientes.

Cada demo debe permitir:

- entender el problema en menos de un minuto;
- completar una accion principal con pocos pasos;
- ver que parte queda automatizada;
- solicitar ayuda humana;
- iniciar una activacion sin abandonar Telegram;
- registrar `demo_opened`, `demo_action_completed`, `activation_started` y `first_value_reached`.

## Demo 1: Educador o coach — Ruta de inscripcion

### Problema

El operador recibe consultas repetidas, califica manualmente, confirma disponibilidad y luego
organiza pagos, reservas, acceso y recordatorios.

### Experiencia demo

1. El usuario elige una oferta de ejemplo: taller, curso o mentoria.
2. Responde tres preguntas de objetivo, nivel y disponibilidad.
3. La Mini App recomienda una ruta de inscripcion.
4. Muestra un calendario o siguiente paso simulado.
5. Genera un resumen de prospecto para el operador.
6. Permite activar una plantilla de calificacion y seguimiento.

### Primer valor

Obtener una ficha de prospecto calificado con siguiente accion sugerida, sin revisar manualmente
toda la conversacion.

### Plantilla activable

- preguntas de calificacion;
- segmentacion por programa;
- recordatorio de reserva;
- entrega de informacion basica;
- handoff cuando hay dudas o necesidades especiales.

### Limites de la demo

- No procesar pagos reales.
- No confirmar cupos reales.
- No presentar conversiones ficticias como resultados comprobados.

## Demo 2: Crypto — Onboarding y soporte seguro

### Problema

Las comunidades reciben preguntas repetidas sobre el servicio, seguridad, pasos iniciales y soporte;
ademas, es importante derivar casos sensibles a una persona.

### Experiencia demo

1. El usuario elige su objetivo: aprender, conocer el servicio o solicitar soporte.
2. Completa un diagnostico basico de nivel y necesidad.
3. Recibe una ruta educativa y una lista de verificaciones antifraude.
4. La Mini App muestra que preguntas se responden automaticamente y cuales requieren humano.
5. Genera un resumen de soporte con prioridad y contexto.
6. Permite activar una plantilla de onboarding y FAQ controlada.

### Primer valor

Reducir la repeticion de preguntas y entregar al equipo humano un caso organizado sin automatizar
decisiones financieras.

### Plantilla activable

- menu de onboarding;
- FAQ aprobada por el negocio;
- deteccion de temas sensibles;
- derivacion a soporte;
- registro de consentimiento y opt-out.

### Limites de la demo

- No recomendar inversiones.
- No manejar claves, wallets ni fondos.
- No ejecutar compras, ventas o transferencias.
- No afirmar seguridad absoluta ni rentabilidad.

## Demo 3: Trading y forex — Membresia y acceso

### Problema

El operador necesita separar comunidad gratuita y VIP, responder preguntas, controlar acceso y
gestionar renovaciones sin publicar senales o promesas de rentabilidad desde el sistema.

### Experiencia demo

1. El usuario elige entre educacion, comunidad o soporte de membresia.
2. Responde preguntas sobre su interes y nivel.
3. La Mini App muestra una ruta de acceso de ejemplo.
4. Simula estados de membresia: gratuito, prueba, activo y renovacion pendiente.
5. Genera una alerta operativa para el administrador.
6. Permite activar una plantilla de acceso, FAQ y seguimiento.

### Primer valor

Identificar el siguiente paso operativo de un miembro y mostrar al administrador una renovacion o
solicitud pendiente con contexto.

### Plantilla activable

- segmentacion free/VIP;
- control de estado de acceso;
- FAQ educativa;
- recordatorios con frecuencia limitada;
- reactivacion con consentimiento;
- handoff humano.

### Limites de la demo

- No generar senales.
- No validar operaciones o resultados.
- No recomendar activos, brokers o estrategias personalizadas.
- No usar promesas de rentabilidad.

## Estructura tecnica compartida

Cada demo debe recibir del bot:

- `telegram_user_id` validado por backend;
- `tenant_or_demo_session_id`;
- `niche`;
- `qualification_summary`;
- `recommended_template`;
- `consent_state`.

La Mini App debe devolver al backend:

- accion realizada;
- datos de configuracion elegidos;
- estado de activacion;
- errores de validacion;
- solicitud de handoff.

Los datos de ejemplo deben estar separados de datos de produccion y no deben mezclarse con
conversaciones reales.

## Orden de prototipado

1. Construir primero la demo de educador/coach.
2. Reutilizar el shell de navegacion, consentimiento, handoff y eventos.
3. Adaptar el mismo contrato a crypto con controles de temas sensibles.
4. Adaptar el mismo contrato a trading con limites de contenido financiero.

## Criterios para decidir si una demo funciona

- El usuario entiende la propuesta sin explicacion manual.
- Completa la accion principal en menos de cinco minutos.
- Puede explicar que parte se automatizaria.
- Solicita activacion o handoff con contexto suficiente.
- El operador identifica una tarea manual concreta que desapareceria o se reduciria.
- No se activan acciones sensibles sin confirmacion y revision apropiada.
