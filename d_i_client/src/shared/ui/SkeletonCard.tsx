import { cn } from '@/lib/utils';

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-foreground/6',
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border/40 overflow-hidden bg-white">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonArticleGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonArticleHero() {
  return (
    <div className="relative h-96 bg-foreground/8 animate-pulse">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
        <Skeleton className="h-8 w-2/3 bg-white/20" />
        <Skeleton className="h-4 w-32 bg-white/20" />
      </div>
    </div>
  );
}

export function SkeletonArticleContent() {
  return (
    <div className="space-y-4 py-8 max-w-[800px] mx-auto px-4 md:px-6">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-11/12" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-9/12" />
      <div className="py-4">
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-10/12" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-11/12" />
    </div>
  );
}

export { Skeleton };
