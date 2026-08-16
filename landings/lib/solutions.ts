export type Solution = {
  slug: string;
  vertical: string;
  eyebrow: string;
  title: string;
  story: string;
  problem: string;
  outcome: string;
  integrations: string[];
  metrics: string[];
  price: string;
};

export const solutions: Solution[] = [
  {
    slug: "formacion-onboarding-acceso",
    vertical: "Academias y comunidades premium de formación",
    eyebrow: "Onboarding y acceso",
    title: "Inscripciones claras. Acceso correcto desde el primer día.",
    story:
      "Una persona paga o se inscribe, pero el acceso al canal, los materiales y el siguiente paso todavía dependen de revisar mensajes y confirmar datos a mano.",
    problem:
      "La comunidad crece, pero el onboarding sigue repartido entre Telegram, hojas, comprobantes y enlaces. Cada error de acceso consume soporte y deteriora la experiencia del alumno.",
    outcome:
      "Una Mini App y un flujo de Telegram que registra la inscripción, valida el siguiente paso, entrega acceso según reglas aprobadas y deja trazabilidad para el equipo.",
    integrations: ["Telegram Mini App", "Telegram Stars o checkout", "Google Sheets", "n8n"],
    metrics: ["Tiempo hasta el acceso", "Inscritos con siguiente paso", "Horas de soporte de onboarding"],
    price: "Implementaciones desde US$1,000"
  },
  {
    slug: "formacion-soporte-conocimiento",
    vertical: "Academias y comunidades premium de formación",
    eyebrow: "Soporte y conocimiento",
    title: "Respuestas consistentes. Más tiempo para enseñar.",
    story:
      "La comunidad pregunta por clases, materiales, fechas y políticas. El equipo repite respuestas, busca enlaces y no siempre sabe cuándo debe intervenir una persona.",
    problem:
      "La información vive en mensajes, documentos y hojas. Sin fuentes aprobadas, permisos y límites, responder más rápido puede aumentar el riesgo de entregar información incorrecta o desactualizada.",
    outcome:
      "Un agente de primer nivel con conocimiento versionado, aviso de interacción con IA, escalamiento humano y registro de las preguntas que necesitan una mejor respuesta.",
    integrations: ["Telegram Bot API", "Google Drive o Notion", "n8n", "Panel de operación"],
    metrics: ["Horas de soporte repetitivo", "Preguntas escaladas", "Respuestas fuera de política"],
    price: "Implementaciones desde US$1,000"
  },
  {
    slug: "formacion-cohortes-renovaciones",
    vertical: "Academias y comunidades premium de formación",
    eyebrow: "Cohortes y renovaciones",
    title: "Más alumnos activos. Menos seguimiento perdido.",
    story:
      "Publicas una sesión o una nueva etapa, pero los inscritos no reciben el mismo contexto, recordatorio o siguiente paso. La operación depende de revisar listas y enviar mensajes a mano.",
    problem:
      "La coordinación de cohortes, eventos y renovaciones ocupa horas; además, el equipo no tiene una vista confiable de quién asistió, quién abandonó y quién necesita atención.",
    outcome:
      "Un flujo de inscripción, recordatorio, progreso y renovación en Telegram con roles, trazabilidad y una salida clara hacia una persona.",
    integrations: ["Telegram Mini App", "Google Calendar", "Google Sheets o CRM", "Webhooks"],
    metrics: ["Asistencia confirmada", "Alumnos activos", "Renovaciones con seguimiento"],
    price: "Implementaciones desde US$1,000"
  }
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
