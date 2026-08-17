# Modelo inicial de bots y tenancy

## Objetivo

Definir como QuantSetters puede operar bots nuevos y existentes sin mezclar datos entre clientes ni
trasladar la complejidad tecnica al usuario.

## Entidades principales

- **Tenant:** negocio cliente y limite principal de aislamiento.
- **Telegram account:** identidad del operador autenticado en Telegram.
- **Bot connection:** referencia a un bot, modo de propiedad, estado, token cifrado y fecha de ultima
  verificacion.
- **Workspace:** configuracion de plantillas, operadores, grupos y canales de un tenant.
- **Chat installation:** relacion entre un bot y un grupo, comunidad o canal autorizado.
- **Template instance:** plantilla activa con configuracion y permisos propios.
- **Audit event:** registro de autenticacion, cambio de permisos, mensaje automatizado, error,
  revocacion y apagado.

## Modos de conexion

### Bot gestionado por QuantSetters

QuantSetters mantiene la credencial del bot y ofrece al cliente configuracion guiada desde la Mini
App. El tenant no recibe el token. Este modo simplifica el primer experimento, pero exige definir
ownership, facturacion, soporte, migracion y salida.

### Bot existente del cliente

El cliente inicia un flujo de conexion, entrega la credencial por un canal seguro y confirma que
tiene autoridad para administrar el bot. El backend:

1. cifra el token;
2. valida `getMe`;
3. configura o verifica webhook;
4. registra el bot y su tenant;
5. muestra el resultado de la conexion sin devolver el secreto;
6. ofrece rotacion, desconexion y borrado seguro.

No se debe aceptar un token por un campo de texto persistente sin cifrado ni guardar secretos en
logs, eventos, errores o analitica.

## Instalacion en grupos, comunidades y canales

Cada instalacion debe registrar:

- tenant y bot;
- chat id y tipo de chat;
- administrador que autorizo;
- permisos concedidos;
- plantilla activa;
- fecha de instalacion y ultima verificacion;
- estado: `pending`, `active`, `paused`, `revoked` o `failed`.

Las acciones automatizadas deben comprobar permisos en tiempo de ejecucion. La perdida de permisos
debe pausar la plantilla y notificar al operador, no producir reintentos silenciosos.

## Aislamiento

- Toda consulta y comando debe incluir `tenant_id`.
- Los identificadores de Telegram no sustituyen el aislamiento interno.
- Los operadores solo pueden acceder a workspaces autorizados.
- Los eventos de un chat deben resolverse a un unico tenant activo.
- Los dashboards, exports, logs y colas deben aplicar el mismo filtro de tenant.

## Permisos y seguridad

- Minimo privilegio por plantilla.
- Confirmacion explicita antes de instalar en un grupo/canal.
- Lista visible de acciones que ejecutara el bot.
- Pausa inmediata por tenant y por instalacion.
- Auditoria inmutable de permisos y automatizaciones.
- Rotacion y revocacion de secretos.
- No leer mensajes que Telegram no entregue al bot por sus reglas de privacidad.

## Primer MVP tecnico

1. Usar un bot gestionado por QuantSetters para el bot de adquisicion y una demo.
2. Implementar tenant, workspace, bot connection e instalacion de chat antes de automatizaciones
   complejas.
3. Probar una sola plantilla de grupo con permisos minimos y apagado manual.
4. Diseñar el flujo de bot existente como segundo experimento, no como dependencia del primero.
