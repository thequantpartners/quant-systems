"use client";

import { useEffect } from "react";
import { readAttribution } from "../../lib/attribution";
import { track } from "../../lib/tracking";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51999999999";
const calUrl = process.env.NEXT_PUBLIC_CAL_URL ?? "https://cal.com/";

export default function ThankYouPage() {
  const attribution = readAttribution();

  useEffect(() => {
    track("view_thankyou_upsell", attribution);
  }, [attribution]);

  function trackWhatsApp() {
    track("click_whatsapp_vip", attribution);
  }

  function trackCalendar() {
    track("schedule_calcom", attribution);
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, quiero conocer el acceso anticipado de Quant Setters.")}`;

  return (
    <main className="thankyou-page">
      <nav className="site-nav shell" aria-label="Navegación principal"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant setters</span></a></nav>
      <section className="thankyou-content shell">
        <div className="success-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">Evaluación recibida</p>
        <h1>Gracias por dar<br /><em>el primer paso.</em></h1>
        <p className="thankyou-lede">Recibimos tus datos. Revisaremos si tu operación encaja con una implementación desde US$300.</p>
        <div className="vip-offer"><span className="section-kicker">SIGUIENTE PASO</span><h2>Conversemos sobre el tramo entre tu anuncio y <em>la venta.</em></h2><div className="offer-actions"><a className="primary-cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={trackWhatsApp}>Hablar por WhatsApp <span aria-hidden="true">↗</span></a><a className="secondary-cta" href={calUrl} target="_blank" rel="noreferrer" onClick={trackCalendar}>Reservar una conversación <span aria-hidden="true">↗</span></a></div></div>
      </section>
    </main>
  );
}
