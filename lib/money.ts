import type { ShopifyMoney } from "./shopify";

export function formatMoney({ amount, currencyCode }: ShopifyMoney) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}
