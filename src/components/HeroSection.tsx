import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)] animate-gradient-slow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.08),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-start h-[90vh] text-white text-center pt-[15vh]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
          Comienza tu camino saludable
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12">
          Pequeños cambios, grandes resultados.
        </p>
        <Link 
          href="/articulos" 
          className="group relative px-8 py-4 bg-[#153025] hover:bg-[#1B4332] rounded-full text-lg font-semibold text-white border border-[#2D6A4F]/40 transition-all duration-500 hover:border-[#40916C]/60 hover:scale-105 hover:shadow-[0_0_40px_rgba(27,67,50,0.6)]"
        >
          <span className="relative z-10">Leer artículos</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D6A4F]/0 via-[#2D6A4F]/20 to-[#2D6A4F]/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
