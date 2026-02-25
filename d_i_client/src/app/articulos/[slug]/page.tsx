export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

import { Header, Footer } from '@shared';
import Image from 'next/image';
import ArticleContent from './ArticleContent';
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import prisma from '@/lib/prisma'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>})  {
  const { slug } = await params
  noStore()
  const data = await prisma.article.findUnique({
    where: { slug },
    select: {
      title: true,
      content: true,
      images: true,
      publicationDate: true,
      status: true,
    },
  })
  if (!data || !data.content) return notFound()

  return (
    <div>
      <Header />
      <main>
        <section className="relative h-96 mx-auto">
          <Image
            src={(Array.isArray(data.images) && data.images[0]) ? String(data.images[0]) : '/imagen_logo_svg.svg'}
            alt={data.title}
            fill 
            sizes="100vw" 
            priority 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="mt-4 text-lg">
              {data.publicationDate ? new Date(String(data.publicationDate)).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
            </p>
          </div>
        </section>
        <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-full md:max-w-[800px]">
          <ArticleContent 
            content={String(data.content)}
            images={Array.isArray(data.images) ? (data.images as any[]) : []}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
