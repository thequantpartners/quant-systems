import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Información sobre el uso de datos de contacto en Quant Systems."
};

export default function PrivacyPage() {
  return (
    <main className="legal-page shell">
      <nav className="site-nav" aria-label="Navegación principal">
        <a className="brand" href="/" aria-label="Quant Systems, inicio">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span>quant systems</span>
        </a>
      </nav>
      <article className="legal-content">
        <p className="section-kicker">INFORMACIÓN LEGAL</p>
        <h1>Aviso de privacidad</h1>
        <p>Quant Systems, operado por The Quant Partners, usa los datos enviados en el formulario para evaluar si existe encaje con nuestros servicios de implementación de sistemas de ventas y para responder a la solicitud.</p>
        <h2>Datos que podemos recibir</h2>
        <p>Nombre, empresa, cargo, correo, teléfono o WhatsApp, información sobre campañas de generación de clientes potenciales, volumen aproximado de leads, inversión publicitaria y valor promedio de venta.</p>
        <h2>Cómo usamos los datos</h2>
        <p>Usamos esta información para revisar el encaje, contactarte por Telegram, WhatsApp o correo electrónico, preparar una conversación comercial y dar seguimiento a tu solicitud. No vendemos tus datos.</p>
        <h2>Contacto y retiro del consentimiento</h2>
        <p>Puedes solicitar dejar de recibir comunicaciones o preguntar por el uso de tus datos escribiendo a <a href="mailto:partners@thequantpartners.com">partners@thequantpartners.com</a>.</p>
        <h2>Alcance de este aviso</h2>
        <p>Este aviso describe la validación comercial inicial. Antes de operar integraciones productivas con datos de clientes, se definirá la documentación contractual, las responsabilidades de cada parte, los proveedores involucrados y los plazos de conservación aplicables.</p>
        <p className="legal-note">Este documento debe revisarse con asesoría legal local antes de publicar campañas o procesar datos a escala.</p>
      </article>
    </main>
  );
}
