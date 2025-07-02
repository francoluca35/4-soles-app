// app/api/menu/listar/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tipo = url.searchParams.get("tipo"); // comidas o helados

    if (!tipo) {
      return NextResponse.json({ error: "Tipo no especificado" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("4-soles"); // asegurate de que coincida
    const collection = db.collection("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo]) {
      return NextResponse.json([], { status: 200 });
    }

    // Agregamos el campo `categoria` dentro de cada producto para que sepa de dónde vino
    const categoriasConProductos = doc[tipo].flatMap((cat: any) =>
      cat.productos.map((producto: any) => ({
        ...producto,
        categoria: cat.nombre, // ⚠️ importante para el formulario
      }))
    );

    return NextResponse.json(categoriasConProductos);
  } catch (error) {
    console.error("Error al listar productos:", error);
    return NextResponse.json({ error: "Error al listar productos" }, { status: 500 });
  }
}
