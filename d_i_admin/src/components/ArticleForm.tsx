"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownEditor from './MarkdownEditor'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import ImageUploader from './ImageUploader'
import { slugify } from '../utils/slug'
import { getClientBaseUrl } from '../utils/env'
import type { CategoryDTO } from '@dieta/shared-types'
import { CategorySelect } from '@dieta/shared-ui'

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

// slugify moved to utils/slug

export default function ArticleForm({ initial, mode }: Props) {
  const router = useRouter()
  const base = getClientBaseUrl()

  const [title, setTitle] = useState(initial?.title || '')
  const [slug, setSlug] = useState(initial?.slug || '')
  const [summary, setSummary] = useState(initial?.summary || '')
  const [content, setContent] = useState(initial?.content || '')
  const [images, setImages] = useState<string[]>(initial?.images || [])
  const [category, setCategory] = useState(initial?.category || '')
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [catSelect, setCatSelect] = useState<string>('')
  const [status, setStatus] = useState<Article['status']>(initial?.status || 'draft')
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
    fetch(`${base}/api/categories`, { cache: 'no-store', credentials: 'include' })
      .then(r => r.json())
      .then((d) => {
        if (cancelled) return
        const arr: CategoryDTO[] = Array.isArray(d?.items) ? d.items : []
        setCategories(arr)
        const normalized = String(initial?.category || '').trim()
        const exists = arr.some(c => c.name === normalized)
        setCatSelect(exists ? normalized : (normalized ? 'custom' : ''))
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
      const payload: Omit<Article, 'id'> = {
        title, summary, content, images, category, status,
        slug: slug || slugify(title),
        publicationDate: publicationDate ? new Date(publicationDate).toISOString() : null,
      }
      let resp: Response
      if (mode === 'create') {
        resp = await fetch(`${base}/api/articles`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        resp = await fetch(`${base}/api/articles/${encodeURIComponent(String(initial?.slug || slug))}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      const data = await resp.json().catch(() => ({}))
      if (!resp.ok) throw new Error(data?.error || `Error ${resp.status}`)
      setOk('Guardado')
      const targetSlug = String(data?.slug || payload.slug)
      // Fire and forget revalidation on client app
      try {
        fetch(`${base}/api/revalidate`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || ''}`,
          },
          body: JSON.stringify({ paths: [
            '/articulos',
            `/articulos/${encodeURIComponent(targetSlug)}`,
          ] }),
        }).catch(() => {})
      } catch {}
      router.push(`/articles/${encodeURIComponent(targetSlug)}`)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error guardando')
    } finally {
      setBusy(false)
    }
  }

  const addImage = (url: string) => setImages((arr) => Array.from(new Set([...(arr||[]), url])).slice(0,10))
  const removeImage = (url: string) => setImages((arr) => (arr||[]).filter(u => u !== url))
  const insertMarker = (n: number, position?: string) => {
    const tag = position ? `[Img:${n}:${position}]` : `[Img:${n}]`
    setContent((prev) => `${prev}${prev && !prev.endsWith('\n') ? '\n\n' : ''}${tag}\n`)
  }

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
            {catSelect !== 'custom' ? (
              <div className="flex items-center gap-2">
                <CategorySelect
                  items={categories}
                  value={catSelect}
                  onChange={(v) => { setCatSelect(v); setCategory(v) }}
                  allowEmpty
                  emptyLabel="Sin categoría"
                  className="w-full border rounded p-2"
                />
                <button type="button" className="text-xs underline" onClick={()=> { setCatSelect('custom'); setCategory('') }}>Otra…</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <input
                  className="w-full border rounded p-2"
                  value={category || ''}
                  onChange={(e)=>setCategory(e.target.value)}
                  placeholder="Escribe una categoría"
                />
                <button type="button" className="text-xs underline" onClick={()=> { setCatSelect(''); setCategory('') }}>Usar lista</button>
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select className="w-full border rounded p-2" value={status} onChange={(e)=>setStatus(e.target.value as Article['status'])}>
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

      <details className="border rounded-lg bg-slate-50 p-3">
        <summary className="text-sm font-semibold cursor-pointer select-none text-slate-700">
          Guia de escritura Markdown (click para expandir)
        </summary>
        <div className="mt-3 text-xs text-slate-600 space-y-3">
          <div>
            <p className="font-semibold text-slate-800 mb-1">Estructura del articulo</p>
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b"><th className="py-1 pr-3">Escribes</th><th className="py-1">Resultado</th></tr></thead>
              <tbody className="font-mono">
                <tr className="border-b border-slate-200"><td className="py-1 pr-3"># Titulo principal</td><td className="py-1 font-sans">Titulo grande (H1)</td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">## Subtitulo</td><td className="py-1 font-sans">Subtitulo de seccion (H2)</td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">Texto normal</td><td className="py-1 font-sans">Parrafo</td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">**texto**</td><td className="py-1 font-sans"><strong>Negrita</strong></td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">*texto*</td><td className="py-1 font-sans"><em>Cursiva</em></td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">________</td><td className="py-1 font-sans">Linea separadora horizontal</td></tr>
                <tr><td className="py-1 pr-3">[texto](url)</td><td className="py-1 font-sans">Enlace</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Insertar imagenes</p>
            <p className="mb-1">Sube las imagenes abajo y usa los botones para insertarlas. Tambien puedes escribir manualmente:</p>
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b"><th className="py-1 pr-3">Escribes</th><th className="py-1">Resultado</th></tr></thead>
              <tbody className="font-mono">
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">[Img:1]</td><td className="py-1 font-sans">Imagen 1 centrada (ancho completo)</td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">[Img:1:center]</td><td className="py-1 font-sans">Imagen 1 centrada (igual que arriba)</td></tr>
                <tr className="border-b border-slate-200"><td className="py-1 pr-3">[Img:2:left]</td><td className="py-1 font-sans">Imagen 2 a la izquierda, texto fluye a su derecha</td></tr>
                <tr><td className="py-1 pr-3">[Img:3:right]</td><td className="py-1 font-sans">Imagen 3 a la derecha, texto fluye a su izquierda</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white border border-slate-200 rounded p-2">
            <p className="font-semibold text-slate-800 mb-1">Ejemplo de articulo</p>
            <pre className="text-[11px] leading-relaxed whitespace-pre-wrap text-slate-600">{`# Mi titulo principal

[Img:1]

## Primera seccion
Aqui escribes el texto de la primera seccion.
Usa **negrita** para resaltar y *cursiva* para enfasis.

________

## Segunda seccion con imagen al lado [Img:2:left]
Este texto fluye al lado derecho de la imagen.
Puedes seguir escribiendo parrafos y el texto
rodeara la imagen automaticamente.

## Conclusion
Parrafo final del articulo.`}</pre>
          </div>
          <p className="text-[10px] text-slate-400">Importante: Deja siempre una linea en blanco entre cada bloque (titulo, parrafo, imagen, separador).</p>
        </div>
      </details>

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
            {images.map((url, idx) => (
              <div key={url} className="border rounded p-2 flex flex-col items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="img" className="w-full h-24 object-cover rounded" />
                <span className="text-[10px] font-mono text-gray-500">Img:{idx+1}</span>
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <button type="button" className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100" onClick={()=>insertMarker(idx+1)} title="Imagen centrada (ancho completo)">
                    Centrada
                  </button>
                  <button type="button" className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100" onClick={()=>insertMarker(idx+1,'left')} title="Imagen flotante a la izquierda">
                    Izq
                  </button>
                  <button type="button" className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200 hover:bg-purple-100" onClick={()=>insertMarker(idx+1,'right')} title="Imagen flotante a la derecha">
                    Der
                  </button>
                  <button type="button" className="text-[10px] px-1.5 py-0.5 text-red-600 hover:bg-red-50 rounded" onClick={()=>removeImage(url)}>✕</button>
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
