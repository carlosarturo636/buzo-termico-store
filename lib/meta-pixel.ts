export type MetaPixelEvent = "ViewContent" | "AddToCart" | "InitiateCheckout";

type MetaPixelParameters = {
  content_name: "MUFASA";
  content_type: "product";
  content_ids?: string[];
  value: 120000;
  currency: "COP";
};

declare global {
  interface Window {
    fbq?: (command: "track", event: MetaPixelEvent, parameters: MetaPixelParameters) => void;
  }
}

export function getMufasaMetaParameters(variantId?: string): MetaPixelParameters {
  return {
    content_name: "MUFASA",
    content_type: "product",
    ...(variantId ? { content_ids: [variantId] } : {}),
    value: 120000,
    currency: "COP",
  };
}

export function trackMetaPixel(event: MetaPixelEvent, parameters: MetaPixelParameters) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  try {
    window.fbq("track", event, parameters);
  } catch {
    // Analytics must never interrupt the storefront or checkout flow.
  }
}
