import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="container max-w-[1400px] mx-auto px-6">
        <div className="relative overflow-hidden">
          {/* Dark background div for depth */}
          <div className="absolute inset-0 bg-[#111111] h-[85%] top-[8%] transform -skew-y-3 shadow-2xl" />
          
          <section className="relative py-20 bg-gradient-to-b from-[#F8F9FA] to-[#F8F9FA]/95">
            <div className="text-center mb-16 relative">
              <h2 className="relative text-[0.75rem] xs:text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                <span className="absolute -top-1 xs:-top-2 sm:-top-3 md:-top-4 lg:-top-6 xl:-top-8 left-1/2 -translate-x-1/2 text-primary/10 text-[0.875rem] xs:text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap">
                  Explora y Aprende
                </span>
                <span className="relative text-primary">
                  Explora y Aprende
                </span>
              </h2>
              <p className="text-[0.625rem] xs:text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 mt-1.5 xs:mt-2 sm:mt-3 md:mt-4 lg:mt-5">
                Artículos sobre nutrición y bienestar para mejorar tu calidad de vida
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
