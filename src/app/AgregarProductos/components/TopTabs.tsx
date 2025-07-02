interface Props {
  modo: "agregar" | "editar";
  setModo: (modo: "agregar" | "editar") => void;
}

export default function TopTabs({ modo, setModo }: Props) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <button
        onClick={() => setModo("agregar")}
        className={`px-4 py-1 rounded-full font-semibold ${
          modo === "agregar"
            ? "bg-orange-600 text-white"
            : "bg-white text-black"
        }`}
      >
        AGREGAR PRODUCTO
      </button>
      <button
        onClick={() => setModo("editar")}
        className={`px-4 py-1 rounded-full font-semibold ${
          modo === "editar" ? "bg-orange-600 text-white" : "bg-white text-black"
        }`}
      >
        EDITAR PRODUCTO
      </button>
    </div>
  );
}
