interface Props {
  categoria: string;
  setCategoria: (value: string) => void;
  categorias: string[];
}

export default function CategoriaSelector({
  categoria,
  setCategoria,
  categorias,
}: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm">Categoría del producto</label>
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full bg-transparent border-b-2 border-orange-300 text-white"
      >
        <option value="">Seleccione la categoría</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat} className="text-black">
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
