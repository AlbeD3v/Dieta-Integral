import React from 'react';
import { Star } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  avatarBg: string;
  stars: number;
};

const testimonials: Testimonial[] = [
  {
    name: 'María P.',
    role: 'Paciente desde 2023',
    quote: 'Me ayudó a entender mi alimentación desde un enfoque más humano y simple. Dejé de contar calorías y empecé a escuchar mi cuerpo.',
    avatar: 'MP',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    stars: 5,
  },
  {
    name: 'Jorge R.',
    role: 'Seguidor del programa 90 días',
    quote: 'Siento más energía y claridad en mis decisiones diarias. El cambio no fue solo en mi plato, sino en mi mentalidad completa.',
    avatar: 'JR',
    avatarBg: 'bg-amber-100 text-amber-700',
    stars: 5,
  },
  {
    name: 'Ana G.',
    role: 'Programa de hábitos ancestrales',
    quote: 'Acompañamiento respetuoso, práctico y sin dogmas. Me siento más liviana, con energía real y sin ansiedad por la comida.',
    avatar: 'AG',
    avatarBg: 'bg-sky-100 text-sky-700',
    stars: 5,
  },
];

const StarRating: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const TestimonialsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="relative flex flex-col gap-4 rounded-2xl bg-card border border-border/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent rounded-t-2xl" />

          {/* Decorative quote mark */}
          <span className="absolute top-4 right-5 text-6xl leading-none font-serif text-primary/10 select-none pointer-events-none">
            "
          </span>

          {/* Stars */}
          <StarRating count={t.stars} />

          {/* Quote */}
          <p className="text-sm md:text-base text-foreground leading-relaxed flex-grow">
            "{t.quote}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-2 border-t border-border/40">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.avatarBg}`}>
              {t.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">{t.name}</p>
              <p className="text-xs text-muted-foreground leading-tight">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsSection;
