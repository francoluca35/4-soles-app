import { useEffect, useState } from "react";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProductos(data);
    setBebidas(data.filter((item) => item.tipo === "bebida")); // por si más adelante agregás bebidas
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { productos, bebidas, refetch: fetchData };
}
