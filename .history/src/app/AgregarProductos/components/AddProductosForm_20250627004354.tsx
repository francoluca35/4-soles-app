"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useCategorias from "../../../../hooks/useCategorias";

export default function AddProductosForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("comidas");
  const [categoria, setCategoria] = useState("");

  const { categoriasComida, categoriasHelado } = useCategorias();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("/api/menu/categorias");
        const data = await res.json();
        if (res.ok) {
          setCategoriasComida(Object.keys(data.comidas || {}));
        } else {
          console.error("Error al obtener categorías");
        }
      } catch (err) {
        console.error("Error de conexión", err);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async () => {
    if (!nombre || !precio || !categoria) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    try {
      const res = await fetch("/api/menu/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          categoria,
          producto: { nombre, precio: Number(precio) },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Producto agregado", "", "success");
        setNombre("");
        setPrecio("");
        setCategoria("");
      } else {
        Swal.fire(data.error || "Error al agregar", "", "error");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Swal.fire("Error de conexión", "", "error");
    }
  };

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg max-w-md mx-auto mt-8 shadow-xl">
      <h2 className="text-xl mb-4 font-bold text-center">Agregar Producto</h2>

      <select
        className="w-full mb-3 p-2 text-black rounded"
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setCategoria("");
        }}
      >
        <option value="comidas">Comida</option>
        <option value="helados">Helado</option>
      </select>

      <input
        type="text"
        className="w-full p-2 mb-3 rounded text-black"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        className="w-full p-2 mb-3 rounded text-black"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <select
        className="w-full mb-4 p-2 text-black rounded"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Seleccionar categoría</option>
        {(tipo === "comidas" ? categoriasComida : categoriasHelado).map(
          (cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          )
        )}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Agregar Producto
      </button>
    </div>
  );
}
