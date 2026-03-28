export const revalidate = 300;

export const metadata = {
  title: 'Dieta Integral — Nutrición ancestral, ritmos circadianos y salud holística',
  description: 'Transforma tu salud con un sistema integral: alimentación consciente, nutrición ancestral, ritmos circadianos, sueño reparador y hábitos saludables. Acompañamiento personalizado por Ale Serrano para optimizar tu energía, bienestar y claridad mental.',
  alternates: { canonical: 'https://dietaintegral.fit/' },
  openGraph: {
    title: 'Dieta Integral — Alimentación consciente y salud holística',
    description: 'Sistema integral de salud: nutrición ancestral, ritmos circadianos, sueño y hábitos. Acompañamiento personalizado para una vida con más energía y bienestar.',
    url: 'https://dietaintegral.fit/',
    type: 'website',
    images: [{ url: 'https://dietaintegral.fit/og-image.png', width: 1200, height: 630, alt: 'Dieta Integral — Alimentación consciente y salud holística' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dieta Integral — Alimentación consciente y salud holística',
    description: 'Sistema integral: nutrición ancestral, ritmos circadianos, sueño y hábitos para optimizar tu salud.',
    images: ['https://dietaintegral.fit/og-image.png'],
  }
};
import { AboutSection, NewsletterSection, ReelsSection, TestimonialsSection, Footer, YouTubeSection } from '@shared';
import { FadeUp, ScaleIn, HeroStagger, HeroItem, StaggerGrid, StaggerItem } from '@/shared/ui/Motion';
import Container from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';
import SectionHeader from '@/shared/ui/SectionHeader';
import { PillarGraphic, MobilePillarToggle, DisconnectedGraphic } from '@/shared/ui/DynamicGraphics';
import { FeaturedArticles } from '@domains/articles';
import prisma from '@/lib/prisma';
import { fetchLatestYouTubeVideos } from '@/lib/youtube';
import { Leaf, Sun, Moon, TreePine, Zap, Timer, ArrowRight, BookOpen, Check } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  { num: '01', icon: Sun,      label: 'Ritmos circadianos alineados', desc: 'Tu cuerpo tiene un reloj interno. Sincronizarlo cambia todo.' },
  { num: '02', icon: Leaf,     label: 'Nutrición real y densa',        desc: 'Alimentos que tu biología reconoce y aprovecha.' },
  { num: '03', icon: Moon,     label: 'Sueño profundo y reparador',    desc: 'La base de toda recuperación y equilibrio hormonal.' },
  { num: '04', icon: TreePine, label: 'Entorno y luz natural',         desc: 'Las señales ambientales que regulan tu sistema.' },
  { num: '05', icon: Zap,      label: 'Movimiento como señal',         desc: 'No como castigo. Como información para tu cuerpo.' },
  { num: '06', icon: Timer,    label: 'Ayuno estratégico',              desc: 'Dar descanso digestivo para activar la reparación celular.' },
];

const symptoms = [
  'Cansancio constante aunque duermas',
  'Inflamación o digestiones pesadas',
  'Ansiedad o niebla mental',
  'Peso que no responde a tus esfuerzos',
  'Sensación de estar "funcionando a medias"',
  'Irritabilidad sin causa aparente',
];

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((s): s is string => typeof s === 'string') : [];
}

