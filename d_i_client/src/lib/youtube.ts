export async function fetchLatestYouTubeVideos(opts: {
  apiKey: string,
  channelId: string,
  maxResults?: number,
}): Promise<string[]> {
  const { apiKey, channelId, maxResults = 6 } = opts
  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', channelId)
  url.searchParams.set('order', 'date')
  url.searchParams.set('type', 'video')
  url.searchParams.set('maxResults', String(Math.max(1, Math.min(50, maxResults))))
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  if (!res.ok) {
    throw new Error(`YouTube API error ${res.status}`)
  }
  const data = await res.json().catch(() => ({}))
  const items: any[] = Array.isArray(data?.items) ? data.items : []
  const ids = items
    .map((it) => it?.id?.videoId)
    .filter((id: any) => typeof id === 'string')
  return Array.from(new Set(ids))
}
