import { useCatalog } from "@/context/CatalogContext";
import { scrollToId } from "@/utils/dom";

export interface NavItem {
  label: string;
  category: string;
}

export const navItems: NavItem[] = [
  { label: "New", category: "all" },
  { label: "Ceramics", category: "ceramics" },
  { label: "Textiles", category: "textiles" },
  { label: "Lighting", category: "lighting" },
  { label: "Furniture", category: "furniture" },
];

export function Navbar() {
  const { activeCategory, setActiveCategory } = useCatalog();

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    scrollToId("shop");
  };

  return (
    <nav className="hidden border-t border-sand-2 lg:block" aria-label="Main navigation">
      <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-2.5">
        {navItems.map((item) => {
          const isActive = activeCategory === item.category;
          return (
            <li key={item.category}>
              <button
                type="button"
                onClick={() => handleSelect(item.category)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-lime/20 text-forest"
                    : "text-body hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
