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
          setMessage("Suscripción exitosa. Revisa tu bandeja.");
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
    <div className="rounded-xl border bg-card p-6 md:p-8">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="inline-block text-sm md:text-base text-muted-foreground">
          Para empezar a tomar el control, solo hace falta un movimiento:
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          “Dar el primer paso”
        </h2>
        <p className="text-muted-foreground max-w-prose mx-auto">
          Suscríbete y recibirás ideas prácticas y minimalistas directamente en tu correo.
        </p>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="w-full sm:w-[26rem] px-4 py-3 rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
            aria-label="Correo electrónico"
          />
          <Button type="submit" variant="accent" className="sm:shrink-0" disabled={submitting}>
            {submitting ? 'Enviando…' : 'Suscribirse'}
          </Button>
        </form>
        {message && (
          <p
            className={
              status === 'success' || status === 'already'
                ? 'text-sm text-foreground'
                : 'text-sm text-destructive'
            }
            aria-live="polite"
          >
            {message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          “Dieta Integral es más que una ideología o filosofía; es un Estilo de Vida.”
        </p>
      </div>
    </div>
  );
};

export default NewsletterSection;
