import ArticleCard from './ArticleCard';
import { articles } from '@/lib/articles';

const FeaturedArticles = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Artículos Destacados</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {articles.map(article => (
            <ArticleCard 
              key={article.id} 
              title={article.title}
              description={article.summary}
              imageUrl={article.imageUrl}
              articleUrl={article.articleUrl}
              publicationDate={article.publicationDate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
