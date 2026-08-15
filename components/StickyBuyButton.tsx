import { BuyButton } from "./BuyButton";

export function StickyBuyButton() {
  return <aside className="sticky-buy" aria-label="Compra rápida"><div><small>Buzo térmico</small><strong>$120.000 COP</strong></div><BuyButton compact /></aside>;
}
