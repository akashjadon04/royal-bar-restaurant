import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple check for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // In production, check for valid admin session here
    // For now, allow access for development
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