export default async function Home() {
  const reelsSetting = await prisma.setting.findUnique({ where: { id: 'instagram.reels' } })
  const ytSetting    = await prisma.setting.findUnique({ where: { id: 'youtube.videos'  } })
  const reels = toStringArray(reelsSetting?.value)
  let videos  = toStringArray(ytSetting?.value)
  if (!videos.length && process.env.YT_API_KEY && process.env.YT_CHANNEL_ID) {
    try {
      const latest = await fetchLatestYouTubeVideos({ apiKey: process.env.YT_API_KEY, channelId: process.env.YT_CHANNEL_ID, maxResults: 6 })
      if (latest.length) {
        videos = latest
        await prisma.setting.upsert({ where: { id: 'youtube.videos' }, update: { value: latest }, create: { id: 'youtube.videos', value: latest } })
      }
    } catch { /* Ignorar fallos de API */ }
  }

  return (
    <>

        {/* ── 1. HERO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#F7F6F2]">
          <Container className="py-20 md:py-28">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-center">

              {/* Mobile: circular button to reveal orbital graphic */}
              <MobilePillarToggle />

              {/* Left: texto */}
              <HeroStagger className="space-y-7">
                <HeroItem><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">Dieta Integral · Sistema de Salud</p></HeroItem>
                <HeroItem>
                  <h1 className="text-5xl md:text-[3.75rem] font-bold leading-[1.06] tracking-tight text-[#0F172A]">
                    Te ayudo<br />
                    a recuperar<br />
                    <span className="text-[#1B4332]">tu salud.</span>
                  </h1>
                </HeroItem>
                <HeroItem>
                  <p className="text-lg text-[#475569] leading-relaxed max-w-[46ch]">
                    Utilizando un sistema que integra biología ancestral y vida moderna.
                  </p>
                </HeroItem>
                <HeroItem>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link href="/servicios" className="inline-flex items-center gap-2 rounded-lg bg-[#1B4332] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2D6A4F] transition-colors shadow-sm">
                      Descubre el enfoque <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/articulos" className="inline-flex items-center gap-2 rounded-lg border border-[#1B4332]/25 px-6 py-3 text-sm font-semibold text-[#1B4332] hover:bg-[#1B4332]/5 transition-colors">
                      Empieza por aquí
                    </Link>
                  </div>
                </HeroItem>
                <HeroItem>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="h-px w-8 bg-[#B08D57]/40" />
                    <span className="text-xs text-[#475569]">Sistema integral</span>
                    <span className="text-[#B08D57]/40">·</span>
                    <span className="text-xs text-[#475569]">Biología ancestral</span>
                    <span className="text-[#B08D57]/40">·</span>
                    <span className="text-xs text-[#475569]">Vida moderna</span>
                  </div>
                </HeroItem>
              </HeroStagger>

              {/* Right: visual decorativo interactivo */}
              <ScaleIn delay={0.35} className="hidden md:flex items-center justify-center">
                <PillarGraphic />
              </ScaleIn>

            </div>
          </Container>
        </section>

        {/* ── 2. QUÉ ES DIETA INTEGRAL ─────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white border-t border-black/5">
          <Container>
            <FadeUp className="max-w-3xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">El manifiesto</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">¿Qué es Dieta Integral?</h2>
              </div>
              <div className="space-y-7">
                <div className="border-l-2 border-[#B08D57]/35 pl-6 space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">De dónde viene «dieta»</p>
                  <p className="text-[#475569] leading-relaxed">
                    La palabra <span className="bg-[#1B4332]/8 text-[#1B4332] font-semibold px-1.5 rounded">diaita</span> viene del griego y significa <em>estilo de vida</em>. No es solo lo que comes. Es cómo vives completamente.
                  </p>
                </div>
                <div className="border-l-2 border-[#B08D57]/35 pl-6 space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">Por qué «integral»</p>
                  <p className="text-[#475569] leading-relaxed">
                    Porque <span className="bg-[#1B4332]/8 text-[#1B4332] font-semibold px-1.5 rounded">no separa el cuerpo en partes</span>. Integra lo mejor del estilo de vida ancestral con las herramientas del mundo moderno.
                  </p>
                </div>
                <div className="border-l-2 border-[#B08D57]/35 pl-6 space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">El resultado</p>
                  <p className="text-[#475569] leading-relaxed">
                    Un sistema que respeta tu biología original y se adapta a tu vida actual. <span className="bg-[#1B4332]/8 text-[#1B4332] font-semibold px-1.5 rounded">Coherencia biológica aplicada al siglo XXI.</span>
                  </p>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ── 3. EL PROBLEMA ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0D1F14] py-16 md:py-24">
          <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[#1B4332]/25 blur-3xl" />
          <Container className="relative z-10">
            <FadeUp className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

              {/* Visual — fragmentación animada */}
              <div className="flex justify-center">
                <DisconnectedGraphic />
              </div>

              {/* Texto */}
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#74C69D]">El problema</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  El problema no es<br />tu cuerpo.<br />
                  <span className="text-white/40">Es el contexto.</span>
                </h2>
                <blockquote className="border-l-2 border-[#B08D57]/50 pl-5 italic text-white/55 text-lg">
                  "Nadie conecta los puntos."
                </blockquote>
                <div className="space-y-3 text-white/60 leading-relaxed text-[0.95rem]">
                  <p>Hoy la salud se aborda por partes. Un especialista para cada órgano. Un medicamento para cada síntoma.</p>
                  <p>Pero <span className="text-white font-medium">el cuerpo no funciona en compartimentos</span>. Cuando tratas piezas aisladas, pierdes el sistema.</p>
                  <p>Y sin sistema, no hay coherencia.</p>
                </div>
              </div>

            </FadeUp>
          </Container>
        </section>

        {/* ── 4. EL ENFOQUE ────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#F7F6F2]">
          <Container>
            <FadeUp className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">

              {/* Left */}
              <div className="space-y-5 md:pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">El enfoque</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
                  Un sistema,<br />no una solución aislada.
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  Cuando sincronizas el sistema completo, los síntomas dejan de ser el centro. La salud no se fuerza.{' '}
                  <span className="font-semibold text-[#0F172A]">Se facilita.</span>
                </p>
                <Link href="/servicios" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] hover:text-[#2D6A4F] transition-colors">
                  Ver cómo trabajamos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right: pillars numbered */}
              <div className="divide-y divide-black/6">
                {pillars.map(({ num, icon: Icon, label, desc }) => (
                  <div key={num} className="flex items-start gap-5 py-4 group">
                    <span className="text-[1.375rem] font-bold text-[#B08D57]/35 w-8 flex-shrink-0 leading-none mt-1">{num}</span>
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className="w-8 h-8 rounded-full bg-[#1B4332]/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#1B4332]/14 transition-colors">
                        <Icon className="w-4 h-4 text-[#1B4332]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A] text-sm">{label}</p>
                        <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </FadeUp>
          </Container>
        </section>

        {/* ── 5. PARA QUIÉN ────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white border-t border-black/5">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">¿Esto te suena familiar?</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
                  Si te identificas con esto,<br />estás en el lugar correcto.
                </h2>
              </div>
              <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {symptoms.map((s) => (
                  <StaggerItem key={s} className="flex items-start gap-3 rounded-xl border border-black/7 bg-[#F7F6F2] px-4 py-3">
                    <div className="w-4 h-4 rounded-full bg-[#1B4332]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B4332]/50" />
                    </div>
                    <p className="text-sm text-[#475569]">{s}</p>
                  </StaggerItem>
                ))}
              </StaggerGrid>
              <FadeUp className="rounded-2xl border border-[#1B4332]/12 bg-[#1B4332]/5 px-6 py-5 text-center space-y-1.5">
                <p className="font-semibold text-[#0F172A]">No estás fallando.</p>
                <p className="text-[#475569] text-sm">Tu sistema está desalineado. Y eso se puede corregir.</p>
                <Link href="/servicios" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B4332] hover:underline mt-1.5">
                  Ver cómo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ── 6. ARTÍCULOS ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F7F6F2]">
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

        {/* ── 7. REELS ─────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-white">
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

        {/* ── 8. YOUTUBE ───────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F7F6F2]">
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

        {/* ── 9. TESTIMONIOS ───────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F7F6F2]">
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

        {/* ── 10. QUIÉN ESTÁ DETRÁS ────────────────────────────────────── */}
        <AboutSection />

        {/* ── 11. SERVICIOS ────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#F7F6F2]">
          <Container>
            <FadeUp className="text-center mb-12 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">Trabaja con el sistema</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">No contra tu cuerpo.</h2>
              <p className="text-[#475569] max-w-md mx-auto text-sm">Dos caminos para empezar. El mismo destino: coherencia biológica.</p>
            </FadeUp>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

              {/* Card 1 — destacada */}
              <StaggerItem className="relative rounded-2xl border-2 border-[#1B4332] bg-white p-8 flex flex-col shadow-sm">
                <span className="absolute -top-3.5 left-6 bg-[#1B4332] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Recomendado
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332] mb-3">Acompañamiento Integral 1:1</p>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 leading-snug">Un proceso personalizado para reordenar tu biología.</h3>
                <p className="text-sm text-[#475569] mb-6 leading-relaxed">No es una dieta. Es un sistema ajustado a ti.</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {['Alimentación', 'Ritmos de sueño', 'Exposición a luz', 'Estrategia de ayuno', 'Contexto metabólico'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#475569]">
                      <Check className="w-4 h-4 text-[#1B4332] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <Link href="/contacto" className="block w-full rounded-lg bg-[#1B4332] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#2D6A4F] transition-colors">
                    Solicitar información
                  </Link>
                  <Link href="/servicios" className="block w-full rounded-lg border border-[#1B4332]/20 px-5 py-3 text-center text-sm font-medium text-[#1B4332] hover:bg-[#1B4332]/5 transition-colors">
                    Ver detalles
                  </Link>
                </div>
              </StaggerItem>

              {/* Card 2 */}
              <StaggerItem className="rounded-2xl border border-black/10 bg-white p-8 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#475569] mb-3">Programa Base</p>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 leading-snug">Empieza por tu cuenta con una estructura clara.</h3>
                <p className="text-sm text-[#475569] mb-6 leading-relaxed">Para quienes quieren los fundamentos sin acompañamiento continuo.</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {['Guía práctica', 'Protocolos base', 'Fundamentos explicados', 'Estrategia de implementación'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#475569]">
                      <Check className="w-4 h-4 text-[#40916C] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/servicios" className="block w-full rounded-lg border border-black/10 bg-[#F7F6F2] px-5 py-3 text-center text-sm font-semibold text-[#0F172A] hover:bg-[#1B4332]/5 hover:border-[#1B4332]/20 transition-colors">
                  Ver programa
                </Link>
              </StaggerItem>

            </StaggerGrid>
          </Container>
        </section>

        {/* ── 12. CTA FINAL ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0D1F14] py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[280px] bg-[#1B4332]/35 blur-3xl rounded-full" />
          </div>
          <Container className="relative z-10">
            <FadeUp className="max-w-xl mx-auto text-center space-y-6">
              <div className="h-px w-12 bg-[#B08D57]/50 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Tu cuerpo no necesita<br />más parches.
              </h2>
              <p className="text-white/55 text-lg">Necesita coherencia. Empieza hoy.</p>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-[#0D1F14] px-8 py-4 text-sm font-bold hover:bg-white/90 transition-colors shadow-lg"
              >
                Empieza ahora <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-white/30 text-xs">Empieza por el enfoque. Luego ajustamos el resto.</p>
              <div className="h-px w-12 bg-[#B08D57]/30 mx-auto" />
            </FadeUp>
          </Container>
        </section>

        {/* ── 13. NEWSLETTER ───────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#F7F6F2]">
          <Container>
            <NewsletterSection />
          </Container>
        </section>

      <Footer />
    </>
  );
}
