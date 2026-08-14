# QuantSetters — Modulos n8n

## Alcance

Esta carpeta contiene proyectos n8n independientes o relacionados con las automatizaciones
comerciales y operativas de QuantSetters.

## Convencion por modulo

Cada proyecto debe vivir en su propia carpeta:

```text
modules/
└── nombre-del-modulo/
    ├── AGENTS.md
    └── ...
```

El `AGENTS.md` de cada modulo debe documentar, como minimo:

- objetivo y problema que resuelve;
- alcance y exclusiones;
- workflows incluidos y sus disparadores;
- entradas, salidas e integraciones;
- credenciales y variables de entorno requeridas, sin incluir secretos;
- dependencias con otros modulos;
- comandos, procedimiento de prueba y operacion;
- manejo de errores, reintentos e idempotencia;
- estado actual y pendientes conocidos.

## Reglas n8n

- Seguir las skills oficiales de n8n para ciclo de vida, configuracion, expresiones,
  credenciales, errores y sub-workflows cuando correspondan.
- Validar cada workflow antes de publicarlo y verificar sus conexiones despues de crearlo
  o actualizarlo.
- No guardar API keys, tokens, contraseñas ni credenciales en archivos o campos de texto.
- Preferir sub-workflows reutilizables para logica compartida.
- Mantener nombres descriptivos y documentar el motivo de las decisiones no obvias.
- No asumir que las ramas visuales de un workflow se ejecutan en paralelo.

## Regla de contexto

Las instrucciones de este archivo aplican a todos los proyectos dentro de `modules/`.
El `AGENTS.md` de un modulo puede agregar contexto y reglas especificas, pero no puede
relajar las reglas globales de QuantSetters ni las de este archivo.
