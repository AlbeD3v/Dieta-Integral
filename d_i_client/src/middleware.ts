import { NextRequest, NextResponse } from 'next/server'

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

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin')

  // Handle preflight OPTIONS immediately — prevents 307 redirects from breaking CORS
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
  }

  // For actual requests, add CORS headers to the response
  const response = NextResponse.next()
  const cors = corsHeaders(origin)
  cors.forEach((value, key) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
}
