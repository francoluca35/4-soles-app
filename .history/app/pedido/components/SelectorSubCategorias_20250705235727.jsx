"use client";
import { useState } from "react";
import { SUBCATEGORIAS_MENU } from "@/utils/subcategoriasMenu";

export default function SelectorSubcategorias({ tipoActual, onChange }) {
  const subcategorias =
    SUBCATEGORIAS_MENU[tipoActual === "comida" ? "comidas" : tipoActual];

  const [seleccionadas, setSeleccionadas] = useState([]);

  const toggleSubcategoria = (subcat) => {
    let actualizadas;
    if (seleccionadas.includes(subcat)) {
      actualizadas = seleccionadas.filter((s) => s !== subcat);
    } else {
      actualizadas = [...seleccionadas, subcat];
    }
    setSeleccionadas(actualizadas);
    onChange(actualizadas);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {subcategorias.map((sub) => (
        <button
          key={sub}
          className={`px-3 py-1 rounded-full text-sm ${
            seleccionadas.includes(sub)
              ? "bg-orange-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          onClick={() => toggleSubcategoria(sub)}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}
