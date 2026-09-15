import { Button } from "./Button";
import { Icon } from "./Icon";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled,
  label,
  size = "md",
}: QuantitySelectorProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      className="inline-flex items-center rounded-full border border-sand-2 bg-white p-1"
      role="group"
      aria-label={label ?? "Quantity"}
    >
      <Button
        variant="ghost"
        size={size}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || atMin}
        aria-label="Decrease quantity"
        className="h-8 w-8 rounded-full !px-0"
      >
        <Icon name="minus" className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <Button
        variant="ghost"
        size={size}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || atMax}
        aria-label="Increase quantity"
        className="h-8 w-8 rounded-full !px-0"
      >
        <Icon name="plus" className="h-4 w-4" />
      </Button>
    </div>
  );
}
