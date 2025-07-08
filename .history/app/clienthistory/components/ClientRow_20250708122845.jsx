export default function ClientRow({ fecha, dia, clientes, ganancias }) {
  return (
    <tr>
      <td className="border border-black px-4 py-2 font-medium">{fecha}</td>
      <td className="border border-black px-4 py-2">{dia}</td>
      <td className="border border-black px-4 py-2">{clientes}</td>
      <td className="border border-black px-4 py-2">{ganancias}</td>
      <td className="border border-black px-4 py-2">
        <button className="bg-transparent text-blue-900 underline hover:text-blue-600">
          Ver Info
        </button>
      </td>
    </tr>
  );
}
