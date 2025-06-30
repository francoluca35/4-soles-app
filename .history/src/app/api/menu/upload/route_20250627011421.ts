import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { IncomingForm } from 'formidable';
import { Readable } from 'stream';
import { promisify } from 'util';

export const config = {
  api: {
    bodyParser: false,
  },
};

function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

export async function POST(req: Request) {
  const body = await req.body?.getReader().read();
  if (!body?.value) {
    return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
  }

  const buffer = Buffer.from(body.value);
  const fileBase64 = buffer.toString('base64');
  const dataURI = `data:image/jpeg;base64,${fileBase64}`;

  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'productos_4soles',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("Error al subir a Cloudinary:", err);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}
