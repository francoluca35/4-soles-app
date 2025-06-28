"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/Assets/4-soles-logo.jpg";

export default function RealizarPedido() {
  const [producto, setProducto] = useState("");

  return (
    <div className="min-h-screen bg-[#852123] flex flex-col items-center justify-center px-4 py-6 text-white relative">
      {/* Logo de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image
          src={logo}
          alt="Fondo 4 Soles"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      <h2 className="text-xl font-semibold relative z-10 mb-6">
        Pedidos / Delivery
      </h2>

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Selector de productos */}
        <div className="bg-neutral-900 p-6 rounded-xl flex-1 max-w-md shadow-lg">
          <input
            type="text"
            placeholder="Buscar Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="w-full rounded-full px-4 py-2 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Grid de productos */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 rounded-lg h-20 hover:scale-105 transition-transform"
              />
            ))}
          </div>

          <button className="bg-white text-black font-bold w-full py-2 rounded-full hover:bg-yellow-300 transition-colors">
            Enviar Pedido
          </button>
        </div>

        {/* Categorías */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button className="bg-yellow-400 text-black font-bold w-32 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-colors">
            Helados
          </button>
          <button className="bg-gray-300 text-black font-bold w-32 py-2 rounded-full shadow-md hover:bg-gray-200 transition-colors">
            Comidas
          </button>
        </div>

        {/* Formulario de pedido */}
        <div className="bg-neutral-900 p-6 rounded-xl flex-1 max-w-md shadow-lg">
          {["Nombre Completo", "Teléfono", "Dirección", "Forma de pago"].map(
            (placeholder, i) => (
              <input
                key={i}
                type="text"
                placeholder={placeholder}
                className="w-full p-2 rounded mb-3 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            )
          )}

          <div className="text-sm bg-neutral-800 p-3 rounded mt-4">
            <p className="font-bold underline mb-2">Pedidos</p>
            <p>
              + Pollo (comida) <span className="float-right">$5000</span>
            </p>
            <p>
              + Helado de crema (helado){" "}
              <span className="float-right">$7000</span>
            </p>
            <hr className="my-2 border-gray-600" />
            <p className="mt-2 font-semibold">
              Total: <span className="float-right">$12000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
