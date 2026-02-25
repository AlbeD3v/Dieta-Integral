export const dynamic = 'force-dynamic'

import React from 'react'
import Container from '@/shared/ui/Container'
import SectionHeader from '@/shared/ui/SectionHeader'
import { ArticleCard } from '@domains/articles'
import Link from 'next/link'

async function fetchArticlesBySlug(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/articles?status=published&categorySlug=${encodeURIComponent(slug)}&page=1&pageSize=24`, { cache: 'no-store' })
    if (!res.ok) throw new Error('bad status')
    const data = await res.json()
    return Array.isArray(data?.items) ? data.items : []
  } catch { return [] }
}

async function fetchCategories() {
  try {
    const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/categories`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.items) ? data.items : []
  } catch { return [] }
}

export default async function CategoryArticlesPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const [articles, categories] = await Promise.all([
    fetchArticlesBySlug(slug),
    fetchCategories(),
  ])
  const current = categories.find((c: any) => c.slug === slug)

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Container className="py-16 md:py-24">
          <SectionHeader
            title={current?.name ? `Artículos: ${current.name}` : 'Artículos por categoría'}
            subtitle={current?.name ? `Explora artículos en ${current.name}` : 'Explora artículos por categoría'}
            align="center"
          />

          <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
            <Link href="/articulos" className="text-sm underline underline-offset-4">Todas las categorías</Link>
            {/* Reuse the simple filter from list page */}
            {/* This file is server component; a small client filter exists on list page */}
          </div>

          {!articles.length ? (
            <p className="text-sm text-muted-foreground text-center">No hay artículos publicados en esta categoría.</p>
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
  )
}
