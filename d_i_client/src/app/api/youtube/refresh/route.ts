import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { fetchLatestYouTubeVideos } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') || req.headers.get('x-revalidate-token') || ''
  const privateToken = process.env.NEXT_REVALIDATE_TOKEN || ''
  const publicToken = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || ''
  const allowed = [privateToken, publicToken].filter(Boolean)

  if (!allowed.length || !allowed.includes(token || '')) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.YT_API_KEY
  const channelId = process.env.YT_CHANNEL_ID

  if (!apiKey || !channelId) {
    return NextResponse.json({ ok: false, error: 'Missing YT_API_KEY or YT_CHANNEL_ID' }, { status: 400 })
  }

  try {
    const videos = await fetchLatestYouTubeVideos({ apiKey, channelId, maxResults: 6 })
    if (!videos.length) {
      return NextResponse.json({ ok: false, error: 'No videos returned from YouTube API' }, { status: 502 })
    }

    await prisma.setting.upsert({
      where: { id: 'youtube.videos' },
      update: { value: videos },
      create: { id: 'youtube.videos', value: videos },
    })

    return NextResponse.json({ ok: true, count: videos.length, videos })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'YouTube fetch failed' }, { status: 500 })
  }
}
