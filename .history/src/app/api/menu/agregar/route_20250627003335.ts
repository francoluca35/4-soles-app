// app/api/menu/agregar/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = '4soles';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { tipo, categoria, producto }
    const { tipo, categoria, producto } = body;

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('menus');

    // Siempre edita el primer documento
    const result = await collection.updateOne(
      {},
      { $push: { [`${tipo}.${categoria}`]: producto } }
    );

    return NextResponse.json({ success: true, updated: result.modifiedCount });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    return NextResponse.json({ error: 'Error al agregar producto' }, { status: 500 });
  } finally {
    await client.close();
  }
}
