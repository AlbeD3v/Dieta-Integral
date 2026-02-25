import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { withCORS, preflight } from '@/lib/cors'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','PUT','DELETE','OPTIONS'])
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const item = await prisma.article.findUnique({ where: { slug } })
    if (!item) return withCORS(req, NextResponse.json({ error: 'not found' }, { status: 404 }))
    return withCORS(req, NextResponse.json(item))
  } catch {
    return withCORS(req, NextResponse.json({ ok: false, error: 'unavailable' }))
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: currentSlug } = await params
    let body: any
    try {
      body = await req.json()
    } catch {
      return withCORS(req, NextResponse.json({ error: 'invalid json' }, { status: 400 }))
    }
    const pick = (v: any, len: number) => (v === undefined || v === null ? undefined : String(v).slice(0, len))
    const data: any = {}
    const title = pick(body?.title, 191); if (title !== undefined) data.title = title
    const summary = pick(body?.summary, 500); if (summary !== undefined) data.summary = summary
    const content = pick(body?.content, 50000); if (content !== undefined) data.content = content
    const category = pick(body?.category, 100); if (category !== undefined) data.category = category
    if (body?.status !== undefined) data.status = String(body.status).toLowerCase() === 'published' ? 'published' : 'draft'
    if (Array.isArray(body?.images)) data.images = body.images.slice(0,10).map((s: any) => String(s).slice(0,500))
    if (body?.publicationDate !== undefined) data.publicationDate = body.publicationDate ? new Date(String(body.publicationDate)) : null

    // Optional: allow slug change with uniqueness check
    const newSlugRaw = pick(body?.slug, 191)
    if (newSlugRaw && newSlugRaw !== currentSlug) {
      const base = newSlugRaw.toLowerCase().trim().normalize('NFD').replace(/[^\w\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')
      let newSlug = base || currentSlug
      if (newSlug !== currentSlug) {
        let i = 1
        while (await prisma.article.findUnique({ where: { slug: newSlug } })) newSlug = `${base}-${i++}`
        data.slug = newSlug
      }
    }

    const updated = await prisma.article.update({ where: { slug: currentSlug }, data })
    return withCORS(req, NextResponse.json(updated))
  } catch {
    return withCORS(req, NextResponse.json({ ok: false, error: 'unable to update' }))
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    await prisma.article.delete({ where: { slug } })
    return withCORS(req, new NextResponse(null, { status: 204 }))
  } catch {
    return withCORS(req, NextResponse.json({ ok: false, error: 'unable to delete' }))
  }
}
