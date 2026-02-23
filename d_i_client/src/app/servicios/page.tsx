export const metadata = {
  title: 'Servicios | Dieta Integral',
  description: 'Muy pronto abriré cupos para trabajar 1:1. Déjame tu email y te aviso primero.',
  openGraph: {
    title: 'Servicios | Próximamente',
    description: 'Acompañamiento 1:1 próximamente. Déjanos tu email para avisarte primero.',
    url: 'https://tusitio.com/servicios',
    type: 'website'
  }
};
import { Header, Footer, NewsletterSection, Breadcrumbs } from '@shared';

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
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
