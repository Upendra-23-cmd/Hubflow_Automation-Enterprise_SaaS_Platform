import { cx } from "@/utils/format";

interface StarRatingProps {
  rating: number;
  className?: string;
  /** Show the numeric value next to the stars. */
  showValue?: boolean;
  reviewCount?: number;
}

function StarRow({ className }: { className?: string }) {
  return (
    <div className={cx("flex gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z" />
        </svg>
      ))}
    </div>
  );
}

export function StarRating({ rating, className, showValue, reviewCount }: StarRatingProps) {
  const percentage = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className={cx("flex items-center gap-1.5", className)}>
      <div className="relative inline-flex">
        <StarRow className="text-sand-2" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
          <StarRow className="text-lime-dark" />
        </div>
      </div>
      {showValue && <span className="text-xs font-semibold text-ink">{rating.toFixed(1)}</span>}
      {typeof reviewCount === "number" && (
        <span className="text-xs text-mute">({reviewCount})</span>
      )}
    </div>
  );
}
