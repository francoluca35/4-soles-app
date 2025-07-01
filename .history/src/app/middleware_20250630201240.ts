import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Rutas públicas permitidas sin sesión
  const publicPaths = ['/', '/login', '/register'];

  const pathname = req.nextUrl.pathname;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!); // Verifica el token
      return NextResponse.next(); // Token válido
    }
  } catch (error) {
    console.log('Token inválido o expirado');
  }

  // Si no hay token válido → redirige a login
  return NextResponse.redirect(new URL('/login', req.url));
}
export const config = {
    matcher: ['/adminhome', '/cajahome', '/repartidorhome', '/dashboard/:path*'],
  };
  