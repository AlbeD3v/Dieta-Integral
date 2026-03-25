import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const ProgressSchema = z.object({
  weight: z.number().min(20).max(400).optional(),
  energy: z.number().int().min(1).max(5).optional(),
  mood: z.number().int().min(1).max(5).optional(),
  notes: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const data = ProgressSchema.parse(body)

    const log = await prisma.progressLog.create({
      data: {
        userId: session.user.id,
        ...data,
      },
    })

    return NextResponse.json({ ok: true, log })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'validation', details: err.issues }, { status: 400 })
    }
    console.error('progress error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const logs = await prisma.progressLog.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      take: 30,
    })
    return NextResponse.json({ logs })
  } catch (err) {
    console.error('progress GET error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
