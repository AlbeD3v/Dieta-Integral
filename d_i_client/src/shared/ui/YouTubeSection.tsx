"use client";
import React from 'react'

type Props = {
  videos?: string[] // IDs o URLs públicas de YouTube
}

function extractYouTubeId(input: string): string | null {
  try {
    // Si ya parece un ID (11 chars alfanum y _ -), lo devolvemos
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input
    const url = new URL(input)
    // youtu.be/<id>
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    // youtube.com/watch?v=<id>
    if (url.searchParams.has('v')) {
      const id = url.searchParams.get('v') || ''
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    // youtube.com/shorts/<id>
    if (url.hostname.includes('youtube.com') && url.pathname.startsWith('/shorts/')) {
      const id = url.pathname.split('/').filter(Boolean)[1] || ''
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    // youtube.com/embed/<id>
    const parts = url.pathname.split('/').filter(Boolean)
    const idx = parts.findIndex(p => p === 'embed')
    if (idx >= 0 && parts[idx+1]) {
      const id = parts[idx+1]
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    return null
  } catch {
    // No es URL, tal vez sea ID
    return /^[a-zA-Z0-9_-]{11}$/.test(input) ? input : null
  }
}

export default function YouTubeSection({ videos = [] }: Props) {
  const hasVideos = Array.isArray(videos) && videos.length > 0

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasVideos ? (
            videos.map((v) => {
              const id = extractYouTubeId(v)
              if (!id) return (
                <div key={v} className="aspect-video bg-muted rounded-xl border flex items-center justify-center text-muted-foreground">
                  Video inválido
                </div>
              )
              return (
                <div key={v} className="w-full rounded-xl border overflow-hidden bg-background">
                  <div className="relative w-full aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            })
          ) : (
            [1,2,3].map((i) => (
              <div key={i} className="aspect-video bg-muted rounded-xl border flex items-center justify-center text-muted-foreground">
                Video {i}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
