import { useEffect, useState } from 'react';

export default function useCategorias() {
    const [categoriasComida, setCategoriasComida] = useState<string[]>([]);
    const [categoriasHelado, setCategoriasHelado] = useState<string[]>([]);
    
    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const res = await fetch("/api/menu/categorias");
          const data = await res.json();
          if (res.ok) {
            setCategoriasComida(Object.keys(data.comidas || {}));
            setCategoriasHelado(Object.keys(data.helados || {}));
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
