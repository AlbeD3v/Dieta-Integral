'use client';

import React, { useState, useEffect } from 'react';

interface Slide {
  subtitle: string;
  content: React.ReactNode;
}

const slides: Slide[] = [
  {
    subtitle: 'De dónde viene "Dieta"',
    content: <>La palabra <em className="font-medium">dieta</em> viene del griego <em className="font-medium">diaita</em> y significa <em className="font-medium">estilo de vida</em>. No es solo lo que comes. Es cómo vives completamente.</>
  },
  {
    subtitle: 'Por qué "Integral"',
    content: <>Porque <em className="font-medium">integra</em> lo mejor del estilo de vida ancestral con la realidad de la vida moderna. Toma los hábitos que funcionaron durante miles de años y los adapta para que puedas aplicarlos hoy.</>
  },
  {
    subtitle: "El resultado",
    content: <>Un sistema que respeta tu biología original pero se ajusta a tu vida actual. <em className="block mt-4 text-2xl md:text-3xl font-medium">Dieta Integral: Volver a vivir como tu cuerpo espera, usando las herramientas del siglo XXI.</em></>
  }
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex items-center justify-center min-h-screen -mt-25">
        <div className={`w-full max-w-4xl mx-auto text-white`}>
          <h1 className="text-1.5xl sm:text-2xl md:text-2.5xl lg:text-3xl xl:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8">¿QUÉ ES DIETA INTEGRAL?</h1>
          
          <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 md:mb-6 text-center">{slides[currentSlide].subtitle}</h2>
            <div className="text-lg sm:text-xl md:text-1.7xl lg:text-2xl leading-relaxed text-center max-w-3xl mx-auto">
              {slides[currentSlide].content}
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-3 sm:mt-5 md:mt-7">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
