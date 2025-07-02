import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { ids, tipo, categoria } = await req.json();

    if (!ids || !Array.isArray(ids) || !tipo || !categoria) {
      return NextResponse.json({ error: "Faltan datos o ids inválidos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo] || !doc[tipo][categoria]) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    // Filtrar los productos y eliminar los que estén en la lista de IDs
    const nuevaLista = doc[tipo][categoria].filter(
      (p: any) => !ids.includes(p._id)
    );

    // Actualizar la subcategoría con la nueva lista
    await collection.updateOne({}, {
      $set: {
        [`${tipo}.${categoria}`]: nuevaLista
      }
    });

    return NextResponse.json({ success: true, eliminados: ids.length });
  } catch (error) {
    console.error("Error al eliminar múltiples productos:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
