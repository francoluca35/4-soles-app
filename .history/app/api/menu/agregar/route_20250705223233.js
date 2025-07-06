import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

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
    const tipo = formData.get("tipo");
    const precio = parseFloat(formData.get("precio"));
    const descuento = formData.get("descuento");
    const adicionalesStr = formData.get("adicionales");
    const alcohol = formData.get("alcohol");
    const categoria = formData.get("categoria");

    if (!nombre || !tipo || isNaN(precio)) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const adicionales = adicionalesStr ? JSON.parse(adicionalesStr) : [];

    let imagen = null;
    if (file && typeof file.arrayBuffer === "function") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadResult = await cloudinary.uploader.upload(base64String, {
        folder: "menus",
      });
      imagen = uploadResult.secure_url;
    }

    const client = await clientPromise;
    const db = client.db("4soles");

    const nuevoMenu = {
      nombre,
      tipo,
      precio,
      descuento: descuento ? parseFloat(descuento) : undefined,
      adicionales,
      imagen,
      creado: new Date(),
    };

    if (tipo === "bebida") {
      nuevoMenu.categoria = categoria; // con alcohol, sin alcohol, frutales, licuados
      nuevoMenu.alcohol = alcohol === "true";
    } else if (tipo === "comida" || tipo === "helado") {
      nuevoMenu.categoria = categoria; // ej: bombones, cremas, empanadas, etc.
    }

    const result = await db.collection("menus").insertOne(nuevoMenu);

    return NextResponse.json(
      { message: "Menú agregado correctamente", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error al agregar menú:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
