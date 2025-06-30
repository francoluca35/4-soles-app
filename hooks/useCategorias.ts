import { useEffect, useState } from "react";

export default function useCategorias() {
  const [categoriasComida, setCategoriasComida] = useState<string[]>([]);
  const [categoriasHelado, setCategoriasHelado] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("/api/menu/categorias");
        const data = await res.json();

        if (res.ok) {
          setCategoriasComida(data.comidas || []);
          setCategoriasHelado(data.helados || []);
        }
      } catch (err) {
        console.error("Error cargando categorías", err);
      }
    };

    fetchCategorias();
  }, []);

  return { categoriasComida, categoriasHelado };
}
