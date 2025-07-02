import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "productos_4soles",
    });

    return NextResponse.json({ 
      url: result.secure_url, 
      public_id: result.public_id 
    });
  } catch (err) {
    console.error("Error Cloudinary:", err);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}
