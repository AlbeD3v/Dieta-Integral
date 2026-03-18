"use client";

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Georgia, serif', background: '#F7F6F2' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(27,67,50,0.08)',
                marginBottom: '1.5rem',
              }}
            >
              <AlertTriangle style={{ width: '28px', height: '28px', color: '#1B4332' }} />
            </div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0F172A',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
              }}
            >
              Error crítico
            </h1>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#64748B',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              El sistema encontró un problema grave. Por favor recargá la página.
            </p>
            {error.digest && (
              <p
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: '#94A3B8',
                  marginBottom: '1.5rem',
                }}
              >
                ref: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '8px',
                background: '#1B4332',
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <RotateCcw style={{ width: '16px', height: '16px' }} />
              Recargar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
