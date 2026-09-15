import { useCatalog } from "@/context/CatalogContext";
import { scrollToId } from "@/utils/dom";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartImage } from "@/components/common/SmartImage";

export function CategorySection() {
  const { categories, setActiveCategory } = useCatalog();

  const handleSelect = (slug: string) => {
    setActiveCategory(slug);
    scrollToId("shop");
  };

  return (
    <Section id="categories">
      <SectionHeading
        eyebrow="Browse by room"
        title="Shop by category"
        description="Four curated families of objects, each chosen for craft, material and longevity."
      />

      <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleSelect(category.slug)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl text-left"
          >
            <SmartImage
              src={category.image}
              alt={category.name}
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
              <p className="font-display text-lg leading-tight sm:text-xl">{category.name}</p>
              <p className="mt-1 text-xs text-cream/80">{category.itemCount} items</p>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}
