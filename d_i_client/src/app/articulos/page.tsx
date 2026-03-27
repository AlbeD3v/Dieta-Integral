export const revalidate = 60
import { buildCanonicalMeta } from '@/utils/seo'
export async function generateMetadata() {
  return buildCanonicalMeta({
    title: 'Artículos sobre alimentación consciente, nutrición ancestral y salud integral',
    description: 'Artículos sobre alimentación consciente, nutrición ancestral, ritmos circadianos, ayuno intermitente y hábitos saludables. Lecturas prácticas para transformar tu salud de forma integral.',
    path: '/articulos',
  })
}
import React from 'react';
import type { ArticleDTO, CategoryDTO } from '@dieta/shared-types'
import { unstable_noStore as noStore } from 'next/cache'
import prisma from '@/lib/prisma'
import CategoryFilter from './CategoryFilter';
import { ArticleCard } from '@domains/articles';
import { FadeUp, StaggerGrid, StaggerItem } from '@/shared/ui/Motion';
import Container from '@/shared/ui/Container';
import SectionHeader from '@/shared/ui/SectionHeader';

async function fetchArticles(): Promise<ArticleDTO[]> {
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
  return items as unknown as ArticleDTO[]
}

async function fetchCategories(): Promise<CategoryDTO[]> {
  noStore()
  const cats = await prisma.category.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
    select: { id: true, name: true, slug: true, color: true, order: true },
  })
  return cats as unknown as CategoryDTO[]
}

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    fetchArticles(),
    fetchCategories(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Container className="py-16 md:py-24">
          <SectionHeader
            title="Artículos"
            subtitle="Lecturas claras y prácticas para mejorar tu bienestar."
            align="center"
          />

          <FadeUp className="max-w-5xl mx-auto mb-6">
            <CategoryFilter categories={categories} currentSlug={undefined} />
          </FadeUp>

          {!articles.length ? (
            <p className="text-sm text-muted-foreground text-center">Aún no hay artículos publicados.</p>
          ) : (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((article: ArticleDTO) => (
              <StaggerItem key={article.id || article.slug}>
                <ArticleCard
                  title={article.title}
                  description={article.summary}
                  images={article.images}
                  articleUrl={`/articulos/${article.slug}`}
                  publicationDate={article.publicationDate ? String(article.publicationDate) : undefined}
                  category={article.categoryRef?.name ?? (article.category ?? undefined)}
                  categoryColor={article.categoryRef?.color !== null && article.categoryRef?.color !== undefined ? article.categoryRef.color : undefined}
                  categorySlug={article.categoryRef?.slug || undefined}
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
          )}
        </Container>
      </div>
    </div>
  );
}

