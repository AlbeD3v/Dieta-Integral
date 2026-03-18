import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { preflight } from '@/lib/cors'
import { ok, badRequest, notFound as notFoundResp, noContent, serverError } from '@/utils/api'
import { CategoryUpdateSchema, formatZodError } from '@/utils/validate'
import { slugify } from '@/utils/slug'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','PUT','DELETE','OPTIONS'])
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const item = await prisma.category.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true, color: true, order: true },
    })
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
    try { body = await req.json() } catch { return badRequest(req, 'invalid json') }

    const parsed = CategoryUpdateSchema.safeParse(body)
    if (!parsed.success) return badRequest(req, formatZodError(parsed.error))

    const data: any = {}
    const { name, slug, color, order } = parsed.data
    if (name !== undefined) data.name = name
    if (color !== undefined) data.color = color ?? null
    if (order !== undefined) data.order = order

    // Handle slug change (explicitly provided). If empty string provided, regenerate from name if available.
    let newSlug = slug
    if (newSlug !== undefined) {
      let base = (newSlug || (name ? slugify(name) : currentSlug)).trim().toLowerCase()
      if (!base) base = currentSlug
      let unique = base
      if (unique !== currentSlug) {
        let i = 1
        while (await prisma.category.findUnique({ where: { slug: unique } })) {
          unique = `${base}-${i++}`
        }
        data.slug = unique
      }
    }

    const updated = await prisma.category.update({ where: { slug: currentSlug }, data, select: { id: true, name: true, slug: true, color: true, order: true } })
    return ok(req, updated)
  } catch (e) {
    return serverError(req, e, 'unable to update')
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    await prisma.category.delete({ where: { slug } })
    return noContent(req)
  } catch (e) {
    return serverError(req, e, 'unable to delete')
  }
}
