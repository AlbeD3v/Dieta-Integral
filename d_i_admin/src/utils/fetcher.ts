import { getClientBaseUrl } from './env'

export function getAuthHeaders(): Record<string, string> {
  const secret = process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''
  if (secret) return { Authorization: `Bearer ${secret}` }
  return {}
}

export async function apiGet<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = getClientBaseUrl()
  const res = await fetch(`${base}${path}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders(), ...(init?.headers || {}) },
    ...init,
  })
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try { const j = await res.json(); if (j?.error) msg = j.error } catch { /* ignore */ }
    throw new Error(msg)
  }
  return res.json() as Promise<T>
}
