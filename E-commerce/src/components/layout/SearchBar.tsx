import { useEffect, useMemo, useRef, useState } from "react";
import { useCatalog } from "@/context/CatalogContext";
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/utils/format";
import { scrollToId } from "@/utils/dom";
import { Icon } from "@/components/common/Icon";
import { SmartImage } from "@/components/common/SmartImage";

interface SearchBarProps {
  className?: string;
  /** Render with a filled "pill" surface (used inside the mobile menu). */
  surface?: boolean;
}

export function SearchBar({ className, surface = false }: SearchBarProps) {
  const { products, searchQuery, setSearchQuery } = useCatalog();
  const [value, setValue] = useState(searchQuery);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debounced = useDebounce(value, 250);

  // Push debounced input into the catalog filter.
  useEffect(() => {
    setSearchQuery(debounced);
  }, [debounced, setSearchQuery]);

  // Close on outside click / Escape.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const suggestions = useMemo(() => {
    const query = debounced.trim().toLowerCase();
    if (!query) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
      .slice(0, 5);
  }, [debounced, products]);

  const handleSubmit = () => {
    setSearchQuery(debounced);
    setOpen(false);
    scrollToId("shop");
  };

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 transition-colors ${
          surface
            ? "border-sand-2 bg-white"
            : "border-sand-2 bg-white/70 focus-within:border-forest"
        }`}
      >
        <Icon name="search" className="h-4 w-4 text-mute" />
        <input
          type="search"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search ceramics, lighting, furniture…"
          aria-label="Search products"
          className="w-full bg-transparent text-sm text-ink placeholder:text-mute focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setSearchQuery("");
            }}
            aria-label="Clear search"
            className="text-mute hover:text-ink"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        )}
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-sand-2 bg-white shadow-xl shadow-ink/5">
          <ul className="max-h-80 overflow-y-auto p-2">
            {suggestions.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(product.name);
                    setSearchQuery(product.name);
                    setOpen(false);
                    scrollToId("shop");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-sand"
                >
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 shrink-0 rounded-lg"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {product.name}
                    </span>
                    <span className="block text-xs capitalize text-mute">{product.category}</span>
                  </span>
                  <span className="text-sm font-semibold text-forest">
                    {formatPrice(product.price)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
