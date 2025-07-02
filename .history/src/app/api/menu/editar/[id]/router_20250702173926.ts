import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "4soles";

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
    const update: any = {};

    if (body.nombre) update[`${pathBase}.nombre`] = body.nombre;
    if (body.precio) update[`${pathBase}.precio`] = body.precio;
    if (body.imagen) update[`${pathBase}.imagen`] = body.imagen;
    if (body.categoria) update[`${pathBase}.categoria`] = body.categoria;

    const result = await collection.updateOne({}, { $set: update });

    return NextResponse.json({ success: true, modified: result.modifiedCount });
  } catch (error) {
    console.error("Error al editar producto:", error);
    return NextResponse.json({ error: "Error al editar producto" }, { status: 500 });
  } finally {
    await client.close();
  }
}
