import { type ElementType, type ReactNode } from "react";
import { cx } from "@/utils/format";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Rendered as a `<section>` by default. */
  as?: ElementType;
  /** Adds vertical breathing room (default true). */
  padded?: boolean;
  /** Anchor id for in-page navigation. */
  id?: string;
}

export function Section({ children, className, as, padded = true, id }: SectionProps) {
  const Tag = as ?? "section";
  return (
    <Tag
      id={id}
      className={cx(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
        padded && "py-14 sm:py-20",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
