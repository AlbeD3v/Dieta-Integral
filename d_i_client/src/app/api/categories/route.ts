import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/utils/slug'
import { withCORS, preflight } from '@/lib/cors'
import { ok, badRequest, created as createdResp, serverError } from '@/utils/api'
import { CategoryCreateSchema, LegacyCategoriesSchema, formatZodError } from '@/utils/validate'

export const runtime = 'nodejs'

async function backfillFromSettingIfEmpty() {
  const count = await prisma.category.count()
  if (count > 0) return
  try {
    const row = await prisma.setting.findUnique({ where: { id: 'categories' } })
    const raw: string[] = (() => {
      if (!row) return []
      const v: unknown = row.value
      if (Array.isArray(v)) return v.map(String)
      if (typeof v === 'string') { try { const arr = JSON.parse(v); return Array.isArray(arr) ? arr.map(String) : [] } catch { return [] } }
      return []
    })()
    const unique = Array.from(new Set(raw.map(s => String(s).trim()).filter(Boolean)))
    for (const name of unique) {
      const base = slugify(name)
      let slug = base
      let i = 1
      while (await prisma.category.findUnique({ where: { slug } })) slug = `${base}-${i++}`
      await prisma.category.create({ data: { name, slug } })
    }
  } catch {
    // ignore
  }
}

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','POST','OPTIONS'])
}

export async function GET(req: NextRequest) {
  try {
    await backfillFromSettingIfEmpty()
    const list = await prisma.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }], select: { id: true, name: true, slug: true, color: true, order: true } })
    let names = list.map((c: { name: string }) => c.name)
    // If table is empty but legacy Setting has data, surface it to keep Admin usable
    if (list.length === 0) {
      const setting = await prisma.setting.findUnique({ where: { id: 'categories' } })
      const raw = setting?.value
      const legacy = Array.isArray(raw) ? raw.map(String) : []
      if (legacy.length) names = legacy
    }
    return ok(req, { categories: names, items: list })
  } catch {
    // Fallback if prisma/category table is not available in the deployed DB yet
    try {
      const setting = await prisma.setting.findUnique({ where: { id: 'categories' } })
      const raw = setting?.value
      const names = Array.isArray(raw) ? raw.map(String) : []
      return ok(req, { categories: names, items: [] })
    } catch {
      // Final fallback: return empty list with 200 so clients don't fail hard due to CORS masking errors
      return serverError(req, undefined, 'categories unavailable')
    }
  }
}

export async function POST(req: NextRequest) {
  let body: any
  try { body = await req.json() } catch { return badRequest(req, 'invalid json') }
  // Legacy mode: synchronize simple array of names
  if (Array.isArray(body?.categories)) {
    const parsed = LegacyCategoriesSchema.safeParse(body)
    if (!parsed.success) return badRequest(req, formatZodError(parsed.error))
    const names = Array.from(new Set(parsed.data.categories.map((s: any) => String(s).trim()).filter(Boolean)))
    try {
      const existing = await prisma.category.findMany({ select: { id: true, name: true, slug: true } })
      const existingByName = new Map(existing.map(c => [c.name.toLowerCase(), c]))
      const created: any[] = []
      for (const nRaw of names) {
        const n: string = String(nRaw)
        const key = n.toLowerCase()
        if (!existingByName.has(key)) {
          let slug = slugify(n)
          let base = slug
          let i = 1
          while (await prisma.category.findUnique({ where: { slug } })) slug = `${base}-${i++}`
          const c = await prisma.category.create({ data: { name: n, slug }, select: { id: true, name: true, slug: true, color: true, order: true } })
          created.push(c)
        }
      }
      return ok(req, { ok: true, createdCount: created.length })
    } catch {
      // Fallback: persist legacy array into Setting('categories')
      try {
        const setting = await prisma.setting.findUnique({ where: { id: 'categories' } })
        const prev: string[] = Array.isArray(setting?.value) ? setting!.value as any : []
        const merged = Array.from(new Set([ ...prev.map(String), ...names ]))
        await prisma.setting.upsert({ where: { id: 'categories' }, update: { value: merged as any }, create: { id: 'categories', value: merged as any } })
        return ok(req, { ok: true, createdCount: names.length, storage: 'setting' })
      } catch {
        return serverError(req, undefined, 'unable to persist categories')
      }
    }
  }

  // New mode: create one object with fields
  const parsed = CategoryCreateSchema.safeParse(body)
  if (!parsed.success) return badRequest(req, formatZodError(parsed.error))
  const { name, color: colorIn, order } = parsed.data
  let slug = (parsed.data.slug || '').trim().toLowerCase()
  const color = colorIn ?? null
  if (!slug) slug = slugify(name)
  let base = slug
  let i = 1
  while (await prisma.category.findUnique({ where: { slug } })) slug = `${base}-${i++}`
  try {
    const created = await prisma.category.create({ data: { name, slug, color: color || undefined, order }, select: { id: true, name: true, slug: true, color: true, order: true } })
    return createdResp(req, created)
  } catch (e: any) {
    // Fallback: append name to Setting('categories') if table write fails
    try {
      const setting = await prisma.setting.findUnique({ where: { id: 'categories' } })
      const prev: string[] = Array.isArray(setting?.value) ? setting!.value as any : []
      const merged = Array.from(new Set([ ...prev.map(String), name ]))
      await prisma.setting.upsert({ where: { id: 'categories' }, update: { value: merged as any }, create: { id: 'categories', value: merged as any } })
      return createdResp(req, { ok: true, id: null, name, slug, color, order, storage: 'setting' })
    } catch {
      return badRequest(req, 'unable to create')
    }
  }
}
