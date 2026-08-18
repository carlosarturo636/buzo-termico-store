"use client";

import { formatMoney } from "@/lib/money";
import { BuyButton } from "./BuyButton";
import { useProduct } from "./ProductProvider";

export function StickyBuyButton() {
  const { product, selectedVariant } = useProduct();
  return <aside className="sticky-buy" aria-label="Compra rápida"><div><small>{product?.title || "Buzo térmico"}</small><strong>{selectedVariant ? formatMoney(selectedVariant.price) : "No disponible"}</strong></div><BuyButton compact /></aside>;
}
