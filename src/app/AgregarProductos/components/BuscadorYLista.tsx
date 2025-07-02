import { useState } from "react";
import { Producto } from "@/types/productos";

interface Props {
  productos: Producto[];
  onSelect: (producto: Producto) => void;
  onDeleteSelected?: (ids: string[]) => void;
}

export default function BuscadorYLista({
  productos,
  onSelect,
  onDeleteSelected,
}: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [modoEliminar, setModoEliminar] = useState(false);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleSeleccion = (id: string) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const confirmarEliminacion = () => {
    if (onDeleteSelected && seleccionados.length > 0) {
      onDeleteSelected(seleccionados);
      setSeleccionados([]);
      setModoEliminar(false);
    }
  };

  return (
    <div className="w-full md:w-[40%] p-2">
      <div className="flex justify-between mb-2">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-orange-400 text-white placeholder-white px-3 py-2 rounded mr-2"
        />
        <button
          onClick={() => setModoEliminar(!modoEliminar)}
          className={`px-3 py-2 rounded text-white ${
            modoEliminar ? "bg-gray-600" : "bg-red-600"
          }`}
        >
          {modoEliminar ? "Cancelar" : "Eliminar"}
        </button>
      </div>

      {modoEliminar && (
        <button
          onClick={confirmarEliminacion}
          className="w-full bg-red-500 text-white py-2 rounded mb-2"
        >
          Confirmar eliminación ({seleccionados.length})
        </button>
      )}

      <div className="bg-white rounded shadow overflow-y-auto max-h-[400px]">
        {productosFiltrados.map((prod) => (
          <div
            key={prod._id}
            className={`flex items-center px-3 py-2 border-b border-gray-200 ${
              modoEliminar ? "cursor-pointer" : "hover:bg-orange-100"
            }`}
            onClick={() => {
              if (modoEliminar) toggleSeleccion(prod._id!);
              else onSelect(prod);
            }}
          >
            {modoEliminar && (
              <input
                type="checkbox"
                checked={seleccionados.includes(prod._id!)}
                onChange={() => toggleSeleccion(prod._id!)}
                className="mr-2"
              />
            )}
            <span className="text-black">{prod.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
