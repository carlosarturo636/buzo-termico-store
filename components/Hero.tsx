"use client";

import { useState } from "react";
import { BuyButton } from "./BuyButton";
import { ColorSelector } from "./ColorSelector";
import { ProductMedia, type MediaItem } from "./ProductMedia";

const blackMedia: MediaItem[] = [
  { type: "image", src: "/media/black-model-front.webp", alt: "Modelo usando el buzo térmico negro de frente" },
  { type: "image", src: "/media/black-model-angle.webp", alt: "Modelo usando el buzo térmico negro en vista lateral" },
  { type: "image", src: "/media/black-flat-front.webp", alt: "Buzo térmico negro extendido de frente" },
  { type: "video", src: "/media/hoodie-lifestyle.mp4", poster: "/media/hoodie-lifestyle-poster.jpg", title: "Buzo térmico en uso" },
  { type: "video", src: "/media/hoodie-360.mp4", poster: "/media/hoodie-360-poster.jpg", title: "Vista 360 del buzo térmico" },
];

const grayMedia: MediaItem[] = [
  { type: "image", src: "/media/gray-model-front.webp", alt: "Presentación gris del buzo térmico en uso" },
  { type: "image", src: "/media/gray-flat-angle.webp", alt: "Presentación gris del buzo térmico extendido" },
  { type: "image", src: "/media/gray-hood-detail.webp", alt: "Detalle de la capucha en la presentación gris" },
];

export function Hero() {
  const [selectedColor, setSelectedColor] = useState("Negro");
  const activeMedia = selectedColor === "Gris" ? grayMedia : blackMedia;

  return (
    <section className="hero" id="comprar">
      <div className="hero-media"><ProductMedia key={selectedColor} media={activeMedia} /></div>
      <div className="hero-copy">
        <p className="eyebrow">Comodidad para días fríos</p>
        <h1>Buzo térmico<br /><em>tipo saco-cobija</em></h1>
        <p className="hero-description">Una capa suave y envolvente con forro polar y capucha extra grande, pensada para acompañar tus momentos de descanso.</p>
        <p className="price">$120.000 <span>COP</span></p>
        <ColorSelector selected={selectedColor} onSelect={setSelectedColor} />
        <BuyButton />
        <div className="hero-trust"><span>Pago gestionado por Shopify</span><span>Compra en checkout seguro</span></div>
      </div>
    </section>
  );
}
