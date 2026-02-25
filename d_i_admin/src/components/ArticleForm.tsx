"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownEditor from './MarkdownEditor'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import ImageUploader from './ImageUploader'

type Article = {
  id?: string
  slug: string
  title: string
  summary: string
  content: string
  images: string[]
  category?: string | null
  status: 'draft' | 'published'
  publicationDate?: string | null
}

type Props = {
  initial?: Partial<Article>
  mode: 'create' | 'edit'
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ArticleForm({ initial, mode }: Props) {
  const router = useRouter()
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'

  const [title, setTitle] = useState(initial?.title || '')
  const [slug, setSlug] = useState(initial?.slug || '')
  const [summary, setSummary] = useState(initial?.summary || '')
  const [content, setContent] = useState(initial?.content || '')
  const [images, setImages] = useState<string[]>(initial?.images || [])
  const [category, setCategory] = useState(initial?.category || '')
  const [categories, setCategories] = useState<string[]>([])
  const [catSelect, setCatSelect] = useState<string>('')
  const [status, setStatus] = useState<Article['status']>((initial?.status as any) || 'draft')
  const [publicationDate, setPublicationDate] = useState<string | ''>(initial?.publicationDate ? String(initial.publicationDate).slice(0,10) : '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'create') {
      const auto = slugify(title)
      if (auto && !slug) setSlug(auto)
    }
  }, [title, slug, mode])

  // Load categories from client API
  useEffect(() => {
    let cancelled = false
    fetch(`${base}/api/categories`, { cache: 'no-store' })
      .then(r => r.json())
      .then((d) => {
        if (cancelled) return
        const arr = Array.isArray(d?.categories) ? d.categories.filter((s: any) => !!s).map((s: any) => String(s)) : []
        setCategories(arr)
        const normalized = String(initial?.category || '').trim()
        setCatSelect(arr.includes(normalized) || normalized === '' ? normalized : 'custom')
      })
      .catch(() => {
        const normalized = String(initial?.category || '').trim()
        setCatSelect(normalized ? 'custom' : '')
      })
    return () => { cancelled = true }
  }, [base, initial?.category])

  const canSave = useMemo(() => !!title && !!summary && !!content, [title, summary, content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSave || busy) return
    setBusy(true)
    setError(null)
    setOk(null)
    try {
      const payload: any = {
        title, summary, content, images, category, status,
        slug: slug || slugify(title),
        publicationDate: publicationDate ? new Date(publicationDate).toISOString() : null,
      }
      let resp: Response
      if (mode === 'create') {
        resp = await fetch(`${base}/api/articles`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        resp = await fetch(`${base}/api/articles/${encodeURIComponent(String(initial?.slug || slug))}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      const data = await resp.json().catch(() => ({}))
      if (!resp.ok) throw new Error(data?.error || `Error ${resp.status}`)
      setOk('Guardado')
      const targetSlug = String(data?.slug || payload.slug)
      router.push(`/articles/${encodeURIComponent(targetSlug)}`)
      router.refresh()
    } catch (e: any) {
      setError(e?.message || 'Error guardando')
    } finally {
      setBusy(false)
    }
  }

  const addImage = (url: string) => setImages((arr) => Array.from(new Set([...(arr||[]), url])).slice(0,10))
  const removeImage = (url: string) => setImages((arr) => (arr||[]).filter(u => u !== url))
  const insertMarker = (n: number) => setContent((prev) => `${prev}${prev && !prev.endsWith('\n') ? '\n' : ''}[Img:${n}]`)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {ok && <p className="text-sm text-green-600">{ok}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input className="w-full border rounded p-2" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Título del artículo" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input className="w-full border rounded p-2" value={slug} onChange={(e)=>setSlug(slugify(e.target.value))} placeholder="mi-articulo" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <div className="flex flex-col gap-2">
            <select
              className="w-full border rounded p-2"
              value={catSelect}
              onChange={(e) => {
                const v = e.target.value
                setCatSelect(v)
                if (v === '' || v === 'custom') {
                  if (v === '') setCategory('')
                } else {
                  setCategory(v)
                }
              }}
            >
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="custom">Otra…</option>
            </select>
            {catSelect === 'custom' && (
              <input
                className="w-full border rounded p-2"
                value={category || ''}
                onChange={(e)=>setCategory(e.target.value)}
                placeholder="Escribe una categoría"
              />
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select className="w-full border rounded p-2" value={status} onChange={(e)=>setStatus(e.target.value as any)}>
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de publicación</label>
          <input type="date" className="w-full border rounded p-2" value={publicationDate || ''} onChange={(e)=>setPublicationDate(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resumen</label>
        <textarea className="w-full border rounded p-2 min-h-[100px]" value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Resumen breve" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contenido (Markdown)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MarkdownEditor value={content} onChange={setContent} placeholder="Escribe en Markdown..." />
          <div className="border rounded p-3 bg-white">
            <div className="text-xs text-muted-foreground mb-2">Vista previa</div>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {content || ''}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ImageUploader label="Subir imagen" onUploaded={addImage} />
        {images?.length ? (
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {images.map((url) => (
              <div key={url} className="border rounded p-1 flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="img" className="w-full h-24 object-cover rounded" />
                <div className="mt-1 flex items-center gap-2">
                  <button type="button" className="text-xs text-blue-600 underline" onClick={()=>insertMarker((images.indexOf(url))+1)}>
                    Insertar [Img:{(images.indexOf(url))+1}]
                  </button>
                  <button type="button" className="text-xs text-red-600" onClick={()=>removeImage(url)}>Quitar</button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2 justify-end">
        <button type="button" className="px-3 py-2 border rounded" onClick={()=>router.back()} disabled={busy}>Cancelar</button>
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-60" disabled={!canSave || busy}>
          {busy ? 'Guardando…' : (mode === 'create' ? 'Crear' : 'Guardar cambios')}
        </button>
      </div>
    </form>
  )
}
