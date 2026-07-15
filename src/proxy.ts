import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

// Next.js 16 renamed `middleware` to `proxy` (Node.js runtime by default).
// This is the single gate that protects the dashboard and all data APIs.
// Unauthenticated page requests are redirected to /login; API requests get 401.

const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/logout'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // Signed-in users shouldn't see the login page.
  if (pathname === '/login' && isAuthed) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (isAuthed) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  const loginUrl = new URL('/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Run on everything except static assets and the app icon.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
