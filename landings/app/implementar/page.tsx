"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { solutions } from "../../lib/solutions";
import { readAttribution } from "../../lib/attribution";
import { track } from "../../lib/tracking";

type Diagnostic = {
  solution: string;
  tools: string;
  bottleneck: string;
  frequency: string;
  impactConsequence: string;
  desiredOutcome: string;
};

const initialDiagnostic: Diagnostic = {
  solution: "",
  tools: "",
  bottleneck: "",
  frequency: "",
  impactConsequence: "",
  desiredOutcome: ""
};

export default function ImplementPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [diagnostic, setDiagnostic] = useState(initialDiagnostic);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [contact, setContact] = useState({ name: "", company: "", phone: "" });

  const solutionName = useMemo(
    () => solutions.find((item) => item.slug === diagnostic.solution)?.vertical ?? "una solución por definir",
    [diagnostic.solution]
  );

  function updateDiagnostic(field: keyof Diagnostic, value: string) {
    setDiagnostic((current) => ({ ...current, [field]: value }));
  }

  function updateContact(field: keyof typeof contact, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
  }

  function continueToContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("complete_diagnostic", readAttribution());
    setStep(2);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const consentAccepted = form.get("consent") === "on";
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    const idempotencyKey =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${contact.phone}`;
    const attribution = readAttribution();
    const impactSummary = {
      consequence: diagnostic.impactConsequence,
      desired_outcome: diagnostic.desiredOutcome
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
      phone: contact.phone,
      solution: diagnostic.solution,
      tools: diagnostic.tools,
      bottleneck: diagnostic.bottleneck,
      frequency: diagnostic.frequency,
      consent_accepted: consentAccepted,
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
            phone: contact.phone,
            solution: diagnostic.solution,
            tools: diagnostic.tools,
            bottleneck: diagnostic.bottleneck,
            frequency: diagnostic.frequency,
            consentAccepted,
            attribution: payload.attribution
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
      const result = (await response.json()) as { id?: string };
      const id = result.id ?? idempotencyKey;
      setRequestId(id);
      track("submit_implementation_request", payload.attribution);
      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "No pudimos registrar la solicitud.");
    }
  }

  if (status === "success") {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const whatsappMessage = `Hola, soy ${contact.name} de ${contact.company}. Mi solicitud ${requestId} es sobre ${solutionName}. El cuello de botella: ${diagnostic.bottleneck}`;
    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
      : "";

    return (
      <main className="thankyou-page">
        <nav className="site-nav shell" aria-label="Navegación principal"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant setters</span></Link></nav>
        <section className="thankyou-content shell">
          <div className="success-mark" aria-hidden="true">✓</div>
          <p className="eyebrow">Diagnóstico recibido</p>
          <h1>Ya entendimos<br /><em>dónde mirar.</em></h1>
          <p className="thankyou-lede">Revisaremos tu operación y te contactaremos con un alcance claro. No necesitas aprender otra herramienta ni preparar una presentación.</p>
          <div className="vip-offer">
            <span className="section-kicker">ÚLTIMO FILTRO</span>
            <h2>Si quieres continuar, llevemos este contexto a <em>WhatsApp.</em></h2>
            {whatsappUrl ? (
              <a className="primary-cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => track("click_whatsapp_implementation", readAttribution())}>Abrir WhatsApp <span aria-hidden="true">↗</span></a>
            ) : (
              <p className="form-error">WhatsApp todavía no está configurado. Conservamos tu solicitud con el ID {requestId}.</p>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <nav className="site-nav shell" aria-label="Navegación principal"><Link className="brand" href="/soluciones"><span className="brand-mark" aria-hidden="true">Q</span><span>quant setters</span></Link><span className="nav-context">Filtro {step} de 2</span></nav>
      {step === 1 ? (
        <section className="implementation-layout shell">
          <div className="implementation-intro"><p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Primero el problema</p><h1>¿Dónde se está yendo <em>el dinero o el tiempo?</em></h1><p className="hero-lede">No te pediremos contacto todavía. Primero queremos saber si existe un problema concreto que valga la pena resolver.</p><p className="site-legal">Este diagnóstico toma menos de dos minutos y no garantiza ROI, ventas ni resultados específicos.</p></div>
          <form className="implementation-form" onSubmit={continueToContact}>
            <label className="field"><span>¿Qué tipo de negocio tienes?</span><select required value={diagnostic.solution} onChange={(event) => updateDiagnostic("solution", event.target.value)}><option value="">Selecciona una situación</option>{solutions.map((item) => <option key={item.slug} value={item.slug}>{item.vertical}</option>)}<option value="otro">No estoy seguro todavía</option></select></label>
            <label className="field"><span>¿Qué herramientas ya usas?</span><textarea required value={diagnostic.tools} onChange={(event) => updateDiagnostic("tools", event.target.value)} rows={3} placeholder="Ej. WhatsApp, Sheets, MercadoLibre..." /></label>
            <label className="field"><span>¿Qué cuello de botella quieres eliminar?</span><textarea required value={diagnostic.bottleneck} onChange={(event) => updateDiagnostic("bottleneck", event.target.value)} rows={4} placeholder="Describe qué se pierde, retrasa o duplica." /></label>
            <label className="field"><span>¿Con qué frecuencia ocurre?</span><select required value={diagnostic.frequency} onChange={(event) => updateDiagnostic("frequency", event.target.value)}><option value="">Selecciona una opción</option><option>Todos los días</option><option>Varias veces por semana</option><option>Algunas veces al mes</option><option>No lo sé todavía</option></select></label>
            <label className="field"><span>¿Qué consecuencia tiene hoy?</span><textarea required value={diagnostic.impactConsequence} onChange={(event) => updateDiagnostic("impactConsequence", event.target.value)} rows={3} placeholder="Ej. ventas que no se siguen, citas que se pierden..." /></label>
            <label className="field"><span>¿Qué te gustaría que ocurra?</span><textarea required value={diagnostic.desiredOutcome} onChange={(event) => updateDiagnostic("desiredOutcome", event.target.value)} rows={3} placeholder="Describe una mejora operativa concreta." /></label>
            <button className="submit-button" type="submit">Ver qué entendimos <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      ) : (
        <section className="implementation-layout shell">
          <div className="implementation-intro"><p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Segundo filtro</p><h1>Esto es lo que <em>entendimos.</em></h1><div className="impact-panel"><span className="section-kicker">TU OPERACIÓN</span><p><strong>{solutionName}</strong> usa {diagnostic.tools} y enfrenta este cuello de botella:</p><p>{diagnostic.bottleneck}</p><div className="impact-rule" /><span className="section-kicker">LO QUE QUIERES CAMBIAR</span><p>{diagnostic.desiredOutcome}</p></div><button className="secondary-cta" type="button" onClick={() => setStep(1)}>Editar diagnóstico</button></div>
          <form className="implementation-form" onSubmit={submit}>
            <p className="form-footnote">Si este resumen te representa, déjanos un contacto para continuar la conversación.</p>
            <label className="field"><span>Nombre</span><input required value={contact.name} onChange={(event) => updateContact("name", event.target.value)} autoComplete="name" /></label>
            <label className="field"><span>Empresa</span><input required value={contact.company} onChange={(event) => updateContact("company", event.target.value)} autoComplete="organization" /></label>
            <label className="field"><span>WhatsApp</span><input required value={contact.phone} onChange={(event) => updateContact("phone", event.target.value)} type="tel" placeholder="+51 9XXXXXXXX" autoComplete="tel" /></label>
            <label className="consent"><input required name="consent" type="checkbox" /> <span>Acepto que Quant Setters use estos datos para evaluar el encaje y contactarme. <Link href="/privacidad">Aviso de privacidad</Link>.</span></label>
            {status === "error" && <p className="form-error" role="alert">{error}</p>}
            <button className="submit-button" disabled={status === "submitting"} type="submit">{status === "submitting" ? "Guardando..." : "Continuar por WhatsApp"} <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      )}
    </main>
  );
}
