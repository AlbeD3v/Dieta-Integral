import React from 'react'
import type { CategoryDTO } from '@dieta/shared-types'

type Props = {
  items: CategoryDTO[]
  value: string | ''
  onChange: (v: string) => void
  allowEmpty?: boolean
  emptyLabel?: string
  className?: string
}

export default function CategorySelect({ items, value, onChange, allowEmpty = true, emptyLabel = 'Todas las categorías', className }: Props) {
  return (
    <select className={className || 'border rounded p-2'} value={value} onChange={(e)=> onChange(e.target.value)}>
      {allowEmpty && <option value="">{emptyLabel}</option>}
      {items.map(c => (
        <option key={c.slug} value={c.name}>{c.name}</option>
      ))}
      {items.length === 0 && allowEmpty && (
        <option disabled value="">(Sin categorías)</option>
      )}
    </select>
  )
}
