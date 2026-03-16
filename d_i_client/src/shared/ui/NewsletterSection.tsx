"use client";
import React from 'react';
import { Button } from '@/shared/ui/button';

const NewsletterSection = () => {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "success" | "already" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Ingresa un correo válido.");
      return;
    }
    setSubmitting(true);
    setMessage(null);
    setStatus("idle");
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (data?.alreadySubscribed) {
          setStatus("already");
          setMessage("Ya estabas suscrito. ¡Gracias por seguir aquí!");
        } else {
          setStatus("success");
          setMessage("Suscripción exitosa");
        }
        setEmail("");
      } else if (res.status === 422) {
        setStatus("error");
        setMessage("Ingresa un correo válido.");
      } else {
        setStatus("error");
        setMessage("Ocurrió un error. Intenta nuevamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Ocurrió un error. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1B4332] px-6 py-12 md:px-16 md:py-16">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#40916C]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#2D6A4F]/50 blur-2xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
          Newsletter
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Empieza a transformar<br className="hidden sm:block" /> tu salud hoy
        </h2>
        <p className="text-white/65 leading-relaxed max-w-prose mx-auto">
          Suscríbete y recibe estrategias prácticas, recetas y hábitos ancestrales directamente en tu correo. Sin spam, solo valor real.
        </p>

        <form onSubmit={onSubmit} className="mt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="w-full sm:w-[22rem] px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60"
            aria-label="Correo electrónico"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="sm:shrink-0 bg-white text-[#1B4332] font-semibold hover:bg-white/90 rounded-lg px-6"
          >
            {submitting ? 'Enviando…' : 'Suscribirme gratis'}
          </Button>
        </form>

        {message && (
          <p
            className={
              status === 'success' || status === 'already'
                ? 'text-sm text-[#74C69D]'
                : 'text-sm text-red-300'
            }
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <p className="text-xs text-white/40 pt-1">
          "Dieta Integral es más que una filosofía; es un Estilo de Vida."
        </p>
      </div>
    </div>
  );
};

export default NewsletterSection;
