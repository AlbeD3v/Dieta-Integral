import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { assertAdmin } from '@/lib/admin'

export async function GET(req: NextRequest) {
  const { error } = await assertAdmin()
  if (error) return error

  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') || '').trim()
    const page = Math.max(1, Number(searchParams.get('page') || 1))
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize') || 20)))
    const plan = searchParams.get('plan') || undefined
    const onboarding = searchParams.get('onboarding') // 'true' | 'false' | null

    const where: Prisma.UserWhereInput = {}
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
      ]
    }
    if (plan) where.plan = plan
    if (onboarding === 'true') where.onboardingComplete = true
    if (onboarding === 'false') where.onboardingComplete = false

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          plan: true,
          onboardingComplete: true,
          createdAt: true,
          _count: { select: { progressLogs: true, bookmarks: true } },
        },
      }),
    ])

    return NextResponse.json({ users, total, page, pageSize })
  } catch (err) {
    console.error('admin users GET error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
