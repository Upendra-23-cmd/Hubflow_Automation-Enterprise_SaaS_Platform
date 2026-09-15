import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/format";
import { scrollToId } from "@/utils/dom";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";
import { QuantitySelector } from "@/components/common/QuantitySelector";
import { SmartImage } from "@/components/common/SmartImage";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

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

  // Reset the success view whenever the drawer reopens.
  useEffect(() => {
    if (open) setPlaced(false);
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[92vw] max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-sand-2 px-5 py-4">
          <h2 className="font-display text-2xl text-ink">Your Bag</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-2 text-ink hover:bg-sand"
          >
            <Icon name="close" />
          </button>
        </div>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime/20 text-forest">
              <Icon name="check" className="h-8 w-8" />
            </span>
            <h3 className="font-display text-2xl text-ink">Order placed!</h3>
            <p className="max-w-xs text-sm text-mute">
              Thanks for shopping with KAIRO. This is a demo storefront, so no payment was taken.
            </p>
            <Button
              variant="accent"
              onClick={() => {
                clearCart();
                onClose();
              }}
            >
              Continue shopping
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-forest">
              <Icon name="cart" className="h-8 w-8" />
            </span>
            <h3 className="font-display text-2xl text-ink">Your bag is empty</h3>
            <p className="max-w-xs text-sm text-mute">
              Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
            </p>
            <Button
              variant="accent"
              onClick={() => {
                onClose();
                scrollToId("shop");
              }}
            >
              Start shopping
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4">
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                        <p className="text-xs capitalize text-mute">{product.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-full p-1 text-mute hover:bg-sand hover:text-ink"
                      >
                        <Icon name="close" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantitySelector
                        size="sm"
                        value={quantity}
                        max={9}
                        onChange={(value) => updateQuantity(product.id, value)}
                        aria-label={`Quantity for ${product.name}`}
                      />
                      <span className="text-sm font-semibold text-forest">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-sand-2 px-5 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mute">Subtotal · {itemCount} items</span>
                <span className="font-display text-2xl text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-mute">Shipping and taxes calculated at checkout.</p>
              <Button variant="accent" fullWidth onClick={() => setPlaced(true)}>
                Checkout · {formatPrice(subtotal)}
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
