export const metadata = {
  title: 'Contacto | Dieta Integral',
  description: 'Ponte en contacto por email o WhatsApp Business para iniciar la conversación.',
  alternates: { canonical: 'https://dietaintegral.fit/contacto' },
  openGraph: {
    title: 'Contacto | Dieta Integral',
    description: 'Escríbenos por email o WhatsApp Business.',
    url: 'https://dietaintegral.fit/contacto',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Dieta Integral',
    description: 'Ponte en contacto por email o WhatsApp Business para iniciar la conversación.',
    images: ['/imagen_logo_svg.svg']
  }
};
import { Header, Footer, Button, Breadcrumbs } from '@shared';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]} />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Contacto</h1>
        <p className="text-muted-foreground mb-8">Escríbeme por email o WhatsApp Business.</p>
        <div className="space-y-4">
          <a href="mailto:contacto@tusitio.com" className="inline-block">
            <Button variant="outline">contacto@tusitio.com</Button>
          </a>
          <a href="https://wa.me/0000000000" target="_blank" rel="noreferrer" className="inline-block">
            <Button>WhatsApp Business</Button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
