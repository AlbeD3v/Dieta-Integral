import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ArticleContent from './ArticleContent';

async function getArticle(slug: string) {
  try {
    const articles = (await import('../../../data/articles')).default;
    const article = articles[slug];
    
    if (!article) {
      throw new Error(`No se pudo encontrar el artículo ${slug}`);
    }

    return {
      title: article.title,
      content: article.content,
      images: article.images,
      publicationDate: "14 de Agosto, 2025"
    };
  } catch (error) {
    console.error('Error al cargar el artículo:', error);
    throw error;
  }
}

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
          <ArticleContent 
            content={article.content}
            images={article.images}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
