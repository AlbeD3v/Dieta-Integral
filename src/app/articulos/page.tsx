import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export default function ArticlesPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Artículos</h1>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.summary}
                imageUrl={article.imageUrl}
                articleUrl={`/articulos/${article.slug}`}
                publicationDate={article.publicationDate}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
