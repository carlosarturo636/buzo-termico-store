const faqs = [
  ["¿Qué colores están contemplados?", "La presentación inicial contempla negro y gris. La disponibilidad real se confirmará desde Shopify."],
  ["¿Cómo se completa la compra?", "Al elegir una variante disponible, continuarás al checkout seguro de Shopify."],
  ["¿En qué casos puedo solicitar un cambio o devolución?", "Puedes solicitar la revisión de un cambio o devolución en los siguientes casos: 1. Pedido incompleto: solicitaste más de una unidad y recibiste una cantidad menor. 2. Producto roto: el producto llegó roto o dañado, ya sea por problemas de embalaje o por el manejo durante el transporte. 3. Producto equivocado: recibiste un producto o color diferente al que solicitaste. Estas novedades deben reportarse dentro de los 3 días calendario siguientes a la entrega del pedido, indicando el número de pedido y adjuntando fotografías o evidencia de lo ocurrido. Este plazo corresponde al proceso de reporte de novedades de entrega y no limita la garantía legal ni los demás derechos que correspondan al consumidor."],
];

export function FAQ() {
  return <section className="section faq"><div><p className="eyebrow">Antes de elegir</p><h2>Preguntas<br /><em>frecuentes.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>;
}
