import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tipo = url.searchParams.get("tipo");

    if (!tipo) {
      return NextResponse.json({ error: "Tipo no especificado" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo]) {
      return NextResponse.json([], { status: 200 });
    }

    // Aseguramos que cada producto venga con su categoría
    const categoriasConProductos = doc[tipo].flatMap((cat: any) =>
      cat.productos.map((producto: any) => ({
        ...producto,
        categoria: cat.nombre,
      }))
    );

    return NextResponse.json(categoriasConProductos);
  } catch (error) {
    console.error("Error al listar productos:", error);
    return NextResponse.json({ error: "Error al listar productos" }, { status: 500 });
  }
}
