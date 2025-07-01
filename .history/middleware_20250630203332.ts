// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Necesitás esta función auxiliar para verificar el token
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Si no hay token, redirige a login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const valid = await verifyToken(token);

  if (!valid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Configurar qué rutas proteger
export const config = {
  matcher: [
    "/adminhome",
    "/cajahome",
    "/repartidorhome",
    "/AgregarProductos",
    "/RealizarPedido",
    // agregá aquí cualquier otra ruta protegida
  ],
};
