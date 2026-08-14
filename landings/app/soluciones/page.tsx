import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "../../lib/solutions";

export const metadata: Metadata = {
  title: "Soluciones operativas para pymes",
  description:
    "Implementaciones bajo demanda para inmobiliarias, e-commerce y clínicas usando las herramientas que tu negocio ya conoce."
};

export default function SolutionsPage() {
  return (
    <main>
      <nav className="site-nav shell" aria-label="Navegación principal">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span>quant setters</span>
        </Link>
        <span className="nav-context">Catálogo de implementaciones</span>
      </nav>

      <section className="catalog-hero shell">
        <div>
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> No necesitas otro SaaS</p>
          <h1>Tu negocio no necesita otra herramienta. <em>Necesita que las actuales trabajen juntas.</em></h1>
          <p className="hero-lede">
            Explora soluciones que atacan una pérdida o un cuello de botella concreto.
            Si no reconoces tu problema, no hay nada que venderte.
          </p>
        </div>
        <div className="catalog-proof">
          <span className="section-kicker">LA REGLA</span>
          <strong>Si no mueve ingresos, margen o capacidad, no lo implementamos.</strong>
          <p>Sheets, Notion y WhatsApp son la superficie. La operación detrás es lo que se ordena.</p>
        </div>
      </section>

      <section className="solution-index shell" aria-labelledby="solutions-title">
        <div className="section-heading">
          <div>
            <div className="section-kicker">ELIGE POR EL PROBLEMA</div>
            <h2 id="solutions-title">Historias que quizá<br /><em>te suenan demasiado.</em></h2>
          </div>
          <p>Implementación bajo demanda. Primero entendemos la fuga; después construimos lo necesario.</p>
        </div>
        <div className="solution-list">
          {solutions.map((solution, index) => (
            <article className="solution-row" key={solution.slug}>
              <span className="step-number">0{index + 1}</span>
              <div>
                <p className="solution-vertical">{solution.vertical}</p>
                <h3>{solution.title}</h3>
                <p className="solution-problem">{solution.problem}</p>
                <p className="solution-price">
                  <strong>{solution.price}</strong>
                  {solution.referencePrice ? <> <del>{solution.referencePrice}</del> precio de referencia.</> : null}
                </p>
              </div>
              <Link className="text-link" href={`/soluciones/${solution.slug}`}>
                Ver si encaja <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-qualifier shell">
        <div>
          <div className="section-kicker">ANTES DE IMPLEMENTAR</div>
          <h2>No compramos tu atención.<br /><em>Medimos el problema.</em></h2>
        </div>
        <div className="qualifier-copy">
          <p>Te preguntaremos qué se pierde, con qué frecuencia y qué debería mejorar. No estimaremos ROI como promesa ni conectaremos una plataforma solo porque sea posible.</p>
          <Link className="primary-cta" href="/implementar">Diagnosticar mi operación <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <footer className="site-footer shell">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant setters</span></Link>
        <Link href="/privacidad">Privacidad</Link>
        <p className="site-legal">Quant Setters ofrece implementaciones y soporte de sistemas operativos comerciales. No somos Google, Meta, MercadoLibre, Shopify, Urbania ni Adondevivir, ni estamos afiliados con esas empresas. No garantizamos ingresos, ventas, ROI ni resultados específicos.</p>
      </footer>
    </main>
  );
}
