import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const ALLOWED_ORIGINS = new Set([
  'http://localhost:3001',
  'https://dieta-integral-admin.vercel.app',
  'https://dietaintegral-admin.fit',
])

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.has(origin)) return true
  try {
    const host = new URL(origin).host.toLowerCase()
    if (host.endsWith('.vercel.app') && host.startsWith('dieta-integral-admin')) return true
  } catch {}
  return false
}

function corsHeaders(origin: string | null) {
  const headers = new Headers()
  if (origin && isAllowedOrigin(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
  }
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  headers.set('Access-Control-Max-Age', '86400')
  headers.set('Vary', 'Origin')
  return headers
}

// Routes that require authentication
const PROTECTED_PATHS = ['/dashboard', '/onboarding', '/api/user']

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PATHS.some(p => pathname.startsWith(p))
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const origin = req.headers.get('origin')

  // Handle preflight OPTIONS immediately — prevents 307 redirects from breaking CORS
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
  }

  // Auth protection for dashboard/user routes
  if (isProtectedRoute(pathname)) {
    if (!req.auth) {
      // API routes get 401; pages get redirected to login
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
      }
      const loginUrl = new URL('/iniciar-sesion', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // If authenticated but onboarding not complete, redirect to onboarding
    const user = req.auth.user as any
    if (
      !user?.onboardingComplete &&
      !pathname.startsWith('/onboarding') &&
      !pathname.startsWith('/api/')
    ) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
  }

  // For API requests, add CORS headers
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    const cors = corsHeaders(origin)
    cors.forEach((value, key) => {
      response.headers.set(key, value)
    })
    return response
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/onboarding/:path*'],
}
