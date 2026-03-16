"use client";
import React from 'react';
import Script from 'next/script';
import { Instagram } from 'lucide-react';

type Props = {
  reels?: string[]
}

const ReelsSection: React.FC<Props> = ({ reels = [] }) => {
  const hasReels = Array.isArray(reels) && reels.length > 0
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hasReels ? (
          reels.map((url) => (
            <blockquote
              key={url}
              className="instagram-media rounded-2xl w-full overflow-hidden"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{ background: 'transparent', width: '100%' }}
            />
          ))
        ) : (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-2xl bg-gradient-to-b from-[#1B4332]/[0.07] to-[#40916C]/[0.04] border border-[#1B4332]/10 flex flex-col items-center justify-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-xs text-muted-foreground/50 font-medium">Próximamente</p>
            </div>
          ))
        )}
      </div>
      {hasReels && (
        <Script id="ig-embed" src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).instgrm?.Embeds?.process) {
            (window as any).instgrm.Embeds.process()
          }
        }} />
      )}
    </>
  );
};

export default ReelsSection;
