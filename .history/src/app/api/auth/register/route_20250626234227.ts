import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, rol } = await req.json();
    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) return NextResponse.json({ error: 'Usuario ya existe' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, rol });

    return NextResponse.json({ message: 'Registrado con éxito', user });
  } catch (err) {
    return NextResponse.json({ error: 'Error al registrar' }, { status: 500 });
  }
}
