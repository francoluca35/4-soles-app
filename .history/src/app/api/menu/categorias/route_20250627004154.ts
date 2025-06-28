import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = '4soles';

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('menus');

    const documento = await collection.findOne({});

    if (!documento || typeof documento !== 'object') {
      return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });
    }

    const comidasObj = documento.comidas || {};
    const heladosObj = documento.helados || {};

    const comidas = Object.keys(comidasObj);
    const helados = Object.keys(heladosObj);

    return NextResponse.json({ comidas, helados });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return NextResponse.json(
      { error: 'Error interno al obtener las categorías' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
