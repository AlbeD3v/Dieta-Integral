"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { buildQuery, withPagination } from '../../../utils/http'
import { apiGet } from '../../../utils/fetcher'
import type { ArticleDTO, CategoryDTO } from '@dieta/shared-types'
import { CategorySelect } from '@dieta/shared-ui'
import { getClientBaseUrl } from '../../../utils/env'

export default function ArticlesListPage() {
  const base = getClientBaseUrl()
  const [items, setItems] = useState<ArticleDTO[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'all' | 'draft' | 'published'>('all')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const qp = withPagination({ q, status, category, page, pageSize })
  const query = useMemo(() => buildQuery(qp as any), [qp])

  useEffect(() => {
    let cancelled = false
    setBusy(true)
    setError(null)
    apiGet(`${'/api/articles'}?${query}`)
      .then((data: { items: ArticleDTO[]; total: number; page: number; pageSize: number }) => {
        if (cancelled) return
        setItems(data.items || [])
        setTotal(data.total || 0)
        setPage(data.page || 1)
        setPageSize(data.pageSize || 12)
      })
      .catch((e) => setError(e?.message || 'Error cargando artículos'))
      .finally(() => setBusy(false))
    return () => { cancelled = true }
  }, [base, query])

  // Load categories for filter
  useEffect(() => {
    let cancelled = false
    apiGet(`/api/categories`)
      .then((d) => {
        if (cancelled) return
        const arr: CategoryDTO[] = Array.isArray(d?.items) ? d.items : []
        setCategories(arr)
      })
      .catch(() => { /* ignore */ })
    return () => { cancelled = true }
  }, [base])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const handleDelete = async (slug: string) => {
    if (!confirm('¿Borrar este artículo?')) return
    const resp = await fetch(`${base}/api/articles/${encodeURIComponent(slug)}`, { method: 'DELETE' })
    if (!resp.ok) {
      alert('No se pudo borrar')
      return
    }
    // Revalidate client pages after deletion
    try {
      fetch(`${base}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || ''}`,
        },
        body: JSON.stringify({ paths: [
          '/articulos',
          `/articulos/${encodeURIComponent(slug)}`,
        ] }),
      }).catch(() => {})
    } catch {}
    // reload current page
    const usp = new URLSearchParams(query)
    fetch(`${base}/api/articles?${usp.toString()}`, { cache: 'no-store' })
      .then(r => r.json())
      .then((data) => {
        setItems(data.items || [])
        setTotal(data.total || 0)
      })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Artículos</h1>
        <Link href="/articles/new" className="px-3 py-2 bg-blue-600 text-white rounded">Nuevo artículo</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input className="border rounded p-2" placeholder="Buscar..." value={q} onChange={(e) => { setPage(1); setQ(e.target.value) }} />
        <select className="border rounded p-2" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as any) }}>
          <option value="all">Todos</option>
          <option value="draft">Borradores</option>
          <option value="published">Publicados</option>
        </select>
        <CategorySelect
          items={categories}
          value={category}
          onChange={(v) => { setPage(1); setCategory(v) }}
          allowEmpty
          emptyLabel="Todas las categorías"
        />
        <select className="border rounded p-2" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[6,12,24,48].map(n => <option key={n} value={n}>{n} por página</option>)}
        </select>
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {busy && <p className="text-gray-500 mb-2">Cargando…</p>}

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Título</th>
              <th className="text-left p-2">Slug</th>
              <th className="text-left p-2">Categoría</th>
              <th className="text-left p-2">Fecha</th>
              <th className="text-left p-2">Estado</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.slug} className="border-t">
                <td className="p-2">{it.title}</td>
                <td className="p-2">{it.slug}</td>
                <td className="p-2">{it.category || '-'}</td>
                <td className="p-2">{it.publicationDate ? new Date(it.publicationDate).toLocaleDateString() : '-'}</td>
                <td className="p-2">{it.status || '-'}</td>
                <td className="p-2 flex gap-2">
                  <Link href={`/articles/${encodeURIComponent(it.slug)}`} className="px-2 py-1 border rounded">Editar</Link>
                  <button className="px-2 py-1 border rounded text-red-600" onClick={() => handleDelete(it.slug)}>Borrar</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && !busy && (
              <tr><td className="p-3" colSpan={6}>Sin resultados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        <button className="px-2 py-1 border rounded" disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))}>Anterior</button>
        <span className="text-sm">Página {page} de {totalPages}</span>
        <button className="px-2 py-1 border rounded" disabled={page>=totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))}>Siguiente</button>
      </div>
    </div>
  )
}
