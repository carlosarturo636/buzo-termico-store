"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

export function BuyButton({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");

  return (
    <div className="buy-wrap">
      <button
        className={`buy-button ${compact ? "buy-button--compact" : ""}`}
        type="button"
        onClick={() => setMessage("La compra se habilitará al conectar las variantes de Shopify.")}
      >
        Comprar ahora <ArrowIcon />
      </button>
      {message && <p className="buy-note" role="status">{message}</p>}
    </div>
  );
}
