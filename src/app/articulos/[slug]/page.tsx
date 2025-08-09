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
    // Obtener la URL base
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    
    // Leer el contenido del artículo desde public
    const response = await fetch(`${baseUrl}/articulos/articulo${slug}/articulo${slug}.txt`);
    if (!response.ok) {
      throw new Error(`Error al cargar el artículo: ${response.statusText}`);
    }
    const content = await response.text();
    
    // Simple parsing logic, assuming title is the first line
    const [title, ...contentLines] = content.split('\n');
    const contentWithImages = contentLines.join('\n');

    // Obtener lista de imágenes usando un archivo manifest.json
    const manifestResponse = await fetch(`${baseUrl}/articulos/articulo${slug}/manifest.json`);
    let imageUrls: string[] = [];
    
    if (manifestResponse.ok) {
      const manifest = await manifestResponse.json();
      imageUrls = manifest.images || [];
    } else {
      console.warn(`No se encontró manifest.json para el artículo ${slug}`);
    }

    // Split content by image markers and create segments
    const segments: Segment[] = contentWithImages.split(/\[Img:(\d+)\]/).map((part: string, index: number) => {
      if (index % 2 === 0) {
        // Text content
        return { type: 'text', content: part } as TextSegment;
      } else {
        // Image marker - part will be the number from regex capture
        const imageIndex = parseInt(part) - 1;
        return { 
          type: 'image',
          url: imageUrls[imageIndex] || '',
          alt: `${title} - Imagen ${imageIndex + 1}`
        } as ImageSegment;
      }
    }).filter((segment: Segment): segment is Segment => 
      segment.type === 'text' ? segment.content.trim() !== '' : segment.url !== ''
    );

    return {
      title,
      segments,
      heroImage: imageUrls[0] || '',
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
          <Image src={article.heroImage} alt={article.title} fill sizes="100vw" className="w-full h-full object-cover" />
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
