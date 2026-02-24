"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [updatingTheme, setUpdatingTheme] = useState(false)
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
  // Sobre mí
  const [aboutLoading, setAboutLoading] = useState(false)
  const [aboutSaving, setAboutSaving] = useState(false)
  const [aboutTitle, setAboutTitle] = useState('')
  const [aboutMarkdown, setAboutMarkdown] = useState('')
  const [aboutCTA, setAboutCTA] = useState('Hablemos')
  const [aboutImageUrl, setAboutImageUrl] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadOk, setUploadOk] = useState(false)
  const aboutRef = useRef<HTMLTextAreaElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  function insertAround(start: string, end: string = start) {
    const el = aboutRef.current
    if (!el) return
    const { selectionStart, selectionEnd, value } = el
    const before = value.slice(0, selectionStart)
    const sel = value.slice(selectionStart, selectionEnd)
    const after = value.slice(selectionEnd)
    const next = `${before}${start}${sel || 'texto'}${end}${after}`
    setAboutMarkdown(next)
    // restore focus and selection around inserted text
    requestAnimationFrame(() => {
      el.focus()
      const pos = selectionStart + start.length + (sel ? sel.length : 'texto'.length)
      el.setSelectionRange(pos, pos)
    })
  }

  function insertHeading(prefix: string) {
    const el = aboutRef.current
    if (!el) return
    const { selectionStart, selectionEnd, value } = el
    // get the start of current line
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
    const before = value.slice(0, lineStart)
    const line = value.slice(lineStart, selectionEnd)
    const after = value.slice(selectionEnd)
    const cleaned = line.replace(/^#{1,6}\s?/, '')
    const next = `${before}${prefix} ${cleaned}${after}`
    setAboutMarkdown(next)
    requestAnimationFrame(() => {
      el.focus()
      const caret = before.length + prefix.length + 1 + cleaned.length
      el.setSelectionRange(caret, caret)
    })
  }

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${base}/api/theme`, { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (data?.theme === 'dark' || data?.theme === 'light') setTheme(data.theme)
      } catch {}
    }
    load()
  }, [])

  useEffect(() => {
    const loadAbout = async () => {
      setAboutLoading(true)
      try {
        const r = await fetch(`${base}/api/about`, { cache: 'no-store' })
        const d = await r.json()
        setAboutTitle(d?.title ?? 'Sobre mí')
        setAboutMarkdown(d?.markdown ?? '')
        setAboutCTA(d?.ctaLabel ?? 'Hablemos')
        setAboutImageUrl(d?.imageUrl ?? '')
      } finally {
        setAboutLoading(false)
      }
    }
    loadAbout()
  }, [])

  function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => setSaving(false), 800)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Site</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onSave}>
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site name</Label>
              <Input id="siteName" placeholder="Dieta Integral" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="siteDesc">Description</Label>
              <Textarea id="siteDesc" placeholder="Administra contenido y configuración" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="siteEmail">Contact email</Label>
              <Input id="siteEmail" type="email" placeholder="contacto@tusitio.com" />
            </div>
            <div>
              <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onSave}>
            <div className="grid gap-2">
              <Label htmlFor="primaryColor">Primary color</Label>
              <Input id="primaryColor" placeholder="#40916C" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondaryColor">Secondary color</Label>
              <Input id="secondaryColor" placeholder="#2D6A4F" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input id="logoUrl" placeholder="/logo.png" />
            </div>
            <div>
              <Button type="submit" variant="outline" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme (Client)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="themeSelect">Select theme</Label>
              <select
                id="themeSelect"
                className="border border-input bg-background px-3 py-2 rounded-md"
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <Button
                onClick={async () => {
                  setUpdatingTheme(true)
                  try {
                    await fetch(`${base}/api/theme`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ theme }),
                    })
                  } finally {
                    setUpdatingTheme(false)
                  }
                }}
                disabled={updatingTheme}
              >
                {updatingTheme ? 'Updating…' : 'Apply to Client'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Sobre mí (Client)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="aboutTitle">Título</Label>
              <Input id="aboutTitle" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="aboutMd">Contenido (Markdown)</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => insertHeading('##')}>H2</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertHeading('###')}>H3</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertAround('**')}>Negrita</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertAround('*')}>Cursiva</Button>
                {aboutImageUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const el = aboutRef.current
                      const md = `\n\n![Imagen](${aboutImageUrl})\n\n`
                      if (!el) { setAboutMarkdown((v) => v + md); return }
                      const { selectionStart, selectionEnd, value } = el
                      const before = value.slice(0, selectionStart)
                      const after = value.slice(selectionEnd)
                      const next = `${before}${md}${after}`
                      setAboutMarkdown(next)
                      requestAnimationFrame(() => {
                        el.focus()
                        const caret = (before + md).length
                        el.setSelectionRange(caret, caret)
                      })
                    }}
                  >Insertar imagen</Button>
                )}
              </div>
              <Textarea
                id="aboutMd"
                ref={aboutRef}
                value={aboutMarkdown}
                onChange={(e) => setAboutMarkdown(e.target.value)}
                rows={14}
                placeholder={"## Título\n\nPárrafo..."}
              />
            </div>
            <div className="grid gap-2">
              <Label>Imagen (aside)</Label>
              {(() => {
                const previewSrc = aboutImageUrl
                  ? (aboutImageUrl.startsWith('http') ? aboutImageUrl : `${base}${aboutImageUrl}`)
                  : ''
                return aboutImageUrl ? (
                  <div className="flex items-center gap-4">
                    <img src={previewSrc} alt="Preview" className="h-20 w-20 object-cover rounded-md border" />
                    <Input value={aboutImageUrl} onChange={(e) => setAboutImageUrl(e.target.value)} />
                  </div>
                ) : null
              })()}
              <div className="flex items-center gap-2">
                <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" hidden onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  setUploadError(null)
                  setUploadOk(false)
                  const allowed = [
                    'image/png',
                    'image/jpeg',
                    'image/webp',
                    'image/svg+xml',
                  ]
                  if (!allowed.includes(file.type)) {
                    setUploadError('Formato no soportado. Usa PNG, JPEG, WEBP o SVG.')
                    if (fileRef.current) fileRef.current.value = ''
                    return
                  }
                  if (file.size > 4.5 * 1024 * 1024) {
                    setUploadError('El archivo supera 4.5MB. Reduce el tamaño e intenta de nuevo.')
                    if (fileRef.current) fileRef.current.value = ''
                    return
                  }
                  setAboutSaving(true)
                  try {
                    const fd = new FormData()
                    fd.set('file', file)
                    const r = await fetch(`${base}/api/upload`, { method: 'POST', body: fd })
                    const j = await r.json().catch(() => ({}))
                    if (!r.ok) {
                      setUploadError(typeof j?.error === 'string' ? j.error : 'Error al subir. Intenta nuevamente.')
                    } else if (j?.url) {
                      setAboutImageUrl(j.url)
                      setUploadOk(true)
                    }
                  } catch {
                    setUploadError('Error de red al subir. Intenta nuevamente.')
                  } finally {
                    setAboutSaving(false)
                    if (fileRef.current) fileRef.current.value = ''
                  }
                }} />
                <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()} disabled={aboutSaving}>Subir imagen…</Button>
                {aboutImageUrl && (
                  <Button type="button" variant="outline" onClick={() => { setAboutImageUrl(''); setUploadOk(false); }} disabled={aboutSaving}>Quitar</Button>
                )}
              </div>
              {uploadError ? (
                <p className="text-sm text-destructive mt-2" aria-live="polite">{uploadError}</p>
              ) : uploadOk ? (
                <p className="text-sm text-muted-foreground mt-2" aria-live="polite">Imagen subida correctamente.</p>
              ) : null}
            </div>
            <div className="grid gap-2 max-w-xs">
              <Label htmlFor="aboutCTA">CTA Label</Label>
              <Input id="aboutCTA" value={aboutCTA} onChange={(e) => setAboutCTA(e.target.value)} />
            </div>
            <div>
              <Button
                disabled={aboutSaving || aboutLoading}
                onClick={async () => {
                  setAboutSaving(true)
                  try {
                    await fetch(`${base}/api/about`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title: aboutTitle, markdown: aboutMarkdown, imageUrl: aboutImageUrl, ctaLabel: aboutCTA })
                    })
                  } finally {
                    setAboutSaving(false)
                  }
                }}
              >
                {aboutSaving ? 'Guardando…' : 'Guardar'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
