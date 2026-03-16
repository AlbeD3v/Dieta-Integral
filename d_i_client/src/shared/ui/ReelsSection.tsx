"use client";
import React from 'react';
import Script from 'next/script';

type Props = {
  reels?: string[]
}

const ReelsSection: React.FC<Props> = ({ reels = [] }) => {
  const hasReels = Array.isArray(reels) && reels.length > 0
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasReels ? (
            reels.map((url) => (
              <blockquote
                key={url}
                className="instagram-media rounded-xl border w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ background: 'transparent', width: '100%' }}
              />
            ))
          ) : (
            [1,2,3].map((i) => (
              <div key={i} className="aspect-[9/16] bg-muted rounded-xl border flex items-center justify-center text-muted-foreground">
                Reel {i}
              </div>
            ))
          )}
        </div>
      </div>
      {hasReels && (
        <Script id="ig-embed" src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => {
          // @ts-ignore
          if (typeof window !== 'undefined' && (window as any).instgrm?.Embeds?.process) {
            // @ts-ignore
            (window as any).instgrm.Embeds.process()
          }
        }} />
      )}
    </section>
  );
};

export default ReelsSection;
