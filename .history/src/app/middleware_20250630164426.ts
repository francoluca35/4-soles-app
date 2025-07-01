// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_ROUTES = ['/login', '/register', '/'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acceso libre a rutas públicas
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  try {
    if (token) {
      // Verifica el token
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next(); // Token válido, permitir acceso
    }

    // Si no hay token o no es válido, redirige al login
    return NextResponse.redirect(new URL('/login', req.url));
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
