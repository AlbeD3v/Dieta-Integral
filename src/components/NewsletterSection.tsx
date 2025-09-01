import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="relative bg-[#1B4332] py-28 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D6A4F]/30 via-[#40916C]/20 to-transparent animate-gradient-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(64,145,108,0.2),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-white/90 text-xl font-medium mb-4 tracking-wide">
          Para empezar a tomar el control, solo hace falta un movimiento:
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            &ldquo;Dar El Primer Paso&rdquo;
          </h2>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12">
            Suscríbete y estarás dando uno de los pasos mas importantes de la vida.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 max-w-xl mx-auto">
            <div className="relative w-full sm:w-[26rem] group">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full px-6 py-4 rounded-full sm:rounded-r-none text-gray-900 bg-white/95 border-2 border-transparent focus:border-[#40916C]/20 focus:outline-none shadow-lg placeholder:text-gray-500 transition-all duration-300 hover:bg-white focus:bg-white"
              />
              <div className="absolute inset-0 rounded-full sm:rounded-r-none bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <button className="group w-full sm:w-auto px-8 py-4 bg-[#40916C] hover:bg-[#2D6A4F] rounded-full sm:rounded-l-none font-semibold text-white border-2 border-transparent hover:border-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:translate-x-0.5">
              <span className="relative inline-flex items-center">
                Suscribirse
                <svg className="w-4 h-4 ml-2 -mr-1 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
          <p className="mt-6 text-sm text-white/70 hover:text-white/90 transition-colors duration-300">
          "Dieta Integral es más que una ideología o filosofía; es un Estilo de Vida."
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
