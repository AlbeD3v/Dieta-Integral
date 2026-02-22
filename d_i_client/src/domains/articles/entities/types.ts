export interface ArticleBase {
  id: number;
  slug: string;
  title: string;
  summary: string;
  images: string[];
  articleUrl: string;
  publicationDate: string;
}

export interface ArticleFull extends ArticleBase {
  content: string;
}
