import Image from "next/image";
import { BuyButton } from "@/components/BuyButton";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LegalPolicies } from "@/components/LegalPolicies";
import { Measurements } from "@/components/Measurements";
import { Reviews } from "@/components/Reviews";
import { StickyBuyButton } from "@/components/StickyBuyButton";
import { ProductProvider } from "@/components/ProductProvider";
import { getProduct } from "@/lib/shopify";
import { headers } from "next/headers";

export default async function Home() {
  let product = null;
  let commerceError: string | undefined;
  try {
    const headerList = await headers();
    const buyerIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || undefined;
    product = await getProduct(buyerIp);
  } catch {
    commerceError = "La información de compra no está disponible temporalmente.";
  }

  return (
    <ProductProvider product={product} commerceError={commerceError}><main>
      <header className="site-header"><a className="brand brand--image brand--header" href="#top"><Image src="/media/mufasa-header-logo.webp" alt="Mufasa" width={624} height={234} sizes="(max-width: 800px) 124px, 154px" priority /></a><nav aria-label="Navegación principal"><a href="#beneficios">Beneficios</a><a href="#medidas">Medidas</a></nav></header>
      <div id="top"><Hero /></div>
      <div className="marquee" id="beneficios" aria-hidden="true"><span>Suave por dentro</span><i>✦</i><span>Amplio y cómodo</span><i>✦</i><span>Hecho para el frío</span></div>
      <HowItWorks />
      <Features />
      <Measurements />
      <Reviews />
      <FAQ />
      <section className="final-cta"><p className="eyebrow">Tu momento, más cómodo</p><h2>Haz del frío<br /><em>tu lugar favorito.</em></h2><p>Buzo térmico tipo saco-cobija con forro polar ultra suave.</p><BuyButton /></section>
      <LegalPolicies />
      <footer><a className="brand brand--image brand--footer" href="#top"><Image src="/media/mufasa-wordmark.webp" alt="Mufasa" width={150} height={50} /></a><small>© {new Date().getFullYear()}</small></footer>
      <StickyBuyButton />
    </main></ProductProvider>
  );
}
