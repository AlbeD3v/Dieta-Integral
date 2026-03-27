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
    const a = await prisma.article.findUnique({ where: { slug }, select: { title: true, summary: true, images: true } })
    const title = a?.title ? `${a.title}` : 'Artículo | Dieta Integral'
    const description = a?.summary || 'Lectura clara y práctica sobre alimentación consciente, nutrición ancestral y hábitos saludables para mejorar tu bienestar.'
    const img = a?.images && Array.isArray(a.images) && a.images[0] ? String(a.images[0]) : undefined
    const image = img?.startsWith('http') ? img : img ? `https://dietaintegral.fit${img}` : undefined
    return {
      ...buildCanonicalMeta({ title, description, path: `/articulos/${slug}` }),
      ...(image ? { openGraph: { images: [{ url: image, alt: title }] } } : {}),
    }
  } catch {
    return buildCanonicalMeta({ title: 'Artículo | Dieta Integral', description: 'Lectura clara y práctica sobre alimentación consciente y nutrición ancestral para mejorar tu bienestar.', path: `/articulos/${slug}` })
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>})  {
  const { slug } = await params
  const data = await prisma.article.findUnique({
    where: { slug },
    select: {
      title: true,
      summary: true,
      content: true,
      images: true,
      publicationDate: true,
      status: true,
      categoryRef: { select: { name: true } },
    },
  })
  if (!data || !data.content) return notFound()

  return (
    <div>
      <div>
        {/* <section className="relative h-96 mx-auto">
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
        </section> */}
        {/* JSON-LD Article */}
        {(() => {
          const base = 'https://dietaintegral.fit'
          const img = normalizeImageUrl(Array.isArray(data.images) && data.images[0] ? String(data.images[0]) : undefined)
          const imageUrl = img?.startsWith('http') ? img : `${base}${img || '/imagen_logo_svg.svg'}`
          const url = `${base}/articulos/${slug}`
          const published = data.publicationDate ? new Date(String(data.publicationDate)).toISOString() : undefined
          const modified = new Date().toISOString()
          const wordCount = data.content ? String(data.content).split(/\s+/).length : undefined
          const ld = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.title,
            description: data.summary || undefined,
            datePublished: published,
            dateModified: modified,
            image: [imageUrl],
            wordCount,
            inLanguage: 'es',
            articleSection: data.categoryRef?.name || 'Salud integral',
            author: {
              '@type': 'Person',
              name: 'Ale Serrano',
              url: `${base}/sobre-mi`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Dieta Integral',
              logo: { '@type': 'ImageObject', url: `${base}/imagen_logo_svg.svg`, width: 512, height: 512 }
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            url,
          }
          const breadcrumb = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: base },
              { '@type': 'ListItem', position: 2, name: 'Artículos', item: `${base}/articulos` },
              { '@type': 'ListItem', position: 3, name: data.title, item: url },
            ],
          }
          return (
            <>
              <Script id="ld-article" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(ld)}
              </Script>
              <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(breadcrumb)}
              </Script>
            </>
          )
        })()}
        <section className="mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 max-w-3xl">
          <ArticleContent 
            content={String(data.content)}
            images={Array.isArray(data.images) ? data.images.map(String) : []}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
