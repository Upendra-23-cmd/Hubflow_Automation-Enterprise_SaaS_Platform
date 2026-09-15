import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Icon } from "@/components/common/Icon";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/layout/SearchBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/layout/CartDrawer";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { count: wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40">
      <TopBar />

      <div className="border-b border-sand-2 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-ink hover:bg-sand lg:hidden"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>

          {/* Logo */}
          <a href="#top" className="flex items-center gap-2" aria-label="KAIRO home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-lime">
              <Icon name="leaf" />
            </span>
            <span className="font-display text-2xl tracking-tight text-ink">KAIRO</span>
          </a>

          {/* Search */}
          <SearchBar className="mx-6 hidden flex-1 md:flex" />

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative rounded-full p-2.5 text-ink hover:bg-sand"
            >
              <Icon name="heart" className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1 text-[11px] font-bold text-ink">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open bag, ${itemCount} items`}
              className="relative rounded-full p-2.5 text-ink hover:bg-sand"
            >
              <Icon name="cart" className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1 text-[11px] font-bold text-ink">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <Navbar />
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
