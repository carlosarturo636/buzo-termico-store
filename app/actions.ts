"use server";

import { headers } from "next/headers";
import { addToCart, createCart, getProduct } from "@/lib/shopify";

export type CheckoutResult = { checkoutUrl?: string; error?: string };

function getBuyerIp(headerList: Headers) {
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || undefined;
}

export async function createCheckout(variantId: string): Promise<CheckoutResult> {
  if (!variantId.startsWith("gid://shopify/ProductVariant/")) return { error: "Selecciona una variante válida." };
  try {
    const buyerIp = getBuyerIp(await headers());
    const product = await getProduct(buyerIp);
    const variant = product.variants.find(({ id }) => id === variantId);
    if (!variant) return { error: "La variante seleccionada ya no está disponible." };
    if (!variant.availableForSale) return { error: "Esta variante está agotada." };

    const cart = await createCart(buyerIp);
    const updatedCart = await addToCart(cart.id, variant.id, 1, buyerIp);
    return { checkoutUrl: updatedCart.checkoutUrl };
  } catch {
    return { error: "No pudimos iniciar la compra. Inténtalo de nuevo en unos minutos." };
  }
}
