interface ProductSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          // Stagger the shimmer so the grid doesn't pulse in lockstep.
          style={{ animationDelay: `${index * 60}ms` }}
          className="overflow-hidden rounded-2xl border border-sand-2"
        >
          <div className="aspect-[4/5] w-full animate-pulse bg-sand" />
          <div className="space-y-2.5 p-4">
            <div className="h-2.5 w-1/3 animate-pulse rounded bg-sand" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-sand" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-sand" />
            <div className="mt-3 flex items-center justify-between">
              <div className="h-5 w-1/3 animate-pulse rounded bg-sand" />
              <div className="h-8 w-14 animate-pulse rounded-full bg-sand" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
