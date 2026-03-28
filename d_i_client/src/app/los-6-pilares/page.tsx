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
      'Tienes un reloj interno que lleva millones de años funcionando. Se llama ritmo circadiano y regula desde cuándo produces energía hasta cuándo reparan tus células. El problema es que la vida moderna lo tiene completamente desajustado.',
      'La luz artificial de noche, las comidas a deshora, el sueño inconsistente... cada uno de esos hábitos le manda señales contradictorias a tu biología. Y cuando el reloj se desajusta, el metabolismo, las hormonas y el sistema inmune lo pagan.',
      'Volver a sincronizar tus ritmos no es complicado. Es cuestión de respetar la luz del día, la oscuridad de la noche y los horarios que tu cuerpo espera. Cuando lo haces, la energía se dispara, el sueño mejora y el cuerpo empieza a funcionar como fue diseñado.',
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
      'Mientras duermes, tu cuerpo hace todo lo que no puede hacer despierto. Repara tejidos, consolida la memoria, regula las hormonas y limpia el cerebro de residuos metabólicos. El sueño no es tiempo perdido. Es la base de todo lo demás.',
      'El problema es que muy pocas personas duermen bien de verdad, y no es solo una cuestión de horas. La luz artificial, la temperatura del cuarto, los horarios irregulares, las pantallas justo antes de dormir... todo eso interfiere con los procesos que deberían ocurrir cada noche de forma automática.',
      'Desde Dieta Integral, el sueño es tan prioritario como la alimentación. Porque puedes comer perfecto y entrenar todos los días, pero si no descansas bien, tu cuerpo no puede repararse, tu metabolismo no puede regularse y tu energía no puede recuperarse. Sin sueño real, todo lo demás falla.',
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
      'Tu cuerpo no vive en el vacío. Cada estímulo del entorno — la luz que recibes, los campos electromagnéticos a los que te expones, la naturaleza que pisas o que ignoras — le manda señales constantes a tu biología. Señales que la moldean sin que te des cuenta.',
      'El electrosmog, la falta de contacto con la tierra, los espacios cerrados sin luz natural... son factores que tu sistema nervioso percibe como estrés crónico. No porque seas sensible, sino porque tu biología fue diseñada para un entorno completamente diferente.',
      'Optimizar el entorno no es un lujo ni una moda. Es recuperar las condiciones en las que tu cuerpo funciona mejor. A veces con cambios pequeños — una caminata descalzo, menos pantallas por la noche, más verde y menos cemento — se producen los mayores saltos en salud.',
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
      'Durante miles de años, el movimiento fue parte de la vida, no un bloque de 60 minutos separado del resto del día. Caminar, cargar, agacharse, correr cuando era necesario. Tu biología se construyó sobre esa base y la sigue esperando.',
      'El sedentarismo moderno no solo debilita los músculos. Altera la sensibilidad a la insulina, desregula las hormonas, deteriora el sueño y acelera el envejecimiento. No es un problema estético, es un problema metabólico con consecuencias reales.',
      'Desde Dieta Integral, el movimiento que defendemos es el que tu cuerpo reconoce: fuerza funcional, caminata diaria, patrones naturales. Sin obsesiones ni extremos. Simplemente mover más, mover bien y mover con consistencia.',
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
      'Vivimos convencidos de que debemos comer cada pocas horas para estar bien. Pero eso es exactamente lo contrario a lo que tu biología espera. Durante la mayor parte de la historia humana, los períodos sin comida eran la norma, no la excepción.',
      'Cuando dejas de comer durante suficientes horas, ocurre algo importante: el cuerpo deja de gestionar la digestión y empieza a repararse. Se activa la autofagia — el sistema de limpieza celular —, bajan la insulina y la inflamación, y el metabolismo aprende a usar la grasa como combustible principal.',
      'El ayuno intermitente no es una moda pasajera. Es una herramienta ancestral con respaldo científico sólido. Y lo mejor: no cuesta dinero, no requiere suplementos y puede empezarse hoy mismo con un protocolo sencillo.'
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
