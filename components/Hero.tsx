import { BuyButton } from "./BuyButton";
import { ColorSelector } from "./ColorSelector";
import { ProductMedia, type MediaItem } from "./ProductMedia";

const initialMedia: MediaItem[] = [
  { type: "image", src: "/product-placeholder.svg", alt: "Espacio reservado para la fotografía principal del buzo térmico" },
];

export function Hero() {
  return (
    <section className="hero" id="comprar">
      <div className="hero-media"><ProductMedia media={initialMedia} /><span className="media-label">Fotografía del producto por agregar</span></div>
      <div className="hero-copy">
        <p className="eyebrow">Comodidad para días fríos</p>
        <h1>Buzo térmico<br /><em>tipo saco-cobija</em></h1>
        <p className="hero-description">Una capa suave y envolvente con forro polar y capucha extra grande, pensada para acompañar tus momentos de descanso.</p>
        <p className="price">$120.000 <span>COP</span></p>
        <ColorSelector />
        <BuyButton />
        <div className="hero-trust"><span>Pago gestionado por Shopify</span><span>Compra en checkout seguro</span></div>
      </div>
    </section>
  );
}
