"use client";

import { useState, useTransition } from "react";
import { createCheckout } from "@/app/actions";
import { ArrowIcon } from "./Icons";
import { useProduct } from "./ProductProvider";

export function BuyButton({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { selectedVariant } = useProduct();
  const canBuy = Boolean(selectedVariant?.availableForSale);

  function handleBuy() {
    if (!selectedVariant) {
      setMessage("Selecciona una variante disponible.");
      return;
    }
    startTransition(async () => {
      setMessage("");
      const result = await createCheckout(selectedVariant.id);
      if (result.checkoutUrl) window.location.assign(result.checkoutUrl);
      else setMessage(result.error || "No pudimos iniciar la compra.");
    });
  }

  return (
    <div className="buy-wrap">
      <button className={`buy-button ${compact ? "buy-button--compact" : ""}`} type="button" disabled={!canBuy || isPending} onClick={handleBuy}>
        {isPending ? "Preparando checkout…" : canBuy ? "Comprar ahora" : "No disponible"} <ArrowIcon />
      </button>
      {message && <p className="buy-note" role="status">{message}</p>}
    </div>
  );
}
