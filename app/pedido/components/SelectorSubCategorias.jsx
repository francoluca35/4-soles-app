"use client";
import { useEffect, useState } from "react";

export default function SelectorSubcategorias({ tipoActual, onChange }) {
  const [subcategorias, setSubcategorias] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {
    const cargarSubcategorias = async () => {
      try {
        const res = await fetch("/api/subcategorias");
        const data = await res.json();
        const tipoKey =
          tipoActual === "comida"
            ? "comidas"
            : tipoActual === "bebida"
            ? "bebidas"
            : "helados";
        setSubcategorias(data[tipoKey] || []);
        setSeleccionadas([]); // Reset al cambiar tipo
        onChange([]); // Vaciar selección en el padre también
      } catch (err) {
        console.error("Error al cargar subcategorías:", err);
      }
    };

    cargarSubcategorias();
  }, [tipoActual]);

  const toggleSubcategoria = (subcat) => {
    const actualizadas = seleccionadas.includes(subcat)
      ? seleccionadas.filter((s) => s !== subcat)
      : [...seleccionadas, subcat];

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
