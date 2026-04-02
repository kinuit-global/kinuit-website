import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_NAME = "kinuit_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_NAME);

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (session?.value === "authenticated") {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
