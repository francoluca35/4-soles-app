import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new IncomingForm({ multiples: false });

  const data = await new Promise<{ file: { filepath?: string; path?: string } }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) return reject(err);
      resolve(files as { file: { filepath?: string; path?: string } });
    });
  });

  const file = data.file.filepath || data.file.path;
  const result = await cloudinary.uploader.upload(file!, {
    folder: 'productos_4soles',
  });

  return NextResponse.json({ url: result.secure_url });
}
