import type { Metadata } from "next";
import Link from "next/link";
import LandingTracker from "./landing-tracker";
import HeroRotator from "./hero-rotator";

export const metadata: Metadata = {
  title: "Convierte tu comunidad de formación en una operación dentro de Telegram",
  description:
    "Mini Apps y sistemas operativos para inscribir, cobrar, entregar acceso y acompañar alumnos dentro de Telegram."
};

const miniAppDemos = [
  {
    src: "https://core.telegram.org/file/464001679/11aa9/KQx_BlPVXRo.4922145.mp4/c65433c8ac11a347a8",
    label: "Interfaz flexible",
    caption: "Una experiencia propia para guiar el siguiente paso del alumno."
  },
  {
    src: "https://core.telegram.org/file/464001257/12087/QNQUbIi864k.909800.mp4/8ea7adad7db407388e",
    label: "Catálogo y selección",
    caption: "Presenta programas, cohortes o recursos sin sacar a la comunidad de Telegram."
  },
  {
    src: "https://core.telegram.org/file/464001838/10fa2/WrJmkuIMan0.1217917.mp4/e25a5f31bc4e6493f7",
    label: "Flujo de acción",
    caption: "Convierte una intención en una inscripción, reserva o solicitud trazable."
  },
  {
    src: "https://core.telegram.org/file/400780400885/2/Qc3SOZNZOLA.3171201.mp4/da53cf9e54f1eeab73",
    label: "Confirmación y estado",
    caption: "Devuelve contexto, estado y próximos pasos dentro del mismo canal."
  }
];

