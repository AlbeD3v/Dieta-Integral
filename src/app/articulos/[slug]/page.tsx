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

async function getArticle(slug: string) {
  try {
    // Importar los datos de los artículos
    const articles = (await import('../../../data/articles')).default;
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
      images: article.images,
      publicationDate: "14 de Agosto, 2025"
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
        <section className="relative h-96 mx-auto">
          <Image 
            src={article.images[0] || ''} 
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
        <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-full md:max-w-[800px]">
          <article className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            {article.segments.map((segment, index) => (
              segment.type === 'text' ? (
                <div 
                  key={index} 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: segment.content.split('\n\n').map(p => {
                      if (p.startsWith('##')) {
                        const hasEmphasis = p.match(/^## \*(.+)\*$/);
                        const title = hasEmphasis ? hasEmphasis[1] : p.replace(/^## /, '');
                        const className = `font-libre text-2xl md:text-3xl lg:text-4xl font-bold mt-16 mb-8 leading-tight text-center ${hasEmphasis ? 'text-primary/90 border-b border-primary/20 pb-2' : ''}`;
                        return `<h2 class="${className}">${title}</h2>`;
                      } else if (p.startsWith('#')) {
                        const hasEmphasis = p.match(/^# \*(.+)\*$/);
                        const title = hasEmphasis ? hasEmphasis[1] : p.replace(/^# /, '');
                        const className = `font-libre text-3xl md:text-4xl lg:text-5xl font-bold mt-20 mb-10 leading-tight text-center ${hasEmphasis ? 'text-primary/90 border-b border-primary/20 pb-3' : ''}`;
                        return `<h1 class="${className}">${title}</h1>`;
                      } else {
                        return `<div class="max-w-[65ch] mx-auto"><p class="mb-6 font-libre text-lg leading-relaxed text-justify">${p.replace(/\*([^*]+)\*/g, '<strong class="text-primary/90 inline-block my-2">$1</strong>')}</p></div>`;
                      }
                    })
                    .join('\n')
                  }} 
                />
              ) : (
                index > 0 && (
                  <figure key={index} className="my-16 relative group">
                    <div className="aspect-video relative shadow-lg rounded-lg overflow-hidden bg-black/5">
                      <Image 
                        src={segment.url}
                        alt={segment.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority={index < 3}
                      />
                    </div>
                  </figure>
                )
              )
            ))}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
