import { Footer } from '@shared';
import Container from '@/shared/ui/Container';
import { FadeUp } from '@/shared/ui/Motion';
import { Sun, Leaf, Moon, TreePine, Zap, Timer } from 'lucide-react';
import { buildCanonicalMeta } from '@/utils/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = buildCanonicalMeta({
  title: 'Los 6 pilares — Dieta Integral',
  description: 'Descubre los seis pilares de Dieta Integral: ritmos circadianos, nutrición real, sueño reparador, entorno natural, movimiento funcional y ayuno estratégico.',
  path: '/los-6-pilares',
});

const pillars = [
  {
    num: '01',
    icon: Sun,
    title: 'Ritmos circadianos',
    subtitle: 'Tu reloj interno lo cambia todo',
    color: '#E2A03F',
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200/60',
    content: [
      'Tu cuerpo tiene un reloj interno que regula prácticamente cada función biológica: el metabolismo, la producción hormonal, el estado de ánimo, la temperatura corporal, la reparación celular.',
      'Cuando sincronizas tus hábitos con los ciclos de luz y oscuridad, todo empieza a funcionar mejor. No porque hagas más, sino porque lo haces en el momento correcto.',
      'La exposición a luz solar temprana, la regulación de horarios de comida y el respeto al ciclo de oscuridad nocturna son las herramientas más potentes y gratuitas que tienes.',
    ],
  },
  {
    num: '02',
    icon: Leaf,
    title: 'Nutrición real y densa',
    subtitle: 'Alimentos que tu biología reconoce',
    color: '#1B4332',
    bg: 'from-emerald-50 to-green-50',
    border: 'border-emerald-200/60',
    content: [
      'No hablamos de dietas restrictivas ni de contar calorías. Hablamos de volver a comer alimentos que tu cuerpo reconoce como comida: densos en nutrientes, mínimamente procesados, ancestralmente disponibles.',
      'Proteína de calidad, grasas estables, vegetales con fibra, minerales y vitaminas en su forma biodisponible. Sin dogmas, sin modas, solo bioquímica y sentido común.',
      'Cuando le das a tu cuerpo lo que necesita en lugar de lo que la industria quiere venderte, la inflamación baja, la energía sube y los antojos desaparecen.',
    ],
  },
  {
    num: '03',
    icon: Moon,
    title: 'Sueño profundo y reparador',
    subtitle: 'La base de toda recuperación',
    color: '#4338CA',
    bg: 'from-indigo-50 to-violet-50',
    border: 'border-indigo-200/60',
    content: [
      'El sueño no es tiempo perdido. Es el momento en que tu cuerpo repara tejidos, consolida memoria, regula hormonas, limpia el cerebro de metabolitos tóxicos y resetea el sistema inmune.',
      'Sin sueño profundo y continuado, ninguna otra intervención funciona al máximo. Puedes comer perfecto y entrenar fuerte, pero si duermes mal, el sistema no se recupera.',
      'Optimizar el sueño implica controlar la luz nocturna, mantener horarios regulares, cuidar la temperatura de la habitación y gestionar el estrés antes de dormir.',
    ],
  },
  {
    num: '04',
    icon: TreePine,
    title: 'Entorno y luz natural',
    subtitle: 'El contexto que tu cuerpo necesita',
    color: '#166534',
    bg: 'from-green-50 to-teal-50',
    border: 'border-green-200/60',
    content: [
      'Tu biología se diseñó para funcionar en un entorno natural: luz solar directa, variaciones de temperatura, contacto con la tierra, aire fresco, sonidos naturales.',
      'Las señales ambientales regulan tu sistema nervioso, tu producción hormonal y tu estado de ánimo de formas que la ciencia apenas empieza a cuantificar pero que la experiencia humana siempre supo.',
      'Integrar más naturaleza, más luz real y menos entornos artificiales no es un lujo. Es una necesidad biológica que tu cuerpo reclama silenciosamente todos los días.',
    ],
  },
  {
    num: '05',
    icon: Zap,
    title: 'Movimiento funcional',
    subtitle: 'No como castigo, como información',
    color: '#B45309',
    bg: 'from-orange-50 to-amber-50',
    border: 'border-orange-200/60',
    content: [
      'El movimiento no es solo ejercicio. Es la señal más potente que le puedes enviar a tu cuerpo de que estás vivo, activo y necesitas seguir funcionando.',
      'El músculo es un órgano endocrino: cuando se contrae libera mioquinas antiinflamatorias, mejora la sensibilidad a la insulina, regula el sistema inmune y protege el cerebro.',
      'No necesitas un gimnasio ni una rutina extrema. Necesitas moverte con frecuencia, con variedad y con intención. Caminar, cargar, trepar, agacharte. Lo que tu cuerpo siempre hizo.',
    ],
  },
  {
    num: '06',
    icon: Timer,
    title: 'Ayuno estratégico',
    subtitle: 'Descanso digestivo para regenerarte',
    color: '#7C3AED',
    bg: 'from-violet-50 to-purple-50',
    border: 'border-violet-200/60',
    content: [
      'El ayuno no es pasar hambre. Es darle a tu cuerpo ventanas de descanso digestivo para que active procesos de reparación que solo ocurren cuando no estás comiendo: autofagia, reciclaje celular, equilibrio hormonal.',
      'Durante miles de años, comer cada 3 horas no existió. Tu biología está diseñada para alternar entre períodos de alimentación y períodos de ayuno. Esa alternancia es una señal de salud, no de carencia.',
      'Un ayuno bien llevado mejora la sensibilidad a la insulina, reduce la inflamación sistémica, clarifica la mente y enseña a tu cuerpo a usar sus reservas. No es una moda, es biología básica.',
    ],
  },
];

