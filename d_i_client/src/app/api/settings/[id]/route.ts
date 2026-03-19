import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { withCORS, preflight } from '@/lib/cors'

export const runtime = 'nodejs'

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET', 'POST', 'OPTIONS'])
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const setting = await prisma.setting.findUnique({ where: { id } })
    if (!setting) {
      return withCORS(req, NextResponse.json({ value: [] }, { status: 200 }))
    }
    return withCORS(req, NextResponse.json({ id: setting.id, value: setting.value }))
  } catch (e) {
    return withCORS(req, NextResponse.json({ error: 'unavailable' }, { status: 500 }))
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json().catch(() => ({}))
    const value = body?.value

    if (value === undefined) {
      return withCORS(req, NextResponse.json({ error: 'value is required' }, { status: 400 }))
    }

    await prisma.setting.upsert({
      where: { id },
      update: { value },
      create: { id, value },
    })

    return withCORS(req, NextResponse.json({ ok: true }))
  } catch (e: any) {
    return withCORS(req, NextResponse.json({ error: e?.message || 'failed' }, { status: 500 }))
  }
}
