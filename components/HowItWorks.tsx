const steps = ["Póntelo como una capa amplia", "Acomoda la capucha a tu gusto", "Disfruta una sensación suave y envolvente"];

export function HowItWorks() {
  return <section className="section how"><div><p className="eyebrow">Simple desde el primer momento</p><h2>Tu pausa cálida,<br /><em>en tres pasos.</em></h2></div><ol>{steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></section>;
}
