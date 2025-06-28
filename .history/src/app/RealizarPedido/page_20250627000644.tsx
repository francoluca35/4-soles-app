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

      <h2 className="text-lg relative z-10 mb-4">Pedidos/Delivery</h2>

      <div className="relative z-10 flex flex-col lg:flex-row gap-4 w-full max-w-6xl">
        {/* Selector de productos */}
        <div className="bg-neutral-900 p-4 rounded-lg flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="w-full rounded-full p-2 text-black mb-4"
          />

          {/* Grid de productos */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-300 rounded-lg h-20" />
            <div className="bg-gray-300 rounded-lg h-20" />
            <div className="bg-gray-300 rounded-lg h-20" />
            <div className="bg-gray-300 rounded-lg h-20" />
          </div>

          <button className="bg-white text-black px-4 py-2 rounded">
            Enviar Pedido
          </button>
        </div>

        {/* Categorías */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button className="bg-yellow-400 px-6 py-2 rounded">Helados</button>
          <button className="bg-gray-300 px-6 py-2 rounded">Comidas</button>
        </div>

        {/* Formulario de pedido */}
        <div className="bg-neutral-900 p-4 rounded-lg flex-1 max-w-md">
          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full p-2 rounded mb-2 text-black"
          />
          <input
            type="text"
            placeholder="Telefono"
            className="w-full p-2 rounded mb-2 text-black"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="w-full p-2 rounded mb-2 text-black"
          />
          <input
            type="text"
            placeholder="Forma de pago"
            className="w-full p-2 rounded mb-4 text-black"
          />

          <div className="text-sm">
            <p className="font-bold underline">Pedidos</p>
            <p>+ Pollo (comida) $5000</p>
            <p>+ Helado de crema (helado) $7000</p>
            <p className="mt-2 font-semibold">
              Total: <span className="float-right">$12000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
