export default function ClientRow({ fecha, dia, clientes, ganancias }) {
  return (
    <tr>
      <td className="border border-black px-2 sm:px-4 py-2">{fecha}</td>
      <td className="border border-black px-2 sm:px-4 py-2">{dia}</td>
      <td className="border border-black px-2 sm:px-4 py-2">{clientes}</td>
      <td className="border border-black px-2 sm:px-4 py-2">{ganancias}</td>
      <td className="border border-black px-2 sm:px-4 py-2">
        <button className="text-blue-700 underline hover:text-blue-900">
          Ver Info
        </button>
      </td>
    </tr>
  );
}
