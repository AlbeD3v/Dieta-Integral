export const metadata = {
  title: 'Dieta Integral | Alimentación consciente',
  description: 'Acompañamiento en hábitos y alimentación con enfoque ancestral y práctico. Artículos, reels y recursos para una vida más integral.',
  alternates: { canonical: 'https://dietaintegral.fit/' },
  openGraph: {
    title: 'Dieta Integral',
    description: 'Acompañamiento en hábitos y alimentación con enfoque ancestral y práctico.',
    url: 'https://dietaintegral.fit/',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dieta Integral',
    description: 'Acompañamiento en hábitos y alimentación con enfoque ancestral y práctico.',
    images: ['/imagen_logo_svg.svg']
  }
};
import { AboutSection, NewsletterSection, ReelsSection, TestimonialsSection, Footer, YouTubeSection } from '@shared';
import Container from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';
import SectionHeader from '@/shared/ui/SectionHeader';
import { FeaturedArticles } from '@domains/articles';
import prisma from '@/lib/prisma';
import { fetchLatestYouTubeVideos } from '@/lib/youtube';



/* esto es un comentario */
export default async function Home() {
  const reelsSetting = await prisma.setting.findUnique({ where: { id: 'instagram.reels' } })
  const ytSetting = await prisma.setting.findUnique({ where: { id: 'youtube.videos' } })
  const reels = Array.isArray((reelsSetting as any)?.value) ? ((reelsSetting as any).value as any[]).filter((s)=>typeof s==='string') as string[] : []
  let videos = Array.isArray((ytSetting as any)?.value) ? ((ytSetting as any).value as any[]).filter((s)=>typeof s==='string') as string[] : []
  if (!videos.length && process.env.YT_API_KEY && process.env.YT_CHANNEL_ID) {
    try {
      const latest = await fetchLatestYouTubeVideos({
        apiKey: process.env.YT_API_KEY,
        channelId: process.env.YT_CHANNEL_ID,
        maxResults: 6,
      })
      if (latest.length) {
        videos = latest
        // Guardar/actualizar en Setting para próximas visitas
        await prisma.setting.upsert({
          where: { id: 'youtube.videos' },
          update: { value: latest },
          create: { id: 'youtube.videos', value: latest },
        })
      }
    } catch {
      // Ignorar fallos de API y continuar sin videos
    }
  }
  return (
    <div>
      <main>
        {/* Hero minimal */}
        <section className="border-b">
          <Container className="py-16 md:py-24">
            <div className="grid gap-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                  Dieta y Hábitos Ancestrales
                </h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-prose">
                  Acompañamiento en hábitos y nutrición con una interfaz clara que pone el foco en tu progreso.
                </p>
                <div className="flex gap-3">
                  <Button variant="accent" href="/planes">Explorar planes</Button>
                  <Button variant="outline" href="/recetas">Ver recetas</Button>
                </div>
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
          <ReelsSection reels={reels} />
        </Container>

        {/* YouTube section */}
        <Container className="py-12">
          <SectionHeader
            title="YouTube"
            subtitle="Videos destacados del canal."
            align="left"
            className="mb-6"
          />
          <YouTubeSection videos={videos} />
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
