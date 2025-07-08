import BackArrow from "../components/ui/BackArrow";
import ClientTable from "./components/ClientTable";
import Image from "next/image";

export default function ClientHistory() {
  return (
    <div className="min-h-screen relative bg-[#8e1f1f] p-2 sm:p-6 text-white flex flex-col items-center justify-center">
      <div className="w-full mb-4 sm:mb-9 -mt-6 sm:-mt-32"></div>
      {/* Fondo con logo */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/Assets/4-soles-logo.jpg"
          alt="4Soles Logo"
          width={300}
          height={300}
          className="opacity-30 rounded-full sm:w-[500px] sm:h-[500px] w-[200px] h-[200px]"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full mb-4 sm:mb-9 -mt-6 sm:-mt-32 ">
          <BackArrow label="Volver al panel" />
        </div>
        <h1 className="text-xl sm:text-3xl font-bold text-white mb-6 text-center">
          Historial de clientes
        </h1>{" "}
        <div className="bg-[#dea88f94] p-2 sm:p-8 rounded-lg shadow-lg w-full max-w-[99vw] sm:max-w-2xl">
          <ClientTable />
        </div>
      </div>
    </div>
  );
}
