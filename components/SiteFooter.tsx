import Image from "next/image";
import type { ShopifyPolicies, ShopifyPolicy } from "@/lib/shopify";

const policyLabels: Array<{ key: keyof ShopifyPolicies; label: string }> = [
  { key: "refundPolicy", label: "Devoluciones" },
  { key: "shippingPolicy", label: "Envíos" },
  { key: "privacyPolicy", label: "Privacidad" },
  { key: "termsOfService", label: "Términos del servicio" },
];

export function SiteFooter({ policies }: { policies: ShopifyPolicies | null }) {
  const policyLinks = policyLabels.flatMap(({ key, label }) => {
    const policy: ShopifyPolicy | null | undefined = policies?.[key];
    return policy ? [{ ...policy, label }] : [];
  });

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <a className="brand brand--image brand--footer" href="#top">
          <Image src="/media/mufasa-wordmark.webp" alt="Mufasa" width={150} height={50} />
        </a>
        <p>Comodidad para días fríos.</p>
      </div>

      {policyLinks.length ? (
        <nav className="site-footer__column" aria-label="Políticas de la tienda">
          <h2>Políticas</h2>
          {policyLinks.map(({ label, title, url }) => (
            <a href={url} key={label} title={title}>{label}</a>
          ))}
        </nav>
      ) : null}

      <div className="site-footer__column site-footer__support">
        <h2>Soporte</h2>
        <span>Contacto / WhatsApp</span>
        <a href="https://wa.me/573163750227" target="_blank" rel="noreferrer" aria-label="Contactar a MUFASA por WhatsApp al 316 375 0227">316 375 0227</a>
      </div>

      <small className="site-footer__copyright">© {new Date().getFullYear()} MUFASA</small>
    </footer>
  );
}
