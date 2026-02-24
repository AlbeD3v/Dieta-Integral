export const metadata = {
  title: 'Dieta Integral | Alimentación consciente y ancestral',
  description: 'Acompañamiento en hábitos y alimentación desde un enfoque ancestral y práctico. Artículos, reels y recursos para una vida más integral.',
  alternates: { canonical: 'https://dietaintegral.fit/' },
  openGraph: {
    title: 'Dieta Integral',
    description: 'Acompañamiento en hábitos y alimentación desde un enfoque ancestral y práctico.',
    url: 'https://dietaintegral.fit/',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dieta Integral',
    description: 'Acompañamiento en hábitos y alimentación desde un enfoque ancestral y práctico.',
    images: ['/imagen_logo_svg.svg']
  }
};
import { AboutSection, NewsletterSection, ReelsSection, TestimonialsSection, Footer } from '@shared';
import Container from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';
import SectionHeader from '@/shared/ui/SectionHeader';
import { FeaturedArticles } from '@domains/articles';



/* esto es un comentario */
export default function Home() {
  return (
    <div>
      <main>
        {/* Hero minimal */}
        <section className="border-b">
          <Container className="py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                  Alimentación consciente, diseño minimal.
                </h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-prose">
                  Acompañamiento en hábitos y nutrición con una interfaz clara que pone el foco en tu progreso.
                </p>
                <div className="flex gap-3">
                  <Button variant="accent" href="/planes">Explorar planes</Button>
                  <Button variant="outline" href="/recetas">Ver recetas</Button>
                </div>
              </div>
              <div className="md:justify-self-end">
                <div className="aspect-[4/3] w-full max-w-lg rounded-xl border bg-card" />
              </div>
            </div>
          </Container>
        </section>

        {/* Artículos destacados */}
        <Container className="py-12">
          <SectionHeader
            title="Artículos destacados"
            subtitle="Lecturas seleccionadas para avanzar de forma práctica."
            align="left"
            className="mb-6"
          />
          <FeaturedArticles />
        </Container>
        {/* Reels minimal */}
        <Container className="py-12">
          <SectionHeader
            title="Reels"
            subtitle="Contenido breve y accionable para tu día a día."
            align="left"
            className="mb-6"
          />
          <ReelsSection />
        </Container>

        {/* Testimonios minimal */}
        <Container className="py-12">
          <SectionHeader
            title="Testimonios"
            subtitle="Experiencias reales de personas como tú."
            align="left"
            className="mb-6"
          />
          <TestimonialsSection />
        </Container>
        {/* Mantener información importante de Sobre mí */}
        <AboutSection />
        {/* Newsletter minimal */}
        <Container className="py-12">
          <SectionHeader
            title="Newsletter"
            subtitle="Recibe ideas prácticas y minimalistas directamente en tu correo."
            align="left"
            className="mb-6"
          />
          <NewsletterSection />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
