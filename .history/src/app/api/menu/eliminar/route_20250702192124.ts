import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

interface Categoria {
  nombre: string;
  productos: Producto[];
}

interface MenuDocumento {
  [key: string]: Categoria[];
}

export async function POST(req: Request) {
  try {
    const { id, tipo, categoria } = await req.json();

    if (!id || !tipo || !categoria) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("4-soles");
    const collection = db.collection<MenuDocumento>("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo]) {
      return NextResponse.json({ error: "Tipo no encontrado" }, { status: 400 });
    }

    const nuevasCategorias = doc[tipo].map((cat: Categoria) => {
      if (cat.nombre === categoria) {
        const productosFiltrados = cat.productos.filter((p: Producto) => p._id !== id);
        return { ...cat, productos: productosFiltrados };
      }
      return cat;
    });

    await collection.updateOne({}, { $set: { [tipo]: nuevasCategorias } });

    return NextResponse.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
