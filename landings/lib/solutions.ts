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
  referencePrice?: string;
};

export const solutions: Solution[] = [
  {
    slug: "leads-inmobiliarios",
    vertical: "Inmobiliarias",
    eyebrow: "Para negocios donde cada lead vale una visita",
    title: "El lead preguntó por el departamento. Nadie volvió a escribirle.",
    story:
      "A las 10:14 llega una consulta desde un portal. A las 11:00 ya hay otra. Al final del día, el asesor recuerda la primera, pero no sabe quién la tomó ni cuál era el siguiente paso.",
    problem:
      "Urbania, Adondevivir, anuncios y WhatsApp trabajan separados. El cuello de botella no es conseguir consultas: es responderlas, asignarlas y mantenerlas vivas.",
    outcome:
      "Una operación visible para que cada consulta tenga responsable, contexto y próximo paso antes de que se enfríe.",
    integrations: ["Urbania / Adondevivir", "WhatsApp", "Google Sheets", "Google Ads y Meta Ads"],
    metrics: ["Tiempo de primera respuesta", "Leads sin seguimiento", "Visitas agendadas"],
    price: "Desde US$300",
    referencePrice: "US$500"
  },
  {
    slug: "operacion-ecommerce-multicanal",
    vertical: "E-commerce",
    eyebrow: "Para tiendas que venden en más de un canal",
    title: "La venta entró. El stock no se enteró.",
    story:
      "MercadoLibre muestra un pedido, Shopify muestra otro y WhatsApp tiene el pago confirmado. El dueño abre tres pestañas y una hoja para descubrir qué se puede despachar.",
    problem:
      "La fuga aparece en los cambios manuales: pedidos perdidos, pagos pendientes, stock desactualizado y margen que se va en errores de operación.",
    outcome:
      "Un centro operativo familiar para que el equipo vea qué vender, cobrar, preparar y entregar sin cambiar de software cada cinco minutos.",
    integrations: ["MercadoLibre", "Shopify / WooCommerce", "WhatsApp", "Google Sheets"],
    metrics: ["Pedidos pendientes", "Pagos por verificar", "Incidencias de despacho"],
    price: "Desde US$750"
  },
  {
    slug: "citas-clinicas",
    vertical: "Clínicas y consultorios",
    eyebrow: "Para negocios donde una cita perdida es ingreso perdido",
    title: "La paciente dijo “sí”. La agenda nunca lo confirmó.",
    story:
      "La consulta llegó por Instagram. Alguien respondió por WhatsApp. La agenda quedó en otro calendario y, cuando llega el día, nadie sabe si la cita estaba confirmada.",
    problem:
      "El cuello de botella está entre la captación y la asistencia: conversaciones sin siguiente paso, citas no confirmadas y pacientes que se enfrían.",
    outcome:
      "Un flujo operativo para que cada consulta tenga estado, recordatorio y responsable, sin convertir la atención en un CRM pesado.",
    integrations: ["WhatsApp", "Google Calendar", "Google Sheets", "Formularios y anuncios"],
    metrics: ["Citas confirmadas", "No-shows", "Consultas sin seguimiento"],
    price: "Desde US$600"
  }
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
