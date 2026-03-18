import { z } from 'zod'

export function pickString(v: any, maxLen: number): string | undefined {
  if (v === undefined || v === null) return undefined
  return String(v).slice(0, maxLen)
}

export function ensureStatus(v: any): 'draft' | 'published' {
  const s = String(v ?? '').toLowerCase()
  return s === 'published' ? 'published' : 'draft'
}

export function parseImages(v: any): string[] {
  if (!Array.isArray(v)) return []
  return v.slice(0, 10).map((s: any) => String(s).slice(0, 500))
}

// returns Date | null | undefined
// - undefined: do not set the field
// - null: explicit null (clear date)
// - Date: valid date value
export function parseDate(v: any): Date | null | undefined {
  if (v === undefined) return undefined
  if (v === null || v === '') return null
  const d = new Date(String(v))
  return isNaN(d.getTime()) ? undefined : d
}

// Zod schemas
export const ArticleCreateSchema = z.object({
  title: z.string().trim().min(1).max(191),
  summary: z.string().trim().min(1).max(500),
  content: z.string().trim().min(1).max(50000),
  category: z.string().trim().max(100).optional().nullable(),
  status: z.enum(['draft', 'published']).default('draft'),
  images: z.array(z.string().max(500)).max(10).default([]),
  publicationDate: z.union([z.string(), z.date()]).nullish(),
  slug: z.string().trim().max(191).optional(),
})

// All fields optional for updates
export const ArticleUpdateSchema = z.object({
  title: z.string().trim().max(191).optional(),
  summary: z.string().trim().max(500).optional(),
  content: z.string().trim().max(50000).optional(),
  category: z.string().trim().max(100).optional().nullable(),
  status: z.enum(['draft', 'published']).optional(),
  images: z.array(z.string().max(500)).max(10).optional(),
  publicationDate: z.union([z.string(), z.date(), z.null()]).optional(),
  slug: z.string().trim().max(191).optional(),
})

export function formatZodError(e: z.ZodError): string {
  return e.issues.map(i => `${i.path.join('.') || 'root'}: ${i.message}`).join('; ')
}

// Category schemas
export const CategoryCreateSchema = z.object({
  name: z.string().trim().min(1).max(191),
  slug: z.string().trim().max(191).optional(),
  color: z.string().trim().max(32).optional().nullable(),
  order: z.coerce.number().int().min(0).max(1000).default(0),
})

export const LegacyCategoriesSchema = z.object({
  categories: z.array(z.string().trim().min(1).max(191)).min(1),
})

export const CategoryUpdateSchema = z.object({
  name: z.string().trim().max(191).optional(),
  slug: z.string().trim().max(191).optional(),
  color: z.string().trim().max(32).optional().nullable(),
  order: z.coerce.number().int().min(0).max(1000).optional(),
})
