import { ArticleCard, getArticlesList } from '@domains/articles';

const FeaturedArticles = () => {
  const articles = getArticlesList();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
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
  );
};

export default FeaturedArticles;
