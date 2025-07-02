interface Props {
  onClick: () => void;
}

export default function GuardarButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full w-full"
    >
      Guardar Producto
    </button>
  );
}
