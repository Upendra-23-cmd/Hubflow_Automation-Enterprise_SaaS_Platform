import { features } from "@/data/features";
import { Section } from "@/components/common/Section";
import { Icon, type IconName } from "@/components/common/Icon";

const ICON_MAP: Record<string, IconName> = {
  shipping: "truck",
  returns: "returns",
  secure: "secure",
  sourcing: "sourcing",
};

export function FeatureStrip() {
  return (
    <Section className="!py-0" padded={false}>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand-2 bg-sand-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center gap-2 bg-cream px-4 py-6 text-center sm:flex-row sm:text-left sm:gap-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime/20 text-forest">
              <Icon name={ICON_MAP[feature.icon] ?? "leaf"} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{feature.title}</p>
              <p className="mt-0.5 text-xs text-mute">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
