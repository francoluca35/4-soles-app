"use client";

import { useState, useRef } from "react";
import useAgregarMenu from "@/app/hooks/useAgregarMenu";
import useProductos from "@/app/hooks/useProductos";
import { validarImagenMenu } from "@/utils/validationApp";
import BackArrow from "@/app/components/ui/BackArrow";
import Swal from "sweetalert2";
import ModalEditarProducto from "@/app/components/ModalEditarProducto";
import { FiPlusCircle, FiX } from "react-icons/fi";

const SUBCATEGORIAS_MENU = {
  comida: [
    "empanadas",
    "pizzas",
    "hamburguesas",
    "lomitos",
    "tartas",
    "menu diario",
    "pastas",
    "ensaladas",
    "papas",
    "milanesas",
    "sandwiches",
    "otros",
  ],
  helado: [
    "bombones",
    "palitos",
    "crema",
    "agua",
    "potes",
    "vasitos",
    "conos",
    "tortas heladas",
  ],
  bebida: ["sin alcohol", "con alcohol", "licuados", "frutales"],
};

export default function AgregarMenu() {
  const { agregarMenu, loading } = useAgregarMenu();
  const { productos, refetch } = useProductos();

  const [modo, setModo] = useState("agregar");
  const [tipo, setTipo] = useState("comida");
  const [categoria, setCategoria] = useState(SUBCATEGORIAS_MENU.comida[0]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");
  const [adicional, setAdicional] = useState("");
  const [adicionales, setAdicionales] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [productoEditar, setProductoEditar] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const itemsPorPagina = 5;
  const [paginaActual, setPaginaActual] = useState(1);

  const productosFiltrados = productos?.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const productosPaginados = productosFiltrados?.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );
  const totalPaginas = Math.ceil(
    (productosFiltrados?.length || 0) / itemsPorPagina
  );

  const handleAgregar = async (e) => {
    e.preventDefault();

    const error = validarImagenMenu(file);
    if (error) {
      Swal.fire("Imagen no válida", error, "error");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    formData.append("precio", precio);
    formData.append("descuento", descuento || "");
    formData.append("adicionales", JSON.stringify(adicionales || []));
    formData.append("categoria", categoria);
    if (file) formData.append("file", file);

    await agregarMenu(formData);
    Swal.fire("Agregado", "Menú agregado correctamente.", "success");

    setNombre("");
    setPrecio("");
    setDescuento("");
    setAdicional("");
    setAdicionales([]);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview(null);
    refetch?.();
  };

  const agregarAdicional = () => {
    if (adicional.trim()) {
      setAdicionales([...adicionales, adicional.trim()]);
      setAdicional("");
    }
  };

  const eliminarAdicional = (index) => {
    setAdicionales(adicionales.filter((_, i) => i !== index));
  };

  return (
    <section className="w-full min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white/5 rounded-3xl p-6 md:p-10 border border-gray-700 shadow-2xl">
        <BackArrow label="Volver al panel" />

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          🍽 Agregar Menú
        </h2>

        <form
          onSubmit={handleAgregar}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
        >
          <select
            value={tipo}
            onChange={(e) => {
              const nuevoTipo = e.target.value;
              setTipo(nuevoTipo);
              setCategoria(SUBCATEGORIAS_MENU[nuevoTipo][0]);
            }}
            className="sm:col-span-2 px-5 py-3 rounded-xl bg-white/10 text-white border border-gray-600"
          >
            <option value="comida" className="text-black">
              🍽 Comida
            </option>
            <option value="helado" className="text-black">
              🍨 Helado
            </option>
            <option value="bebida" className="text-black">
              🥤 Bebida
            </option>
          </select>

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-gray-600"
            required
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-gray-600"
          >
            {SUBCATEGORIAS_MENU[tipo].map((cat) => (
              <option key={cat} value={cat} className="text-black">
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-gray-600"
            required
          />

          <input
            type="number"
            placeholder="Descuento (opcional)"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-gray-600"
          />

          {tipo !== "bebida" && (
            <>
              <div className="sm:col-span-2 flex gap-3">
                <input
                  type="text"
                  placeholder="Adicional"
                  value={adicional}
                  onChange={(e) => setAdicional(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white/10 text-white border border-gray-600"
                />
                <button
                  type="button"
                  onClick={agregarAdicional}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl"
                >
                  <FiPlusCircle />
                </button>
              </div>

              {adicionales.length > 0 && (
                <ul className="sm:col-span-2 list-disc pl-6 text-cyan-300">
                  {adicionales.map((a, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {a}
                      <button
                        type="button"
                        className="ml-3 bg-red-500 text-white px-2 rounded-full"
                        onClick={() => eliminarAdicional(i)}
                      >
                        <FiX />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              const error = validarImagenMenu(selectedFile);
              if (error) {
                Swal.fire("Archivo no válido", error, "error");
                e.target.value = "";
                return;
              }
              setFile(selectedFile);
              setPreview(URL.createObjectURL(selectedFile));
            }}
            className="sm:col-span-2 text-white text-sm file:bg-cyan-700 file:text-white file:rounded-xl file:px-4 file:py-2 bg-white/10 border border-gray-600 rounded-xl px-4 py-3"
          />

          {preview && (
            <div className="sm:col-span-2 mt-4 flex justify-center">
              <img
                src={preview}
                alt="Vista previa"
                className="h-40 object-cover rounded-xl border border-white/20"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl"
          >
            {loading ? "Agregando..." : "Agregar menú"}
          </button>
        </form>
      </div>
    </section>
  );
}
