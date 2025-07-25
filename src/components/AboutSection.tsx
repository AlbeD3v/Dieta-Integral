import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <Image src="/nutricionista.png" alt="Nutricionista" width={400} height={400} className="rounded-full" />
        </div>
        <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-800">Sobre el Nutricionista</h2>
          <p className="mt-4 text-gray-600">
            ¡Hola! Soy [Nombre del Nutricionista], y mi pasión es ayudar a las personas a alcanzar sus metas de salud a través de una alimentación consciente y equilibrada.
          </p>
          <p className="mt-2 text-gray-600">
            Quiero ayudarte a mejorar tu bienestar con planes personalizados y consejos prácticos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
