import ClientRow from "./ClientRow";
import GenerateExcelButton from "./GenerateExcelButton";

const data = [
  {
    fecha: "08/07/25",
    dia: "$300000",
    clientes: "-$200000",
    ganancias: "+$100000",
  },
  {
    fecha: "08/07/25",
    dia: "$200000",
    clientes: "-$300000",
    ganancias: "-$100000",
  },
  // Más filas...
];

export default function ClientTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-black text-xs sm:text-base">
        <thead>
          <tr className="bg-slate-400/40">
            <th className="border border-black px-2 sm:px-4 py-2">Fechas</th>
            <th className="border border-black px-2 sm:px-4 py-2">Día</th>
            <th className="border border-black px-2 sm:px-4 py-2">Clientes</th>
            <th className="border border-black px-2 sm:px-4 py-2">Ganancias</th>
            <th className="border border-black px-2 sm:px-4 py-2">Informes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <ClientRow key={idx} {...row} />
          ))}
          {Array.from({ length: 6 - data.length }).map((_, idx) => (
            <tr key={idx + data.length}>
              <td className="border border-black px-2 sm:px-4 py-2">&nbsp;</td>
              <td className="border border-black px-2 sm:px-4 py-2"></td>
              <td className="border border-black px-2 sm:px-4 py-2"></td>
              <td className="border border-black px-2 sm:px-4 py-2"></td>
              <td className="border border-black px-2 sm:px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <GenerateExcelButton />
      </div>
    </div>
  );
}
