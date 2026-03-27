"use client";

import { useEffect } from "react";

export default function SobreMiError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sobre-mí error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="text-2xl font-bold text-foreground">Error al cargar la página</h2>
      <p className="text-muted-foreground max-w-md">
        No pudimos cargar la información. Intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}
