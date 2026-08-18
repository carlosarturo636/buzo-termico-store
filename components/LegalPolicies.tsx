const policyCases = [
  {
    number: "1",
    title: "Pedido incompleto",
    description: "Si solicitaste más de una unidad y recibiste una cantidad menor a la indicada en tu pedido.",
  },
  {
    number: "2",
    title: "Producto dañado",
    description: "Si el producto llega roto, deteriorado o presenta daños ocasionados durante el transporte o embalaje.",
  },
  {
    number: "3",
    title: "Producto equivocado",
    description: "Si recibes un producto, color o referencia diferente a la que solicitaste.",
  },
];

export function LegalPolicies() {
  return (
    <section className="section legal-policies" aria-labelledby="legal-policies-title">
      <header className="legal-policies__heading">
        <p className="eyebrow">Información importante</p>
        <h2 id="legal-policies-title">Políticas y<br /><em>soporte.</em></h2>
      </header>

      <div className="legal-policies__content">
        <article className="policy-block policy-block--warranty">
          <h3>Políticas de garantía, cambios y devoluciones</h3>
          <p>Queremos que recibas tu MUFASA en perfectas condiciones. Puedes reportarnos cualquiera de las siguientes novedades:</p>
          <div className="policy-cases">
            {policyCases.map(({ number, title, description }) => (
              <div className="policy-case" key={number}>
                <span>{number.padStart(2, "0")}</span>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            ))}
          </div>
          <div className="policy-deadline">
            <h4>Plazo para reportar novedades</h4>
            <p>Te recomendamos reportar cualquiera de estas situaciones dentro de los 5 días siguientes a la recepción del pedido, adjuntando fotografías o evidencia que nos permita validar el caso.</p>
          </div>
          <p className="policy-note">Estas condiciones no limitan los derechos que correspondan al consumidor de acuerdo con la legislación colombiana vigente.</p>
        </article>

        <article className="policy-block policy-block--retract">
          <h3>Derecho de retracto</h3>
          <p>En las compras realizadas a través de nuestra tienda online podrás ejercer el derecho de retracto en los casos y condiciones establecidos por la legislación colombiana. El término máximo general para ejercerlo en ventas a distancia es de 5 días hábiles contados desde la entrega del producto.</p>
        </article>

        <aside className="policy-contact">
          <p className="eyebrow">Contacto</p>
          <p>Si tienes alguna duda sobre tu pedido, garantía, cambio o devolución, puedes comunicarte con nosotros al:</p>
          <a href="https://wa.me/573163750227" target="_blank" rel="noreferrer" aria-label="Contactar a MUFASA por WhatsApp al 316 375 0227">
            316 375 0227
          </a>
          <span>Escríbenos por WhatsApp</span>
        </aside>
      </div>
    </section>
  );
}
