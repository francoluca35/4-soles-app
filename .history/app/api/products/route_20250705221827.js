// app/api/products/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("4soles");

  const menu = await db.collection("menus").findOne(); // Solo hay uno

  const resultado = [];

  if (menu?.comidas) {
    for (const categoria in menu.comidas) {
      const items = menu.comidas[categoria];
      for (const item of items) {
        resultado.push({
          ...item,
          tipo: "comida",
          categoria,
        });
      }
    }
  }

  if (menu?.helados) {
    for (const categoria in menu.helados) {
      const items = menu.helados[categoria];
      for (const item of items) {
        resultado.push({
          ...item,
          tipo: "helado",
          categoria,
        });
      }
    }
  }

  return NextResponse.json(resultado);
}
