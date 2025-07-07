"use client";

import { useState } from "react";
import BackArrow from "@/app/components/ui/BackArrow";
import DeliveryForm from "./DeliveryForm";
import RestauranteForm from "./RestauranteForm";
import Image from "next/image";

export default function Pedidos() {
  const [modoPedido, setModoPedido] = useState("delivery");

  return (
    <div className="min-h-screen relative bg-[#8e1f1f] text-white px-4 py-8 flex items-center justify-center">
      {/* Fondo con logo */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/Assets/4-soles-logo.jpg"
          alt="4Soles Logo"
          width={300}
          height={300}
          className="opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mb-4">
        <div className="mb-4">
          <BackArrow label="Volver al panel" />
        </div>

        <h2 className="text-center text-2xl font-bold text-white mb-6">
          🍽 Pedidos
        </h2>

        {/* Formulario según modo */}
        <div className="relative">
          <DeliveryForm />
        </div>
      </div>
    </div>
  );
}
