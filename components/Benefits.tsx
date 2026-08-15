const benefits = [
  ["01", "Abrigo envolvente", "Un diseño amplio tipo saco-cobija para disfrutar de una sensación cálida y cómoda."],
  ["02", "Suavidad interior", "Forro polar ultra suave para hacer más agradables tus momentos de descanso."],
  ["03", "Comodidad completa", "Capucha extra grande que acompaña el diseño relajado y fácil de usar."],
];

export function Benefits() {
  return (
    <section className="section benefits" id="beneficios">
      <div className="section-heading"><p className="eyebrow">Cuando baja la temperatura</p><h2>Que el frío no interrumpa <em>tu momento.</em></h2></div>
      <p className="section-intro">Para leer, trabajar desde casa o simplemente descansar: una prenda diseñada para sentirte cómoda y abrigada sin complicaciones.</p>
      <div className="benefit-grid">{benefits.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
  );
}
