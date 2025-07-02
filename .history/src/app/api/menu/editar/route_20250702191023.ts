import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { id, tipo, categoria, producto } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB!); // <- asegurate de tenerlo en .env
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo]) {
      return NextResponse.json({ error: "Tipo no encontrado" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nuevos = doc[tipo].map((cat: any) => {
      if (cat.nombre === categoria) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cat.productos = cat.productos.map((p: any) =>
          p._id === id || p._id?.toString() === id
            ? { ...p, ...producto, _id: p._id }
            : p
        );
      }
      return cat;
    });

    await collection.updateOne({}, { $set: { [tipo]: nuevos } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al editar producto:", error);
    return NextResponse.json({ error: "Error al editar producto" }, { status: 500 });
  }
}
