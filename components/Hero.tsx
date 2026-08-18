"use client";

import { formatMoney } from "@/lib/money";
import { BuyButton } from "./BuyButton";
import { ColorSelector } from "./ColorSelector";
import { ProductMedia, type MediaItem } from "./ProductMedia";
import { useProduct } from "./ProductProvider";

const blackMedia: MediaItem[] = [
  { type: "image", src: "/media/black-model-front.webp", alt: "Modelo usando el buzo térmico negro de frente" },
  { type: "image", src: "/media/black-model-angle.webp", alt: "Modelo usando el buzo térmico negro en vista lateral" },
  { type: "image", src: "/media/black-flat-front.webp", alt: "Buzo térmico negro extendido de frente" },
  { type: "video", src: "/media/hoodie-360.mp4", poster: "/media/hoodie-360-poster.jpg", title: "Vista 360 del buzo térmico" },
];

const grayMedia: MediaItem[] = [
  { type: "image", src: "/media/gray-model-front.webp", alt: "Presentación gris del buzo térmico en uso" },
  { type: "image", src: "/media/gray-flat-angle.webp", alt: "Presentación gris del buzo térmico extendido" },
  { type: "image", src: "/media/gray-hood-detail.webp", alt: "Detalle de la capucha en la presentación gris" },
];

export function Hero() {
  const { product, selectedVariant, selectVariant, commerceError } = useProduct();
  const color = selectedVariant?.selectedOptions.find(({ name }) => /color|colour/i.test(name))?.value || selectedVariant?.title || "Negro";
  const activeMedia = /gris|gray|grey/i.test(color) ? grayMedia : blackMedia;

  return (
    <section className="hero" id="comprar">
      <div className="hero-media"><ProductMedia key={color} media={activeMedia} /></div>
      <div className="hero-copy">
        <p className="eyebrow">Comodidad para días fríos</p>
        <h1>{product?.title || "Buzo térmico"}<br /><em>tipo saco-cobija</em></h1>
        <p className="hero-description">{product?.description || "Una capa suave y envolvente con forro polar y capucha extra grande, pensada para acompañar tus momentos de descanso."}</p>
        <p className="price">{selectedVariant ? formatMoney(selectedVariant.price) : "Precio no disponible"}</p>
        <ColorSelector variants={product?.variants || []} selectedId={selectedVariant?.id || null} onSelect={selectVariant} />
        <BuyButton />
        {commerceError ? <p className="buy-note" role="status">{commerceError}</p> : null}
        <div className="hero-trust"><span>Pago gestionado por Shopify</span><span>Compra en checkout seguro</span></div>
      </div>
    </section>
  );
}
