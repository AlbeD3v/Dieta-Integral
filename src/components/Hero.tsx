import React from 'react';

export const Hero = () => {
  return (
    <div className="w-full min-h-[600px] bg-gradient-to-r from-[var(--hero-gradient-start)] via-[var(--hero-gradient-middle1)] via-[var(--hero-gradient-middle2)] to-[var(--hero-gradient-end)] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-white mb-4">Dieta Integral</h1>
        <p className="text-xl text-white max-w-2xl">
          Tu camino hacia una vida más saludable y equilibrada comienza aquí
        </p>
      </div>
    </div>
  );
};

export default Hero;
