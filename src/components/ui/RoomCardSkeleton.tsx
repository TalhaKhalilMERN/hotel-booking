export default function RoomCardSkeleton() {
  return (
    <div className="card-base overflow-hidden flex flex-col rounded-2xl bg-white border border-border/70 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-56 sm:h-60 bg-surface-warm/80 relative">
        <div className="absolute top-3 left-3 w-14 h-6 rounded-full bg-border/40" />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-border/40" />
      </div>

      {/* Body Skeleton */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div className="h-6 bg-border/50 rounded-md w-3/4" />
          {/* Spec line */}
          <div className="h-3.5 bg-border/40 rounded-md w-1/2 mt-1" />
          {/* Chips */}
          <div className="flex items-center gap-2 mt-2">
            <div className="h-5 w-16 bg-border/40 rounded-full" />
            <div className="h-5 w-20 bg-border/40 rounded-full" />
            <div className="h-5 w-16 bg-border/40 rounded-full" />
          </div>
          {/* Description line */}
          <div className="h-3 bg-border/30 rounded-md w-full mt-2" />
          <div className="h-3 bg-border/30 rounded-md w-5/6" />
        </div>

        {/* Footer Pricing & CTA */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-14 bg-border/30 rounded" />
            <div className="h-6 w-24 bg-border/50 rounded" />
          </div>
          <div className="h-9 w-20 bg-border/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function RoomsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RoomCardSkeleton />
      <RoomCardSkeleton />
      <RoomCardSkeleton />
    </div>
  );
}
