import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        plan: true,
        onboardingComplete: true,
        createdAt: true,
        updatedAt: true,
        healthProfile: true,
        progressLogs: {
          orderBy: { date: 'desc' },
          take: 15,
        },
        bookmarks: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            article: {
              select: { slug: true, title: true },
            },
          },
        },
        _count: {
          select: { progressLogs: true, bookmarks: true, sessions: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (err) {
    console.error('admin user detail error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const allowedFields: Record<string, boolean> = { plan: true, onboardingComplete: true }
    const data: any = {}
    for (const [key, value] of Object.entries(body)) {
      if (allowedFields[key]) data[key] = value
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'no_valid_fields' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, plan: true, onboardingComplete: true },
    })

    return NextResponse.json({ ok: true, user })
  } catch (err) {
    console.error('admin user PATCH error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