export default function SolutionsPage() {
  return (
    <main>
      <LandingTracker />
      <nav className="site-nav shell" aria-label="Navegación principal">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <span>quant systems</span>
        </Link>
      </nav>

      <section className="catalog-hero shell">
        <div>
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Para academias que ya viven en Telegram</p>
          <HeroRotator />
          <p className="hero-lede">
            Diseñamos una experiencia dentro de Telegram para que tu academia inscriba, entregue acceso
            y acompañe alumnos sin convertir cada operación en horas de trabajo manual.
          </p>
          <Link className="primary-cta" href="/implementar">Diagnosticar mi operación <span aria-hidden="true">↗</span></Link>
          <p className="microcopy">Implementaciones desde US$1,000. Primero encontramos dónde se van tus horas.</p>
        </div>
        <div className="catalog-proof">
          <span className="section-kicker">LA OPORTUNIDAD</span>
          <strong>No necesitas otro canal. Necesitas que el que ya tienes trabaje mejor.</strong>
          <p>Tu comunidad ya está en <span className="telegram-word">Telegram</span>. Ordenamos el camino entre interés, pago, acceso y continuidad.</p>
        </div>
      </section>

      <section className="problem-section shell" aria-labelledby="problem-title">
        <div className="problem-grid">
          <div>
            <div className="section-kicker">EL COSTO DE DEJARLO IGUAL</div>
            <h2 id="problem-title">Tu equipo no debería ser el pegamento entre pago, acceso y seguimiento.</h2>
          </div>
          <div>
            <p className="body-large">Tu equipo no necesita otra pantalla que revisar. Necesita que cada alumno tenga <mark>acceso, contexto y siguiente paso.</mark></p>
            <p className="muted-copy">Pagos que deben confirmarse a mano, enlaces que se pierden, preguntas repetidas y alumnos que quedan dentro de la comunidad sin avanzar.</p>
            <p className="muted-copy">Ese costo aparece como <mark>horas de soporte</mark>, cohortes difíciles de coordinar y renovaciones que nadie siguió a tiempo.</p>
          </div>
        </div>
      </section>

      <section className="demo-section shell" aria-labelledby="demo-title">
        <div className="demo-copy">
          <div className="section-kicker">ASÍ PUEDE VIVIR TU ALUMNO</div>
          <h2 id="demo-title">Una interfaz propia, <em>sin sacar al alumno de Telegram.</em></h2>
          <p>Estas demos muestran cómo una persona puede elegir, confirmar y avanzar dentro de Telegram. Para una academia, esa experiencia puede convertirse en inscripción, acceso, agenda o progreso sin enviar al alumno a otra página.</p>
        </div>
        <div className="demo-grid">
          {miniAppDemos.map((demo) => (
            <figure className="demo-media" key={demo.src}>
              <video autoPlay muted loop playsInline preload="metadata" aria-label={`${demo.label}: demo oficial de una Telegram Mini App`}>
                <source src={demo.src} type="video/mp4" />
              </video>
              <figcaption><strong>{demo.label}</strong>{demo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="benefits-section shell" aria-labelledby="benefits-title">
        <div className="section-heading">
          <div>
            <div className="section-kicker">QUÉ TE OFRECE</div>
            <h2 id="benefits-title">Tu equipo enseña.<br /><em>La operación deja de perseguir.</em></h2>
          </div>
          <p>Los asistentes automáticos ordenan lo repetible, pero tu equipo conserva el criterio y recibe los casos que necesitan una persona.</p>
        </div>
        <div className="benefit-list">
          <article className="benefit-row"><span className="step-number">01</span><div><h3>Inscripción y acceso</h3><p>Conecta el registro, el pago o la confirmación con el acceso correcto a canales, materiales o cohortes.</p></div></article>
          <article className="benefit-row"><span className="step-number">02</span><div><h3>Soporte que ahorra horas</h3><p>Responde preguntas frecuentes con información aprobada y pasa a tu equipo los casos que necesitan criterio.</p></div></article>
          <article className="benefit-row"><span className="step-number">03</span><div><h3>Seguimiento de cohortes</h3><p>Deja visible quién empezó, quién asistió, qué falta y cuál es el siguiente paso.</p></div></article>
          <article className="benefit-row"><span className="step-number">04</span><div><h3>Datos bajo control</h3><p>Decide qué se guarda, quién lo ve y cómo recuperar la información para que Telegram sea el canal, no una caja negra.</p></div></article>
        </div>
      </section>

      <section className="use-cases-section shell" aria-labelledby="use-cases-title">
        <div className="section-heading">
          <div>
            <div className="section-kicker">CASOS DE USO CONCRETOS</div>
            <h2 id="use-cases-title">No vendemos más ruido.<br /><em>Quitamos fricción donde más cuesta.</em></h2>
          </div>
          <p>Empezamos por el momento que más horas consume y comprobamos si el cambio libera capacidad para tu equipo.</p>
        </div>
        <div className="use-case-list">
          <article className="use-case-row">
            <span className="step-number">01</span>
            <div><p className="solution-vertical">ANTES DE EMPEZAR</p><h3>Onboarding y acceso</h3><p>Después del pago, el alumno recibe instrucciones, valida sus datos y entra al canal, material o cohorte correcto.</p></div>
            <div className="use-case-result"><strong>Lo que mejora</strong><span>menos pagos confirmados sin acceso y menos preguntas de “¿dónde empiezo?”</span><small>Comprobar: horas hasta el acceso · accesos correctos · consultas de inicio</small></div>
          </article>
          <article className="use-case-row">
            <span className="step-number">02</span>
            <div><p className="solution-vertical">DURANTE EL PROGRAMA</p><h3>Soporte y conocimiento</h3><p>El alumno consulta materiales, encuentra respuestas aprobadas y llega a una persona cuando el caso necesita criterio.</p></div>
            <div className="use-case-result"><strong>Lo que mejora</strong><span>menos horas buscando enlaces y repitiendo las mismas respuestas</span><small>Comprobar: tiempo por consulta · preguntas repetidas · casos para el equipo</small></div>
          </article>
          <article className="use-case-row">
            <span className="step-number">03</span>
            <div><p className="solution-vertical">COHORTES Y EVENTOS</p><h3>Asistencia y progreso</h3><p>Envía recordatorios, confirma asistencia y muestra el siguiente paso sin depender de revisar varias hojas.</p></div>
            <div className="use-case-result"><strong>Lo que mejora</strong><span>menos sesiones perdidas y menos coordinación manual entre equipo y alumnos</span><small>Comprobar: asistencia · alumnos activos · horas de coordinación</small></div>
          </article>
          <article className="use-case-row">
            <span className="step-number">04</span>
            <div><p className="solution-vertical">DESPUÉS DEL VALOR</p><h3>Renovación y continuidad</h3><p>Detecta quién terminó, quién sigue activo y quién necesita un mensaje o una intervención humana antes de abandonar.</p></div>
            <div className="use-case-result"><strong>Lo que mejora</strong><span>menos renovaciones olvidadas y menos alumnos que se enfrían sin seguimiento</span><small>Comprobar: renovaciones atendidas · reactivaciones · casos resueltos</small></div>
          </article>
        </div>
      </section>

      <section className="steps-section shell" aria-labelledby="process-title">
        <div className="section-heading">
          <div>
            <div className="section-kicker">CÓMO SE IMPLEMENTA</div>
            <h2 id="process-title">No se trata solo de responder mensajes.<br /><em>Haz que tu academia se sienta más grande.</em></h2>
          </div>
          <p>Primero entendemos dónde se van las horas y qué parte del recorrido conviene ordenar. Después probamos el cambio.</p>
        </div>
        <div className="step-list">
          <div className="step-row"><span className="step-number">01</span><h3>Mapeo</h3><p>Reconstruimos inscripción, pago, acceso, soporte y renovación tal como ocurren hoy.</p><span className="step-arrow" aria-hidden="true">↘</span></div>
          <div className="step-row"><span className="step-number">02</span><h3>Diseño</h3><p>Definimos qué verá el alumno, qué información puede recibir y cuándo debe entrar una persona.</p><span className="step-arrow" aria-hidden="true">↘</span></div>
          <div className="step-row"><span className="step-number">03</span><h3>Conexión</h3><p>Unimos Telegram con tus cobros, clases, materiales y registros sin mover a la comunidad.</p><span className="step-arrow" aria-hidden="true">↘</span></div>
          <div className="step-row"><span className="step-number">04</span><h3>Piloto</h3><p>Probamos con una cohorte, revisamos accesos y medimos si la operación merece continuar.</p><span className="step-arrow" aria-hidden="true">↘</span></div>
        </div>
      </section>

      <section className="integration-index shell" aria-labelledby="integrations-title">
        <div className="section-heading">
          <div>
            <div className="section-kicker">LAS HERRAMIENTAS QUE YA USAS</div>
            <h2 id="integrations-title">Conecta tu operación <em>sin cambiarlo todo.</em></h2>
          </div>
          <p>Si ya cobras, dictas clases, compartes materiales o haces seguimiento con estas plataformas, podemos ordenar el paso entre una cosa y otra para ahorrar tiempo y evitar alumnos perdidos.</p>
        </div>
        <div className="integration-list">
          <article className="integration-row">
            <span className="step-number">01</span>
            <div><p className="solution-vertical">DENTRO DE TELEGRAM</p><h3>Mini App</h3><p className="solution-problem">Una pantalla propia para que el alumno se registre, elija un programa, revise su estado y sepa cuál es su siguiente paso.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos pasos entre el interés, la inscripción y el acceso.</span><small>Comprobar: horas hasta el acceso · accesos correctos · consultas de inicio</small></div></div>
            <span className="integration-method">Inscripción y acceso</span>
          </article>
          <article className="integration-row">
            <span className="step-number">02</span>
            <div><p className="solution-vertical">COBROS Y ACCESO</p><h3>Telegram Stars o Mercado Pago</h3><p className="solution-problem">Cuando el tipo de producto y el país lo permiten, el pago puede activar el acceso y dejar claro qué recibió cada alumno.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos confirmaciones a mano y menos pagos sin activar.</span><small>Comprobar: pagos asociados · tiempo hasta la activación · incidencias</small></div></div>
            <span className="integration-method">Cobro y activación</span>
          </article>
          <article className="integration-row">
            <span className="step-number">03</span>
            <div><p className="solution-vertical">VENTA DE PROGRAMAS</p><h3>Hotmart</h3><p className="solution-problem">Después de una compra, el alumno recibe las instrucciones y entra a la comunidad o programa que corresponde.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos accesos pendientes y menos revisión manual entre venta y comunidad.</span><small>Comprobar: compras activadas · horas hasta el acceso · devoluciones atendidas</small></div></div>
            <span className="integration-method">Venta y bienvenida</span>
          </article>
          <article className="integration-row">
            <span className="step-number">04</span>
            <div><p className="solution-vertical">CLASES EN VIVO</p><h3>Zoom y Google Meet</h3><p className="solution-problem">Cada cohorte recibe el enlace correcto, un recordatorio y el siguiente paso para no depender de buscar mensajes antiguos.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos clases perdidas y menos mensajes preguntando por el enlace.</span><small>Comprobar: asistencia · recordatorios enviados · incidencias de acceso</small></div></div>
            <span className="integration-method">Clases y recordatorios</span>
          </article>
          <article className="integration-row">
            <span className="step-number">05</span>
            <div><p className="solution-vertical">MENTORÍAS Y RESERVAS</p><h3>Cal.com o Calendly</h3><p className="solution-problem">El alumno elige un horario disponible, recibe confirmación y llega con recordatorios claros.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos coordinación para encontrar horarios y menos citas perdidas.</span><small>Comprobar: reservas completas · ausencias · horas administrativas</small></div></div>
            <span className="integration-method">Reservas</span>
          </article>
          <article className="integration-row">
            <span className="step-number">06</span>
            <div><p className="solution-vertical">MATERIALES Y LISTAS</p><h3>Notion, Drive y Sheets</h3><p className="solution-problem">El alumno encuentra materiales y el equipo mantiene una lista clara de quién empezó, asistió o necesita ayuda.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos tiempo buscando archivos y actualizando listas por separado.</span><small>Comprobar: preguntas repetidas · horas de soporte · alumnos con seguimiento</small></div></div>
            <span className="integration-method">Materiales y seguimiento</span>
          </article>
          <article className="integration-row">
            <span className="step-number">07</span>
            <div><p className="solution-vertical">SEGUIMIENTO COMERCIAL</p><h3>HubSpot o Pipedrive</h3><p className="solution-problem">Cuando una persona pide ayuda, información o renovación, tu equipo recibe el caso con contexto y siguiente paso.</p><div className="integration-impact"><strong>Lo que mejora</strong><span>menos oportunidades olvidadas y menos tiempo reconstruyendo conversaciones.</span><small>Comprobar: casos atendidos · tiempo de respuesta · seguimientos completos</small></div></div>
            <span className="integration-method">Seguimiento comercial</span>
          </article>
        </div>
        <p className="integration-note"><strong>Cómo calculamos el ahorro posible:</strong> contamos cuántas veces ocurre una tarea, cuánto demora y cuánto vale esa hora para tu equipo. Luego comparamos el antes y el después. Es una hipótesis para validar, no una promesa de retorno.</p>
        <p className="integration-note"><strong>La regla:</strong> solo recomendamos una conexión si reduce horas, evita errores o ayuda a que más alumnos lleguen al siguiente paso.</p>
        <div className="integration-contact">
          <p>¿No encuentras la plataforma que usas?</p>
          <Link className="text-link" href="/implementar">Consultar con ventas <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="roi-section shell" aria-labelledby="roi-title">
        <div className="roi-intro">
          <div className="section-kicker">CÓMO SE VE EL RETORNO</div>
          <h2 id="roi-title">Cada hora que recuperas <em>vuelve a tu academia.</em></h2>
          <p>No inventamos porcentajes. Calculamos qué tareas están drenando a tu equipo y qué parte puede reducirse con una prueba concreta.</p>
        </div>
        <div className="roi-equation" aria-label="Fórmula de hipótesis de impacto">
          <span>volumen de casos</span><b>×</b><span>minutos por caso</span><b>×</b><span>costo interno por hora</span><strong>=</strong><em>costo operativo visible</em>
        </div>
        <div className="roi-metrics">
          <article><span className="step-number">A</span><h3>Más capacidad sin contratar todavía</h3><p>Si el equipo deja de repetir accesos, enlaces y recordatorios, puede dedicar más tiempo a enseñar, vender o atender casos complejos.</p></article>
          <article><span className="step-number">B</span><h3>Menos ingresos que se quedan en el camino</h3><p>Un siguiente paso claro ayuda a reducir pagos sin activación, alumnos inactivos y renovaciones que nadie siguió a tiempo.</p></article>
          <article><span className="step-number">C</span><h3>Decisiones con una métrica</h3><p>Comparamos una línea base antes del piloto y revisamos tiempo, errores, asistencia o continuidad. Si no mueve una métrica útil, no escalamos.</p></article>
        </div>
        <p className="roi-disclaimer">El impacto depende del volumen, precio, equipo, herramientas y comportamiento de los alumnos. Son hipótesis de negocio para validar; no una promesa de ROI, ingresos o matrículas.</p>
      </section>

      <section className="audience-section shell" aria-labelledby="audience-title">
        <div className="audience-note">PARA QUIÉN TIENE SENTIDO</div>
        <div className="audience-content">
          <h2 id="audience-title">Si ya tienes una comunidad, <em>no deberías operar como si empezaras de cero.</em></h2>
          <div className="audience-list">
            <span>Academias online</span><span>Programas y cohortes</span><span>Membresías premium</span><span>Formación profesional</span><span>Comunidades con pagos recurrentes</span>
          </div>
        </div>
      </section>

      <section className="objections-section shell" aria-labelledby="objections-title">
        <div className="section-kicker">SIN HUMO</div>
        <h2 id="objections-title">Matamos las dudas <em>antes de que se conviertan en fricción.</em></h2>
        <div className="objections-grid">
          <article className="objection-card">
            <span className="objection-icon objection-no" aria-hidden="true">×</span>
            <div>
              <h3>No es otro asistente que responde solo.</h3>
              <p>Los asistentes automáticos pueden resolver lo repetitivo, pero tu equipo decide cuándo responder y cuándo hacerse cargo.</p>
            </div>
          </article>
          <article className="objection-card">
            <span className="objection-icon objection-no" aria-hidden="true">×</span>
            <div>
              <h3>No es una promesa de matrículas automáticas.</h3>
              <p>Medimos inicio, soporte, asistencia y renovaciones. Si el problema no justifica automatizarlo, lo decimos.</p>
            </div>
          </article>
          <article className="objection-card">
            <span className="objection-icon objection-no" aria-hidden="true">×</span>
            <div>
              <h3>No entregamos tus datos a una caja negra.</h3>
              <p>Definimos quién puede ver la información, cuánto tiempo se guarda y cómo recuperarla para que la comunidad siga bajo tu control.</p>
            </div>
          </article>
          <article className="objection-card objection-yes">
            <span className="objection-icon" aria-hidden="true">✓</span>
            <div>
              <h3>Sí: una experiencia hecha para tu operación.</h3>
              <p>Para inscribir, entregar acceso, acompañar alumnos y medir el cambio sin sacar a la comunidad de Telegram.</p>
            </div>
          </article>
        </div>
        <p className="trust-note"><strong>Sin magia.</strong> No ofrecemos señales, rentabilidad ni resultados garantizados. Construimos sistemas operativos y medimos si el cambio merece continuar.</p>
      </section>

      <section className="governance-section shell" aria-labelledby="governance-title">
        <div className="governance-intro">
          <div className="section-kicker">PRIVACIDAD Y CONTROL</div>
          <h2 id="governance-title">Tu comunidad y tus datos <em>siguen siendo tuyos.</em></h2>
          <p>Telegram es el lugar donde conversa tu comunidad. La información importante debe seguir bajo reglas claras, visibles y acordadas contigo.</p>
        </div>
        <div className="governance-list">
          <article><span className="step-number">01</span><div><h3>Sabes qué guardamos</h3><p>Solo pedimos los datos necesarios para inscribir, cobrar, dar acceso y acompañar al alumno.</p></div></article>
          <article><span className="step-number">02</span><div><h3>Sabes quién puede verlo</h3><p>Tu equipo define qué puede consultar cada persona y dejamos registro de los cambios importantes.</p></div></article>
          <article><span className="step-number">03</span><div><h3>Puedes recuperar tu información</h3><p>Alumnos, pagos, accesos y registros deben poder exportarse en un formato utilizable.</p></div></article>
          <article><span className="step-number">04</span><div><h3>Puedes cerrar con orden</h3><p>Acordamos cuánto tiempo se conserva la información y qué ocurre si termina el servicio.</p></div></article>
        </div>
        <p className="governance-note">Si usamos asistentes automáticos, trabajarán con información aprobada, avisarán cuando intervengan y pasarán los casos sensibles a una persona. Esto no reemplaza una revisión legal cuando tu actividad o los datos de tus alumnos lo requieran.</p>
      </section>

      <section className="faq-section shell" aria-labelledby="faq-title">
        <div className="section-kicker">PREGUNTAS DIRECTAS</div>
        <h2 id="faq-title">Antes de hablar, <em>resolvamos lo obvio.</em></h2>
        <div className="faq-list">
          <details><summary>¿Qué recibo exactamente?</summary><p>Una experiencia dentro de Telegram y un flujo diseñado para una necesidad concreta: inscripción, acceso, soporte, clases, eventos o renovaciones. El alcance se define antes de construir.</p></details>
          <details><summary>¿Cómo me beneficia en el día a día?</summary><p>Reduce tareas repetitivas, deja el contexto disponible y ayuda a que cada alumno tenga acceso y siguiente paso. Revisamos horas de soporte, asistencia, alumnos activos o renovaciones.</p></details>
          <details><summary>¿Me garantiza más ventas o más ingresos?</summary><p>No. Sería irresponsable prometerlo sin conocer tu operación. Sí podemos identificar qué parte del proceso está frenando capacidad o conversión y medir si la implementación mejora esa etapa.</p></details>
          <details><summary>¿Tengo que cambiar Telegram o empezar de cero?</summary><p>No. Telegram sigue siendo la interfaz y la comunidad conserva su espacio. Conectamos la Mini App con las herramientas que ya usas cuando tiene sentido, sin ocultar qué datos pasan por cada sistema.</p></details>
          <details><summary>¿Mis datos siguen siendo míos?</summary><p>Sí: acordamos qué se guarda, quién lo ve, cuánto tiempo se conserva, cómo se exporta y qué ocurre al terminar el servicio.</p></details>
          <details><summary>¿Los asistentes automáticos toman decisiones por mi equipo?</summary><p>No en asuntos sensibles. Pueden ordenar preguntas, buscar información aprobada y recordar tareas, pero deben avisar cuando intervienen y pasar el caso a una persona cuando corresponda.</p></details>
          <details><summary>¿Cuánto cuesta?</summary><p>Las implementaciones parten desde US$1,000. El precio final depende del flujo, las herramientas, el nivel de control y privacidad y el alcance de la prueba. Primero confirmamos que exista un caso que pueda justificar el costo.</p></details>
          <details><summary>¿Qué no hacemos?</summary><p>No ofrecemos señales, recomendaciones personalizadas de inversión, rentabilidad garantizada, decisiones sensibles automatizadas ni sistemas para ocultar información o manipular conversaciones. La revisión legal local puede ser necesaria según el caso.</p></details>
        </div>
      </section>

      <section className="catalog-qualifier shell">
        <div>
          <div className="section-kicker">ANTES DE IMPLEMENTAR</div>
          <h2>No necesitas otra plataforma.<br /><em>Necesitas que tu comunidad avance.</em></h2>
        </div>
        <div className="qualifier-copy">
          <p>Te preguntaremos cómo inscribes, cobras, entregas acceso y acompañas alumnos. Definimos una métrica, las reglas de acceso y los límites de los asistentes automáticos antes de construir. Implementaciones desde US$1,000.</p>
          <Link className="primary-cta" href="/implementar">Diagnosticar mi operación <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <footer className="site-footer shell">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">Q</span><span>quant systems</span></Link>
        <a href="mailto:partners@thequantpartners.com">partners@thequantpartners.com</a>
        <Link href="/privacidad">Privacidad</Link>
        <p className="site-legal">Quant Systems es un servicio independiente para academias y comunidades premium. No somos Telegram ni estamos afiliados con esa plataforma. Diseñamos controles de datos y límites para asistentes automáticos, pero no garantizamos cumplimiento legal, ingresos, matrículas, ROI ni resultados específicos; según el caso puede requerirse revisión legal local.</p>
      </footer>
    </main>
  );
}
