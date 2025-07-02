import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "4soles";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get("tipo");

    if (!tipo || (tipo !== "comidas" && tipo !== "helados")) {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("menus");

    const documento = await collection.findOne({});
    const datos = documento?.[tipo];

    if (!datos || typeof datos !== "object") {
      return NextResponse.json([]);
    }

    // Recorrer todas las categorías y aplanarlas
    const productos = Object.entries(datos).flatMap(
      ([categoria, productos]: [string, unknown]) => {
        if (!Array.isArray(productos)) return [];

        productos.map((p: Record<string, any>, i: number) => ({

          ...p,
          _id: `${tipo}-${categoria}-${i}`,
          tipo,
          categoria,
          index: i,
        }));
      }
    );

    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error al listar productos:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  } finally {
    await client.close();
  }
}
