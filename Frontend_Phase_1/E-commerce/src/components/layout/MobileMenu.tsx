import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useCatalog } from "@/context/CatalogContext";
import { useWishlist } from "@/context/WishlistContext";
import { scrollToId } from "@/utils/dom";
import { Icon } from "@/components/common/Icon";
import { SearchBar } from "@/components/layout/SearchBar";
import { navItems } from "@/components/layout/Navbar";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { activeCategory, setActiveCategory } = useCatalog();
  const { count: wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const handleSelect = (category: string) => {
    setActiveCategory(category);
    onClose();
    scrollToId("shop");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[86vw] max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-sand-2 px-5 py-4">
          <span className="font-display text-2xl text-ink">KAIRO</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-ink hover:bg-sand"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="px-5 py-4">
          <SearchBar surface />
        </div>

        <nav className="flex-1 overflow-y-auto px-5" aria-label="Mobile categories">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeCategory === item.category;
              return (
                <li key={item.category}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.category)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive ? "bg-lime/20 text-forest" : "text-ink hover:bg-sand"
                    }`}
                  >
                    {item.label}
                    <Icon name="arrow-right" className="h-4 w-4 text-mute" />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid grid-cols-2 gap-3 border-t border-sand-2 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-body">
            <Icon name="heart" className="h-5 w-5 text-forest" />
            Wishlist ({wishlistCount})
          </div>
          <div className="flex items-center gap-2 text-sm text-body">
            <Icon name="cart" className="h-5 w-5 text-forest" />
            Bag ({itemCount})
          </div>
        </div>
      </aside>
    </>
  );
}
