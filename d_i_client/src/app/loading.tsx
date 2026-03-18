import { Skeleton, SkeletonCard } from '@/shared/ui/SkeletonCard';
import Container from '@/shared/ui/Container';

export default function HomeLoading() {
  return (
    <div className="bg-[#F7F6F2] animate-pulse">
      {/* Hero skeleton */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <Skeleton className="h-3 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-5/6" />
                <Skeleton className="h-12 w-3/4" />
              </div>
              <Skeleton className="h-4 w-full max-w-[46ch]" />
              <Skeleton className="h-4 w-4/5 max-w-[40ch]" />
              <div className="flex gap-3 pt-1">
                <Skeleton className="h-11 w-44 rounded-lg" />
                <Skeleton className="h-11 w-36 rounded-lg" />
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Skeleton className="w-[360px] h-[360px] rounded-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Section skeleton */}
      <section className="py-16 bg-white border-t border-black/5">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <Skeleton className="h-3 w-28 mx-auto" />
              <Skeleton className="h-8 w-64 mx-auto" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-2 border-foreground/8 pl-6 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Article cards skeleton */}
      <section className="py-16">
        <Container>
          <div className="text-center space-y-3 mb-10">
            <Skeleton className="h-3 w-24 mx-auto" />
            <Skeleton className="h-8 w-56 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        </Container>
      </section>
    </div>
  );
}
