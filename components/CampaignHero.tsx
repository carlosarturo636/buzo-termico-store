import Image from "next/image";

export function CampaignHero() {
  return (
    <section className="campaign-hero" id="top" aria-labelledby="campaign-title">
      <Image
        className="campaign-hero__image"
        src="/media/black-model-front.webp"
        alt="Modelo usando el buzo térmico MUFASA negro"
        fill
        priority
        loading="eager"
        sizes="100vw"
      />
      <div className="campaign-hero__content">
        <p className="campaign-hero__brand">MUFASA</p>
        <h1 id="campaign-title">Hecho para<br />el frío.</h1>
        <p className="campaign-hero__copy">Comodidad que acompaña tus momentos.</p>
        <a className="campaign-hero__cta" href="#comprar">Comprar ahora</a>
      </div>
    </section>
  );
}
