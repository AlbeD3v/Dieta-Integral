"use client"
import React, { useEffect, useState } from 'react'

export default function CategoriesPage() {
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  const load = async () => {
    setError(null)
    try {
      const r = await fetch(`${base}/api/categories`, { cache: 'no-store' })
      const d = await r.json()
      setItems(Array.isArray(d?.categories) ? d.categories : [])
    } catch (e: any) {
      setError(e?.message || 'Error cargando')
    }
  }

  useEffect(() => { load() }, [])

  const add = () => {
    const v = input.trim()
    if (!v) return
    if (items.includes(v)) return setInput('')
    setItems((arr) => [...arr, v])
    setInput('')
  }

  const remove = (v: string) => setItems((arr) => arr.filter(x => x !== v))

  const save = async () => {
    try {
      setBusy(true); setError(null); setOk(null)
      const r = await fetch(`${base}/api/categories`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categories: items }) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d?.error || `HTTP ${r.status}`)
      setOk('Guardado')
    } catch (e: any) {
      setError(e?.message || 'Error guardando')
    } finally { setBusy(false) }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categorías</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {ok && <p className="text-green-600 mb-2">{ok}</p>}

      <div className="flex gap-2 mb-4">
        <input className="border rounded p-2 flex-1" placeholder="Nueva categoría" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter') add() }} />
        <button className="px-3 py-2 border rounded" onClick={add}>Agregar</button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-60" onClick={save} disabled={busy}>Guardar</button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map(c => (
          <li key={c} className="border rounded p-3 flex items-center justify-between">
            <span>{c}</span>
            <button className="text-red-600 text-sm" onClick={()=>remove(c)}>Quitar</button>
          </li>
        ))}
        {!items.length && <li className="text-sm text-muted-foreground">Sin categorías</li>}
      </ul>
    </div>
  )
}
