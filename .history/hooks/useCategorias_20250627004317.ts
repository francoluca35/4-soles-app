import { useEffect, useState } from 'react';

export default function useCategorias() {
  const [categoriasComida, setCategoriasComida] = useState<string[]>([]);
  const [categoriasHelado, setCategoriasHelado] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await fetch('/api/menu'); // o el path que uses
        const data = await res.json();
        if (res.ok) {
          setCategoriasComida(data.comidas);
          setCategoriasHelado(data.helados);
        } else {
          console.error('Error al obtener categorías:', data.error);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    }

    fetchCategorias();
  }, []);

  return { categoriasComida, categoriasHelado };
}
