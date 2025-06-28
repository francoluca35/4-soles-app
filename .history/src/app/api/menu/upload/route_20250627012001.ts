// app/api/menu/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary config directo para evitar problemas de entorno (solo para test)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

  const [fields, files] = await new Promise<any[]>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        console.error("❌ Error al parsear form", err);
        reject(err);
      } else {
        resolve([fields, files]);
      }
    });
  });

  const file = files.file;

  if (!file) {
    return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "productos_4soles",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("❌ Error al subir a Cloudinary:", error);
    return NextResponse.json({ error: "Fallo la subida" }, { status: 500 });
  }
}
