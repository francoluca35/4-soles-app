"use client";

import { useState, useEffect } from "react";
import { FiPlusCircle, FiTrash2, FiFilter } from "react-icons/fi";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import Image from "next/image";
import useProductos from "@/app/hooks/useProductos";
import SelectorCategorias from "./SelectorCategorias";
import SelectorSubcategorias from "./SelectorSubCategorias";

export default function DeliveryForm() {
  const { productos } = useProductos();
  const [tipoActual, setTipoActual] = useState("comida");
  const [phone, setPhone] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [observacion, setObservacion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [pago, setPago] = useState("");
  const [urlPago, setUrlPago] = useState("");
  const [externalReference, setExternalReference] = useState("");
  const [presupuesto, setPresupuesto] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState([]);
  const [mostrarSubcategorias, setMostrarSubcategorias] = useState(false);

  const productosFiltrados = productos
    .filter((p) =>
      tipoActual === "comida"
        ? p.tipo === "comida" || p.tipo === "bebida"
        : p.tipo === "helado"
    )
    .filter(
      (p) =>
        subcategoriasFiltradas.length === 0 ||
        subcategoriasFiltradas.includes(p.categoria?.toLowerCase())
    )
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const agregarProducto = () => {
    if (!productoSeleccionado || cantidad < 1) return;
    const tipo = productos.find((p) => p.nombre === productoSeleccionado)?.tipo;
    setPresupuesto((prev) => [
      ...prev,
      {
        comida: tipo !== "bebida" ? productoSeleccionado : "",
        bebida: tipo === "bebida" ? productoSeleccionado : "",
        cantidad,
      },
    ]);
    setProductoSeleccionado("");
    setCantidad(1);
    setBusqueda("");
  };

  const eliminarItem = (index) => {
    setPresupuesto((prev) => prev.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return presupuesto.reduce((total, item) => {
      const comidaProd = productos.find((p) => p.nombre === item.comida);
      const bebidaProd = productos.find((p) => p.nombre === item.bebida);
      const base = (comidaProd?.precio || 0) * (item.cantidad || 1);
      const bebidaPrecio = (bebidaProd?.precio || 0) * (item.cantidad || 1);
      return total + base + bebidaPrecio;
    }, 0);
  };

  const total = calcularTotal();

  const enviarPedidoFinal = async () => {
    const now = new Date();
    const hora = now.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const fecha = now.toLocaleDateString("es-AR");

    const payload = {
      modoPedido: "delivery",
      tipo: "delivery",
      nombre,
      phone,
      direccion,
      observacion,
      formaDePago: pago,
      comidas: presupuesto,
      total,
      modo: "envio",
      estado: "en curso",
      fecha: now.toLocaleString("es-AR"),
      timestamp: now,
    };

    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Swal.fire("Pedido enviado correctamente", "", "success");
        resetFormulario();
      } else {
        Swal.fire("Error", "No se pudo enviar el pedido", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Hubo un problema al enviar", "error");
    }
  };

  const resetFormulario = () => {
    setPhone("");
    setNombre("");
    setDireccion("");
    setObservacion("");
    setBusqueda("");
    setProductoSeleccionado("");
    setCantidad(1);
    setPago("");
    setPresupuesto([]);
    setUrlPago("");
    setExternalReference("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Columna izquierda */}
      <div className="bg-neutral-900 p-4 rounded-xl space-y-4">
        <div className="relative">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar Producto"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setMostrarDropdown(true);
              }}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-full"
            />
            <button
              onClick={() => setMostrarSubcategorias(!mostrarSubcategorias)}
              className="text-white hover:text-orange-400"
              title="Filtrar por subcategorías"
            >
              <FiFilter size={22} />
            </button>
          </div>

          {mostrarSubcategorias && (
            <div className="mt-3">
              <SelectorSubcategorias
                tipoActual={tipoActual}
                onChange={(subcats) => setSubcategoriasFiltradas(subcats)}
              />
            </div>
          )}
        </div>

        {mostrarDropdown && productosFiltrados.length > 0 && (
          <ul className="bg-white text-black rounded-xl shadow-md max-h-40 overflow-y-auto">
            {productosFiltrados.map((p) => (
              <li
                key={p._id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setProductoSeleccionado(p.nombre);
                  setBusqueda(p.nombre);
                  setMostrarDropdown(false);
                }}
              >
                {p.nombre}
              </li>
            ))}
          </ul>
        )}
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-full px-4 py-2 bg-white/10 text-white rounded-xl"
        />
        <button
          onClick={agregarProducto}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <FiPlusCircle /> Agregar Producto
          </div>
        </button>
        {presupuesto.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-white bg-white/5 px-4 py-2 rounded"
          >
            <span>
              {item.cantidad}x {item.comida || item.bebida}
            </span>
            <button
              onClick={() => eliminarItem(index)}
              className="text-red-400"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
        <button
          onClick={enviarPedidoFinal}
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-xl"
        >
          Enviar Pedido
        </button>
      </div>

      {/* Columna central */}
      <SelectorCategorias onChange={(tipo) => setTipoActual(tipo)} />

      {/* Columna derecha */}
      <div className="bg-neutral-900 p-4 rounded-xl space-y-4">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Numero de telefono"
          className="w-full px-4 py-2 bg-white/10 text-white rounded-xl"
        />
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre Completo"
          className="w-full px-4 py-2 bg-white/10 text-white rounded-xl"
        />
        <input
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección"
          className="w-full px-4 py-2 bg-white/10 text-white rounded-xl"
        />
        <textarea
          value={observacion}
          onChange={(e) => setObservacion(e.target.value)}
          rows={2}
          placeholder="Observación"
          className="w-full px-4 py-2 bg-white/10 text-white rounded-xl"
        />
        <select
          value={pago}
          onChange={(e) => setPago(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 text-white rounded-xl"
        >
          <option className="text-black" value="">
            Forma de pago
          </option>
          <option className="text-black" value="efectivo">
            Efectivo
          </option>
          <option className="text-black" value="link">
            Link de pago
          </option>
        </select>
        <div className="text-sm text-white">
          <p className="font-semibold underline">Pedidos</p>
          {presupuesto.map((item, index) => (
            <p key={index}>
              + {item.comida || item.bebida} ($
              {(productos.find(
                (p) => p.nombre === item.comida || p.nombre === item.bebida
              )?.precio || 0) * item.cantidad}
              )
            </p>
          ))}
          <p className="mt-2 font-bold">Total: ${total}</p>
        </div>
      </div>
    </div>
  );
}
