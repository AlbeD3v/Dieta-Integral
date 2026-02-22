import React from 'react';
import { getArticlesList, ArticleCard } from '@domains/articles';
import Container from '@/shared/ui/Container';
import SectionHeader from '@/shared/ui/SectionHeader';

export default function ArticlesPage() {
  const articles = getArticlesList();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Container className="py-16 md:py-24">
          <SectionHeader
            title="Artículos"
            subtitle="Lecturas claras y prácticas para mejorar tu bienestar."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.summary}
                images={article.images}
                articleUrl={`/articulos/${article.slug}`}
                publicationDate={article.publicationDate}
              />
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}

