import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Validate that the current request comes from an admin.
 * Accepts two auth methods:
 *   1. NextAuth session cookie (same-origin, e.g. logged-in admin on client)
 *   2. Bearer token matching ADMIN_API_SECRET (cross-origin, e.g. admin app)
 * Returns the session if valid, or a NextResponse error to return early.
 */
export async function assertAdmin() {
  // Method 1: API key auth (cross-origin admin app)
  const hdrs = await headers()
  const authHeader = hdrs.get('authorization') || ''
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    const secret = process.env.ADMIN_API_SECRET
    if (secret && token === secret) {
      // Valid API key — return a synthetic session
      return { session: { user: { id: 'api-key', role: 'admin' } }, error: null }
    }
  }

  // Method 2: Session cookie auth (same-origin)
  const session = await auth()

  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    }
  }

  const role = session.user.role

  if (role !== 'admin') {
    return {
      session: null,
      error: NextResponse.json({ error: 'forbidden' }, { status: 403 }),
    }
  }

  return { session, error: null }
}
