"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1B4332]/8 text-[#1B4332]">
            <AlertTriangle className="w-7 h-7" />
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Algo salió mal
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
          </p>
          {error.digest && (
            <p className="text-[0.7rem] font-mono text-foreground/30 pt-1">
              ref: {error.digest}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1B4332] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2D6A4F] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-foreground/12 px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground hover:border-foreground/25 transition-colors"
          >
            <Home className="w-4 h-4" />
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
