"use client"
import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

export default function MarkdownEditor({ value, onChange, placeholder, className }: Props) {
  return (
    <div className={className}>
      <div className="flex gap-2 mb-2 text-sm">
        <button type="button" className="px-2 py-1 border rounded" onClick={() => onChange(value + (value && !value.endsWith("\n") ? "\n" : "") + "**negrita**")}>B</button>
        <button type="button" className="px-2 py-1 border rounded" onClick={() => onChange(value + (value && !value.endsWith("\n") ? "\n" : "") + "*cursiva*")}>I</button>
        <button type="button" className="px-2 py-1 border rounded" onClick={() => onChange(value + (value && !value.endsWith("\n") ? "\n" : "") + "# Título")}>H1</button>
        <button type="button" className="px-2 py-1 border rounded" onClick={() => onChange(value + (value && !value.endsWith("\n") ? "\n" : "") + "- elemento de lista")}>UL</button>
        <button type="button" className="px-2 py-1 border rounded" onClick={() => onChange(value + (value && !value.endsWith("\n") ? "\n" : "") + "[enlace](https://)")}>Link</button>
      </div>
      <textarea
        className="w-full min-h-[240px] p-3 border rounded outline-none focus:ring"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
