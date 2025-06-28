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
    <div className="min-h-screen bg-[#852123] relative px-4 py-6 text-white">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src={logo} alt="Fondo 4 Soles" width={600} height={600} className="object-contain" />
      </div>

      <div className="relative z-10 text-sm sm:text-base font-light pl-2">4 Soles, {fecha}</div>
      <div className="relative z-10 flex justify-end pr-4">
        <div className="text-2xl cursor-pointer">☰</div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center mt-4 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <PanelBoton texto="Clientes" />
          <PanelBoton texto="Cuentas" />
          <PanelBoton texto="H. Pedidos" />
          <PanelBoton texto="Agregar Comidas/helados" />
        </div>
        <PanelBoton texto="Realizar Pedidos" grande />
      </div>
    </div>
  );
}
