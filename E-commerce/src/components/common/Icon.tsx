import type { ReactNode } from "react";
import { cx } from "@/utils/format";

export type IconName =
  | "leaf"
  | "arrow-right"
  | "arrow-left"
  | "cart"
  | "heart"
  | "search"
  | "close"
  | "plus"
  | "minus"
  | "truck"
  | "returns"
  | "secure"
  | "sourcing"
  | "star"
  | "menu"
  | "check"
  | "instagram"
  | "twitter"
  | "pinterest";

const PATHS: Record<IconName, ReactNode> = {
  leaf: <path d="M11 20A7 7 0 0 1 4 13c0-6 5-9 16-9 0 8-4 13-9 13Zm0 0 4-4" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M19 12H5m6-6-6 6 6 6" />,
  cart: <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 7H6" />,
  heart: <path d="M12 20s-7-4.6-9.2-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.2 11c-2.2 4.4-9.2 9-9.2 9Z" />,
  search: <path d="m20 20-3.5-3.5M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  truck: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  returns: <path d="M4 9a8 8 0 1 1-1 6M4 9V4m0 5h5" />,
  secure: <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />,
  sourcing: <path d="M12 21c5-3.5 8-7 8-11a8 8 0 0 0-16 0c0 4 3 7.5 8 11Zm0-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  star: <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="m5 12 5 5L20 7" />,
  instagram: <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm5.5-.5h.01" />,
  twitter: <path d="M4 4l7.5 9.5L4.5 20H7l6-6.5L17.5 20H21l-7.8-9.7L19.5 4H17l-5.4 6L8 4H4Z" />,
  pinterest: <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-1 0-2.2.3-3.1l1-4.2s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.1-3.8-3 0-4.9 2.2-4.9 4.7 0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.9c-.1.3-.3.4-.5.3-1.3-.6-2-2.3-2-3.7 0-2.8 2.4-6.2 7-6.2 3.7 0 6.2 2.7 6.2 5.6 0 3.8-2.2 6.7-5.4 6.7-1.1 0-2.1-.6-2.5-1.2l-.7 2.7c-.3 1-1 2.2-1.5 3" />,
};

interface IconProps {
  name: IconName;
  className?: string;
  /** Filled rendering (useful for stars). */
  filled?: boolean;
}

export function Icon({ name, className, filled = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("h-5 w-5 shrink-0", className)}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
