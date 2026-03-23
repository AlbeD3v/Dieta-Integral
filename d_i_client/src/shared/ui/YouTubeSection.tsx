"use client";
import React from 'react'
import { Youtube } from 'lucide-react'

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
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:snap-none sm:pb-0">
      {hasVideos ? (
        videos.map((v) => {
          const id = extractYouTubeId(v)
          if (!id) return (
            <div key={v} className="flex-shrink-0 w-[80vw] sm:w-auto snap-center aspect-video rounded-2xl bg-gradient-to-b from-[#1B4332]/[0.07] to-[#40916C]/[0.04] border border-[#1B4332]/10 flex flex-col items-center justify-center gap-3">
              <Youtube className="w-6 h-6 text-primary/30" />
              <span className="text-xs text-muted-foreground/50">Video inválido</span>
            </div>
          )
          return (
            <div key={v} className="flex-shrink-0 w-[80vw] sm:w-auto snap-center rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow duration-300">
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
        [1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[80vw] sm:w-auto snap-center aspect-video rounded-2xl bg-gradient-to-b from-[#1B4332]/[0.07] to-[#40916C]/[0.04] border border-[#1B4332]/10 flex flex-col items-center justify-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-primary/40" />
            </div>
            <p className="text-xs text-muted-foreground/50 font-medium">Próximamente</p>
          </div>
        ))
      )}
    </div>
  )
}
