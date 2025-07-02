import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria?: string;
}

type Categoria = Producto[];

type MenuTipo = {
  [categoria: string]: Categoria;
};

interface MenuDocumento {
  [tipo: string]: MenuTipo;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, tipo, categoria, producto }: { id: string; tipo: string; categoria: string; producto: Producto } = body;

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

    const nuevaLista: Producto[] = doc[tipo][categoria].map((p: Producto) =>
      p._id === id ? { ...p, ...producto } : p
    );

    await collection.updateOne({}, {
      $set: {
        [`${tipo}.${categoria}`]: nuevaLista
      }
    });

    return NextResponse.json({ message: "Producto actualizado correctamente" });

  } catch (err) {
    console.error("Error al editar producto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
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
    const collection = db.collection<MenuDocumento>("menus");

    const doc = await collection.findOne({});
    if (!doc || !doc[tipo]) {
      return NextResponse.json([], { status: 200 });
    }

    const productos = Object.entries(doc[tipo]).flatMap(
      ([nombreCategoria, items]) =>
        (items as Producto[]).map((p) => ({ ...p, categoria: nombreCategoria }))
    );

    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error al listar productos:", error);
    return NextResponse.json({ error: "Error al listar productos" }, { status: 500 });
  }
}
