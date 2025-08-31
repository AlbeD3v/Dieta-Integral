import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function SobreMiPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-row-reverse items-start gap-12">
          <aside className="sticky top-24 flex-shrink-0">
            <div className="relative w-[250px] h-[250px]">
              <Image 
                src="/Fotos_Patrones/autor_web.jpg"
                alt="Ale Serrano - Especialista en Dieta Integral"
                fill
                sizes="250px"
                priority
                className="rounded-full object-cover"
                style={{ 
                  objectFit: 'cover', 
                  objectPosition: 'center 100%'
                }}
              />
            </div>
          </aside>

          <div className="flex-1 max-w-3xl">
            <h1 className="text-5xl font-bold mb-12 text-center">Dieta Integral</h1>

            <div className="space-y-6 text-lg">
              <p className="text-xl">
                Certificado en Nutrición Moderna con el Dr. Guillermo Rodríguez Navarrete (Florida Global University y Universidad Católica San Antonio de Murcia), y miembro del equipo élite de Nutriteam Coach con acceso a protocolos avanzados.
              </p>

              <p>
                Pero mi verdadera especialización no viene solo de los libros.
              </p>

              <p>
                Hace cinco años descubrí una verdad incómoda: el sistema médico tradicional no me iba a sanar, solo me iba a mantener &ldquo;estable&rdquo; a ratos. Conviviendo con una Anemia Diseritropoyética Congénita, y después de una Aplasia Medular en la adolescencia, sumado a varias crisis y más adelante en el 2020 tras seguir recomendaciones oficiales mantengo el bazo inflamado, limitando bastante mi actividad física y salud global, tuve dos opciones: resignarme o convertirme en mi propio laboratorio viviente.
              </p>

              <p className="text-xl font-semibold">
                <em>Elegí la segunda.</em>
              </p>

              <p>
                Durante 5 años me sumergí en encontrar solución a mis problemas, probando cada protocolo en mi propio cuerpo. <strong>Cada concepto que enseño ha pasado por el laboratorio de mi propia experiencia.</strong>
              </p>

              <p>
                Hoy, aunque mi condición congénita persiste, vivo con más energía y vitalidad que muchas personas &ldquo;sanas&rdquo;. Esa optimización dentro de los límites de la realidad es exactamente lo que enseño en <strong>Dieta Integral</strong>: no milagros imposibles, sino la máxima expresión de salud que tu biología individual permite.
              </p>

              <p className="text-xl font-semibold italic">
                Si funcionó conmigo teniendo una condición médica crónica, imagínate lo que puede hacer por ti.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
