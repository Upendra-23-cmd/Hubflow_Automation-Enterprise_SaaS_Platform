import { useState } from "react";
import { useCatalog } from "@/context/CatalogContext";
import { cx } from "@/utils/format";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSkeleton } from "@/components/product/ProductSkeleton";

type BadgeFilter = "all" | "New" | "Bestseller" | "Sale";

const BADGE_CHIPS: { label: string; value: BadgeFilter }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "New" },
  { label: "Bestsellers", value: "Bestseller" },
  { label: "On sale", value: "Sale" },
];

export function ProductSection() {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    isLoading,
    isError,
    refetch,
  } = useCatalog();

  const [activeBadge, setActiveBadge] = useState<BadgeFilter>("all");

  const shown = filteredProducts.filter(
    (product) => activeBadge === "all" || product.badge === activeBadge,
  );

  const categoryTabs = [
    { label: "All", value: "all" },
    ...categories.map((category) => ({ label: category.name, value: category.slug })),
  ];

  return (
    <Section id="shop">
      <SectionHeading
        eyebrow="Best sellers & new arrivals"
        title="Shop the edit"
        description="Every piece is tested in our studio and backed by a love-it-or-return-it guarantee."
      />

      <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.value)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-forest text-cream"
                    : "bg-white text-body hover:bg-sand",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-mute">Quick&nbsp;filter:</span>
          {BADGE_CHIPS.map((chip) => {
            const isActive = activeBadge === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveBadge(chip.value)}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-forest bg-lime/20 text-forest"
                    : "border-sand-2 bg-white text-mute hover:border-forest hover:text-ink",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-9 min-h-[20rem]">
        {isLoading && <ProductSkeleton count={8} />}

        {isError && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-sand-2 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-forest">
              <Icon name="returns" className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl text-ink">Something went wrong</h3>
            <p className="max-w-sm text-sm text-mute">
              We couldn&apos;t load the collection right now. Check your connection and try again.
            </p>
            <Button onClick={refetch} icon={<Icon name="returns" />}>
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !isError && shown.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-sand-2 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-forest">
              <Icon name="search" className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl text-ink">No matches found</h3>
            <p className="max-w-sm text-sm text-mute">
              We couldn&apos;t find anything for that combination of filters. Try clearing them.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory("all");
                setActiveBadge("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {!isLoading && !isError && shown.length > 0 && <ProductGrid products={shown} />}
      </div>
    </Section>
  );
}
