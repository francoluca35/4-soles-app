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
    const { id, tipo, categoria, producto } = await req.json();

    if (!id || !tipo || !categoria || !producto) {
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
        const nuevosProductos = cat.productos.map((p: Producto) =>
          p._id === id ? { ...producto, _id: id } : p
        );
        return { ...cat, productos: nuevosProductos };
      }
      return cat;
    });

    await collection.updateOne({}, { $set: { [tipo]: nuevasCategorias } });

    return NextResponse.json({ mensaje: "Producto editado correctamente" });
  } catch (error) {
    console.error("Error en editar producto:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
