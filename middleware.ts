import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authSession = request.cookies.get('auth-session');
  const userRole = request.cookies.get('user-role')?.value;
  const { pathname } = request.nextUrl;

  // 1. Si no hay sesión, protegemos todo
  if (!authSession) {
     
      return NextResponse.redirect(new URL('/login', request.url));
    }
  

  // 2. Si hay sesión, validamos rol para usuarios
  if (pathname.startsWith('/usuarios') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/clientes', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/clientes',
    '/clientes/:path*',
    '/usuarios',
    '/usuarios/:path*'
  ],
};