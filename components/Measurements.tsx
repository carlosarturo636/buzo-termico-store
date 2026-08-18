export function Measurements() {
  const measurements = [
    ["Mangas", "65 cm"],
    ["Largo total", "92 cm"],
    ["Contorno completo del torso", "86 cm"],
  ];

  return (
    <section className="section measurements" id="medidas">
      <div className="measurements__info">
        <p className="eyebrow">Guía del producto</p>
        <h2>Medidas</h2>
        <p><strong>Talla única.</strong></p>
        <div className="measure-grid">
          {measurements.map(([label, value]) => (
            <div className="measure-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
      <figure className="measurements__media">
        <video
          className="measurements__video"
          src="/media/hoodie-360.mp4"
          poster="/media/hoodie-360-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vista 360 del buzo térmico MUFASA"
        />
        <figcaption>
          <h3>Vista 360°</h3>
          <p>Conoce la forma y amplitud del buzo desde todos sus ángulos.</p>
        </figcaption>
      </figure>
    </section>
  );
}
