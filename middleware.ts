import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const protectedRoutes = ['/dashboard', '/profile', '/bookmarks', '/community/create', '/analytics']
  const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route))

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.json|robots.txt).*)'],
}
