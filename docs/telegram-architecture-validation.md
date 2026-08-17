# Validacion tecnica inicial de Telegram

## Estado

Validacion preliminar basada en documentacion oficial de Telegram. Define restricciones de
arquitectura, no constituye aun una implementacion.

## Hallazgos confirmados

### Mini Apps

Telegram permite construir Mini Apps con JavaScript que se abren dentro de Telegram y pueden
reemplazar una web completa. Soportan autorizacion integrada, pagos mediante proveedores, enlaces
profundos, notificaciones y otras capacidades nativas.

Fuente: https://core.telegram.org/bots/webapps

Implicaciones:

- La Mini App puede ser la superficie principal de onboarding, demo y configuracion.
- La aplicacion debe servirse desde HTTPS y validar en el backend los datos de inicializacion de
  Telegram; nunca debe confiar solo en datos enviados por el cliente.
- El dominio, las URLs y la configuracion de cada bot deben mantenerse por tenant.
- La configuracion de Mini App se realiza en BotFather o mediante las capacidades disponibles del
  Bot API, por lo que el flujo de provisionamiento requiere una fase tecnica especifica.

### Autorizacion del usuario

Telegram ofrece Login/OIDC y autorizacion integrada para que una persona inicie sesion con su cuenta.
Esto autentica al usuario, pero no equivale a crear o administrar automaticamente bots de su
propiedad.

Fuente: https://core.telegram.org/bots/telegram-login

Implicaciones:

- Se puede evitar que el cliente cree una cuenta separada en QuantSetters.
- La identidad del usuario de Telegram debe asociarse a un tenant y a sus roles internos.
- El consentimiento para datos, mensajes o acciones debe quedar registrado por tenant y finalidad.

### Tokens de bots

Cada bot tiene un token unico generado al crearse y el Bot API usa ese token para autenticarse.
Telegram indica que debe tratarse como una contrasena.

Fuentes:

- https://core.telegram.org/bots/api#authorizing-your-bot
- https://core.telegram.org/bots/tutorial#obtain-your-bot-token

Implicaciones:

- La promesa correcta es: “el cliente no necesita copiar, pegar ni gestionar tokens”.
- La plataforma debe almacenar los tokens cifrados y solo en backend/secret manager.
- No se debe afirmar que el usuario conecta cualquier bot sin entregar ninguna credencial o paso de
  autorizacion.
- Para un bot existente, el MVP debe definir un flujo seguro de entrega o rotacion de token y
  explicar ownership y revocacion.

### Creacion de bots nuevos

La documentacion oficial describe la creacion inicial mediante `@BotFather` y `/newbot`. No se
encontro en el Bot API publico una operacion equivalente a “crear bot” para que un tercero lo
provisione completamente por API.

Implicaciones:

- El MVP debe considerar un flujo asistido: el usuario inicia la creacion en BotFather y QuantSetters
  guia la configuracion.
- Una automatizacion completa de BotFather no debe prometerse sin una validacion adicional de
  politicas y estabilidad.
- La alternativa mas controlable es provisionar bots propiedad de QuantSetters por tenant, siempre
  que el modelo legal, operativo y de recuperacion de cuenta sea aceptable.

### Grupos, comunidades y canales

Los bots disponen de comandos, teclados, botones, Mini Apps, scopes por usuario/grupo y funciones
para seleccionar chats. La documentacion tambien exige que el backend verifique permisos, porque una
actualizacion puede contener comandos no validos para el scope configurado.

Fuentes:

- https://core.telegram.org/bots/features
- https://core.telegram.org/bots/api

Implicaciones:

- La integracion debe registrar el chat objetivo, tenant, administrador que autorizo y permisos
  concedidos.
- Las automatizaciones de grupos y canales requieren instalacion explicita del bot, controles de
  spam, auditoria y boton de apagado.
- Privacy Mode y las limitaciones de visibilidad deben formar parte del diagnostico de instalacion.
- La plataforma no debe asumir que puede leer o actuar sobre cualquier grupo solo porque el usuario
  inicio sesion con Telegram.

## Modelo de integracion recomendado para el MVP

### Opcion A: bot provisionado por QuantSetters

- QuantSetters mantiene el bot y el token en backend.
- Cada cliente recibe un tenant y una configuracion aislada.
- El cliente configura nombre, identidad, grupos/canales y plantilla desde la Mini App.
- Requiere resolver ownership, soporte, migracion y salida del cliente.

### Opcion B: bot existente del cliente

- El cliente inicia un flujo guiado de conexion.
- El token se recibe solo por un canal seguro, se cifra y nunca se devuelve al frontend.
- Se verifica `getMe`, ownership operativo, webhook y permisos necesarios.
- Deben existir rotacion, revocacion, desconexion y borrado seguro.

### Recomendacion provisional

Construir primero la experiencia con un bot controlado por QuantSetters para validar precalificacion,
Mini Apps y primer valor. Diseñar en paralelo el contrato de conexion de bots existentes, pero no
hacerlo requisito del primer experimento comercial hasta probar seguridad y soporte.

## Decisiones pendientes

1. Si el modelo de largo plazo sera bot propiedad de QuantSetters, bot propiedad del cliente o ambos.
2. Como se ejecutara el paso de BotFather sin exponer secretos ni depender de automatizacion frágil.
3. Que permisos minimos requiere cada plantilla para grupos, comunidades y canales.
4. Que datos de miembros se procesan, con que finalidad, retencion y consentimiento.
5. Que proveedor de secretos y mecanismo de rotacion se usara en produccion.

## Fuera de alcance de esta validacion

- Automatizar BotFather mediante scraping o una cuenta de usuario.
- Leer mensajes de grupos o canales sin instalacion, autorizacion y permisos validos.
- Dar por resuelta la revision legal de Peru.
- Implementar aun el backend de bots o las Mini Apps.
