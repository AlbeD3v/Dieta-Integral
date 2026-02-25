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
import CategoryFilter from './CategoryFilter';
import { ArticleCard } from '@domains/articles';
import Container from '@/shared/ui/Container';
import SectionHeader from '@/shared/ui/SectionHeader';

function resolveBase() {
  const envBase = process.env.NEXT_PUBLIC_CLIENT_URL
  if (envBase && envBase.startsWith('http')) return envBase
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
}

async function fetchArticles() {
  try {
    const base = resolveBase()
    const res = await fetch(`${base}/api/articles?status=published&page=1&pageSize=12`, { cache: 'no-store' })
    if (!res.ok) throw new Error('bad status')
    const data = await res.json()
    return Array.isArray(data?.items) ? data.items : []
  } catch {
    return []
  }
}

async function fetchCategories() {
  try {
    const base = resolveBase()
    const res = await fetch(`${base}/api/categories`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.items) ? data.items : []
  } catch { return [] }
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

