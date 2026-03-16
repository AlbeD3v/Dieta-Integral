import Image from 'next/image';
import Link from 'next/link';
import Container from '@/shared/ui/Container';

const stats = [
  { value: '+500', label: 'Personas acompañadas' },
  { value: '+5', label: 'Años de experiencia' },
  { value: '100%', label: 'Enfoque personalizado' },
];

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#1B4332]">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">

          {/* Image column */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-72 h-72 md:w-[380px] md:h-[380px] flex-shrink-0">
              <div className="absolute inset-0 rounded-3xl bg-[#40916C]/30 blur-2xl scale-105" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10">
                <Image
                  src="/Fotos_Patrones/autor_web.svg"
                  alt="Ale Serrano - Especialista en Dieta Integral"
                  fill
                  sizes="(max-width: 768px) 288px, 380px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#74C69D]">
              Sobre el creador
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white">
              Soy Ale Serrano,<br />
              <span className="text-[#74C69D]">Health Coach</span> y fundador<br />
              de Dieta Integral.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              En Dieta Integral no enseño milagros imposibles, sino{' '}
              <strong className="text-white font-semibold">la máxima expresión de salud que tu biología individual permite</strong>.
              Un enfoque ancestral, práctico y sin dogmas.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                  <p className="text-2xl font-bold text-[#74C69D]">{s.value}</p>
                  <p className="mt-1 text-xs text-white/55 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-[#1B4332] px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Conocer más sobre mí
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
