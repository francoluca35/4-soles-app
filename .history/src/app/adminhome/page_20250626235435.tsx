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
      {/* Logo fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src={logo} alt="Fondo 4 Soles" width={600} height={600} className="object-contain" />
      </div>

      {/* Fecha y menú */}
      <div className="relative z-10 text-sm sm:text-base font-light pl-2">4 Soles, {fecha}</div>
      <div className="relative z-10 flex justify-end pr-4 mb-4">
        <div className="text-2xl cursor-pointer">☰</div>
      </div>

      {/* Centro del panel */}
      <div className="relative z-10 w-full h-[420px] max-w-md mx-auto mt-6">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Botón central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <PanelBoton texto="Realizar Pedidos" grande />
          </div>

          {/* Arriba */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <PanelBoton texto="Clientes" />
          </div>

          {/* Abajo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <PanelBoton texto="H. Pedidos" />
          </div>

          {/* Izquierda */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <PanelBoton texto="Cuentas" />
          </div>

          {/* Derecha */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <PanelBoton texto="Agregar Comidas/helados" />
          </div>
        </div>
      </div>
    </div>
  );
}
