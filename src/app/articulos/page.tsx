import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// This is a placeholder for your articles.
// You would typically fetch this data from a CMS or a local source.
const articles = [
  { id: 1, title: 'Artículo 1', slug: '1', summary: 'Resumen del artículo 1...' },
  { id: 2, title: 'Artículo 2', slug: '2', summary: 'Resumen del artículo 2...' },
  { id: 3, title: 'Artículo 3', slug: '3', summary: 'Resumen del artículo 3...' },
  { id: 4, title: 'Artículo 4', slug: '4', summary: 'Resumen del artículo 4...' },
];

export default function ArticlesPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Artículos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/articulos/${article.slug}`} className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
              <p className="mt-2 text-gray-600">{article.summary}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
