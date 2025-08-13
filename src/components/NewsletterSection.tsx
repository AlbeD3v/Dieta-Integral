import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="relative bg-[#1B4332] py-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D6A4F]/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(64,145,108,0.4),transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-12 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          "Pequeños cambios, grandes resultados"
        </h2>
        <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
          Suscríbete a nuestro boletín para recibir los últimos artículos y consejos.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          <input 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="px-6 py-4 rounded-full sm:rounded-r-none w-full sm:w-96 text-black border-2 border-transparent focus:border-primary/20 focus:outline-none"
          />
          <button className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 rounded-full sm:rounded-l-none font-semibold text-white border-2 border-transparent hover:border-white/10 transition-all duration-300">
            Suscribirse
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
