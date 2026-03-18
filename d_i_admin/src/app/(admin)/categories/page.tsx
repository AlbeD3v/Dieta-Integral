"use client"
import React, { useEffect, useState } from 'react'
import type { CategoryDTO } from '@dieta/shared-types'

export default function CategoriesPage() {
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
  const [items, setItems] = useState<CategoryDTO[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  // create form state
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [color, setColor] = useState<string | ''>('')
  const [order, setOrder] = useState<number>(0)

  // inline edit state
  const [editing, setEditing] = useState<string | null>(null)
  const [eName, setEName] = useState('')
  const [eSlug, setESlug] = useState('')
  const [eColor, setEColor] = useState<string | ''>('')
  const [eOrder, setEOrder] = useState<number>(0)

  const load = async () => {
    setError(null)
    try {
      const r = await fetch(`${base}/api/categories`, { cache: 'no-store' })
      const d = await r.json()
      const arr: CategoryDTO[] = Array.isArray(d?.items) ? d.items : []
      setItems(arr)
    } catch (e: any) {
      setError(e?.message || 'Error cargando')
    }
  }

  const startEdit = (it: CategoryDTO) => {
    setEditing(it.slug)
    setEName(it.name)
    setESlug(it.slug)
    setEColor(it.color || '')
    setEOrder(it.order)
  }

  const cancelEdit = () => {
    setEditing(null)
    setEName(''); setESlug(''); setEColor(''); setEOrder(0)
  }

  const saveEdit = async (originalSlug: string) => {
    const payload: any = {}
    if (eName.trim() !== '') payload.name = eName.trim()
    if (eSlug.trim() !== originalSlug) payload.slug = eSlug.trim()
    payload.color = eColor.trim() ? eColor.trim() : null
    if (Number.isFinite(eOrder)) payload.order = eOrder
    try {
      setBusy(true); setError(null); setOk(null)
      const r = await fetch(`${base}/api/categories/${encodeURIComponent(originalSlug)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d?.error || `HTTP ${r.status}`)
      setOk('Actualizada')
      cancelEdit()
      await load()
    } catch (e: any) {
      setError(e?.message || 'Error actualizando')
    } finally { setBusy(false) }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async () => {
    const payload: any = { name: name.trim() }
    if (slug.trim()) payload.slug = slug.trim()
    if (color.trim()) payload.color = color.trim()
    if (Number.isFinite(order)) payload.order = order
    try {
      setBusy(true); setError(null); setOk(null)
      const r = await fetch(`${base}/api/categories`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d?.error || `HTTP ${r.status}`)
      setOk('Creada')
      setName(''); setSlug(''); setColor(''); setOrder(0)
      await load()
    } catch (e: any) {
      setError(e?.message || 'Error creando')
    } finally { setBusy(false) }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('¿Borrar esta categoría?')) return
    try {
      setBusy(true); setError(null); setOk(null)
      const r = await fetch(`${base}/api/categories/${encodeURIComponent(slug)}`, { method: 'DELETE' })
      if (!r.ok) {
        const d = await r.json().catch(() => ({}))
        throw new Error(d?.error || `HTTP ${r.status}`)
      }
      setOk('Eliminada')
      await load()
    } catch (e: any) {
      setError(e?.message || 'Error eliminando')
    } finally { setBusy(false) }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categorías</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {ok && <p className="text-green-600 mb-2">{ok}</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        <input className="border rounded p-2" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="border rounded p-2" placeholder="Slug (opcional)" value={slug} onChange={(e)=>setSlug(e.target.value)} />
        <input className="border rounded p-2" placeholder="Color (opcional) ej. #ffcc00" value={color} onChange={(e)=>setColor(e.target.value)} />
        <div className="flex gap-2">
          <input className="border rounded p-2 w-24" type="number" min={0} max={1000} placeholder="Orden" value={order} onChange={(e)=>setOrder(Number(e.target.value))} />
          <button className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-60" onClick={handleCreate} disabled={busy || !name.trim()}>Crear</button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Slug</th>
              <th className="text-left p-2">Color</th>
              <th className="text-left p-2">Orden</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.slug} className="border-t">
                {editing === it.slug ? (
                  <>
                    <td className="p-2"><input className="border rounded p-1 w-full" value={eName} onChange={(e)=>setEName(e.target.value)} /></td>
                    <td className="p-2"><input className="border rounded p-1 w-full" value={eSlug} onChange={(e)=>setESlug(e.target.value)} /></td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <input className="border rounded p-1 w-full" placeholder="#rrggbb" value={eColor} onChange={(e)=>setEColor(e.target.value)} />
                        <span className="inline-block w-4 h-4 rounded border" style={{ backgroundColor: eColor || 'transparent' }} />
                      </div>
                    </td>
                    <td className="p-2"><input className="border rounded p-1 w-24" type="number" value={eOrder} onChange={(e)=>setEOrder(Number(e.target.value))} /></td>
                    <td className="p-2 flex gap-2">
                      <button className="px-2 py-1 border rounded" onClick={()=>saveEdit(it.slug)} disabled={busy}>Guardar</button>
                      <button className="px-2 py-1 border rounded" onClick={cancelEdit}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{it.name}</td>
                    <td className="p-2">{it.slug}</td>
                    <td className="p-2">
                      {it.color ? (
                        <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: it.color }} />{it.color}</span>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="p-2">{it.order}</td>
                    <td className="p-2 flex gap-2">
                      <button className="px-2 py-1 border rounded" onClick={()=>startEdit(it)}>Editar</button>
                      <button className="px-2 py-1 border rounded text-red-600" onClick={()=>handleDelete(it.slug)}>Borrar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td className="p-3" colSpan={5}>Sin categorías</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
