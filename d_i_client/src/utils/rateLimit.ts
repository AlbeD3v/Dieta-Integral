type Entry = { count: number; expires: number }
const store = new Map<string, Entry>()

export function rateLimit(key: string, limit = 60, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || entry.expires < now) {
    store.set(key, { count: 1, expires: now + windowMs })
    return true
  }
  if (entry.count < limit) {
    entry.count += 1
    return true
  }
  return false
}

export function ipKey(ip: string | null | undefined, bucket = 'global') {
  return `${bucket}:${ip || 'unknown'}`
}
