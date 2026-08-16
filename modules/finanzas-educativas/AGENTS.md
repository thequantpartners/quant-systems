# Modulo: Finanzas educativas

## Objetivo

Validar y operar agentes de Telegram para comunidades de trading, forex y formación financiera.
El primer caso debe resolver una fuga concreta de seguimiento, soporte, coordinación o conversión.

## Alcance inicial

- Agente conversacional dentro de Telegram.
- Calificacion y registro de conversaciones.
- Soporte basado en conocimiento aprobado por el cliente.
- Recordatorios y derivacion a una persona.
- Integracion con herramientas que el cliente ya use, solo despues de validar el problema.

## Exclusiones

- Senales de trading o recomendaciones personalizadas de inversion.
- Promesas de rentabilidad, enriquecimiento rapido o ingresos garantizados.
- Apuestas, casinos, pronosticos deportivos o captacion de fondos.
- Custodia de fondos, TON, wallets o credenciales financieras.
- Construir una plataforma completa antes de demostrar impacto medible.

## Arquitectura

El modulo depende del nucleo compartido de `backend/app/` para autenticacion, tenancy, leads,
conversaciones, tracking, jobs, metricas, seguridad y conexiones comunes. No debe crear un backend
independiente ni duplicar esas capacidades.

El dominio propio vivira en `backend/app/verticals/finanzas-educativas/` cuando la herramienta y
el flujo hayan sido validados. Las automatizaciones n8n de este modulo viviran en `workflows/`.

## Criterio de avance

Una solucion solo continua si puede comparar antes/despues en al menos una metrica:

- horas de soporte o seguimiento manual;
- conversaciones calificadas;
- reuniones, inscripciones o matriculas atribuidas;
- inscritos sin siguiente paso;
- asistencia confirmada o tareas operativas evitadas.

## Credenciales y variables

No guardar secretos en este modulo. Las credenciales se administran fuera del repositorio y las
variables requeridas se documentan por nombre, nunca por valor.

## Estado

La vertical esta en fase de validacion de demanda. No hay workflows productivos ni integraciones
especificas aprobadas.
