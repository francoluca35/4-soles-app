"use client";

import { useEffect, useState } from "react";
import { Producto } from "@/types/productos";
import Swal from "sweetalert2";
import useCategorias from "../../../../hooks/useCategorias";
import logo from "../../../../public/Assets/4-soles-logo.jpg";
import Image from "next/image";
import BackArrow from "@/app/components/ui/BackArrow";
import TopTabs from "./TopTabs";
import TipoSelector from "./TipoSelector";
import InputField from "./InputField";
import CategoriaSelector from "./CategoriaSelector";
import FileInput from "./FileInput";
import GuardarButton from "./GuardarButton";
import BuscadorYLista from "./BuscadorYLista";

export default function AddProductosForm() {
  const [modo, setModo] = useState<"agregar" | "editar">("agregar");

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("comidas");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [imagenURL, setImagenURL] = useState<string>("");

  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState("");
  const { categoriasComida, categoriasHelado } = useCategorias();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (modo === "editar") {
      fetch(`/api/menu/listar?tipo=${tipo}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProductos(data);
          } else {
            console.warn("Respuesta inválida:", data);
            setProductos([]);
          }
        });
    }
  }, [modo, tipo]);

  const handleSubmit = async () => {
    if (!nombre || !precio || !categoria || (modo === "agregar" && !imagen)) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    try {
      let urlFinal = previewURL;

      if (imagen) {
        const formData = new FormData();
        formData.append("file", imagen);

        const uploadRes = await fetch("/api/menu/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.error || "Falló la subida");

        urlFinal = uploadData.url;
        setImagenURL(urlFinal);
      }

      const res = await fetch(
        modo === "agregar" ? "/api/menu/agregar" : "/api/menu/editar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: productoSeleccionadoId, // ⚠️ <=== ESTO FALTABA
            tipo,
            categoria,
            producto: {
              nombre,
              precio: Number(precio),
              imagen: urlFinal,
              categoria,
            },
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        Swal.fire(
          modo === "agregar" ? "Producto agregado" : "Producto editado",
          "",
          "success"
        );
        setNombre("");
        setPrecio("");
        setCategoria("");
        setImagen(null);
        setPreviewURL("");
        setImagenURL("");
        setProductoSeleccionadoId("");
        fetch(`/api/menu/listar?tipo=${tipo}`)
          .then((res) => res.json())
          .then((data) => setProductos(data));
      } else {
        Swal.fire(data.error || "Error en la operación", "", "error");
      }
    } catch (err) {
      console.error("Error submit:", err);
      Swal.fire("Error de conexión", "", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#852123] relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
        <Image
          src={logo}
          alt="Logo 4 Soles"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 bg-neutral-900/70 text-white p-6 rounded-xl max-w-6xl mx-auto shadow-2xl w-full">
        <BackArrow label="" />

        <h2 className="text-2xl font-semibold text-center mb-2">
          NUEVOS PRODUCTOS
        </h2>
        <TopTabs modo={modo} setModo={setModo} />
        <TipoSelector
          tipo={tipo}
          setTipo={setTipo}
          setCategoria={setCategoria}
        />

        {modo === "agregar" && (
          <>
            <InputField
              label="Nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <InputField
              label="Precio del producto"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <CategoriaSelector
              categoria={categoria}
              setCategoria={setCategoria}
              categorias={
                tipo === "comidas" ? categoriasComida : categoriasHelado
              }
            />
            <FileInput
              handleFileChange={handleFileChange}
              previewURL={previewURL}
            />
            <GuardarButton onClick={handleSubmit} />
          </>
        )}

        {modo === "editar" && (
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <BuscadorYLista
              productos={productos}
              onSelect={(producto) => {
                console.log("Producto seleccionado:", producto);
                setProductoSeleccionadoId(producto._id); // ✅ Este es el ID que falta
                setNombre(producto.nombre);
                setPrecio(producto.precio.toString());
                setCategoria(producto.categoria);
                setPreviewURL(producto.imagen);
              }}
              onDeleteSelected={async (ids) => {
                await fetch("/api/menu/eliminar", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ids, tipo, categoria }),
                });

                Swal.fire("Productos eliminados", "", "success");

                fetch(`/api/menu/listar?tipo=${tipo}`)
                  .then((res) => res.json())
                  .then((data) => setProductos(data));
              }}
            />

            <div className="w-full md:w-[60%] bg-neutral-900/70 p-4 rounded-xl">
              <InputField
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <InputField
                label="Precio"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <CategoriaSelector
                categoria={categoria}
                setCategoria={setCategoria}
                categorias={
                  tipo === "comidas" ? categoriasComida : categoriasHelado
                }
              />
              <FileInput
                handleFileChange={handleFileChange}
                previewURL={previewURL}
              />
              <GuardarButton onClick={handleSubmit} />
              {imagenURL && (
                <p className="text-sm text-green-400 text-center mt-2 break-all">
                  Imagen subida: {imagenURL}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
