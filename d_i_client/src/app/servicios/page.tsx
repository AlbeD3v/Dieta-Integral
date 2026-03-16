export const metadata = {
  title: 'Servicios | Dieta Integral',
  description: 'Muy pronto abriré cupos para trabajar 1:1. Déjame tu email y te aviso primero.',
  alternates: { canonical: 'https://dietaintegral.fit/servicios' },
  openGraph: {
    title: 'Servicios | Próximamente',
    description: 'Acompañamiento 1:1 próximamente. Déjanos tu email para avisarte primero.',
    url: 'https://dietaintegral.fit/servicios',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios | Dieta Integral',
    description: 'Muy pronto abriré cupos para trabajar 1:1. Déjame tu email y te aviso primero.',
    images: ['/imagen_logo_svg.svg']
  }
};
import { Header, Footer, NewsletterSection, Breadcrumbs } from '@shared';

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Servicios' }]} />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Servicios</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Muy pronto abriré cupos para trabajar 1:1. Déjame tu email y te aviso primero.
        </p>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
