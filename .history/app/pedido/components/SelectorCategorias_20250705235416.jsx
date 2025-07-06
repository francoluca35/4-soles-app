"use client";

import { useState } from "react";
import Image from "next/image";
import { SUBCATEGORIAS_MENU } from "@/utils/subcategoriasMenu";

export default function SelectorCategorias({
  onTipoChange,
  onSubcategoriasChange,
}) {
  const [tipoActual, setTipoActual] = useState("comida");
  const [mostrarSubcats, setMostrarSubcats] = useState(false);
  const [subcategoriasSeleccionadas, setSubcategoriasSeleccionadas] = useState(
    []
  );

  const handleTipoChange = (tipo) => {
    setTipoActual(tipo);
    setMostrarSubcats(false);
    setSubcategoriasSeleccionadas([]);
    onTipoChange(tipo);
    onSubcategoriasChange([]); // Resetear filtro
  };

  const toggleSubcategoria = (subcat) => {
    let nuevas;
    if (subcategoriasSeleccionadas.includes(subcat)) {
      nuevas = subcategoriasSeleccionadas.filter((s) => s !== subcat);
    } else {
      nuevas = [...subcategoriasSeleccionadas, subcat];
    }
    setSubcategoriasSeleccionadas(nuevas);
    onSubcategoriasChange(nuevas);
  };

  const subcats =
    tipoActual === "comida"
      ? [...SUBCATEGORIAS_MENU.comidas, ...SUBCATEGORIAS_MENU.bebidas]
      : SUBCATEGORIAS_MENU.helados;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <button
        onClick={() => handleTipoChange("helado")}
        className={`px-6 py-3 rounded-xl font-bold shadow-lg ${
          tipoActual === "helado"
            ? "bg-yellow-400 text-black"
            : "bg-white/10 text-white"
        }`}
      >
        Helados
      </button>

      <Image
        src="/Assets/4-soles-logo.jpg"
        alt="Logo"
        width={200}
        height={200}
        className="opacity-40 rounded-full"
      />

      <button
        onClick={() => handleTipoChange("comida")}
        className={`px-6 py-3 rounded-xl font-bold shadow-lg ${
          tipoActual === "comida"
            ? "bg-yellow-400 text-black"
            : "bg-white/10 text-white"
        }`}
      >
        Comidas
      </button>

      <button
        onClick={() => setMostrarSubcats(!mostrarSubcats)}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl text-white font-semibold"
      >
        {mostrarSubcats ? "Ocultar Subcategorías" : "Filtrar Subcategorías"}
      </button>

      {mostrarSubcats && (
        <div className="grid grid-cols-2 gap-2 max-w-xs">
          {subcats.map((subcat) => (
            <button
              key={subcat}
              onClick={() => toggleSubcategoria(subcat)}
              className={`px-3 py-1 text-sm rounded-lg border transition ${
                subcategoriasSeleccionadas.includes(subcat)
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
