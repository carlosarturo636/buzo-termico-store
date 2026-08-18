"use client";

import { formatMoney } from "@/lib/money";
import type { ShopifyVariant } from "@/lib/shopify";
import { BuyButton } from "./BuyButton";
import { ProductMedia, type MediaItem } from "./ProductMedia";
import { useProduct } from "./ProductProvider";

const blackMedia: MediaItem[] = [
  { type: "image", src: "/media/black-model-front.webp", alt: "Modelo usando el buzo térmico negro de frente" },
  { type: "image", src: "/media/black-model-back.webp", alt: "Modelo usando el buzo térmico negro de espalda" },
  { type: "image", src: "/media/black-flat-front.webp", alt: "Buzo térmico negro extendido de frente" },
  { type: "image", src: "/media/black-flat-back.webp", alt: "Buzo térmico negro extendido de espalda" },
  { type: "image", src: "/media/black-neckline-detail.webp", alt: "Detalle del cuello del buzo térmico negro" },
  { type: "image", src: "/media/black-pocket-cuff-detail.webp", alt: "Detalle del bolsillo y el puño del buzo térmico negro" },
  { type: "image", src: "/media/black-hood-detail.webp", alt: "Detalle de la capucha del buzo térmico negro" },
  { type: "video", src: "/media/hoodie-360.mp4", poster: "/media/hoodie-360-poster.jpg", title: "Vista 360 del buzo térmico negro" },
];

const grayMedia: MediaItem[] = [
  { type: "image", src: "/media/gray-model-front.webp", alt: "Presentación gris del buzo térmico en uso" },
  { type: "image", src: "/media/gray-flat-angle.webp", alt: "Presentación gris del buzo térmico extendido" },
  { type: "image", src: "/media/gray-hood-detail.webp", alt: "Detalle de la capucha en la presentación gris" },
  { type: "image", src: "/media/gray-flat-front.webp", alt: "Buzo térmico gris extendido de frente" },
  { type: "image", src: "/media/gray-pocket-detail.webp", alt: "Detalle del bolsillo y el puño del buzo térmico gris" },
  { type: "image", src: "/media/gray-cuff-detail.webp", alt: "Detalle del puño del buzo térmico gris" },
];

function variantText(variant: ShopifyVariant) {
  return [variant.title, ...variant.selectedOptions.map(({ value }) => value)].join(" ");
}

function variantName(variant: ShopifyVariant | null) {
  return variant?.selectedOptions.find(({ name }) => /color|colour/i.test(name))?.value || variant?.title || "No disponible";
}

function VariantCard({ variant, media, purchaseLabel }: {
  variant: ShopifyVariant | null;
  media: MediaItem[];
  purchaseLabel: string;
}) {
  return (
    <article className="variant-card">
      <div className="variant-media"><ProductMedia media={media} /></div>
      <div className="variant-copy">
        <div>
          <p className="variant-label">Color</p>
          <h2>{variantName(variant)}</h2>
        </div>
        <div className="variant-commerce">
          <div className="variant-price">
            <p className="price">{variant ? formatMoney(variant.price) : "Precio no disponible"}</p>
            <p className="payment-note">Pago anticipado o contra entrega</p>
          </div>
          <p className={`availability ${variant?.availableForSale ? "is-available" : "is-unavailable"}`}>
            {variant?.availableForSale ? "Disponible" : "Agotado"}
          </p>
        </div>
        <BuyButton variant={variant} label={purchaseLabel} />
      </div>
    </article>
  );
}

export function Hero() {
  const { product, commerceError } = useProduct();
  const variants = product?.variants || [];
  const blackVariant = variants.find((variant) => /negro|black|noche/i.test(variantText(variant))) ?? variants[0] ?? null;
  const grayVariant = variants.find((variant) => /gris|gray|grey|nube/i.test(variantText(variant)))
    ?? variants.find(({ id }) => id !== blackVariant?.id)
    ?? null;

  return (
    <section className="hero" id="comprar">
      <header className="hero-heading">
        <p className="eyebrow">Comodidad para días fríos</p>
        <h1>{product?.title || "Buzo térmico"}<br /><em>tipo saco-cobija</em></h1>
        <p className="hero-description">{product?.description || "Una capa suave y envolvente con forro polar y capucha extra grande, pensada para acompañar tus momentos de descanso."}</p>
        {commerceError ? <p className="buy-note" role="status">{commerceError}</p> : null}
      </header>
      <div className="variant-grid">
        <VariantCard variant={blackVariant} media={blackMedia} purchaseLabel="Comprar Negro" />
        <VariantCard variant={grayVariant} media={grayMedia} purchaseLabel="Comprar Gris" />
      </div>
      <div className="hero-trust"><span>Pago gestionado por Shopify</span><span>Compra en checkout seguro</span></div>
    </section>
  );
}
