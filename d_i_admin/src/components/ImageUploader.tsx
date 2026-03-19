"use client"
import React, { useRef, useState } from 'react'
import { getClientBaseUrl } from '../utils/env'

type Props = {
  label?: string
  onUploaded: (url: string) => void
  accept?: string
  maxSizeMB?: number
  className?: string
}

export default function ImageUploader({ label = 'Subir imagen', onUploaded, accept = 'image/*', maxSizeMB = 4.5, className }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setError(null)
    if (!f) { setFile(null); return }
    if (f.size > maxSizeMB * 1024 * 1024) {
      setError(`El archivo supera ${maxSizeMB}MB`)
      if (inputRef.current) inputRef.current.value = ''
      setFile(null)
      return
    }
    setFile(f)
  }

  const handleUpload = async () => {
    if (!file || busy) return
    try {
      setBusy(true)
      setError(null)
      const base = getClientBaseUrl()
      const fd = new FormData()
      fd.append('file', file)
      const resp = await fetch(`${base}/api/upload`, { method: 'POST', body: fd })
      const data = await resp.json().catch(() => ({})) as any
      if (!resp.ok) throw new Error(data?.error || `Upload failed: ${resp.status}`)
      const url = String(data?.url || data?.href || '')
      if (!url) throw new Error('Respuesta inválida del servidor')
      onUploaded(url)
      if (inputRef.current) inputRef.current.value = ''
      setFile(null)
    } catch (e: any) {
      setError(e?.message || 'Error subiendo imagen')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input ref={inputRef} type="file" accept={accept} onChange={handlePick} disabled={busy} />
        <button type="button" className="px-2 py-1 border rounded disabled:opacity-60" onClick={handleUpload} disabled={!file || busy}>
          {busy ? 'Subiendo…' : 'Subir'}
        </button>
      </div>
      {file && !busy && <p className="text-xs text-gray-600 mt-1">{file.name} ({(file.size/1024/1024).toFixed(2)} MB)</p>}
      {busy && <p className="text-xs text-gray-500 mt-1">Subiendo...</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
