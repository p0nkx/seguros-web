import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const authSession = request.cookies.get('auth-session');
  const userRole = request.cookies.get('user-role')?.value;

  const { pathname } = request.nextUrl;

  // 1. Proteger rutas que requieren estar logueado
  if (pathname.startsWith('/clientes') || pathname.startsWith('/usuarios')) {
    if (!authSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Proteger rutas exclusivas de admin
  if (pathname.startsWith('/usuarios')) {
    if (userRole !== 'admin') {
      // Si no es admin, lo mandamos a clientes (o al home)
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/clientes/:path*', '/usuarios/:path*'],
};