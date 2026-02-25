import { Header, Footer } from '@shared';
import Image from 'next/image';
import ArticleContent from './ArticleContent';
import { notFound } from 'next/navigation'

type Article = { title: string; content: string; images: string[]; publicationDate?: string | null }

async function getApiArticle(slug: string): Promise<Article | null> {
  try {
    const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/articles/${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return { title: data.title, content: data.content, images: data.images || [], publicationDate: data.publicationDate }
  } catch {
    return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>})  {
  const { slug } = await params;
  const article = await getApiArticle(slug)
  if (!article) return notFound()

  return (
    <div>
      <Header />
      <main>
        <section className="relative h-96 mx-auto">
          <Image 
            src={(article.images && article.images[0]) ? article.images[0] : '/imagen_logo_svg.svg'} 
            alt={article.title} 
            fill 
            sizes="100vw" 
            priority 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="mt-4 text-lg">
              {article.publicationDate ? new Date(article.publicationDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
            </p>
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
