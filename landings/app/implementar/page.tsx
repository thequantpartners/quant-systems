"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { solutions } from "../../lib/solutions";
import { captureAttribution, readAttribution } from "../../lib/attribution";
import { track } from "../../lib/tracking";

type Diagnostic = {
  solution: string;
  tools: string;
  bottleneck: string;
  frequency: string;
  monthlyProgramRevenue: string;
  implementationBudget: string;
  impactConsequence: string;
  impactMetric: string;
  desiredOutcome: string;
};

const initialDiagnostic: Diagnostic = {
  solution: "",
  tools: "",
  bottleneck: "",
  frequency: "",
  monthlyProgramRevenue: "",
  implementationBudget: "",
  impactConsequence: "",
  impactMetric: "",
  desiredOutcome: ""
};

export default function ImplementPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [diagnostic, setDiagnostic] = useState(initialDiagnostic);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [diagnosticError, setDiagnosticError] = useState("");
  const [qualificationStatus, setQualificationStatus] = useState<"pending" | "qualified" | "not-fit">("pending");
  const [requestId, setRequestId] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "" });
  const telegramBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? "https://t.me/quantsystemss_bot";

  const solutionName = useMemo(
    () => solutions.find((item) => item.slug === diagnostic.solution)?.vertical ?? "una solución por definir",
    [diagnostic.solution]
  );

  useEffect(() => {
    captureAttribution(window.location.search);
  }, []);

  useEffect(() => {
    if (status === "success") {
      track("view_implementation_success", readAttribution());
    }
  }, [status]);

  function updateDiagnostic(field: keyof Diagnostic, value: string) {
    setDiagnostic((current) => ({ ...current, [field]: value }));
  }

  function updateContact(field: keyof typeof contact, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
  }

  function continueToContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const textFields = [diagnostic.tools, diagnostic.bottleneck, diagnostic.impactConsequence, diagnostic.impactMetric, diagnostic.desiredOutcome];
    const hasLowQualityText = textFields.some((value) => {
      const normalized = value.trim().toLowerCase();
      const alphanumericCount = (normalized.match(/[a-záéíóúüñ0-9]/g) ?? []).length;
      return alphanumericCount < 4 || /^(.)\1+$/.test(normalized) || /^(asdf|qwerty|test|xxxx|1234)/i.test(normalized);
    });
    if (hasLowQualityText) {
      setDiagnosticError("Cuéntanos el problema con palabras concretas para poder evaluar si podemos ayudarte.");
      return;
    }
    setDiagnosticError("");
    const score =
      (solutions.some((item) => item.slug === diagnostic.solution) ? 2 : 0) +
      (["Todos los días", "Varias veces por semana"].includes(diagnostic.frequency) ? 2 : 1) +
      (["US$1,000–US$2,999", "US$3,000–US$9,999", "US$10,000 o más"].includes(diagnostic.monthlyProgramRevenue) ? 2 : diagnostic.monthlyProgramRevenue === "Menos de US$1,000" ? 1 : 0) +
      (["US$1,000–US$2,999", "US$3,000–US$7,499", "US$7,500 o más"].includes(diagnostic.implementationBudget) ? 3 : diagnostic.implementationBudget === "Todavía no lo tengo separado" ? 0 : 1) +
      (diagnostic.tools.trim().length >= 12 ? 1 : 0) +
      (diagnostic.impactMetric.trim().length >= 8 ? 1 : 0);
    if (score < 6) {
      track("disqualify_diagnostic", readAttribution());
      setQualificationStatus("not-fit");
      return;
    }
    setQualificationStatus("qualified");
    track("complete_diagnostic", readAttribution());
    setStep(2);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const consentAccepted = form.get("consent") === "on";
    const contactConsent = form.get("contactConsent") === "on";
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    const idempotencyKey =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${contact.phone}`;
    const attribution = readAttribution();
    const impactSummary = {
      consequence: diagnostic.impactConsequence,
      metric: diagnostic.impactMetric,
      desired_outcome: diagnostic.desiredOutcome,
      monthly_program_revenue: diagnostic.monthlyProgramRevenue,
      implementation_budget: diagnostic.implementationBudget
    };
    const payload = {
      ...contact,
      ...diagnostic,
      consent_accepted: consentAccepted,
      attribution,
      impact_summary: impactSummary
    };
    const backendPayload = {
      name: contact.name,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      solution: diagnostic.solution,
      tools: diagnostic.tools,
      bottleneck: diagnostic.bottleneck,
      frequency: diagnostic.frequency,
      impact_metric: diagnostic.impactMetric,
      consent_accepted: consentAccepted,
      contact_consent: contactConsent,
      attribution,
      impact_summary: impactSummary
    };

    try {
      const response = await fetch(
        apiBaseUrl ? `${apiBaseUrl}/api/v1/implementation-requests` : "/api/implementation-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiBaseUrl ? { "Idempotency-Key": idempotencyKey } : {})
          },
          body: JSON.stringify(apiBaseUrl ? backendPayload : {
            name: contact.name,
            company: contact.company,
            email: contact.email,
            phone: contact.phone,
            solution: diagnostic.solution,
            tools: diagnostic.tools,
            bottleneck: diagnostic.bottleneck,
            frequency: diagnostic.frequency,
            impactMetric: diagnostic.impactMetric,
            consentAccepted,
            contactConsent,
            attribution: payload.attribution,
            impactSummary
          })
        }
      );
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
          detail?: string | Array<{ msg?: string }>;
        } | null;
        const detail = Array.isArray(body?.detail)
          ? body.detail.map((item) => item.msg).filter(Boolean).join(" ")
          : body?.detail;
        throw new Error(body?.error ?? detail ?? "No pudimos registrar la solicitud.");
      }
      const result = (await response.json()) as { id?: string; telegram_url?: string };
      const id = result.id ?? idempotencyKey;
      setRequestId(id);
      setTelegramUrl(result.telegram_url ?? `${telegramBotUrl}?start=diag_${id}`);
      track("submit_implementation_request", payload.attribution);
      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "No pudimos registrar la solicitud.");
    }
  }

  if (qualificationStatus === "not-fit") {
    return (
      <main className="thankyou-page">
        <nav className="site-nav shell" aria-label="Navegación principal"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant systems</span></Link></nav>
        <section className="thankyou-content shell">
          <div className="success-mark" aria-hidden="true">✓</div>
          <p className="eyebrow">Diagnóstico recibido</p>
          <h1>Gracias por<br /><em>compartirlo.</em></h1>
          <p className="thankyou-lede">Por ahora no vemos el encaje suficiente para recomendar una implementación. Preferimos decirlo así antes que venderte algo que no necesitas.</p>
          <Link className="secondary-cta" href="/">Volver al inicio <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="thankyou-page">
        <nav className="site-nav shell" aria-label="Navegación principal"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant systems</span></Link></nav>
        <section className="thankyou-content shell">
          <div className="success-mark" aria-hidden="true">✓</div>
          <p className="eyebrow">Diagnóstico recibido</p>
          <h1>Ya entendimos<br /><em>dónde mirar.</em></h1>
          <p className="thankyou-lede">Revisaremos tu operación y te contactaremos con un alcance claro. No necesitas aprender otra herramienta ni preparar una presentación.</p>
          <div className="vip-offer">
            <span className="section-kicker">ÚLTIMO FILTRO</span>
            <h2>Si quieres continuar, llevemos este contexto a <em>Telegram.</em></h2>
            <a className="primary-cta" href={telegramUrl || telegramBotUrl} target="_blank" rel="noreferrer" onClick={() => track("click_telegram_implementation", readAttribution())}>Continuar en Telegram <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <nav className="site-nav shell" aria-label="Navegación principal"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant systems</span></Link><span className="nav-context">Diagnóstico {step} de 2</span></nav>
      {step === 1 ? (
        <section className="implementation-layout shell">
          <div className="implementation-intro"><p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Primero el flujo</p><h1>¿Dónde se está perdiendo <em>la experiencia del alumno?</em></h1><p className="hero-lede">No te pediremos contacto todavía. Primero queremos entender cómo inscribes, cobras, entregas acceso y acompañas a tu comunidad.</p><p className="site-legal">Este diagnóstico toma menos de dos minutos. Las implementaciones parten desde US$1,000 y no garantizan ROI, matrículas ni resultados específicos.</p></div>
          <form className="implementation-form" onSubmit={continueToContact}>
            <label className="field"><span>¿Qué quieres ordenar dentro de Telegram?</span><select required value={diagnostic.solution} onChange={(event) => updateDiagnostic("solution", event.target.value)}><option value="">Selecciona una situación</option>{solutions.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}<option value="otro">No estoy seguro todavía</option></select></label>
            <label className="field"><span>¿Qué herramientas ya usas junto con Telegram?</span><textarea required value={diagnostic.tools} onChange={(event) => updateDiagnostic("tools", event.target.value)} rows={3} placeholder="Ej. Google Sheets, Google Calendar, Drive, Notion..." /></label>
            <label className="field"><span>¿Qué cuello de botella quieres eliminar?</span><textarea required value={diagnostic.bottleneck} onChange={(event) => updateDiagnostic("bottleneck", event.target.value)} rows={4} placeholder="Describe qué se pierde, retrasa o duplica." /></label>
            <label className="field"><span>¿Con qué frecuencia ocurre?</span><select required value={diagnostic.frequency} onChange={(event) => updateDiagnostic("frequency", event.target.value)}><option value="">Selecciona una opción</option><option>Todos los días</option><option>Varias veces por semana</option><option>Algunas veces al mes</option><option>No lo sé todavía</option></select></label>
            <label className="field"><span>¿Qué consecuencia tiene hoy?</span><textarea required value={diagnostic.impactConsequence} onChange={(event) => updateDiagnostic("impactConsequence", event.target.value)} rows={3} placeholder="Ej. ventas que no se siguen, citas que se pierden..." /></label>
            <label className="field"><span>¿Qué métrica debería mejorar?</span><textarea required value={diagnostic.impactMetric} onChange={(event) => updateDiagnostic("impactMetric", event.target.value)} rows={3} placeholder="Ej. horas de soporte, conversaciones calificadas, matrículas..." /></label>
            <label className="field"><span>¿Qué te gustaría que ocurra?</span><textarea required value={diagnostic.desiredOutcome} onChange={(event) => updateDiagnostic("desiredOutcome", event.target.value)} rows={3} placeholder="Describe una mejora operativa concreta." /></label>
            <label className="field"><span>¿Qué ingresos mensuales genera esta oferta o comunidad?</span><select required value={diagnostic.monthlyProgramRevenue} onChange={(event) => updateDiagnostic("monthlyProgramRevenue", event.target.value)}><option value="">Selecciona una opción</option><option>Menos de US$1,000</option><option>US$1,000–US$2,999</option><option>US$3,000–US$9,999</option><option>US$10,000 o más</option><option>Prefiero conversarlo</option></select></label>
            <label className="field"><span>Si vemos que hay encaje, ¿qué presupuesto tienes disponible para implementar?</span><select required value={diagnostic.implementationBudget} onChange={(event) => updateDiagnostic("implementationBudget", event.target.value)}><option value="">Selecciona una opción</option><option>Todavía no lo tengo separado</option><option>US$1,000–US$2,999</option><option>US$3,000–US$7,499</option><option>US$7,500 o más</option></select></label>
            {diagnosticError && <p className="form-error" role="alert">{diagnosticError}</p>}
            <button className="submit-button" type="submit">Ver resumen del diagnóstico <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      ) : (
        <section className="implementation-layout shell">
          <div className="implementation-intro"><p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Resumen del diagnóstico</p><h1>Esto es lo que <em>entendimos.</em></h1><div className="impact-panel"><span className="section-kicker">TU OPERACIÓN</span><p><strong>{solutionName}</strong> usa {diagnostic.tools} y enfrenta este cuello de botella:</p><p>{diagnostic.bottleneck}</p><div className="impact-rule" /><span className="section-kicker">SEÑALES DE CONTEXTO</span><p>Ocurre: {diagnostic.frequency}. Ingreso mensual de la oferta: {diagnostic.monthlyProgramRevenue}. Presupuesto separado: {diagnostic.implementationBudget}.</p><div className="impact-rule" /><span className="section-kicker">MÉTRICA A PROTEGER</span><p>{diagnostic.impactMetric}</p><div className="impact-rule" /><span className="section-kicker">LO QUE QUIERES CAMBIAR</span><p>{diagnostic.desiredOutcome}</p></div><button className="secondary-cta" type="button" onClick={() => { setQualificationStatus("pending"); setStep(1); }}>Editar diagnóstico</button></div>
          <form className="implementation-form" onSubmit={submit}>
            <p className="form-footnote">Si este resumen te representa, déjanos un contacto para continuar la conversación.</p>
            <label className="field"><span>Nombre</span><input required value={contact.name} onChange={(event) => updateContact("name", event.target.value)} autoComplete="name" /></label>
            <label className="field"><span>Empresa</span><input required value={contact.company} onChange={(event) => updateContact("company", event.target.value)} autoComplete="organization" /></label>
            <label className="field"><span>Correo</span><input required value={contact.email} onChange={(event) => updateContact("email", event.target.value)} type="email" placeholder="tu@empresa.com" autoComplete="email" /></label>
            <label className="field"><span>WhatsApp</span><input required value={contact.phone} onChange={(event) => updateContact("phone", event.target.value)} type="tel" placeholder="+51 9XXXXXXXX" autoComplete="tel" /></label>
            <label className="consent"><input required name="consent" type="checkbox" /> <span>Acepto el <Link href="/privacidad">aviso de privacidad</Link> y el uso de mis datos para evaluar esta solicitud.</span></label>
            <label className="consent"><input required name="contactConsent" type="checkbox" /> <span>Autorizo a Quant Systems a contactarme después por correo electrónico, WhatsApp o llamada sobre esta solicitud.</span></label>
            {status === "error" && <p className="form-error" role="alert">{error}</p>}
            <button className="submit-button" disabled={status === "submitting"} type="submit">{status === "submitting" ? "Guardando..." : "Enviar diagnóstico"} <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      )}
    </main>
  );
}
