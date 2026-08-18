const reviews = [
  {
    author: "Laura M. — Suba, Bogotá",
    quote: "Vivo en los cerros de Suba y en las mañanas hace frío. Me lo pongo para tomar café y ya se volvió parte de mi rutina.",
  },
  {
    author: "Daniela R. — Bogotá",
    quote: "Trabajo desde casa y lo uso muchísimo. Es amplio, cómodo y muy suave por dentro.",
  },
  {
    author: "Santiago P. — Chapinero, Bogotá",
    quote: "Compré el negro y me gustó mucho cómo se ve. Lo uso sobre todo en las noches frías.",
  },
  {
    author: "Mariana G. — Cajicá",
    quote: "Me preocupaba que la talla única fuera muy grande, pero queda suelto y cómodo.",
  },
  {
    author: "Andrés C. — Bogotá",
    quote: "Se lo compré a mi novia y ahora quiero uno para mí. La capucha y el bolsillo me encantaron.",
  },
  {
    author: "Valentina S. — La Calera",
    quote: "Acá hace bastante frío en la tarde y lo tengo siempre cerca. Lo uso para leer o trabajar.",
  },
];

export function Reviews() {
  return (
    <section className="section reviews">
      <div className="section-heading">
        <p className="eyebrow">Experiencias MUFASA</p>
        <h2>Momentos más<br /><em>cálidos.</em></h2>
      </div>
      <div className="reviews-grid">
        {reviews.map(({ author, quote }) => (
          <figure className="review-card" key={author}>
            <blockquote>“{quote}”</blockquote>
            <figcaption>{author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
