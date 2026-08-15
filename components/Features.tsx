import { CheckIcon } from "./Icons";

const features = ["Forro polar ultra suave", "Diseño tipo saco-cobija", "Capucha extra grande", "Pensado para brindar comodidad y abrigo"];

export function Features() {
  return <section className="section feature-section"><div className="feature-visual"><span>Suave</span><strong>por dentro.</strong><small>Contenido visual por agregar</small></div><div><p className="eyebrow">Detalles que importan</p><h2>Diseñado para<br /><em>sentirte bien.</em></h2><ul className="feature-list">{features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul></div></section>;
}
