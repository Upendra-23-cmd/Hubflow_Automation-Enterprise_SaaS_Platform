import { cx } from "@/utils/format";

type BadgeVariant = "lime" | "forest" | "sale" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANTS: Record<BadgeVariant, string> = {
  lime: "bg-lime text-ink",
  forest: "bg-forest text-cream",
  sale: "bg-sale text-cream",
  neutral: "bg-ink/85 text-cream",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
