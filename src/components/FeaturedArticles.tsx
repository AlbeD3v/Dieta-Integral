import ArticleCard from './ArticleCard';
import { articles } from '@/lib/articles';

const FeaturedArticles = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Dark background div for depth */}
      <div className="absolute inset-0 bg-[#111111] h-[85%] top-[8%] transform -skew-y-3 shadow-2xl" />
      
      <section className="relative py-20 bg-gradient-to-b from-[#F8F9FA] to-[#F8F9FA]/95">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 relative">
            <h2 className="relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
              <span className="absolute -top-4 sm:-top-5 md:-top-8 left-1/2 -translate-x-1/2 text-primary/10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl whitespace-nowrap">
                ¿Qué te gustaría descubrir?
              </span>
              <span className="relative text-primary">
                ¿Qué te gustaría descubrir?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 mt-4 sm:mt-6">Artículos destacados para mejorar tu salud</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {articles.map(article => (
              <ArticleCard 
                key={article.id} 
                title={article.title}
                description={article.summary}
                images={article.images}
                articleUrl={article.articleUrl}
                publicationDate={article.publicationDate}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedArticles;
