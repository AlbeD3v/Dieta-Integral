"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [updatingTheme, setUpdatingTheme] = useState(false)
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'

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
    </div>
  )
}
