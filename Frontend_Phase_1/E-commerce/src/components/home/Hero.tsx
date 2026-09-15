import heroImg from "@/assets/hero.jpg";
import { scrollToId } from "@/utils/dom";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { SmartImage } from "@/components/common/SmartImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-xl lg:mx-0">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-forest">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            The New Autumn Edit
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.04] text-ink sm:text-6xl">
            Objects that make <em className="text-forest">home</em> feel like you.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mute">
            Considered goods for the considered home — ceramics, lighting, textiles and furniture,
            ethically made and built to last.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" icon={<Icon name="arrow-right" />} onClick={() => scrollToId("shop")}>
              Shop the collection
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToId("top")}>
              Our story
            </Button>
          </div>

          <dl className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-mute">
            <div>
              <dt className="font-display text-2xl text-ink">4.9</dt>
              <dd>Average rating</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-ink">30k+</dt>
              <dd>Happy homes</dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-ink">4.8★</dt>
              <dd>Trusted reviews</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="overflow-hidden rounded-[2rem] border border-sand-2 shadow-xl shadow-ink/5">
            <SmartImage
              src={heroImg}
              alt="A warm, styled modern living room with linen sofa and ceramics"
              className="aspect-[4/5] w-full lg:aspect-[5/4]"
            />
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-sand-2 bg-white p-3.5 pr-5 shadow-xl shadow-ink/5 sm:left-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/20 text-forest">
              <Icon name="leaf" />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-mute">Sustainably</p>
              <p className="text-sm font-semibold text-ink">sourced goods</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
