import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface TextSegment {
  type: 'text';
  content: string;
}

interface ImageSegment {
  type: 'image';
  url: string;
  alt: string;
}

type Segment = TextSegment | ImageSegment;

async function getArticle(slug: string) {
  try {
    // Importar los datos de los artículos
    const articles = (await import('../../../data/articles')).default;
    
    // Buscar el artículo por su slug
    const article = articles[slug];
    if (!article) {
      throw new Error(`No se pudo encontrar el artículo ${slug}`);
    }

    // Separar el contenido en segmentos usando los marcadores de imagen
    const segments = article.content.split(/\[Img:(\d+)\]/).map((part, index) => {
      if (index % 2 === 0) {
        // Contenido de texto
        return { type: 'text', content: part.trim() } as TextSegment;
      } else {
        // Marcador de imagen
        const imageIndex = parseInt(part) - 1;
        return {
          type: 'image',
          url: article.images[imageIndex] || '',
          alt: `${article.title} - Imagen ${imageIndex + 1}`
        } as ImageSegment;
      }
    }).filter(segment => 
      segment.type === 'text' ? segment.content !== '' : segment.url !== ''
    );

    return {
      title: article.title,
      segments,
      heroImage: article.images[0] || '',
      publicationDate: "Fecha de Publicación de Ejemplo" // Placeholder
    };



  } catch (error) {
    console.error('Error al cargar el artículo:', error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>})  {
  const {slug} = await params;
  const article = await getArticle(slug);

  return (
    <div>
      <Header />
      <main>
        <section className="relative h-96">
          <Image 
            src={article.heroImage} 
            alt={article.title} 
            fill 
            sizes="100vw" 
            priority 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="mt-4 text-lg">{article.publicationDate}</p>
          </div>
        </section>
        <section className="container mx-auto px-6 py-12">
          <article className="prose lg:prose-xl max-w-none">
            {article.segments.map((segment, index) => (
              segment.type === 'text' ? (
                <div key={index} dangerouslySetInnerHTML={{ __html: segment.content.replace(/\n/g, '<br />') }} />
              ) : (
                <div key={index} className="my-8 relative aspect-video">
                  <Image 
                    src={segment.url}
                    alt={segment.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover rounded-lg"
                  />
                </div>
              )
            ))}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
