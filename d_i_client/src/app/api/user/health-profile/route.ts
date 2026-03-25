import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const HealthProfileSchema = z.object({
  age: z.number().int().min(10).max(120).optional(),
  sex: z.enum(['male', 'female', 'other']).optional(),
  weight: z.number().min(20).max(400).optional(),
  height: z.number().min(50).max(300).optional(),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'athlete']).optional(),
  goal: z.enum(['lose', 'gain', 'maintain', 'energy', 'health']).optional(),
  conditions: z.array(z.string()).optional(),
  preferences: z.array(z.string()).optional(),
  freeText: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const data = HealthProfileSchema.parse(body)

    const profile = await prisma.healthProfile.upsert({
      where: { userId: session.user.id },
      update: { ...data },
      create: { userId: session.user.id, ...data },
    })

    // Mark onboarding as complete
    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingComplete: true },
    })

    return NextResponse.json({ ok: true, profile })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'validation', details: err.issues }, { status: 400 })
    }
    console.error('health-profile error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const profile = await prisma.healthProfile.findUnique({
      where: { userId: session.user.id },
    })
    return NextResponse.json({ profile })
  } catch (err) {
    console.error('health-profile GET error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
