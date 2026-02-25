"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

type Category = { id: string; name: string; slug: string; color?: string | null; order: number }

export default function CategoryFilter({ categories, currentSlug }: { categories: Category[]; currentSlug?: string }) {
  const router = useRouter()
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    if (!slug) {
      router.push('/articulos')
    } else {
      router.push(`/articulos/categoria/${encodeURIComponent(slug)}`)
    }
  }
  return (
    <div className="flex items-center justify-end">
      <label className="mr-2 text-sm text-muted-foreground">Categoría</label>
      <select className="border rounded p-2 text-sm" value={currentSlug || ''} onChange={onChange}>
        <option value="">Todas</option>
        {categories.map(c => (
          <option key={c.id} value={c.slug}>{c.name}</option>
        ))}
      </select>
    </div>
  )
}
