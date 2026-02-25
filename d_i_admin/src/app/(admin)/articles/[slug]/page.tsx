"use client"
import React, { useEffect, useState } from 'react'
import ArticleForm from '@/components/ArticleForm'
import { useParams } from 'next/navigation'

export default function EditArticlePage() {
  const params = useParams() as { slug?: string }
  const slug = decodeURIComponent(String(params?.slug || ''))
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
  const [initial, setInitial] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setError(null)
    if (!slug) return
    fetch(`${base}/api/articles/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data) => { if (!cancelled) setInitial(data) })
      .catch((e) => !cancelled && setError(e?.message || 'Error cargando artículo'))
    return () => { cancelled = true }
  }, [slug, base])

  if (!slug) return <div className="p-6">Slug inválido</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar artículo</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {initial ? (
        <ArticleForm mode="edit" initial={initial} />
      ) : (
        <p>Cargando…</p>
      )}
    </div>
  )
}
