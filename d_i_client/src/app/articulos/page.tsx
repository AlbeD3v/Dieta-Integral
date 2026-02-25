export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
export const metadata = {
  title: 'Artículos | Dieta Integral',
  description: 'Lecturas claras y prácticas para mejorar tu bienestar.',
  alternates: { canonical: 'https://dietaintegral.fit/articulos' },
  openGraph: {
    title: 'Artículos | Dieta Integral',
    description: 'Lecturas claras y prácticas para mejorar tu bienestar.',
    url: 'https://dietaintegral.fit/articulos',
    type: 'website',
    images: [{ url: '/imagen_logo_svg.svg', alt: 'Dieta Integral' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artículos | Dieta Integral',
    description: 'Lecturas claras y prácticas para mejorar tu bienestar.',
    images: ['/imagen_logo_svg.svg'],
  },
};
import React from 'react';
import { unstable_noStore as noStore } from 'next/cache'
import prisma from '@/lib/prisma'
import CategoryFilter from './CategoryFilter';
import { ArticleCard } from '@domains/articles';
import Container from '@/shared/ui/Container';
import SectionHeader from '@/shared/ui/SectionHeader';

async function fetchArticles() {
  noStore()
  const items = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publicationDate: 'desc' },
    take: 12,
    select: {
      id: true, slug: true, title: true, summary: true, images: true,
      publicationDate: true, category: true,
      categoryRef: { select: { name: true, slug: true, color: true } },
    },
  })
  return items
}

async function fetchCategories() {
  noStore()
  const cats = await prisma.category.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
    select: { id: true, name: true, slug: true, color: true, order: true },
  })
  return cats
}

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    fetchArticles(),
    fetchCategories(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Container className="py-16 md:py-24">
          <SectionHeader
            title="Artículos"
            subtitle="Lecturas claras y prácticas para mejorar tu bienestar."
            align="center"
          />

          <div className="max-w-5xl mx-auto mb-6">
            <CategoryFilter categories={categories} currentSlug={undefined} />
          </div>

          {!articles.length ? (
            <p className="text-sm text-muted-foreground text-center">Aún no hay artículos publicados.</p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((article: any) => (
              <ArticleCard
                key={article.id || article.slug}
                title={article.title}
                description={article.summary}
                images={article.images}
                articleUrl={`/articulos/${article.slug}`}
                publicationDate={article.publicationDate}
                category={article.categoryRef?.name || article.category}
                categoryColor={article.categoryRef?.color}
                categorySlug={article.categoryRef?.slug}
              />
            ))}
          </div>
          )}
        </Container>
      </main>
    </div>
  );
}

