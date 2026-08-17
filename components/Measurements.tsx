export function Measurements() {
  const measurements = [
    ["Mangas", "65 cm"],
    ["Largo total", "92 cm"],
    ["Circunferencia", "86 cm"],
  ];

  return <section className="section measurements" id="medidas"><div><p className="eyebrow">Guía del producto</p><h2>Medidas</h2><p>Medidas proporcionadas por el proveedor. La talla comercial todavía está por confirmar.</p></div><div className="measure-grid">{measurements.map(([label, value]) => <div className="measure-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>;
}
