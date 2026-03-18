import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization') || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
    const expected = process.env.NEXT_REVALIDATE_TOKEN || ''
    const expectedPublic = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || ''
    if (!token || (token !== expected && token !== expectedPublic)) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    const body = await req.json().catch(() => ({}))
    const paths: string[] = Array.isArray(body?.paths)
      ? body.paths.filter((p: any) => typeof p === 'string')
      : (typeof body?.path === 'string' ? [body.path] : [])
    if (!paths.length) {
      return NextResponse.json({ error: 'missing path' }, { status: 400 })
    }
    for (const p of paths) {
      try { revalidatePath(p) } catch { /* ignore single path failure */ }
    }
    return NextResponse.json({ revalidated: true, count: paths.length })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
