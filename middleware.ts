import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth-token';

const SESSION_NAME = "kinuit_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_NAME);

  if (pathname.startsWith('/admin')) {
    // Check if the user is authenticated with a valid signed token
    const payload = session ? await verifyToken(session.value) : null;
    const isAuthenticated = !!payload;

    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      console.log(`[Middleware] Unauthorized access attempt to ${pathname}. Redirecting to login.`);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
