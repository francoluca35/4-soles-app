import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import cloudinary from "@/lib/cloudinary";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "4soles";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const [tipo, categoria, indexStr] = id.split("-");
    const index = parseInt(indexStr);

    const body = await req.json(); // { nombre, precio, imagen, categoria }

    if (!tipo || !categoria || isNaN(index)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("menus");

    // Construye el path exacto: comidas.postres.2
    const pathBase = `${tipo}.${categoria}.${index}`;
    const update: {
        [key: string]: string | number | undefined;
      } = {};
      

    if (body.nombre) update[`${pathBase}.nombre`] = body.nombre;
    if (body.precio) update[`${pathBase}.precio`] = body.precio;
    if (body.imagen) update[`${pathBase}.imagen`] = body.imagen;
    if (body.categoria) update[`${pathBase}.categoria`] = body.categoria;

      
      
      // Obtener la imagen anterior
const doc = await collection.findOne({});
const oldImage = doc?.[tipo]?.[categoria]?.[index]?.imagen || "";

// Si se subió una imagen nueva, eliminar la anterior
if (body.imagen && oldImage && oldImage !== body.imagen) {
  const publicId = oldImage.split("/").pop()?.split(".")[0]; // extrae "nombreArchivo" de la URL
  const fullPath = `productos_4soles/${publicId}`;
  await cloudinary.uploader.destroy(fullPath);
}

      
    const result = await collection.updateOne({}, { $set: update });

    return NextResponse.json({ success: true, modified: result.modifiedCount });
  } catch (error) {
    console.error("Error al editar producto:", error);
    return NextResponse.json({ error: "Error al editar producto" }, { status: 500 });
  } finally {
    await client.close();
  }
}
