// import Link from 'next/link';

// const HeroSection = () => {
//   return (
//     <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/hero-image.png')" }}>
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
//         <h1 className="text-4xl font-bold">Comienza tu camino saludable</h1>
//         <p className="mt-4 text-lg">Pequeños cambios, grandes resultados.</p>
//         <Link href="/articulos" className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full text-lg font-semibold">
//           Leer artículos
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/placeholder.svg?height=800&width=1200')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          Comienza tu camino saludable
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto">
          Pequeños cambios, grandes resultados.
        </p>
        <Link href="/articulos">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Leer artículos
          </Button>
        </Link>
      </div>
    </section>
  )
}
