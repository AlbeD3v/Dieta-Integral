import { SkeletonArticleHero, SkeletonArticleContent } from '@/shared/ui/SkeletonCard';

export default function ArticleSlugLoading() {
  return (
    <div>
      <SkeletonArticleHero />
      <SkeletonArticleContent />
    </div>
  );
}
