// app/api/menu/upload/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import formidable from 'formidable';


export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = formidable({ multiples: false });

  const [ files] = await new Promise<any[]>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  const file = files.file?.[0];
  if (!file) {
    return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });
  }

  const result = await cloudinary.uploader.upload(file.filepath, {
    folder: 'productos_4soles',
  });

  return NextResponse.json({ url: result.secure_url });
}
