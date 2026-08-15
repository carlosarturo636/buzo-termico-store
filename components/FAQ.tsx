const faqs = [
  ["¿Qué colores están contemplados?", "La presentación inicial contempla negro y gris. La disponibilidad real se confirmará desde Shopify."],
  ["¿Qué talla tiene?", "La talla y las medidas todavía están por confirmar con el proveedor."],
  ["¿Cómo se completa la compra?", "Al elegir una variante disponible, continuarás al checkout seguro de Shopify."],
  ["¿Cuáles son las condiciones de envío y devolución?", "Estas políticas todavía no han sido definidas. Se publicarán de forma clara antes de habilitar la compra."],
];

export function FAQ() {
  return <section className="section faq"><div><p className="eyebrow">Antes de elegir</p><h2>Preguntas<br /><em>frecuentes.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>;
}
