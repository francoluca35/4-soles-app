export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen?: string;
  descuento?: number;
  adicionales?: string[];
  // Si querés permitir claves flexibles:
  [key: string]: string | number | string[] | undefined; // ✅ Mejor tipado
}
