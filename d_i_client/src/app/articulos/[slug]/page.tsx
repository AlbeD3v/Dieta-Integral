export const revalidate = 120

import { Header, Footer } from '@shared';
import Image from 'next/image';
import ArticleContent from './ArticleContent';
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { formatDateES } from '@/utils/date'
import { normalizeImageUrl } from '@/utils/image'
import { buildCanonicalMeta } from '@/utils/seo'
import Script from 'next/script'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const a = await prisma.article.findUnique({ where: { slug }, select: { title: true } })
    const title = a?.title ? `${a.title} | Dieta Integral` : 'Artículo | Dieta Integral'
    const description = 'Lectura clara y práctica para mejorar tu bienestar.'
    return buildCanonicalMeta({ title, description, path: `/articulos/${slug}` })
  } catch {
    return buildCanonicalMeta({ title: 'Artículo | Dieta Integral', description: 'Lectura clara y práctica para mejorar tu bienestar.', path: `/articulos/${slug}` })
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>})  {
  const { slug } = await params
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
            src={normalizeImageUrl(Array.isArray(data.images) && data.images[0] ? String(data.images[0]) : undefined)}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            placeholder="empty"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="mt-4 text-lg">{formatDateES(String(data.publicationDate || ''))}</p>
          </div>
        </section>
        {/* JSON-LD Article */}
        {(() => {
          const base = 'https://dietaintegral.fit'
          const img = normalizeImageUrl(Array.isArray(data.images) && data.images[0] ? String(data.images[0]) : undefined)
          const imageUrl = img?.startsWith('http') ? img : `${base}${img || '/imagen_logo_svg.svg'}`
          const url = `${base}/articulos/${slug}`
          const published = data.publicationDate ? new Date(String(data.publicationDate)).toISOString() : undefined
          const modified = new Date().toISOString()
          const ld = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.title,
            datePublished: published,
            dateModified: modified,
            image: [imageUrl],
            author: { '@type': 'Organization', name: 'Dieta Integral' },
            publisher: {
              '@type': 'Organization',
              name: 'Dieta Integral',
              logo: { '@type': 'ImageObject', url: `${base}/imagen_logo_svg.svg` }
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            url,
          }
          return (
            <Script id="ld-article" type="application/ld+json" strategy="afterInteractive">
              {JSON.stringify(ld)}
            </Script>
          )
        })()}
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
