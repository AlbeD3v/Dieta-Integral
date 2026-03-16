import React from 'react';
import { Card, CardContent } from '@shared';

type Testimonial = {
  name: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  { name: 'María P.', quote: 'Me ayudó a entender mi alimentación desde un enfoque más humano y simple.' },
  { name: 'Jorge R.', quote: 'Siento más energía y claridad en mis decisiones diarias.' },
  { name: 'Ana G.', quote: 'Acompañamiento respetuoso y práctico. Totalmente recomendado.' },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="py-6">
                <p className="text-foreground leading-relaxed">“{t.quote}”</p>
                <p className="mt-4 text-sm text-muted-foreground">— {t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
