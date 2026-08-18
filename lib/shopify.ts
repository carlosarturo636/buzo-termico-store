import "server-only";

const API_VERSION = "2026-07";

export type ShopifyMoney = { amount: string; currencyCode: string };
export type ShopifySelectedOption = { name: string; value: string };
export type ShopifyProductOption = { name: string; values: string[] };
export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: ShopifySelectedOption[];
};
export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  options: ShopifyProductOption[];
  variants: ShopifyVariant[];
};
export type ShopifyCart = { id: string; checkoutUrl: string };
export type ShopifyPolicy = { title: string; url: string };
export type ShopifyPolicies = {
  refundPolicy: ShopifyPolicy | null;
  shippingPolicy: ShopifyPolicy | null;
  privacyPolicy: ShopifyPolicy | null;
  termsOfService: ShopifyPolicy | null;
};

type ShopifyResponse<T> = { data?: T; errors?: Array<{ message: string }> };
type CartUserError = { field?: string[] | null; message: string };

export class ShopifyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyError";
  }
}

function getConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  if (!domain || !token) throw new ShopifyError("Shopify no está configurado.");
  return { domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""), token };
}

async function shopifyFetch<T>({ query, variables, buyerIp }: {
  query: string;
  variables?: Record<string, unknown>;
  buyerIp?: string;
}): Promise<T> {
  const { domain, token } = getConfig();
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "Shopify-Storefront-Private-Token": token,
  };
  if (buyerIp) requestHeaders["Shopify-Storefront-Buyer-IP"] = buyerIp;

  let response: Response;
  try {
    response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });
  } catch {
    throw new ShopifyError("No fue posible contactar a Shopify.");
  }

  let result: ShopifyResponse<T>;
  try {
    result = (await response.json()) as ShopifyResponse<T>;
  } catch {
    throw new ShopifyError("Shopify devolvió una respuesta inválida.");
  }
  if (!response.ok || result.errors?.length || !result.data) {
    throw new ShopifyError("Shopify no pudo completar la solicitud.");
  }
  return result.data;
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      availableForSale
      options { name values }
      variants(first: 50) {
        nodes {
          id
          title
          availableForSale
          price { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`;

export async function getProduct(buyerIp?: string): Promise<ShopifyProduct> {
  const handle = process.env.SHOPIFY_PRODUCT_HANDLE?.trim() || "mufasa";
  const data = await shopifyFetch<{
    product: (Omit<ShopifyProduct, "variants"> & { variants: { nodes: ShopifyVariant[] } }) | null;
  }>({ query: PRODUCT_QUERY, variables: { handle }, buyerIp });
  if (!data.product) throw new ShopifyError("El producto no fue encontrado.");
  return { ...data.product, variants: data.product.variants.nodes };
}

const SHOP_POLICIES_QUERY = `#graphql
  query ShopPolicies {
    shop {
      refundPolicy { title url }
      shippingPolicy { title url }
      privacyPolicy { title url }
      termsOfService { title url }
    }
  }
`;

export async function getShopPolicies(buyerIp?: string): Promise<ShopifyPolicies> {
  const data = await shopifyFetch<{ shop: ShopifyPolicies }>({ query: SHOP_POLICIES_QUERY, buyerIp });
  return data.shop;
}

const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate {
    cartCreate(input: {}) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function createCart(buyerIp?: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart | null; userErrors: CartUserError[] };
  }>({ query: CART_CREATE_MUTATION, buyerIp });
  if (data.cartCreate.userErrors.length || !data.cartCreate.cart) {
    throw new ShopifyError("No fue posible crear el carrito.");
  }
  return data.cartCreate.cart;
}

const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function addToCart(cartId: string, merchandiseId: string, quantity = 1, buyerIp?: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart | null; userErrors: CartUserError[] };
  }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines: [{ merchandiseId, quantity }] },
    buyerIp,
  });
  if (data.cartLinesAdd.userErrors.length || !data.cartLinesAdd.cart) {
    throw new ShopifyError("No fue posible agregar el producto al carrito.");
  }
  return data.cartLinesAdd.cart;
}
