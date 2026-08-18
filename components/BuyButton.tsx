"use client";

import { useState, useTransition } from "react";
import { createCheckout } from "@/app/actions";
import type { ShopifyVariant } from "@/lib/shopify";
import { ArrowIcon } from "./Icons";
import { useProduct } from "./ProductProvider";

export function BuyButton({ compact = false, variant, label }: {
  compact?: boolean;
  variant?: ShopifyVariant | null;
  label?: string;
}) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { selectedVariant } = useProduct();
  const purchaseVariant = variant === undefined ? selectedVariant : variant;
  const canBuy = Boolean(purchaseVariant?.availableForSale);

  function handleBuy() {
    if (!purchaseVariant) {
      setMessage("Selecciona una variante disponible.");
      return;
    }
    startTransition(async () => {
      setMessage("");
      const result = await createCheckout(purchaseVariant.id);
      if (result.checkoutUrl) window.location.assign(result.checkoutUrl);
      else setMessage(result.error || "No pudimos iniciar la compra.");
    });
  }

  return (
    <div className="buy-wrap">
      <button className={`buy-button ${compact ? "buy-button--compact" : ""}`} type="button" disabled={!canBuy || isPending} onClick={handleBuy}>
        {isPending ? "Preparando checkout…" : label || (canBuy ? "Comprar ahora" : "No disponible")} <ArrowIcon />
      </button>
      {message && <p className="buy-note" role="status">{message}</p>}
    </div>
  );
}
