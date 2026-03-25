import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: {
            id: true, slug: true, title: true, summary: true, images: true,
            publicationDate: true,
            categoryRef: { select: { name: true, slug: true, color: true } },
          },
        },
      },
    })

    return NextResponse.json({ bookmarks })
  } catch (err) {
    console.error('bookmarks GET error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { articleId } = await req.json()
    if (!articleId || typeof articleId !== 'string') {
      return NextResponse.json({ error: 'articleId required' }, { status: 400 })
    }

    const bookmark = await prisma.bookmark.create({
      data: { userId: session.user.id, articleId },
    })

    return NextResponse.json({ ok: true, bookmark })
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'already_bookmarked' }, { status: 409 })
    }
    console.error('bookmarks POST error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { articleId } = await req.json()
    if (!articleId || typeof articleId !== 'string') {
      return NextResponse.json({ error: 'articleId required' }, { status: 400 })
    }

    await prisma.bookmark.deleteMany({
      where: { userId: session.user.id, articleId },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('bookmarks DELETE error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
