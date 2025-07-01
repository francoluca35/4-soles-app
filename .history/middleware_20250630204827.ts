import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next(); // sigue al destino
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // ⛔ Bloquea todo excepto estas rutas públicas
  matcher: ["/((?!login|register|api|_next|favicon.ico).*)"],
};
