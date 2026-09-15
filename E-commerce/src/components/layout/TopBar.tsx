import { Icon } from "@/components/common/Icon";

export function TopBar() {
  return (
    <div className="bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
        <Icon name="leaf" className="h-3.5 w-3.5 text-lime" />
        <p>
          Free carbon-neutral shipping over <strong className="font-bold">$75</strong> · Easy 30-day
          returns
        </p>
      </div>
    </div>
  );
}
