import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "../../../lib/solutions";
import SolutionTracker from "./solution-tracker";

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) return {};
  return {
    title: `${solution.vertical}: ${solution.title}`,
    description: `${solution.problem} Implementación bajo demanda con ${solution.integrations.join(", ")}.`
  };
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  return (
    <main>
      <SolutionTracker slug={solution.slug} />
      <nav className="site-nav shell" aria-label="Navegación principal">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant systems</span></Link>
        <Link className="nav-link" href="/soluciones">Todas las soluciones <span aria-hidden="true">↗</span></Link>
      </nav>
      <article className="solution-detail shell">
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> {solution.eyebrow}</p>
        <div className="solution-detail-grid">
          <div>
            <h1>{solution.title}</h1>
            <p className="story-lede">{solution.story}</p>
            <Link className="primary-cta" href={`/implementar?solution=${solution.slug}`}>Quiero revisar esto <span aria-hidden="true">↗</span></Link>
            <p className="microcopy price-note">
              <strong>{solution.price}</strong>
              {solution.referencePrice ? (
                <> <del>{solution.referencePrice}</del> precio de referencia.</>
              ) : null}
              {" "}El alcance final se confirma antes de construir.
            </p>
          </div>
          <div className="impact-panel">
            <span className="section-kicker">EL CUELLO DE BOTELLA</span>
            <p>{solution.problem}</p>
            <div className="impact-rule" />
            <span className="section-kicker">QUÉ CAMBIA</span>
            <p>{solution.outcome}</p>
          </div>
        </div>
        <div className="solution-detail-sections">
          <section>
            <span className="section-kicker">SE CONECTA CON LO QUE YA USAS</span>
            <div className="integration-line">{solution.integrations.map((integration) => <span key={integration}>{integration}</span>)}</div>
          </section>
          <section>
            <span className="section-kicker">CÓMO MEDIMOS EL CAMBIO</span>
            <div className="metric-line">{solution.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
          </section>
        </div>
        <p className="site-legal solution-disclaimer">Las métricas son indicadores operativos, no una promesa de resultados. La implementación depende del acceso, disponibilidad y condiciones de las herramientas del cliente. Quant Systems no está afiliado a las plataformas mencionadas.</p>
      </article>
    </main>
  );
}
