"use client";

import type { ShopifyVariant } from "@/lib/shopify";

const swatches: Record<string, string> = {
  negro: "#181a1b", gris: "#858581", black: "#181a1b", gray: "#858581", grey: "#858581",
};

function variantLabel(variant: ShopifyVariant) {
  return variant.selectedOptions.find(({ name }) => /color|colour/i.test(name))?.value || variant.title;
}

function colorOrder(variant: ShopifyVariant) {
  const label = variantLabel(variant);
  if (/negro|black|noche/i.test(label)) return 0;
  if (/gris|gray|grey|nube/i.test(label)) return 1;
  return 2;
}

export function ColorSelector({ variants, selectedId, onSelect }: {
  variants: ShopifyVariant[];
  selectedId: string | null;
  onSelect: (variantId: string) => void;
}) {
  const selected = variants.find(({ id }) => id === selectedId);
  const orderedVariants = variants.map((variant, index) => ({ variant, index }))
    .sort((a, b) => colorOrder(a.variant) - colorOrder(b.variant) || a.index - b.index)
    .map(({ variant }) => variant);
  return (
    <fieldset className="color-selector">
      <legend>Color: <strong>{selected ? variantLabel(selected) : "No disponible"}</strong></legend>
      <div className="color-options">
        {orderedVariants.map((variant) => {
          const label = variantLabel(variant);
          return (
            <button
              key={variant.id}
              type="button"
              className={selectedId === variant.id ? "color-option is-active" : "color-option"}
              aria-label={`${variant.availableForSale ? "Elegir" : "Agotado:"} color ${label}`}
              aria-pressed={selectedId === variant.id}
              disabled={!variant.availableForSale}
              onClick={() => onSelect(variant.id)}
            >
              <span style={{ background: swatches[label.toLowerCase()] || "#b8a58f" }} />
            </button>
          );
        })}
      </div>
      {selected && !selected.availableForSale ? <p className="provisional-note">Esta variante está agotada.</p> : null}
    </fieldset>
  );
}
