export function normalizeImageUrl(src?: string | null, fallback: string = '/imagen_logo_svg.svg'): string {
  if (!src) return fallback
  const s = String(src)
  if (s.startsWith('http') || s.startsWith('https') || s.startsWith('/')) return s
  return `/${s}`
}
