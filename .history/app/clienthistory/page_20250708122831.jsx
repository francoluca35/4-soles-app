import ClientTable from "./components/ClientTable";

export default function ClientHistory() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#912929]">
      <h1 className="text-3xl font-bold text-white mb-6">
        Historial de clientes
      </h1>
      <div className="bg-[#deb18f] p-8 rounded-lg shadow-lg">
        <ClientTable />
      </div>
    </div>
  );
}
