// src/app/api/menu/listar/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tipo = url.searchParams.get("tipo");

    if (!tipo) {
      return NextResponse.json({ error: "Falta parámetro tipo" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB as string);
    const collection = db.collection("menus");

    const doc = await collection.findOne({});

    if (!doc || !doc[tipo]) {
      return NextResponse.json([], { status: 200 });
    }

    const categorias = Object.values(doc[tipo]).flat();
    return NextResponse.json(categorias);
  } catch (err) {
    console.error("Error al listar:", err);
    return NextResponse.json({ error: "Error al listar productos" }, { status: 500 });
  }
}
