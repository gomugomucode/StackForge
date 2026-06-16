import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

export default NextAuth(authConfig).auth((req) => {
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
  matcher: ['/((?!api|_next|favicon.ico|sw.js|manifest.json|robots.txt|sitemap.xml).*)'],
}
