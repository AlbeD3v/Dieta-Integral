import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { withCORS, preflight } from '@/lib/cors'
import { ok, created, badRequest, serverError } from '@/utils/api'
import { ArticleCreateSchema, formatZodError, parseDate } from '@/utils/validate'
import { rateLimit, ipKey } from '@/utils/rateLimit'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','POST','OPTIONS'])
}

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined
    if (!rateLimit(ipKey(ip, 'articles:get'), 120, 60_000)) {
      return NextResponse.json({ error: 'rate limit' }, { status: 429 })
    }
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

    return ok(req, { items, page, pageSize, total })
  } catch (e) {
    // Final fallback to avoid CORS masking when DB fails
    return serverError(req, e, 'unavailable')
  }
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return badRequest(req, 'invalid json')
  }
  const parsed = ArticleCreateSchema.safeParse(body)
  if (!parsed.success) {
    return badRequest(req, formatZodError(parsed.error))
  }
  const { title, summary, content, category, status, images, slug: providedSlug, publicationDate: pubIn } = parsed.data
  const slugBase = (providedSlug || title).toLowerCase().trim()
  const base = slugBase
    .normalize('NFD').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  let slug = base || `articulo-${Date.now()}`
  let i = 1
  try {
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${base}-${i++}`
    }
    const publicationDate = parseDate(pubIn)
    const item = await prisma.article.create({
      data: {
        title,
        summary,
        content,
        category,
        status,
        slug,
        images,
        publicationDate: publicationDate === undefined ? undefined : publicationDate,
      },
      select: { id: true, slug: true },
    })
    return created(req, item)
  } catch (e: any) {
    return serverError(req, e, 'unable to create article')
  }
}
