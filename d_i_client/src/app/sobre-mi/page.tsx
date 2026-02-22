export const metadata = {
  title: 'Sobre mí | Dieta Integral',
  description: 'Conoce mi historia, mi enfoque y por qué hago lo que hago desde una perspectiva ancestral y práctica.',
  openGraph: {
    title: 'Sobre mí | Dieta Integral',
    description: 'Historia y enfoque de acompañamiento en alimentación consciente.',
    url: 'https://tusitio.com/sobre-mi',
    type: 'article'
  }
};
import { Breadcrumbs } from '@shared';
import Image from 'next/image';
import Container from '@/shared/ui/Container';

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Container className="py-16">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Sobre mí' }]} />
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-12">
            {/* Aside con imagen */}
            <aside className="md:sticky md:top-24 flex-shrink-0">
              <div className="relative w-[250px] h-[250px]">
                <Image 
                  src="/Fotos_Patrones/autor_web.svg"
                  alt="Ale Serrano - Especialista en Dieta Integral"
                  fill
                  sizes="250px"
                  priority
                  className="rounded-full object-cover"
                  style={{ objectFit: 'cover', objectPosition: 'center 100%' }}
                />
              </div>
            </aside>

            {/* Contenido estructurado */}
            <div className="flex-1 max-w-3xl mx-auto md:mx-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Sobre mí</h1>

              {/* Tu historia */}
              <section className="space-y-4 text-lg mb-10">
                <h2 className="text-2xl font-semibold">Tu historia</h2>
                <p className="text-xl">Certificado en Nutrición Moderna con el Dr. Guillermo Rodríguez Navarrete (Florida Global University y Universidad Católica San Antonio de Murcia).</p>
                <p>Pero mi verdadera especialización no viene solo de los libros.</p>
                <p>
                  Hace cinco años descubrí una verdad incómoda: el sistema médico tradicional no me iba a sanar, solo me iba a mantener &ldquo;estable&rdquo; a ratos. Conviviendo con una Anemia Diseritropoyética Congénita, y después de una Aplasia Medular en la adolescencia, sumado a varias crisis y más adelante en el 2020 tras seguir recomendaciones oficiales mantengo el bazo inflamado, limitando bastante mi actividad física y salud global, tuve dos opciones: resignarme o convertirme en mi propio laboratorio viviente.
                </p>
                <p className="text-xl font-semibold"><em>Elegí la segunda.</em></p>
              </section>

              {/* Por qué haces lo que haces */}
              <section className="space-y-4 text-lg mb-10">
                <h2 className="text-2xl font-semibold">Por qué hago lo que hago</h2>
                <p>
                  Durante 5 años me sumergí en encontrar solución a mis problemas, probando cada protocolo en mi propio cuerpo. <strong>Cada concepto que enseño ha pasado por el laboratorio de mi propia experiencia.</strong>
                </p>
                <p>
                  Hoy, aunque mi condición congénita persiste, vivo con más energía y vitalidad que muchas personas &ldquo;sanas&rdquo;. Acompaño a otras personas a encontrar su mejor estado posible dentro de su biología real y contexto de vida.
                </p>
              </section>

              {/* Qué te diferencia */}
              <section className="space-y-4 text-lg">
                <h2 className="text-2xl font-semibold">Qué me diferencia</h2>
                <p>
                  En <strong>Dieta Integral</strong> no prometo milagros imposibles. Mi enfoque integra conocimiento moderno con una visión práctica y ancestral: buscar la máxima expresión de salud que tu biología individual permite, sin dogmas ni extremos.
                </p>
                <p className="text-xl font-semibold italic">
                  Si funcionó conmigo teniendo una condición médica crónica, imagínate lo que puede hacer por ti.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
