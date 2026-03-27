"use client";
import React, { useEffect } from 'react'
import Script from 'next/script'

type Props = {
  posts?: string[] // URLs de posts o videos públicos de Facebook
}

export default function FacebookSection({ posts = [] }: Props) {
  const hasPosts = Array.isArray(posts) && posts.length > 0

  useEffect(() => {
    if (!hasPosts) return
    // Reprocesar embeds si el SDK ya está cargado
    if (typeof window !== 'undefined' && window.FB?.XFBML?.parse) {
      window.FB.XFBML.parse()
    }
  }, [hasPosts])

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Facebook</h2>
        <p className="text-muted-foreground mb-8">Publicaciones destacadas de nuestra comunidad.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPosts ? (
            posts.map((url) => (
              <div key={url} className="w-full rounded-xl border p-2 bg-background">
                <div
                  className="fb-post w-full"
                  data-href={url}
                  data-width="auto"
                  data-show-text="true"
                />
              </div>
            ))
          ) : (
            [1,2,3].map((i) => (
              <div key={i} className="aspect-video bg-muted rounded-xl border flex items-center justify-center text-muted-foreground">
                Publicación {i}
              </div>
            ))
          )}
        </div>
      </div>
      {hasPosts && (
        <Script id="fb-sdk" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: `
          if (!document.getElementById('facebook-jssdk')) {
            var js = document.createElement('script');
            js.id = 'facebook-jssdk';
            js.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v20.0';
            document.body.appendChild(js);
          }
        ` }} />
      )}
    </section>
  )
}
