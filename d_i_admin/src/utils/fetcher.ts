import { getClientBaseUrl } from './env'

export async function apiGet<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = getClientBaseUrl()
  const res = await fetch(`${base}${path}`, {
    cache: 'no-store',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  })
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try { const j = await res.json(); if (j?.error) msg = j.error } catch { /* ignore */ }
    throw new Error(msg)
  }
  return res.json() as Promise<T>
}
