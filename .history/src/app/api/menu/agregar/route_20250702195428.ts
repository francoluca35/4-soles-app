import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = '4soles';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { tipo, categoria, producto }
    const { tipo, categoria, producto } = body;

    if (!tipo || !categoria || !producto) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // Asignar _id único
    const productoConId = {
      ...producto,
      _id: new ObjectId().toString(),
    };

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('menus');


    const result = await collection.updateOne(
      {},
      { $push: { [`${tipo}.${categoria}`]: productoConId } }
    );

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount,
      mensaje: 'Producto agregado correctamente',
    });
    
  } catch (error) {
    console.error('Error al agregar producto:', error);
    return NextResponse.json({ error: 'Error al agregar producto' }, { status: 500 });
  } finally {
    await client.close();
  }
}
