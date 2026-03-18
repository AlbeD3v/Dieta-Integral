export const dynamic = 'force-dynamic'

import React from 'react'
import Container from '@/shared/ui/Container'
import SectionHeader from '@/shared/ui/SectionHeader'
import { ArticleCard } from '@domains/articles'
import Link from 'next/link'
import type { ArticleDTO, CategoryDTO } from '@dieta/shared-types'
import prisma from '@/lib/prisma'
import { buildCanonicalMeta } from '@/utils/seo'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  try {
    const cat = await prisma.category.findUnique({ where: { slug }, select: { name: true } })
    const title = cat?.name ? `${cat.name} — Artículos sobre ${cat.name.toLowerCase()} y salud integral` : `Artículos por categoría | Dieta Integral`
    const description = cat?.name ? `Artículos sobre ${cat.name.toLowerCase()}: lecturas prácticas sobre alimentación consciente, nutrición ancestral y hábitos saludables para mejorar tu bienestar de forma integral.` : 'Explora artículos por categoría sobre alimentación consciente, nutrición ancestral y salud integral.'
    return buildCanonicalMeta({ title, description, path: `/articulos/categoria/${slug}` })
  } catch {
    return buildCanonicalMeta({ title: 'Artículos por categoría | Dieta Integral', description: 'Explora artículos por categoría sobre alimentación consciente, nutrición ancestral y salud integral.', path: `/articulos/categoria/${slug}` })
  }
}

async function fetchArticlesBySlug(slug: string): Promise<ArticleDTO[]> {
  try {
    const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/articles?status=published&categorySlug=${encodeURIComponent(slug)}&page=1&pageSize=24`, { cache: 'no-store' })
    if (!res.ok) throw new Error('bad status')
    const data = await res.json()
    return Array.isArray(data?.items) ? (data.items as ArticleDTO[]) : []
  } catch { return [] }
}

async function fetchCategories(): Promise<CategoryDTO[]> {
  try {
    const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/categories`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.items) ? (data.items as CategoryDTO[]) : []
  } catch { return [] }
}

export default async function CategoryArticlesPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const [articles, categories] = await Promise.all([
    fetchArticlesBySlug(slug),
    fetchCategories(),
  ])
  const current = categories.find((c) => c.slug === slug)

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
            {articles.map((article: ArticleDTO) => (
              <ArticleCard
                key={article.id || article.slug}
                title={article.title}
                description={article.summary}
                images={article.images}
                articleUrl={`/articulos/${article.slug}`}
                publicationDate={article.publicationDate as any}
                category={article.categoryRef?.name ?? (article.category ?? undefined)}
                categoryColor={article.categoryRef?.color ?? undefined}
                categorySlug={article.categoryRef?.slug ?? undefined}
              />
            ))}
          </div>
          )}
        </Container>
      </main>
    </div>
  )
}
