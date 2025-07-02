interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewURL: string;
}

export default function FileInput({ handleFileChange, previewURL }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm">Imagen del producto</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full bg-transparent border-b-2 border-orange-300 text-white"
      />
      {previewURL && (
        <img
          src={previewURL}
          alt="Vista previa"
          className="w-24 h-24 object-cover rounded mx-auto mt-2"
        />
      )}
    </div>
  );
}
