export function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const usp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') usp.set(k, String(v))
  })
  return usp.toString()
}

export type Pagination = { page?: number; pageSize?: number }
export function withPagination<T extends object>(params: T & Pagination): T & Required<Pagination> {
  const page = Math.max(1, Number(params.page || 1))
  const pageSize = Math.min(50, Math.max(1, Number(params.pageSize || 12)))
  return { ...params, page, pageSize } as T & Required<Pagination>
}
