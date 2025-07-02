import { useState } from "react";
import { Producto } from "@/types/productos"; // Asegurate que este path sea correcto

interface Props {
  productos: Producto[];
  onSelect: (producto: Producto) => void;
}

export default function BuscadorYLista({ productos, onSelect }: Props) {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w-full md:w-[40%] p-2">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full bg-orange-400 text-white placeholder-white px-3 py-2 rounded mb-2"
      />
      <div className="bg-white rounded shadow overflow-y-auto max-h-[400px]">
        {productosFiltrados.map((prod) => (
          <button
            key={prod._id}
            onClick={() => onSelect(prod)}
            className="block w-full text-left px-3 py-2 border-b border-gray-200 hover:bg-orange-100 text-black"
          >
            {prod.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
