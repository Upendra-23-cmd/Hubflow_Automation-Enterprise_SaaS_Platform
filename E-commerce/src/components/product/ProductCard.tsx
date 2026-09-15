import { memo } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, discountPercent } from "@/utils/format";
import type { Product } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { SmartImage } from "@/components/common/SmartImage";
import { StarRating } from "@/components/common/StarRating";

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const wished = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const savings = discountPercent(product.price, product.compareAtPrice);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-2 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-ink/5">
      <div className="relative">
        <SmartImage
          src={product.image}
          alt={product.name}
          className="aspect-[4/5] w-full"
        />

        {product.badge && (
          <Badge
            variant={product.badge === "Sale" ? "sale" : product.badge === "New" ? "lime" : "forest"}
            className="absolute left-3 top-3"
          >
            {product.badge}
          </Badge>
        )}

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={wished}
          aria-label={
            wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
            wished
              ? "border-sale bg-sale text-cream"
              : "border-white/70 bg-white/80 text-ink backdrop-blur hover:bg-white"
          }`}
        >
          <Icon name="heart" filled={wished} className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-mute">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold leading-snug text-ink">{product.name}</h3>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          showValue
        />

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-xl text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-mute line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {savings > 0 && <Badge variant="sale">-{savings}%</Badge>}
          </div>
          <Button
            size="sm"
            variant={inCart ? "outline" : "primary"}
            onClick={() => addItem(product)}
            disabled={!product.inStock}
          >
            {!product.inStock ? "Sold out" : inCart ? "Add more" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
