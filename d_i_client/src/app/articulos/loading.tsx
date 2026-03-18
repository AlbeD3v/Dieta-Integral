import { SkeletonArticleGrid } from '@/shared/ui/SkeletonCard';
import { Skeleton } from '@/shared/ui/SkeletonCard';
import Container from '@/shared/ui/Container';

export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16 md:py-24">
        {/* Section header skeleton */}
        <div className="text-center space-y-3 mb-10">
          <Skeleton className="h-3 w-20 mx-auto" />
          <Skeleton className="h-9 w-48 mx-auto" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>

        {/* Category filter skeleton */}
        <div className="max-w-5xl mx-auto mb-6 flex gap-2 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>

        {/* Cards grid */}
        <SkeletonArticleGrid count={6} />
      </Container>
    </div>
  );
}