export default function Los6PilaresPage() {
  return (
    <div>
      <div>
        {/* Hero */}
        <section className="relative bg-[#F7F6F2] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1B4332_0%,transparent_50%)] opacity-5" />
          <Container className="py-20 md:py-28 relative z-10">
            <FadeUp className="max-w-3xl mx-auto text-center space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">Dieta Integral</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight">
                Los 6 pilares
              </h1>
              <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
                Un sistema integral construido sobre seis fundamentos que trabajan juntos.
                No es una dieta. No es un plan. Es la forma en que tu cuerpo siempre quiso funcionar.
              </p>
            </FadeUp>
          </Container>
        </section>

        {/* Pillars */}
        <section className="py-16 md:py-24 bg-white">
          <Container>
            <div className="space-y-16 md:space-y-24 max-w-4xl mx-auto">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                const isEven = idx % 2 === 1;
                return (
                  <FadeUp key={p.num} delay={idx * 0.05}>
                    <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-start`}>
                      {/* Icon + number */}
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${p.bg} ${p.border} border flex items-center justify-center relative`}>
                          <Icon className="w-9 h-9 md:w-11 md:h-11" style={{ color: p.color }} strokeWidth={1.5} />
                          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-sm border border-black/8 flex items-center justify-center text-[10px] font-bold text-[#0F172A]">
                            {p.num}
                          </span>
                        </div>
                      </div>
                      {/* Text */}
                      <div className="space-y-4 flex-1">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: p.color }}>{p.subtitle}</p>
                          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">{p.title}</h2>
                        </div>
                        <div className="space-y-3">
                          {p.content.map((text, i) => (
                            <p key={i} className="text-[#475569] leading-relaxed">{text}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    {idx < pillars.length - 1 && (
                      <div className="mt-12 md:mt-16 flex justify-center">
                        <div className="w-px h-12 bg-gradient-to-b from-black/10 to-transparent" />
                      </div>
                    )}
                  </FadeUp>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-[#F7F6F2] border-t border-black/5">
          <Container>
            <FadeUp className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
                Tu cuerpo ya sabe lo que necesita.
              </h2>
              <p className="text-[#475569] leading-relaxed">
                Los seis pilares no son reglas. Son el contexto que tu biología necesita para funcionar como fue diseñada.
                Cuando alineas estos fundamentos, el sistema completo responde.
              </p>
            </FadeUp>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
}
