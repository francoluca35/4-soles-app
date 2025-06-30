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

    if (!documento) {
      return NextResponse.json(
        { error: 'No se encontró el documento de menú' },
        { status: 404 }
      );
    }

    const comidas = Object.keys(documento.comidas || {});
    const helados = Object.keys(documento.helados || {});

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
