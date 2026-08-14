"use client";

import { FormEvent, useEffect, useState } from "react";
import { captureAttribution, readAttribution, type Attribution } from "../lib/attribution";
import { track } from "../lib/tracking";

type FormValues = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  leadVolume: string;
  adChannels: string;
  monthlyAdSpend: string;
  ticketRange: string;
};

const initialValues: FormValues = {
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  leadVolume: "",
  adChannels: "",
  monthlyAdSpend: "",
  ticketRange: ""
};

const steps = [
  ["01", "Primero llega", "El lead entra desde una campaña de clientes potenciales con la información necesaria para entenderlo."],
  ["02", "Luego responde", "Tu equipo recibe el contexto y el siguiente paso, en lugar de empezar cada conversación desde cero."],
  ["03", "Después sigue", "El sistema deja claro qué pasó, qué falta y qué oportunidades merecen atención."]
];

export default function LandingPage() {
  const [values, setValues] = useState(initialValues);
  const [attribution, setAttribution] = useState<Attribution>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const captured = captureAttribution(window.location.search);
    setAttribution(captured);
    track("view_landing", captured);
  }, []);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const consentInput = event.currentTarget.elements.namedItem("consent");
    const consentAccepted = consentInput instanceof HTMLInputElement && consentInput.checked;
    const payload = { ...values, consentAccepted, attribution: { ...readAttribution(), ...attribution } };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "No pudimos guardar tus datos. Inténtalo nuevamente.");
      }

      track("submit_form_early_access", payload.attribution);
      window.location.assign("/gracias");
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "No pudimos guardar tus datos. Inténtalo nuevamente."
      );
    }
  }

  return (
    <main>
      <nav className="site-nav shell" aria-label="Navegación principal">
        <a className="brand" href="/" aria-label="Quant Setters, inicio">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span>quant setters</span>
        </a>
        <a className="nav-link" href="#acceso">Evaluar sistema <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Para servicios de ticket medio-alto y high-ticket</p>
          <h1>Estás pagando para que te escriban. <em>¿Qué pasa después?</em></h1>
          <p className="hero-lede">
            Cada clic cuesta. Cada lead de una campaña de clientes potenciales que llega sin respuesta,
            contexto o seguimiento también. Un sistema de ventas ordena ese momento entre el anuncio y la venta.
          </p>
          <a className="primary-cta" href="#acceso">
            Quiero revisar mi sistema <span aria-hidden="true">↗</span>
          </a>
          <p className="microcopy">Implementación desde US$500 · primero vemos si tu operación encaja.</p>
        </div>

        <div className="hero-visual" aria-label="Componentes del sistema de ventas instalado">
          <div className="system-map">
            <div className="system-map-header">
              <span className="section-kicker">QUÉ INSTALAMOS</span>
              <span className="system-map-price">Desde US$500</span>
            </div>
            <div className="system-step"><span>01</span><strong>Llega el lead correcto</strong><small>Campañas de clientes potenciales</small></div>
            <div className="system-connector" aria-hidden="true" />
            <div className="system-step"><span>02</span><strong>El equipo sabe qué hacer</strong><small>WhatsApp + CRM</small></div>
            <div className="system-connector" aria-hidden="true" />
            <div className="system-step"><span>03</span><strong>La oportunidad sigue viva</strong><small>Seguimiento y reporting</small></div>
            <p className="system-map-note">Configurado para tu operación. Sin aprender otra herramienta.</p>
          </div>
        </div>
      </section>

      <section className="problem-section shell">
        <div className="section-kicker">SEAMOS HONESTOS</div>
        <div className="problem-grid">
          <h2>El anuncio hizo su trabajo. <em>¿Lo está haciendo tu proceso?</em></h2>
          <div>
            <p className="body-large">Si ya ejecutas campañas de generación de clientes potenciales en Google Ads o Meta Ads, ya estás haciendo el trabajo difícil: poner tu oferta frente a personas interesadas.</p>
            <p className="muted-copy">Pero si el lead espera, se pierde el contexto o nadie sabe cuándo volver a escribirle, el presupuesto sigue saliendo y la venta no llega.</p>
          </div>
        </div>
      </section>

      <section className="benefits-section shell">
        <div className="section-heading">
        <div><div className="section-kicker">LO QUE OBTIENES</div><h2>Más claridad después<br /><em>de cada lead.</em></h2></div>
        <p>El objetivo no es comprar más tráfico. Es que el tráfico que ya pagas tenga un proceso detrás.</p>
        </div>
        <div className="benefit-list">
        <article className="benefit-row">
          <span className="step-number">01</span>
          <div><h3>Menos oportunidades olvidadas</h3><p>Cada lead de una campaña de clientes potenciales tiene un lugar, un contexto y un siguiente paso visible.</p></div>
        </article>
        <article className="benefit-row">
          <span className="step-number">02</span>
          <div><h3>Un equipo que sabe qué hacer</h3><p>Dejas de depender de mensajes sueltos, memoria y hojas que nadie actualiza.</p></div>
        </article>
        <article className="benefit-row">
          <span className="step-number">03</span>
          <div><h3>Decisiones con más contexto</h3><p>Ves qué pasó después del clic para mejorar tu proceso comercial, no solo mirar métricas de Ads.</p></div>
        </article>
        </div>
      </section>

      <section className="steps-section shell">
        <div className="section-heading">
        <div><div className="section-kicker">CÓMO LO HACEMOS</div><h2>La venta no empieza<br /><em>cuando respondes.</em></h2></div>
        <p>Empieza cuando todo el equipo sabe qué ocurrió, qué sigue y quién debe hacerlo.</p>
        </div>
        <div className="step-list">
          {steps.map(([number, title, copy]) => (
            <article className="step-row" key={number}>
              <span className="step-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="step-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="audience-section shell">
        <div className="audience-note">ESTO NO ES PARA TODOS</div>
        <div className="audience-content"><h2>Si vendes servicios de alto valor<br /><em>y ya generas leads.</em></h2><div className="audience-list"><span>Ticket medio-alto o high-ticket</span><span>Campañas de clientes potenciales activas</span><span>Leads por WhatsApp o CRM</span><span>Equipo comercial que da seguimiento</span></div></div>
      </section>

      <section className="faq-section shell">
        <div className="section-kicker">PREGUNTAS DIRECTAS</div>
        <h2>Antes de dejarnos<br /><em>tus datos.</em></h2>
        <div className="faq-list">
          <details><summary>¿Necesito saber de automatizaciones?</summary><p>No. Revisamos tu operación, configuramos el sistema y te explicamos lo necesario para usarlo.</p></details>
          <details><summary>¿Tengo que cambiar mi CRM?</summary><p>No necesariamente. Primero revisamos lo que ya usas y definimos si conviene conectarlo o ajustar el proceso.</p></details>
          <details><summary>¿Ustedes gestionan mis campañas?</summary><p>No en la implementación base. El sistema trabaja con tus campañas activas de generación de clientes potenciales en Google Ads y Meta Ads; la gestión publicitaria puede contratarse por separado.</p></details>
          <details><summary>¿Qué incluye la implementación desde US$500?</summary><p>Configuración inicial, conexiones acordadas, pruebas, puesta en marcha y explicación básica al equipo. El alcance final se confirma antes de empezar.</p></details>
          <details><summary>¿Qué pasa después de la instalación?</summary><p>Puedes contratar bolsas mensuales de soporte y horas de refactorización para ajustes, mejoras e integraciones nuevas.</p></details>
          <details><summary>¿El sistema queda en mis cuentas?</summary><p>La instalación se realiza para tu operación. Revisamos contigo accesos, responsabilidades y condiciones de administración antes de comenzar.</p></details>
        </div>
      </section>

      <section className="access-section shell" id="acceso">
        <div className="access-intro"><div className="section-kicker">SI TE RECONOCES</div><h2>El siguiente paso es saber<br /><em>qué pasa después del lead.</em></h2><p>La evaluación revisa tu campaña de clientes potenciales, el volumen de leads, el valor de cada venta y el seguimiento actual. Si el sistema no tiene sentido para tu operación, también quedará claro.</p><div className="capacity"><span className="capacity-dot" /> Implementación desde US$500 · pago único</div></div>
        <form className="lead-form" onSubmit={submitForm} noValidate>
          <div className="form-header"><span>01</span><p>Veamos si hay encaje</p></div>
          <div className="form-grid">
            <Field id="name" label="Nombre" value={values.name} onChange={(value) => updateValue("name", value)} />
            <Field id="company" label="Empresa" value={values.company} onChange={(value) => updateValue("company", value)} />
            <Field id="role" label="Cargo" value={values.role} onChange={(value) => updateValue("role", value)} />
            <Field id="email" label="Email corporativo" type="email" value={values.email} onChange={(value) => updateValue("email", value)} />
            <Field id="phone" label="WhatsApp / Teléfono" type="tel" placeholder="+51 9XXXXXXXX" value={values.phone} onChange={(value) => updateValue("phone", value)} />
            <label className="field"><span>Leads mensuales de campañas de clientes potenciales</span><select required value={values.leadVolume} onChange={(event) => updateValue("leadVolume", event.target.value)}><option value="">Selecciona un rango</option><option value="0-20">0 – 20</option><option value="21-50">21 – 50</option><option value="51-100">51 – 100</option><option value="100+">Más de 100</option></select></label>
            <label className="field"><span>¿Dónde ejecutas esas campañas?</span><select required value={values.adChannels} onChange={(event) => updateValue("adChannels", event.target.value)}><option value="">Selecciona una opción</option><option value="google">Google Ads</option><option value="meta">Meta Ads</option><option value="both">Google y Meta Ads</option></select></label>
            <label className="field"><span>Inversión mensual aproximada</span><select required value={values.monthlyAdSpend} onChange={(event) => updateValue("monthlyAdSpend", event.target.value)}><option value="">Selecciona un rango</option><option value="under-500">Menos de US$500</option><option value="500-1500">US$500 – US$1,500</option><option value="1500-5000">US$1,500 – US$5,000</option><option value="5000-plus">Más de US$5,000</option></select></label>
            <label className="field"><span>Valor promedio de una venta</span><select required value={values.ticketRange} onChange={(event) => updateValue("ticketRange", event.target.value)}><option value="">Selecciona un rango</option><option value="under-500">Menos de US$500</option><option value="500-1500">US$500 – US$1,500</option><option value="1500-5000">US$1,500 – US$5,000</option><option value="5000-plus">Más de US$5,000</option></select></label>
          </div>
          <label className="consent"><input id="consent" name="consent" type="checkbox" required /> <span>Acepto que Quant Setters use estos datos para evaluar el encaje y contactarme por WhatsApp o correo electrónico. Puedo retirar mi consentimiento escribiendo a partners@thequantpartners.com. <a href="/privacidad">Aviso de privacidad</a>.</span></label>
          {status === "error" && <p className="form-error" role="alert">{error}</p>}
          <button className="submit-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Enviando..." : "Quiero saber si hay encaje"} <span aria-hidden="true">↗</span></button>
          <p className="form-footnote">Tus datos se usan únicamente para evaluar el encaje. No compartimos tu información.</p>
        </form>
      </section>

      <footer className="site-footer shell">
        <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant setters</span></a>
        <span>Sistemas de ventas · Perú</span>
        <a href="mailto:partners@thequantpartners.com">partners@thequantpartners.com</a>
        <p className="site-legal">Quant Setters ofrece servicios de implementación y soporte de sistemas de ventas. No somos Google ni Meta, ni estamos afiliados con esas empresas. La implementación no garantiza leads, ventas, ingresos ni ROAS; los resultados dependen de la oferta, las campañas, el mercado y la operación del cliente. El precio desde US$500 depende del alcance acordado y no incluye gestión de campañas salvo acuerdo escrito. La información de esta página es comercial y no constituye asesoría legal, financiera ni profesional. <a href="/privacidad">Aviso de privacidad</a>.</p>
      </footer>
    </main>
  );
}

function Field({ id, label, type = "text", placeholder, value, onChange }: { id: string; label: string; type?: string; placeholder?: string; value: string; onChange: (value: string) => void }) {
  return <label className="field"><span>{label}</span><input id={id} name={id} type={type} placeholder={placeholder} required minLength={2} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}
