import { testimonials } from "@/data/testimonials";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StarRating } from "@/components/common/StarRating";

export function TestimonialSection() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Kind words"
        title="Loved in homes everywhere"
        description="Over 4,800 verified reviews across the collection."
      />

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex flex-col rounded-2xl border border-sand-2 bg-white p-6"
          >
            <StarRating rating={testimonial.rating} showValue />
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-body">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-2 pt-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-sm font-bold text-cream">
                {testimonial.initials}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                <p className="text-xs text-mute">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
