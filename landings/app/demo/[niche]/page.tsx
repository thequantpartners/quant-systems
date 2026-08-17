import type { CSSProperties } from "react";
import TelegramDemoRuntime from "./telegram-demo";

type Demo = {
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  steps: string[];
  accent: string;
};

const demos: Record<string, Demo> = {
  education: {
    eyebrow: "Demo · Educadores y coaches",
    title: "Convierte una consulta en un siguiente paso claro.",
    description:
      "Una Mini App para calificar interesados, recomendar una ruta y ordenar la inscripción dentro de Telegram.",
    outcome: "Primer valor: una ficha de prospecto con siguiente acción.",
    steps: ["Objetivo del alumno", "Ruta recomendada", "Reserva o inscripción", "Seguimiento"],
    accent: "#155eef",
  },
  crypto: {
    eyebrow: "Demo · Crypto",
    title: "Orienta mejor sin automatizar decisiones financieras.",
    description:
      "Una experiencia de onboarding y soporte con respuestas aprobadas, señales de riesgo y derivación humana.",
    outcome: "Primer valor: un caso de soporte organizado y seguro.",
    steps: ["Objetivo del usuario", "Ruta educativa", "Verificaciones antifraude", "Soporte humano"],
    accent: "#0b8f72",
  },
  trading: {
    eyebrow: "Demo · Trading y forex",
    title: "Ordena membresías, acceso y renovaciones.",
    description:
      "Una Mini App para separar estados de comunidad, detectar pendientes y guiar el siguiente paso operativo.",
    outcome: "Primer valor: una solicitud o renovación con contexto.",
    steps: ["Tipo de miembro", "Estado de acceso", "Siguiente paso", "Renovación"],
    accent: "#b25b16",
  },
};

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "#0d1726",
  color: "#f5f7fb",
  padding: "24px 18px 40px",
  fontFamily: "Arial, Helvetica, sans-serif",
};

export default function DemoPage({ params }: { params: { niche: string } }) {
  const demo = demos[params.niche] ?? demos.education;

  return (
    <main style={pageStyle}>
      <TelegramDemoRuntime />
      <div style={{ width: "min(100%, 560px)", margin: "0 auto" }}>
        <p
          style={{
            color: demo.accent,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {demo.eyebrow}
        </p>
        <h1
          style={{
            fontSize: "clamp(34px, 9vw, 58px)",
            lineHeight: 0.98,
            letterSpacing: "-0.05em",
            margin: "30px 0 20px",
          }}
        >
          {demo.title}
        </h1>
        <p style={{ color: "#b8c4d5", fontSize: 17, lineHeight: 1.55 }}>{demo.description}</p>

        <section
          style={{
            background: "#172538",
            border: "1px solid #2c3d54",
            borderRadius: 22,
            marginTop: 36,
            padding: 22,
          }}
        >
          <p style={{ color: "#8fa3bd", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Recorrido de ejemplo
          </p>
          <ol style={{ display: "grid", gap: 12, listStyle: "none", margin: "20px 0 0", padding: 0 }}>
            {demo.steps.map((step, index) => (
              <li
                key={step}
                style={{
                  alignItems: "center",
                  borderBottom: index === demo.steps.length - 1 ? 0 : "1px solid #2c3d54",
                  display: "flex",
                  gap: 14,
                  paddingBottom: index === demo.steps.length - 1 ? 0 : 12,
                }}
              >
                <span
                  style={{
                    alignItems: "center",
                    background: demo.accent,
                    borderRadius: "50%",
                    display: "inline-flex",
                    flex: "0 0 28px",
                    fontSize: 13,
                    fontWeight: 700,
                    height: 28,
                    justifyContent: "center",
                    width: 28,
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ fontSize: 15 }}>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <p style={{ color: "#d8e3f1", fontSize: 15, lineHeight: 1.5, marginTop: 26 }}>{demo.outcome}</p>
        <p style={{ color: "#8fa3bd", fontSize: 12, lineHeight: 1.5 }}>
          Esta es una demo con datos de ejemplo. No instala nada ni ejecuta pagos o acciones en tus
          grupos y canales.
        </p>
        <a
          href="https://t.me/quantsystemss_bot"
          style={{
            background: demo.accent,
            borderRadius: 12,
            color: "#fff",
            display: "block",
            fontSize: 15,
            fontWeight: 700,
            marginTop: 26,
            padding: "16px 18px",
            textAlign: "center",
          }}
        >
          Volver al bot y empezar
        </a>
      </div>
    </main>
  );
}
