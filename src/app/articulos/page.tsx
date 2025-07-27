import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { articles } from '@/lib/articles';

export default function ArticlesPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Artículos</h1>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/articulos/${article.slug}`} className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
                <p className="mt-2 text-gray-600">{article.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
