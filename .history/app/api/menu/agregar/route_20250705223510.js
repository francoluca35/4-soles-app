import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const nombre = formData.get("nombre");
    const tipo = formData.get("tipo"); // "comida", "bebida", "helado"
    const precio = parseFloat(formData.get("precio"));
    const descuento = formData.get("descuento");
    const categoria = formData.get("categoria"); // subcategoría real
    const adicionalesStr = formData.get("adicionales") || "[]";
    const alcohol = formData.get("alcohol");

    if (!file || !nombre || !tipo || isNaN(precio) || !categoria) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const adicionales = JSON.parse(adicionalesStr);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString(
      "base64"
    )}`;

    const uploadResult = await cloudinary.uploader.upload(base64String, {
      folder: "menus",
    });

    const nuevoProducto = {
      _id: new ObjectId(),
      nombre,
      precio,
      imagen: uploadResult.secure_url,
      categoria,
      ...(descuento ? { descuento: parseFloat(descuento) } : {}),
      ...(adicionales.length > 0 ? { adicionales } : {}),
      ...(tipo === "bebida" ? { alcohol: alcohol === "true" } : {}),
    };

    const client = await clientPromise;
    const db = client.db("4soles");

    const path = `${tipo === "helado" ? "helados" : "comidas"}.${categoria}`;

    const result = await db
      .collection("menus")
      .updateOne({}, { $push: { [path]: nuevoProducto } });

    return NextResponse.json(
      { message: "Producto agregado correctamente", id: nuevoProducto._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error al agregar producto:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
