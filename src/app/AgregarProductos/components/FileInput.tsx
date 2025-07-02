// components/FileInput.tsx
import React from "react";

interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewURL: string;
}

export default function FileInput({ handleFileChange, previewURL }: Props) {
  return (
    <div className="my-4">
      <label className="block mb-1">Imagen del producto</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      {previewURL && (
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden rounded-md border mt-2"
          style={{ maxWidth: "200px" }}
        >
          <img
            key={previewURL} // esto fuerza el re-render con fade
            src={previewURL}
            alt="Vista previa"
            className="w-full h-auto object-cover rounded shadow-md opacity-100 transition-opacity duration-500"
          />
        </div>
      )}
    </div>
  );
}
