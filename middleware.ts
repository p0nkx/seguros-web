// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cambiamos a export default
export default function middleware(request: NextRequest) {
  const authSession = request.cookies.get('auth-session');

  // Si intenta entrar a /clientes y NO tiene la cookie
  if (request.nextUrl.pathname.startsWith('/clientes')) {
    if (!authSession) {
      // Redirigir al login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// El matcher se queda igual
export const config = {
  matcher: ['/clientes/:path*'],
};