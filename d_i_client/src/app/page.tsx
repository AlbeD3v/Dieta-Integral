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
import { Leaf, Zap, Brain, ArrowRight, BookOpen } from 'lucide-react';

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

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#1B4332]">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#40916C]/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#2D6A4F]/50 blur-3xl" />

          <Container className="relative z-10 py-20 md:py-28">
            <div className="max-w-2xl space-y-7">
              {/* Eyebrow pill */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm">
                <Leaf className="h-3.5 w-3.5 text-[#74C69D]" />
                Nutrición ancestral · Hábitos reales
              </span>

              {/* Headline */}
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
                Vivir bien no es<br />
                <span className="text-[#74C69D]">restricción</span>,<br />
                es inteligencia.
              </h1>

              {/* Sub */}
              <p className="max-w-lg text-lg leading-relaxed text-white/65 md:text-xl">
                Alimentación consciente basada en tu biología. Sin dietas extremas, sin milagros — resultados reales y duraderos.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button variant="accent" size="lg" href="/planes" className="font-semibold shadow-lg shadow-black/20">
                  Explorar planes
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="/articulos"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Leer el blog
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex">
                  {['#95D5B2', '#52B788', '#40916C', '#2D6A4F'].map((c, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#1B4332]"
                      style={{ background: c, marginLeft: i === 0 ? 0 : '-8px' }}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/60">
                  <span className="font-semibold text-white">+500 personas</span> ya transformaron su salud
                </p>
              </div>
            </div>
          </Container>

          {/* Feature strip */}
          <div className="border-t border-white/10 bg-black/10">
            <Container className="py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Leaf className="h-4 w-4 text-[#74C69D]" />
                  </div>
                  <span>Sin dietas restrictivas</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Zap className="h-4 w-4 text-[#74C69D]" />
                  </div>
                  <span>Energía sostenible</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Brain className="h-4 w-4 text-[#74C69D]" />
                  </div>
                  <span>Hábitos que perduran</span>
                </div>
              </div>
            </Container>
          </div>
        </section>

        {/* ── ARTÍCULOS ─────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="flex items-end justify-between mb-8">
              <SectionHeader
                eyebrow="Del blog"
                title="Artículos destacados"
                subtitle="Lecturas seleccionadas para avanzar de forma práctica."
                align="left"
                className="mb-0"
              />
              <Button variant="ghost" href="/articulos" className="hidden md:flex items-center gap-1.5 text-sm text-primary shrink-0">
                Ver todos <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            <FeaturedArticles />
            <div className="mt-8 flex justify-center md:hidden">
              <Button variant="outline" href="/articulos" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> Ver todos los artículos
              </Button>
            </div>
          </Container>
        </section>

        {/* ── REELS ─────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F2F7F4]">
          <Container>
            <SectionHeader
              eyebrow="Instagram"
              title="Reels"
              subtitle="Contenido breve y accionable para tu día a día."
              align="left"
              className="mb-8"
            />
            <ReelsSection reels={reels} />
          </Container>
        </section>

        {/* ── YOUTUBE ───────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeader
              eyebrow="YouTube"
              title="Videos destacados"
              subtitle="Contenido en profundidad para transformar tu salud."
              align="left"
              className="mb-8"
            />
            <YouTubeSection videos={videos} />
          </Container>
        </section>

        {/* ── TESTIMONIOS ───────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F5F0E8]">
          <Container>
            <SectionHeader
              eyebrow="Testimonios"
              title="Lo que dicen nuestros pacientes"
              subtitle="Experiencias reales de personas que cambiaron su relación con la alimentación."
              align="center"
              className="mb-10 max-w-2xl mx-auto"
            />
            <TestimonialsSection />
          </Container>
        </section>

        {/* ── SOBRE MÍ ──────────────────────────────────────── */}
        <AboutSection />

        {/* ── NEWSLETTER ────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <Container>
            <NewsletterSection />
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
