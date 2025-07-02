interface Props {
  tipo: string;
  setTipo: (value: string) => void;
  setCategoria: (value: string) => void;
}

export default function TipoSelector({ tipo, setTipo, setCategoria }: Props) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <button
        className={`px-4 py-1 rounded-full font-bold ${
          tipo === "comidas"
            ? "bg-white text-black"
            : "bg-yellow-600 text-white"
        }`}
        onClick={() => {
          setTipo("comidas");
          setCategoria("");
        }}
      >
        COMIDAS
      </button>
      <button
        className={`px-4 py-1 rounded-full font-bold ${
          tipo === "comidas"
            ? "bg-yellow-600 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => {
          setTipo("comidas");
          setCategoria("");
        }}
      >
        HELADOS
      </button>
    </div>
  );
}
