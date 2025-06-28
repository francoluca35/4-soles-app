'use client';
import { useEffect, useState } from 'react';
import PanelBoton from '../components/ui/PanelBoton';
import Image from 'next/image';
import logo from '../../../public/Assets/4-soles-logo.jpg';

export default function AdminHome() {
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const hoy = new Date();
    setFecha(hoy.toLocaleDateString('es-AR'));
  }, []);

  return (
    <div className="min-h-screen bg-[#852123] relative px-4 py-6 text-white overflow-hidden">
    {/* Fondo con logo */}
    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
      <Image src={logo} alt="Fondo 4 Soles" width={600} height={600} className="object-contain" />
    </div>

    {/* Fecha y menú */}
    <div className="relative z-10 text-sm sm:text-base font-light pl-2">4 Soles, {fecha}</div>
    <div className="relative z-10 flex justify-end pr-4 mb-4">
      <div className="text-2xl cursor-pointer">☰</div>
    </div>

    {/* Panel circular */}
    <div className="relative z-10 w-[350px] h-[350px] mx-auto mt-6">
      {/* Botón central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <PanelBoton texto="Realizar Pedidos" grande />
      </div>

      {/* Clientes (arriba izquierda) */}
      <div className="absolute -left-[30%] top-[10%]">
        <PanelBoton texto="Clientes" />
      </div>

      {/* Cuentas (arriba derecha) */}
      <div className="absolute right-[20%] top-[10%]">
        <PanelBoton texto="Cuentas" />
      </div>

      {/* H. Pedidos (abajo izquierda) */}
      <div className="absolute left-[15%] bottom-[10%]">
        <PanelBoton texto="H. Pedidos" />
      </div>

      {/* Agregar (abajo derecha) */}
      <div className="absolute right-[10%] bottom-[10%]">
        <PanelBoton texto="Agregar Comidas/helados" />
      </div>
    </div>
  </div>
);
}