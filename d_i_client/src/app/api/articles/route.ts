import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { withCORS, preflight } from '@/lib/cors'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','POST','OPTIONS'])
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') || '').trim()
    const status = (searchParams.get('status') || 'published').toLowerCase()
    const category = (searchParams.get('category') || '').trim() || undefined
    const categorySlug = (searchParams.get('categorySlug') || '').trim() || undefined
    const page = Math.max(1, Number(searchParams.get('page') || 1))
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize') || 12)))

    const where: any = {}
    if (status !== 'all') where.status = status
    // Backward compatibility: filter by legacy string category if provided
    if (category) where.category = category
    // New: filter by categorySlug by resolving to categoryId
    if (categorySlug) {
      const cat = await prisma.category.findUnique({ where: { slug: categorySlug } }).catch(() => null)
      if (cat) {
        where.categoryId = cat.id
      } else {
        // If slug not found, force empty result
        where.categoryId = '__none__'
      }
    }
    if (q) where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { summary: { contains: q, mode: 'insensitive' } },
    ]

    const [total, items] = await Promise.all([
      prisma.article.count({ where }),
      prisma.article.findMany({
        where,
        orderBy: { publicationDate: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true, slug: true, title: true, summary: true, images: true,
          publicationDate: true, category: true, status: true, categoryId: true,
          categoryRef: { select: { name: true, slug: true, color: true } },
        },
      }),
    ])

    const resp = NextResponse.json({ items, page, pageSize, total })
    return withCORS(req, resp)
  } catch (e) {
    // Final fallback to avoid CORS masking when DB fails
    return withCORS(req, NextResponse.json({ ok: false, items: [], page: 1, pageSize: 12, total: 0 }))
  }
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return withCORS(req, NextResponse.json({ error: 'invalid json' }, { status: 400 }))
  }
  const pick = (v: any, len: number) => (v === undefined || v === null ? undefined : String(v).slice(0, len))
  const title = pick(body?.title, 191)
  const summary = pick(body?.summary, 500)
  const content = pick(body?.content, 50000)
  const category = pick(body?.category, 100)
  const status = (pick(body?.status, 20) || 'draft').toLowerCase()
  const images = Array.isArray(body?.images) ? body.images.slice(0, 10).map((s: any) => String(s).slice(0, 500)) : []
  const slugBase = (pick(body?.slug, 191) || title || '').toLowerCase().trim()
  if (!title || !summary || !content) {
    return withCORS(req, NextResponse.json({ error: 'missing fields' }, { status: 400 }))
  }
  const base = slugBase
    .normalize('NFD').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  let slug = base || `articulo-${Date.now()}`
  let i = 1
  while (await prisma.article.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`
  }
  const publicationDate = body?.publicationDate ? new Date(String(body.publicationDate)) : null
  const created = await prisma.article.create({
    data: { title, summary, content, category, status: status === 'published' ? 'published' : 'draft', slug, images, publicationDate: publicationDate ?? undefined },
    select: { id: true, slug: true },
  })
  return withCORS(req, NextResponse.json(created, { status: 201 }))
}
