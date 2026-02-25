import { ArticleCard } from '@domains/articles';

async function fetchFeatured() {
  try {
    const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/articles?status=published&page=1&pageSize=3`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.items) ? data.items : []
  } catch {
    return []
  }
}

export default async function FeaturedArticles() {
  const articles = await fetchFeatured()
  if (!articles.length) {
    return <div className="text-sm text-muted-foreground">Pronto habrá artículos destacados.</div>
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((a: any) => (
        <ArticleCard
          key={a.slug}
          title={a.title}
          description={a.summary}
          images={a.images}
          articleUrl={`/articulos/${a.slug}`}
          publicationDate={a.publicationDate}
        />
      ))}
    </div>
  );
}
