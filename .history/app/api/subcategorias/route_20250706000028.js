import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("4soles");

    const menus = await db.collection("menus").findOne({});
    if (!menus)
      return NextResponse.json({ error: "No hay datos" }, { status: 404 });

    const subcategorias = {
      comidas: Object.keys(menus.comidas || {}),
      bebidas: Object.keys(menus.bebidas || {}),
      helados: Object.keys(menus.helados || {}),
    };

    return NextResponse.json(subcategorias);
  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
