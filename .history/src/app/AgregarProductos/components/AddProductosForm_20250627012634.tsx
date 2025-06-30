"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import useCategorias from "../../../../hooks/useCategorias";

export default function AddProductosForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("comidas");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenURL, setImagenURL] = useState("");

  const { categoriasComida, categoriasHelado } = useCategorias();

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/menu/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Subida:", data); // <- Debug
      if (res.ok) {
        setImagenURL(data.url);
        Swal.fire("Imagen subida", "", "success");
      } else {
        throw new Error("Error al subir imagen");
      }
    } catch (err) {
      console.error("Error upload", err);
      Swal.fire("Error al subir imagen", "", "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file); // <- Debug
      setImagen(file);
      handleUpload(file);
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !precio || !categoria || !imagenURL) {
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
          producto: { nombre, precio: Number(precio), imagen: imagenURL },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Producto agregado", "", "success");
        setNombre("");
        setPrecio("");
        setCategoria("");
        setImagen(null);
        setImagenURL("");
      } else {
        Swal.fire(data.error || "Error al agregar", "", "error");
      }
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
        className="w-full mb-3 p-2 text-black rounded"
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

      <input
        type="file"
        accept="image/*"
        className="w-full p-2 mb-4 bg-white rounded"
        onChange={handleFileChange}
      />

      {imagenURL && (
        <div className="mb-4">
          <img
            src={imagenURL}
            alt="Vista previa"
            className="w-32 h-32 object-cover rounded mx-auto"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Agregar Producto
      </button>
    </div>
  );
}
