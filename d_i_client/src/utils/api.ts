import { NextRequest, NextResponse } from 'next/server'
import { withCORS } from '@/lib/cors'

export function ok(req: NextRequest, data: unknown, init?: ResponseInit) {
  return withCORS(req, NextResponse.json(data, { status: 200, ...(init || {}) }))
}

export function created(req: NextRequest, data: unknown) {
  return withCORS(req, NextResponse.json(data, { status: 201 }))
}

export function noContent(req: NextRequest) {
  return withCORS(req, new NextResponse(null, { status: 204 }))
}

export function badRequest(req: NextRequest, message = 'bad request') {
  return withCORS(req, NextResponse.json({ error: message }, { status: 400 }))
}

export function notFound(req: NextRequest, message = 'not found') {
  return withCORS(req, NextResponse.json({ error: message }, { status: 404 }))
}

export function serverError(req: NextRequest, e?: unknown, fallback = 'server error') {
  const message = e instanceof Error ? e.message : fallback
  return withCORS(req, NextResponse.json({ ok: false, error: message }, { status: 500 }))
}
