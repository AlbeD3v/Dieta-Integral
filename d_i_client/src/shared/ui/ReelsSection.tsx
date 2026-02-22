"use client";
import React from 'react';

const ReelsSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Reels destacados</h2>
        <p className="text-muted-foreground mb-8">Contenido corto y educativo. Próximamente más.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholders para embeds (reemplazar con iframes reales cuando se definan) */}
          {[1,2,3].map((i) => (
            <div key={i} className="aspect-[9/16] bg-muted rounded-xl border flex items-center justify-center text-muted-foreground">
              Reel {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
