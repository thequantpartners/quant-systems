# Quant Setters — Contexto para agentes

## Objetivo

QuantSetters construye un SaaS Telegram-native para negocios que ya operan con bots, grupos,
comunidades o canales de Telegram. El sistema debe ayudarlos a vender mas o ahorrar tiempo mediante
automatizaciones, inteligencia y Mini Apps prearmadas.

La experiencia completa debe vivir dentro de Telegram:

`anuncio -> bot -> precalificacion -> nicho -> Mini App demo -> activacion -> primer valor`

El primer mercado es Peru. El producto inicial tendra tres nichos seleccionados mediante
investigacion, no por suposicion.

## Reglas de producto

1. Leer primero [`plan.md`](./plan.md) antes de cambiar arquitectura, copy o alcance.
2. No asumir una landing externa como superficie principal de adquisicion o producto.
3. Diseñar para bots nuevos provisionados por la plataforma y bots existentes del cliente.
4. Las Mini Apps deben ser experiencias interactivas con un resultado demostrable, no solo mockups.
5. Considerar grupos, comunidades y canales como superficies de valor de primera clase.
6. No prometer ingresos garantizados, automatizacion total ni escasez artificial.
7. Identificar siempre cuando interviene IA, ofrecer handoff humano y soportar opt-out.
8. No guardar tokens, API keys, contrasenas ni secretos en el repositorio o en el cliente.
9. Validar permisos, anti-spam, auditoria y aislamiento multi-tenant antes de automatizar espacios
   comunitarios.
10. Revisar privacidad, consentimiento, transparencia de IA y obligaciones aplicables en Peru antes
    de publicar un flujo.
11. Mantener mobile-first, accesibilidad, foco visible y cero scroll horizontal en las Mini Apps.
12. No agregar dependencias sin necesidad.

## Arquitectura objetivo

- `backend/`: FastAPI + SQLAlchemy para tenancy, Telegram, bots, plantillas, Mini Apps, eventos,
  consentimiento, automatizaciones y auditoria.
- `dashboard/`: consola secundaria para operaciones y configuracion avanzada.
- `modules/`: automatizaciones Telegram documentadas por modulo.
- `landings/`: no es la superficie principal; cualquier uso debe justificarse como soporte secundario.

No migrar el backend a otro stack sin una decision explicita documentada.

## Validacion

La validacion debe seguir este orden:

1. investigacion de nichos y operaciones en Telegram;
2. casos de uso y propuesta de valor;
3. capacidades tecnicas, permisos y seguridad de Telegram;
4. journey del bot y criterios de precalificacion;
5. Mini Apps demo;
6. IA, datos, consentimiento y cumplimiento;
7. tracking y criterios de activacion;
8. anuncios con deep links a Telegram;
9. prueba con usuarios reales y decision go/no-go.

## Comandos

Los comandos dependen de cada superficie. Consultar el `package.json`, `requirements.txt` o
`AGENTS.md` especifico antes de ejecutar instalaciones o builds.

## Estructura de modulos n8n

- `modules/` contiene proyectos y automatizaciones n8n del sistema.
- Cada modulo debe tener su propio `AGENTS.md` con objetivo, alcance, arquitectura, variables,
  credenciales requeridas, workflows, comandos, errores, reintentos, idempotencia y estado.
- Las reglas de un `AGENTS.md` mas especifico aplican dentro de su carpeta, sin contradecir este
  archivo ni [`plan.md`](./plan.md).
