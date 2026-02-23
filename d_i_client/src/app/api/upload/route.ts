import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:3001'

function withCORS(resp: NextResponse) {
  resp.headers.set('Access-Control-Allow-Origin', ADMIN_ORIGIN)
  resp.headers.set('Vary', 'Origin')
  resp.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  resp.headers.set('Access-Control-Max-Age', '600')
  return resp
}

export async function OPTIONS() {
  const resp = new NextResponse(null, { status: 204 })
  resp.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS')
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return withCORS(resp)
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) {
      return withCORS(NextResponse.json({ error: 'file missing' }, { status: 400 }))
    }

    // validate size (max ~4.5MB per Vercel server upload guidance)
    const bytes = await file.arrayBuffer()
    const size = bytes.byteLength
    if (size > 4.5 * 1024 * 1024) {
      return withCORS(NextResponse.json({ error: 'file too large' }, { status: 413 }))
    }

    // validate extension/mime
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      return withCORS(NextResponse.json({ error: 'unsupported type' }, { status: 415 }))
    }

    const ext = file.type === 'image/png' ? '.png'
      : file.type === 'image/jpeg' ? '.jpg'
      : file.type === 'image/webp' ? '.webp'
      : '.svg'

    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    // Upload to Vercel Blob (public)
    const blob = new Blob([bytes], { type: file.type })
    const { url } = await put(`uploads/${name}`, blob, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return withCORS(NextResponse.json({ url }))
  } catch (e) {
    return withCORS(NextResponse.json({ error: 'upload failed' }, { status: 500 }))
  }
}
