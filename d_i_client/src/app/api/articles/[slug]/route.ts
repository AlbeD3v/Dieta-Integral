import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { withCORS } from '@/lib/cors'

export async function OPTIONS(req: NextRequest) {
  return withCORS(req, new NextResponse(null, { status: 204 }), ['GET','PUT','DELETE','OPTIONS'])
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params
  const item = await prisma.article.findUnique({ where: { slug } })
  if (!item) return withCORS(req, NextResponse.json({ error: 'not found' }, { status: 404 }))
  return withCORS(req, NextResponse.json(item))
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug: currentSlug } = await ctx.params
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
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params
  await prisma.article.delete({ where: { slug } })
  return withCORS(req, new NextResponse(null, { status: 204 }))
}
