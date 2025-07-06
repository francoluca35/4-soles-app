// app/components/ui/SelectorCategorias.js
"use client";
import { useState } from "react";

export default function SelectorCategorias({ onChange }) {
  const [seleccionado, setSeleccionado] = useState("comida");

  const handleClick = (tipo) => {
    setSeleccionado(tipo);
    onChange(tipo); // comunicamos el tipo elegido al componente padre
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <button
        className={`px-6 py-3 font-bold rounded-xl shadow-lg ${
          seleccionado === "helado"
            ? "bg-yellow-400 text-black"
            : "bg-white/10 text-white"
        }`}
        onClick={() => handleClick("helado")}
      >
        Helados
      </button>

      <button
        className={`px-6 py-3 font-bold rounded-xl shadow-lg ${
          seleccionado === "comida"
            ? "bg-white text-black"
            : "bg-white/10 text-white"
        }`}
        onClick={() => handleClick("comida")}
      >
        Comidas
      </button>
    </div>
  );
}
