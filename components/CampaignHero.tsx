export function CampaignHero() {
  return (
    <section className="campaign-hero" id="top" aria-labelledby="campaign-title">
      <video
        className="campaign-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/black-model-front.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/media/mufasa-campaign-hero.mp4" type="video/mp4" />
      </video>
      <div className="campaign-hero__content">
        <p className="campaign-hero__brand">MUFASA</p>
        <h1 id="campaign-title">Hecho para<br />el frío.</h1>
        <p className="campaign-hero__copy">Comodidad que acompaña tus momentos.</p>
        <a className="campaign-hero__cta" href="#comprar">Comprar ahora</a>
      </div>
    </section>
  );
}
