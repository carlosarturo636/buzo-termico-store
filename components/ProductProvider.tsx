"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ShopifyProduct, ShopifyVariant } from "@/lib/shopify";

type ProductContextValue = {
  product: ShopifyProduct | null;
  selectedVariant: ShopifyVariant | null;
  selectVariant: (variantId: string) => void;
  commerceError?: string;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ product, commerceError, children }: {
  product: ShopifyProduct | null;
  commerceError?: string;
  children: React.ReactNode;
}) {
  const initialId = product?.variants.find((variant) => variant.availableForSale)?.id ?? product?.variants[0]?.id ?? null;
  const [selectedVariantId, setSelectedVariantId] = useState(initialId);
  const selectedVariant = product?.variants.find(({ id }) => id === selectedVariantId) ?? null;
  const value = useMemo(
    () => ({ product, selectedVariant, selectVariant: setSelectedVariantId, commerceError }),
    [product, selectedVariant, commerceError],
  );
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProduct debe usarse dentro de ProductProvider.");
  return context;
}
