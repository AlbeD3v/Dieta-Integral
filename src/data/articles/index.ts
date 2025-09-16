import { ArticleBase, ArticleFull } from '@/data/types';
import { article1 } from '@/data/articles/article1';
import { article2 } from '@/data/articles/article2';
import { article3 } from '@/data/articles/article3';
import { article4 } from '@/data/articles/article4';
import { article5 } from '@/data/articles/article5';

const articlesData: Record<string, ArticleFull> = {
  [article1.slug]: article1,
  [article2.slug]: article2,
  [article3.slug]: article3,
  [article4.slug]: article4,
  [article5.slug]: article5,
};

export const getArticlesList = (): ArticleBase[] => {
  return Object.values(articlesData).map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    images: article.images,
    articleUrl: article.articleUrl,
    publicationDate: article.publicationDate
  }));
};

export const articles = articlesData;
export default articles;
