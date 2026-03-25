import type { Metadata } from 'next';
import OnboardingWizard from './OnboardingWizard';

export const metadata: Metadata = {
  title: 'Tu perfil de salud — Dieta Integral',
  description: 'Completa tu perfil para recibir recomendaciones personalizadas.',
};

export default function OnboardingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F6F2]">
      <OnboardingWizard />
    </div>
  );
}
