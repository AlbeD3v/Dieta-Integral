import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <div className="relative w-[400px] h-[400px]">
            <Image 
              src="/Fotos_Patrones/autor_web.jpg" 
              alt="Ale Serrano - Especialista en Dieta Integral" 
              fill
              sizes="400px"
              className="rounded-full object-cover"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center bottom'
              }}
            />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <h2 className="text-4xl font-bold text-foreground leading-tight mb-4">Soy Ale Serrano, especialista en Dieta Integral y fundador de este proyecto.</h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Si estas cansado del lastre de tu vida normal, estas en el lugar indicado para adentrarte en el <strong>Universo de la Dieta Integral</strong>.
          </p>
          <Link 
            href="/sobre-mi" 
            className="mt-6 inline-flex px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors text-lg"
          >
            Dieta Integral
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
