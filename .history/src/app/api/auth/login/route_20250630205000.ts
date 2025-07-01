import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/bd';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });

    const token = jwt.sign({ userId: user._id, rol: user.rol }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    const response = NextResponse.json({
      message: "Login exitoso",
      token,
      rol: user.rol,
    });
    
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
    
    return response;
    
    
    return NextResponse.json({ message: "Login exitoso", token, rol: user.rol });
    



  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
