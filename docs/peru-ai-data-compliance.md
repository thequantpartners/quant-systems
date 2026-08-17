# Revision preliminar de datos e IA — Peru

## Estado

Documento de requisitos de producto para revision legal. No constituye opinion legal ni confirma que
el SaaS cumpla por si solo con la normativa peruana.

## Fuentes de referencia

- Ley N.° 29733, Ley de Proteccion de Datos Personales:
  https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/243470-29733
- Autoridad Nacional de Proteccion de Datos Personales (ANPD):
  https://www.gob.pe/anpd
- Ley N.° 31814, marco peruano que promueve el uso de inteligencia artificial. Verificar texto,
  reglamento y vigencia en el portal oficial de normas legales:
  https://www.gob.pe/busquedas?term=31814&contenido=normas-legales
- Portal oficial para revisar normas y actualizaciones:
  https://www.gob.pe/busquedas?contenido=normas-legales

Las referencias deben revisarse nuevamente antes del lanzamiento porque pueden existir reglamentos,
lineamientos sectoriales o cambios posteriores.

## Roles que deben definirse

Para cada cliente documentar:

- quien es responsable del tratamiento frente al usuario final;
- que rol tiene QuantSetters: encargado, proveedor o responsable para una finalidad propia;
- que datos recibe de Telegram y de grupos/canales;
- que subencargados o proveedores cloud intervienen;
- donde se almacenan y procesan los datos;
- quien atiende solicitudes de titulares y reclamos.

No asumir que el consentimiento del administrador de un grupo equivale al consentimiento de todos sus
miembros para cualquier uso de sus mensajes o perfiles.

## Requisitos funcionales de privacidad

Antes de activar una plantilla:

1. Explicar que el usuario interactua con un bot y, cuando corresponda, con IA.
2. Informar finalidad, categorias de datos, retencion, destinatarios y canal de contacto.
3. Solicitar consentimiento cuando la finalidad lo requiera.
4. Permitir retirar consentimiento y pedir opt-out.
5. Proporcionar una via para solicitudes de acceso, rectificacion, cancelacion u oposicion, sujeta a
   la revision legal aplicable.
6. Registrar version del aviso, fecha, finalidad y evidencia del consentimiento.
7. Aplicar minimizacion: no guardar mensajes completos si un resumen estructurado es suficiente.
8. Separar datos de demo de datos reales.

## Requisitos de IA

- Informar de manera visible que la respuesta puede ser generada o asistida por IA.
- No presentar inferencias como hechos confirmados.
- Mostrar incertidumbre y permitir correccion del nicho detectado.
- No usar el clasificador para decisiones de alto impacto sin revision humana.
- Mantener trazabilidad de prompt/version, modelo, entrada minimizada, salida y accion tomada.
- Definir evaluaciones de sesgo, errores y falsos positivos por nicho.
- Permitir handoff humano y apagado por tenant.
- Prohibir en las demos recomendaciones financieras, senales, promesas de rentabilidad o
  instrucciones de movimiento de fondos.

## Grupos, comunidades y canales

Antes de instalar un bot:

- demostrar que el administrador tiene autoridad sobre el espacio;
- mostrar permisos solicitados y acciones posibles;
- registrar chat, administrador, fecha y consentimiento de instalacion;
- definir retencion de mensajes y metadatos;
- proporcionar apagado inmediato;
- limitar frecuencia de mensajes y evitar spam;
- auditar acciones automaticas y errores de permisos.

## Seguridad minima

- Tokens de bots solo en backend y cifrados.
- Secretos fuera de logs, eventos, analitica y frontend.
- Cifrado en transito y en reposo donde corresponda.
- Control de acceso por tenant y rol.
- Rotacion y revocacion de credenciales.
- Backups y eliminacion documentados.
- Pruebas de acceso cruzado entre tenants.
- Respuesta documentada ante incidentes y filtraciones.

## Marketing y comunicaciones

- No prometer resultados garantizados de ventas, rentabilidad o ahorro.
- No usar cupos ficticios ni urgencia artificial.
- Separar mensajes transaccionales de comunicaciones comerciales.
- Respetar opt-out y limites de frecuencia.
- Hacer que el anuncio, el bot y la Mini App describan la misma propuesta.

## Bloqueadores antes de produccion

1. Validacion legal peruana de Ley 29733, su reglamento y criterios de la ANPD.
2. Verificacion de la vigencia y obligaciones practicas de Ley 31814 y sus normas de desarrollo.
3. Contratos y roles de tratamiento con cada cliente.
4. Aviso de privacidad y flujo de consentimiento dentro de Telegram.
5. Politica de retencion, borrado, exportacion y solicitudes de titulares.
6. Evaluacion de riesgos por nicho, especialmente crypto y trading.
7. Pruebas de seguridad, aislamiento y revocacion.

## Decision provisional

El prototipo puede avanzar con datos ficticios y una plantilla de educacion/coaching de bajo riesgo.
No debe procesar conversaciones reales de comunidades ni automatizar operaciones financieras hasta
cerrar los bloqueadores anteriores con asesoramiento profesional.
