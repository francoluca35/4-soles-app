"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import useCategorias from "../../../../hooks/useCategorias";
import logo from "../../../../public/Assets/4-soles-logo.jpg";
import Image from "next/image";
export default function AddProductosForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("comidas");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [imagenURL, setImagenURL] = useState("");

  const { categoriasComida, categoriasHelado } = useCategorias();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreviewURL(URL.createObjectURL(file)); // vista previa local
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !precio || !categoria || !imagen) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    try {
      // Subida a Cloudinary recién al apretar el botón
      const formData = new FormData();
      formData.append("file", imagen);

      const uploadRes = await fetch("/api/menu/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Falló la subida");

      const urlFinal = uploadData.url;
      setImagenURL(urlFinal); // solo si querés mostrar luego

      // Guardar el producto en MongoDB
      const res = await fetch("/api/menu/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          categoria,
          producto: { nombre, precio: Number(precio), imagen: urlFinal },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Producto agregado", "", "success");
        setNombre("");
        setPrecio("");
        setCategoria("");
        setImagen(null);
        setPreviewURL("");
        setImagenURL("");
      } else {
        Swal.fire(data.error || "Error al agregar", "", "error");
      }
    } catch (err) {
      console.error("Error submit:", err);
      Swal.fire("Error de conexión", "", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#852123] relative">
      {/* Fondo del logo centrado */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
        <Image
          src={logo}
          alt="Logo 4 Soles"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      {/* Formulario en primer plano */}
      <div className="relative z-10 bg-neutral-900 text-white p-6 rounded-lg max-w-md mx-auto shadow-xl w-full">
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
          className="w-full p-2 mb-4 bg-white text-black rounded border border-gray-400"
          onChange={handleFileChange}
        />

        {previewURL && (
          <div className="mb-4">
            <img
              src={previewURL}
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

        {imagenURL && (
          <p className="text-sm text-green-400 text-center break-all mt-2">
            Imagen subida: {imagenURL}
          </p>
        )}
      </div>
    </div>
  );
}
