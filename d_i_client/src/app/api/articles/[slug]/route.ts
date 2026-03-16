import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { withCORS, preflight } from '@/lib/cors'
import { ok, badRequest, notFound as notFoundResp, noContent, serverError } from '@/utils/api'
 import { pickString, parseDate, ArticleUpdateSchema, formatZodError } from '@/utils/validate'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','PUT','DELETE','OPTIONS'])
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const item = await prisma.article.findUnique({ where: { slug } })
    if (!item) return notFoundResp(req)
    return ok(req, item)
  } catch (e) {
    return serverError(req, e, 'unavailable')
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: currentSlug } = await params
    let body: any
    try {
      body = await req.json()
    } catch {
      return badRequest(req, 'invalid json')
    }
    const parsed = ArticleUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return badRequest(req, formatZodError(parsed.error))
    }
    const data: any = {}
    const { title, summary, content, category, status, images, publicationDate: pubIn } = parsed.data
    if (title !== undefined) data.title = title
    if (summary !== undefined) data.summary = summary
    if (content !== undefined) data.content = content
    if (category !== undefined) data.category = category
    if (status !== undefined) data.status = status
    if (images !== undefined) data.images = images
    if (pubIn !== undefined) data.publicationDate = parseDate(pubIn)

    // Optional: allow slug change with uniqueness check
    const newSlugRaw = pickString(parsed.data?.slug, 191)
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
    return ok(req, updated)
  } catch (e) {
    return serverError(req, e, 'unable to update')
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    await prisma.article.delete({ where: { slug } })
    return noContent(req)
  } catch (e) {
    return serverError(req, e, 'unable to delete')
  }
}
