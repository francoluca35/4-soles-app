// hooks/useAgregarProducto.ts
export const useAgregarProducto = () => {
    const agregarProducto = async (
      tipo: 'comidas' | 'helados',
      categoria: string,
      producto: { nombre: string; precio: number }
    ) => {
      try {
        const res = await fetch('/api/menu/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo, categoria, producto }),
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error desconocido');
        return data;
      }catch (err) {
        console.error(err);
        if (err instanceof Error) {
          return { error: err.message };
        }
        return { error: "Ocurrió un error desconocido" };
      }
      
    };
  
    return { agregarProducto };
  };
  