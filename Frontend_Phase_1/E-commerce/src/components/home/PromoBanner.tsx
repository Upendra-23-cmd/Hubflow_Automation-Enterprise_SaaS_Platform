import lampImg from "@/assets/prod-lamp.jpg";
import { scrollToId } from "@/utils/dom";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { SmartImage } from "@/components/common/SmartImage";

export function PromoBanner() {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Limited time
          </span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            The Autumn Edit — <em className="text-lime">up to 25% off</em>
          </h2>
          <p className="mt-4 text-lg text-cream/80">
            Refresh your space with warm textures and softer light. Sale runs while stocks last.
          </p>
          <Button
            variant="accent"
            size="lg"
            className="mt-8"
            icon={<Icon name="arrow-right" />}
            onClick={() => scrollToId("shop")}
          >
            Shop the sale
          </Button>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-cream/15 shadow-xl">
          <SmartImage
            src={lampImg}
            alt="A warm table lamp glowing in a cozy corner"
            className="aspect-[4/3] w-full"
          />
        </div>
      </div>
    </section>
  );
}
