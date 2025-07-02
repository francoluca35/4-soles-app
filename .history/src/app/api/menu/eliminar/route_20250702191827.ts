import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { id, tipo, categoria } = await req.json();

    const client = await clientPromise;
    const db = client.db("4-soles");
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo]) {
      return NextResponse.json({ error: "Tipo no encontrado" }, { status: 400 });
    }

    const nuevasCategorias = doc[tipo].map((cat: any) => {
      if (cat.nombre === categoria) {
        const productosFiltrados = cat.productos.filter((p: any) => p._id !== id);
        return { ...cat, productos: productosFiltrados };
      }
      return cat;
    });

    await collection.updateOne({}, { $set: { [tipo]: nuevasCategorias } });

    return NextResponse.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
