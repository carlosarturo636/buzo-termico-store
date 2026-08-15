import { Benefits } from "@/components/Benefits";
import { BuyButton } from "@/components/BuyButton";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Measurements } from "@/components/Measurements";
import { Reviews } from "@/components/Reviews";
import { StickyBuyButton } from "@/components/StickyBuyButton";

export default function Home() {
  return (
    <main>
      <header className="site-header"><a className="brand" href="#top">NIDO<span>®</span></a><nav aria-label="Navegación principal"><a href="#beneficios">Beneficios</a><a href="#medidas">Medidas</a></nav><a className="header-cta" href="#comprar">Comprar</a></header>
      <div id="top"><Hero /></div>
      <div className="marquee" aria-hidden="true"><span>Suave por dentro</span><i>✦</i><span>Amplio y cómodo</span><i>✦</i><span>Hecho para el frío</span></div>
      <Benefits />
      <HowItWorks />
      <Features />
      <Measurements />
      <Reviews />
      <FAQ />
      <section className="final-cta"><p className="eyebrow">Tu momento, más cómodo</p><h2>Haz del frío<br /><em>tu lugar favorito.</em></h2><p>Buzo térmico tipo saco-cobija con forro polar ultra suave.</p><BuyButton /></section>
      <footer><a className="brand" href="#top">NIDO<span>®</span></a><p>Información comercial provisional hasta completar la conexión con Shopify.</p><small>© {new Date().getFullYear()}</small></footer>
      <StickyBuyButton />
    </main>
  );
}
