export function formatDateES(input?: string | Date | null): string {
  if (!input) return ''
  const d = typeof input === 'string' ? new Date(input) : input
  if (!(d instanceof Date) || isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
