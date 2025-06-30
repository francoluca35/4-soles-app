"use client";
import { useEffect, useState } from "react";
import PanelBoton from "../components/ui/PanelBoton";
import Image from "next/image";
import logo from "../../../public/Assets/4-soles-logo.jpg";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const [fecha, setFecha] = useState("");
  const router = useRouter();
  useEffect(() => {
    const hoy = new Date();
    setFecha(hoy.toLocaleDateString("es-AR"));
  }, []);

  return (
    <div className="min-h-screen bg-[#852123] relative px-4 py-6 text-white overflow-hidden">
      {/* Logo fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image
          src={logo}
          alt="Fondo 4 Soles"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      {/* Fecha y menú */}
      <div className="relative z-10 text-sm sm:text-base font-light pl-2">
        4 Soles, {fecha}
      </div>
      <div className="relative z-10 flex justify-end pr-4 mb-4">
        <div className="text-2xl cursor-pointer">☰</div>
      </div>

      {/* Panel de botones centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        {/* Fila 1 */}
        <div className="flex gap-4">
          <PanelBoton texto="A. Comidas" />
          <PanelBoton texto="H. Pedidos" />
        </div>

        {/* Fila 2 */}
        <div className="flex gap-4">
          <PanelBoton texto="Clientes" />
          <PanelBoton texto="Cuentas" />
        </div>

        {/* Botón inferior con ancho moderado */}
        <div className="w-64">
          <div onClick={() => router.push("/RealizarPedido")}>
            <PanelBoton texto="Realizar Pedidos" full />
          </div>
        </div>
      </div>
    </div>
  );
}
