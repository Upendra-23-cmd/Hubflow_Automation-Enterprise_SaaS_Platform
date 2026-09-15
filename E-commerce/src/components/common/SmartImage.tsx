import { useState } from "react";
import { cx } from "@/utils/format";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Soft tonal backdrop shown while loading or on error. */
  tone?: string;
}

/**
 * Image with a loading shimmer and a graceful gradient fallback so a failed
 * or pending image never leaves an ugly broken frame. Lazy-loads by default
 * for performance.
 */
export function SmartImage({ src, alt, className, tone }: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div className={cx("relative overflow-hidden bg-sand", className)}>
      {status !== "ready" && (
        <div className="absolute inset-0 animate-pulse bg-sand" aria-hidden="true" />
      )}

      {status !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={cx(
            "h-full w-full object-cover transition-opacity duration-500",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {status === "error" && (
        <div
          className={cx(
            "flex h-full w-full items-center justify-center text-forest/40",
            tone ?? "bg-gradient-to-br from-sand to-sand-2",
          )}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M4 19V7a2 2 0 0 1 2-2h6l2 2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>
      )}
    </div>
  );
}
