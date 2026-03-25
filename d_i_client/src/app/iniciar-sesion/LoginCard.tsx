"use client";

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function LoginCardInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-black/8 bg-white shadow-xl overflow-hidden">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1B4332] via-[#40916C] to-[#74C69D]" />

        <div className="px-8 py-10 space-y-8">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/imagen_logo_svg.svg"
              alt="Dieta Integral"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <div className="text-center space-y-1.5">
              <h1 className="text-2xl font-bold text-[#0F172A]">Bienvenido</h1>
              <p className="text-sm text-[#475569]">
                Inicia sesión para acceder a tu panel personalizado de salud
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200/60 px-4 py-3 text-sm text-red-700">
              {error === 'OAuthAccountNotLinked'
                ? 'Ya existe una cuenta con ese email. Usa el mismo método con el que te registraste.'
                : 'Hubo un problema al iniciar sesión. Inténtalo de nuevo.'}
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm font-semibold text-[#0F172A] shadow-sm hover:bg-[#F7F6F2] hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <GoogleIcon />
            Continuar con Google
          </button>

          {/* Divider info */}
          <div className="text-center space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-black/8" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] font-medium">Seguro y privado</span>
              <div className="flex-1 h-px bg-black/8" />
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Solo usamos tu nombre y email de Google para crear tu cuenta.
              No publicamos nada ni accedemos a tus datos personales.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <p className="text-center text-xs text-[#94A3B8] mt-6">
        Al continuar, aceptas nuestros términos de uso y política de privacidad.
      </p>
    </div>
  );
}

export default function LoginCard() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md rounded-2xl border border-black/8 bg-white shadow-xl p-10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#1B4332] border-t-transparent animate-spin" />
      </div>
    }>
      <LoginCardInner />
    </Suspense>
  );
}
