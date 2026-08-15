const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

export type ShopifyMoney = { amount: string; currencyCode: string };
export type ShopifyMedia =
  | { type: "image"; id: string; url: string; altText: string | null; width?: number; height?: number }
  | { type: "video"; id: string; url: string; previewImage?: string; altText: string | null };

type ShopifyResponse<T> = { data?: T; errors?: Array<{ message: string }> };

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  if (!domain || !storefrontToken || !apiVersion) {
    throw new Error("Faltan variables de entorno de Shopify.");
  }

  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  const result = (await response.json()) as ShopifyResponse<T>;
  if (!response.ok || result.errors?.length || !result.data) {
    throw new Error(result.errors?.map(({ message }) => message).join(", ") || "Shopify no respondió correctamente.");
  }
  return result.data;
}

export const formatMoney = ({ amount, currencyCode }: ShopifyMoney) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: currencyCode, maximumFractionDigits: 0 }).format(Number(amount));

// La siguiente etapa añadirá consultas tipadas para producto, variantes y carrito.
// El checkout siempre se completará en la checkoutUrl devuelta por Shopify.
