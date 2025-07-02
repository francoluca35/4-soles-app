import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { id, tipo, categoria, producto } = await req.json();

    if (!id || !tipo || !categoria || !producto) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo] || !doc[tipo][categoria]) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    const nuevaLista = doc[tipo][categoria].map((p: any) =>
      p._id === id ? { ...p, ...producto } : p
    );

    doc[tipo][categoria] = nuevaLista;

    await collection.updateOne({}, { $set: { [`${tipo}.${categoria}`]: nuevaLista } });

    return NextResponse.json({ message: "Producto actualizado" });
  } catch (err) {
    console.error("Error al editar producto:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tipo = url.searchParams.get("tipo"); // comidas o helados

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

    // Combinar productos con su categoría
    const categoriasConProductos = Object.entries(doc[tipo]).flatMap(
      ([nombreCategoria, productos]: [string, any[]]) =>
        productos.map((producto) => ({
          ...producto,
          categoria: nombreCategoria,
        }))
    );

    return NextResponse.json(categoriasConProductos);
  } catch (error) {
    console.error("Error al listar productos:", error);
    return NextResponse.json({ error: "Error al listar productos" }, { status: 500 });
  }
}
