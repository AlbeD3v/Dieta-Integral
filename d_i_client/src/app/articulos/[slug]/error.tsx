"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { FileX, RotateCcw, ArrowLeft } from 'lucide-react';

export default function ArticleSlugError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Article Error]', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center space-y-5">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1B4332]/8 text-[#1B4332]">
          <FileX className="w-6 h-6" />
        </span>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            No se pudo cargar el artículo
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            El artículo no está disponible en este momento. Podés volver al blog o intentar de nuevo.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1B4332] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2D6A4F] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reintentar
          </button>
          <Link
            href="/articulos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </div>
  );
}
