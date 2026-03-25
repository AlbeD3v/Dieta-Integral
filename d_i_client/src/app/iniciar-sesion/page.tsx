import type { Metadata } from 'next';
import { buildCanonicalMeta } from '@/utils/seo';
import LoginCard from './LoginCard';

export const metadata: Metadata = buildCanonicalMeta({
  title: 'Iniciar sesión — Dieta Integral',
  description: 'Inicia sesión en Dieta Integral para acceder a tu panel personalizado de salud.',
  path: '/iniciar-sesion',
});

export default function IniciarSesionPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#F7F6F2] px-4 py-16">
      <LoginCard />
    </div>
  );
}
