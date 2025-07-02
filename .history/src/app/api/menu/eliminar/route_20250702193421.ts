import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { id, tipo, categoria } = await req.json();

    if (!id || !tipo || !categoria) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("4-soles");
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo] || !doc[tipo][categoria]) {
      return NextResponse.json({ error: "Tipo o categoría no encontrada" }, { status: 404 });
    }

    const nuevaLista = doc[tipo][categoria].filter((p: any) => p._id !== id);

    await collection.updateOne(
      {},
      { $set: { [`${tipo}.${categoria}`]: nuevaLista } }
    );

    return NextResponse.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
