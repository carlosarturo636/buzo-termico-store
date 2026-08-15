"use client";

import { useState } from "react";

const colors = [
  { name: "Negro", value: "#181a1b" },
  { name: "Gris", value: "#858581" },
];

export function ColorSelector() {
  const [selected, setSelected] = useState("Negro");
  return (
    <fieldset className="color-selector">
      <legend>Color: <strong>{selected}</strong></legend>
      <div className="color-options">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            className={selected === color.name ? "color-option is-active" : "color-option"}
            aria-label={`Elegir color ${color.name}`}
            aria-pressed={selected === color.name}
            onClick={() => setSelected(color.name)}
          >
            <span style={{ background: color.value }} />
          </button>
        ))}
      </div>
      <p className="provisional-note">Disponibilidad y talla por confirmar con el proveedor.</p>
    </fieldset>
  );
}
