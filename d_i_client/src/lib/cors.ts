import { NextRequest, NextResponse } from 'next/server'

// Centralized CORS helper for API routes that are called from the Admin app
// Usage:
// - In OPTIONS handler: `return preflight(req, ['GET','POST'])`
// - In other handlers, always wrap the response: `return withCORS(req, NextResponse.json(data))`

const DEFAULT_ADMIN = 'http://localhost:3001'

export function getAllowedOrigins() {
  const envAdmin = process.env.ADMIN_ORIGIN || DEFAULT_ADMIN
  // Add any other allowed admin domains here
  return new Set<string>([
    DEFAULT_ADMIN,
    envAdmin,
    'https://dietaintegral-admin.fit',
    'https://dieta-integral-admin.vercel.app',
  ])
}

function isAllowedPreviewOrigin(origin: string | null) {
  if (!origin) return false
  try {
    const u = new URL(origin)
    const host = u.host.toLowerCase()
    // Allow Vercel preview domains for the admin project
    // e.g. dieta-integral-admin-<hash>.vercel.app or dieta-integral-admin.vercel.app
    if (host.endsWith('.vercel.app') && host.startsWith('dieta-integral-admin')) return true
  } catch {}
  return false
}

export function withCORS(req: NextRequest, resp: NextResponse, methods: string[] = ['GET','POST','PUT','DELETE','OPTIONS']) {
  const origin = req.headers.get('origin') || process.env.ADMIN_ORIGIN || DEFAULT_ADMIN
  const allowed = getAllowedOrigins()
  if (allowed.has(origin) || isAllowedPreviewOrigin(origin)) resp.headers.set('Access-Control-Allow-Origin', origin)
  resp.headers.set('Vary', 'Origin')
  resp.headers.set('Access-Control-Allow-Methods', methods.join(','))
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  resp.headers.set('Access-Control-Max-Age', '600')
  return resp
}

export function preflight(req: NextRequest, methods: string[] = ['GET','POST']) {
  const resp = new NextResponse(null, { status: 204 })
  return withCORS(req, resp, methods)
}
