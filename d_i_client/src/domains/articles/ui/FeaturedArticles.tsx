import { ArticleCard } from '@domains/articles';
import prisma from '@/lib/prisma';

export default async function FeaturedArticles() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { publicationDate: 'desc' },
      take: 3,
      select: {
        slug: true,
        title: true,
        summary: true,
        images: true,
        publicationDate: true,
        category: true,
        categoryRef: { select: { name: true, slug: true, color: true } },
      },
    });
  } catch {
    /* DB unavailable — show fallback */
  }

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
          category={a.categoryRef?.name}
          categoryColor={a.categoryRef?.color}
          categorySlug={a.categoryRef?.slug}
        />
      ))}
    </div>
  );
}
