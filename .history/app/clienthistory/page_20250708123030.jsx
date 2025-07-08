import ClientTable from "./components/ClientTable";
import Image from "next/image";

export default function ClientHistory() {
  return (
    <div className="min-h-screen relative bg-[#8e1f1f] p-6 text-white flex flex-col items-center justify-center">
      {/* Fondo logo centrado y translúcido */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/Assets/4-soles-logo.jpg"
          alt="4Soles Logo"
          width={500}
          height={500}
          className="opacity-30 rounded-full"
        />
      </div>
      {/* Contenido principal por encima */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Historial de clientes
        </h1>
        <div className="bg-[#deb18f] p-8 rounded-lg shadow-lg">
          <ClientTable />
        </div>
      </div>
    </div>
  );
}
