// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Public routes you want to allow without auth
  const isPublicPath = [
    '/login',
    '/register',
    '/forgot-password',
  ].includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')

  // If user is not logged in and trying to access a private route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is logged in and trying to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'], // protect all routes
}
