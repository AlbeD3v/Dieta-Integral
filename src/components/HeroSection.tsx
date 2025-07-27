import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/hero-image.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold">Comienza tu camino saludable</h1>
        <p className="mt-4 text-lg">Pequeños cambios, grandes resultados.</p>
        <Link href="/articulos" className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full text-lg font-semibold">
          Leer artículos
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
