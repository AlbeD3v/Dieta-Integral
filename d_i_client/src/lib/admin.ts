import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

/**
 * Validate that the current session belongs to an admin user.
 * Returns the session if valid, or a NextResponse error to return early.
 */
export async function assertAdmin() {
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
