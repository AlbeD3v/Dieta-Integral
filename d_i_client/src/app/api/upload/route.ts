import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { withCORS, preflight } from '@/lib/cors'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['POST','OPTIONS'])
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return withCORS(req, NextResponse.json({ error: 'blob token missing' }, { status: 500 }))
    }
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) {
      return withCORS(req, NextResponse.json({ error: 'file missing' }, { status: 400 }))
    }

    // validate size (max ~4.5MB per Vercel server upload guidance)
    const bytes = await file.arrayBuffer()
    const size = bytes.byteLength
    if (size > 4.5 * 1024 * 1024) {
      return withCORS(req, NextResponse.json({ error: 'file too large' }, { status: 413 }))
    }

    // validate extension/mime
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      return withCORS(req, NextResponse.json({ error: 'unsupported type' }, { status: 415 }))
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

    return withCORS(req, NextResponse.json({ url }))
  } catch (e: any) {
    const msg = e?.message ? String(e.message).slice(0, 300) : 'upload failed'
    return withCORS(req, NextResponse.json({ error: msg }, { status: 500 }))
  }
}
