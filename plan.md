# Plan: SaaS Telegram-native para ventas y automatizacion

## Vision

QuantSetters sera un SaaS que vive dentro de Telegram para negocios que ya operan mediante bots,
grupos, comunidades o canales. El producto ayudara a vender mas y ahorrar tiempo mediante
automatizaciones, inteligencia y Mini Apps prearmadas, sin exigir que el cliente diseñe interfaces
desde cero ni conozca la complejidad tecnica de Telegram.

La adquisicion tambien sera Telegram-native:

`anuncio -> deep link al bot -> precalificacion -> deteccion de nicho -> elegibilidad -> Mini App demo -> activacion`

## Decisiones confirmadas

1. La experiencia principal no dependera de una landing externa.
2. El primer mercado sera Peru.
3. Se investigaran y seleccionaran tres nichos que ya usen Telegram en su operacion.
4. El bot de QuantSetters precalificara, detectara el nicho y mostrara la demo apropiada.
5. El sistema soportara bots nuevos provisionados por la plataforma y bots existentes del cliente.
6. Habra tres Mini Apps demo, una por nicho, con plantillas prearmadas.
7. El producto debera atender tambien grupos, comunidades y canales, no solo conversaciones 1:1.
8. La IA tendra que ser transparente, auditable y alineada con las obligaciones aplicables en Peru.

## Investigacion previa al MVP

### Nichos

Investigar y rankear candidatos con estos criterios:

- actividad operativa comprobable en Telegram;
- problemas frecuentes de ventas, soporte, calificacion o administracion;
- capacidad y disposicion de pago;
- posibilidad de demostrar valor dentro de una Mini App;
- acceso comercial inicial en Peru;
- riesgos legales, de spam o de moderacion.

La seleccion final debe producir tres nichos, sus perfiles de comprador y un caso de uso principal
para cada uno.

### Uso de Telegram por negocios

Para cada nicho documentar como se usan:

- bots y flujos de bienvenida;
- grupos y comunidades de pago o abiertas;
- canales de contenido, anuncios y ofertas;
- moderacion, soporte y derivacion a humanos;
- captacion, calificacion y seguimiento;
- pagos, reservas, acceso, renovaciones o entregas;
- metricas que demuestren ingresos o ahorro de tiempo.

## Experiencia del producto

### Bot de adquisicion y precalificacion

1. El anuncio abre un deep link al bot de QuantSetters.
2. El bot explica que es un sistema automatizado y solicita consentimiento cuando corresponda.
3. Hace preguntas breves sobre operacion en Telegram, oferta, audiencia y cuello de botella.
4. Detecta el nicho entre los tres soportados y estima si existe ajuste.
5. Si el prospecto es elegible, abre la Mini App demo correspondiente.
6. La demo guia al usuario a activar una plantilla y alcanzar un primer resultado.
7. Si no es elegible, ofrece una salida clara: otra plantilla, lista de espera o contacto humano.

### Tres Mini Apps demo

Cada demo debe ser interactiva y mostrar un resultado, no solo una maqueta visual. Como minimo debe
incluir:

- problema y resultado esperado del nicho;
- datos de ejemplo claramente identificados;
- recorrido principal de la plantilla;
- llamada a activar, personalizar o solicitar ayuda;
- medicion de apertura, avance, activacion y primer valor.

Los nombres y casos de uso concretos se definiran despues de la investigacion de nichos.

### Operacion de grupos, comunidades y canales

El producto debe explorar plantillas para:

- onboarding y segmentacion de nuevos miembros;
- preguntas frecuentes y soporte automatizado;
- calificacion de interesados y derivacion a ventas;
- acceso a contenido, eventos o niveles de membresia;
- encuestas, reactivacion y seguimiento;
- moderacion, alertas y deteccion de conversaciones relevantes;
- llamadas a la accion medibles hacia una Mini App.

Todas las funciones que actuen en espacios comunitarios requeriran permisos explicitos de
administradores, limites anti-spam, registro de acciones y controles de apagado.

## Arquitectura objetivo

- `backend/`: FastAPI y SQLAlchemy para tenancy, identidad Telegram, bots, plantillas, Mini Apps,
  conversaciones, eventos, consentimiento, automatizaciones y auditoria.
- `telegram-app/` o equivalente: interfaz principal embebida en Telegram para onboarding, demos,
  configuracion y uso.
- `dashboard/`: consola secundaria para operaciones, soporte y configuraciones avanzadas.
- `modules/`: automatizaciones Telegram separadas por dominio, cada una con su `AGENTS.md`.
- Persistencia multi-tenant con aislamiento por cliente, ownership explicito de bots y permisos
  diferenciados para operadores, administradores y miembros.

Antes de prometer una experiencia sin tokens/API keys, validar las capacidades reales de Telegram
para autenticacion, provisionamiento, conexion de bots, Mini Apps y permisos de grupos/canales. La
complejidad tecnica debe quedar en la plataforma sin guardar secretos en el cliente.

## Inteligencia y confianza

La capa de inteligencia debe cubrir:

- clasificacion de nicho con nivel de confianza;
- precalificacion basada en contexto, no solo palabras clave;
- recomendacion de plantilla;
- deteccion de intencion y siguiente mejor accion;
- handoff a una persona;
- explicacion de decisiones relevantes y registro de auditoria.

El usuario debe saber cuando conversa con IA, poder detener la automatizacion y ejercer opt-out.
Debe existir una politica de datos, retencion y acceso por tenant.

## Cumplimiento inicial

Antes de lanzar en Peru revisar con asesoramiento legal actualizado:

- proteccion de datos personales y consentimiento;
- tratamiento de conversaciones y datos de miembros;
- transparencia y identificacion de sistemas de IA;
- publicidad, comunicaciones comerciales y opt-out;
- permisos de administradores en grupos, comunidades y canales;
- responsabilidades entre QuantSetters y cada negocio cliente;
- requisitos adicionales si el producto se usa en otro pais.

No publicar promesas garantizadas de ingresos, resultados o automatizacion total.

## Medicion y validacion

Eventos iniciales:

- `telegram_ad_open`;
- `bot_started`;
- `qualification_started`;
- `qualification_completed`;
- `niche_detected`;
- `prospect_accepted`;
- `demo_opened`;
- `demo_action_completed`;
- `activation_started`;
- `activation_completed`;
- `first_value_reached`;
- `human_handoff_requested`;
- `opt_out_requested`.

El criterio de exito debe priorizar prospectos elegibles, demos completadas, activaciones y primer
valor dentro de Telegram. Los clics y comienzos del bot son señales auxiliares.

## Fases y entregables

0. Investigar los tres nichos y sus operaciones reales en Telegram.
1. Definir ICP, propuesta de valor, criterios de elegibilidad y casos de uso de grupos/canales.
2. Validar arquitectura de Telegram, seguridad, permisos y modelo de bots nuevos/existentes.
3. Diseñar el journey del bot y las tres Mini Apps demo.
4. Definir datos, tenancy, eventos, IA, consentimiento, auditoria y retencion.
5. Construir un prototipo funcional del bot de precalificacion y una demo vertical.
6. Probar activacion con usuarios reales de los tres nichos.
7. Construir el MVP multi-tenant y las tres demos solo si las señales justifican la inversion.

## Fuera de alcance inicial

- Construir un producto generico para cualquier nicho antes de validar los tres iniciales.
- Permitir automatizaciones comunitarias sin permisos, auditoria o controles anti-spam.
- Ocultar al usuario que interactua con IA.
- Prometer resultados comerciales garantizados.
- Crear interfaces completas fuera de Telegram como superficie principal.
