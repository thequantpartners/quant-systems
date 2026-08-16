# Backend vertical: finanzas educativas

## Responsabilidad

Contener únicamente reglas de dominio, casos de uso, prompts versionados, esquemas y adaptadores
específicos para trading, forex y formación financiera.

## Dependencias permitidas

- `backend/app/core/` para configuración, seguridad, tenancy y errores.
- `backend/app/shared/` para leads, conversaciones, tracking, jobs y métricas.
- `backend/app/integrations/` para proveedores compartidos.
- El módulo operativo correspondiente en [`modules/finanzas-educativas/`](../../../../modules/finanzas-educativas/).

No duplicar autenticación, persistencia de leads, clientes de Telegram ni tracking dentro de esta
carpeta.

## Límites de negocio

No implementar señales de inversión, recomendaciones personalizadas, promesas de rentabilidad,
apuestas ni manejo de fondos. Todo flujo deberá poder asociarse a una métrica de tiempo/capacidad
o ingresos/conversión antes de pasar a producción.

## Estado

Sólo existe el contrato arquitectónico. La implementación depende de validar la primera herramienta
y el cuello de botella con clientes reales.
