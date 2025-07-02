// /app/api/menu/listar/route.ts
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


    interface Producto {
      _id: string;
      nombre: string;
      precio: number;
      imagen?: string;
    }
    
    type CategoriaProductos = {
      [key: string]: Producto[];
    };
    
    
    const tipoSafe = tipo as keyof typeof doc;
    
    const categoriasConProductos = Object.entries(doc[tipoSafe] as CategoriaProductos).flatMap(([nombreCategoria, productos]) =>

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
