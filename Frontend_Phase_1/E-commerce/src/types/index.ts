// Shared domain models for the KAIRO storefront.

export interface Product {
  id: string;
  name: string;
  price: number;
  /** Original price when the item is discounted. */
  compareAtPrice?: number;
  /** Average rating on a 0–5 scale. */
  rating: number;
  reviewCount: number;
  /** High-level category slug used for filtering. */
  category: string;
  image: string;
  badge?: "New" | "Sale" | "Bestseller";
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  initials: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  /** Icon key resolved to an inline SVG by the consumer. */
  icon: "shipping" | "returns" | "secure" | "sourcing";
}

export interface NavLink {
  label: string;
  href: string;
}

export type CategoryFilter = "all" | string;
