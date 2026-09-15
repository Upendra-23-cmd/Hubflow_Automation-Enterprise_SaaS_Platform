import { useCatalog } from "@/context/CatalogContext";
import { scrollToId } from "@/utils/dom";
import { Icon } from "@/components/common/Icon";

const COMPANY_LINKS = [
  { label: "Our story", href: "#top" },
  { label: "The journal", href: "#testimonials" },
  { label: "Stockists", href: "#categories" },
  { label: "Careers", href: "#newsletter" },
];

const CARE_LINKS = [
  { label: "Shipping & delivery", href: "#newsletter" },
  { label: "30-day returns", href: "#newsletter" },
  { label: "FAQ", href: "#newsletter" },
  { label: "Contact", href: "#newsletter" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "PayPal"];

function FooterLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="text-sm text-body transition-colors hover:text-ink"
      >
        {label}
      </button>
    </li>
  );
}

export function Footer() {
  const { categories, setActiveCategory } = useCatalog();

  const handleCategory = (slug: string) => {
    setActiveCategory(slug);
    scrollToId("shop");
  };

  return (
    <footer className="border-t border-sand-2 bg-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-12">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-lime">
              <Icon name="leaf" />
            </span>
            <span className="font-display text-2xl text-ink">KAIRO</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            A modern home &amp; living studio crafting considered goods for the
            considered home. Ethically made, endlessly loved.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {(["instagram", "twitter", "pinterest"] as const).map((network) => (
              <a
                key={network}
                href="#top"
                aria-label={network}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-2 text-body transition-colors hover:border-forest hover:text-forest"
              >
                <Icon name={network} />
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded-md border border-sand-2 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-mute"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Shop</h3>
          <ul className="mt-4 space-y-3">
            <FooterLink label="All goods" onClick={() => handleCategory("all")} />
            {categories.map((category) => (
              <FooterLink
                key={category.id}
                label={category.name}
                onClick={() => handleCategory(category.slug)}
              />
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Company</h3>
          <ul className="mt-4 space-y-3">
            {COMPANY_LINKS.map((link) => (
              <FooterLink
                key={link.label}
                label={link.label}
                onClick={() => scrollToId(link.href.slice(1))}
              />
            ))}
          </ul>
        </div>

        {/* Customer care */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Customer care</h3>
          <ul className="mt-4 space-y-3">
            {CARE_LINKS.map((link) => (
              <FooterLink
                key={link.label}
                label={link.label}
                onClick={() => scrollToId(link.href.slice(1))}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-2">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-mute sm:flex-row sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} KAIRO Home &amp; Living. A demo storefront.</p>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
