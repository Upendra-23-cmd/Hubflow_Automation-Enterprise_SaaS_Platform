import ceramicsImg from "@/assets/cat-ceramics.jpg";
import textilesImg from "@/assets/cat-textiles.jpg";
import lightingImg from "@/assets/cat-lighting.jpg";
import furnitureImg from "@/assets/cat-furniture.jpg";
import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "c1",
    name: "Ceramics & Table",
    slug: "ceramics",
    image: ceramicsImg,
    itemCount: 24,
  },
  {
    id: "c2",
    name: "Textiles & Bedding",
    slug: "textiles",
    image: textilesImg,
    itemCount: 18,
  },
  {
    id: "c3",
    name: "Lighting",
    slug: "lighting",
    image: lightingImg,
    itemCount: 12,
  },
  {
    id: "c4",
    name: "Furniture & Decor",
    slug: "furniture",
    image: furnitureImg,
    itemCount: 16,
  },
];
