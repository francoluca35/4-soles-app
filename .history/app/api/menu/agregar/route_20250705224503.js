import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, precio, imagen, tipo, categoria } = body;

    // Validación básica
    if (!nombre || !precio || !imagen || !tipo || !categoria) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    // Crear nuevo producto
    const nuevoProducto = {
      _id: new ObjectId(),
      nombre,
      precio,
      imagen,
      categoria,
    };

    // Agregar campo extra en bebidas
    if (tipo === "bebidas") {
      nuevoProducto.alcohol = categoria === "con alcohol";
    }

    // Conexión a MongoDB
    const client = await clientPromise;
    const db = client.db("4soles");

    // Insertar en la subcategoría correcta
    const resultado = await db.collection("menus").updateOne(
      {},
      {
        $push: {
          [`${tipo}.${categoria}`]: nuevoProducto,
        },
      },
      { upsert: true }
    );

    if (resultado.modifiedCount === 0 && resultado.upsertedCount === 0) {
      return NextResponse.json(
        { error: "No se insertó el producto" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      mensaje: `Producto guardado en ${tipo} → ${categoria}`,
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("🔥 Error al agregar producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
