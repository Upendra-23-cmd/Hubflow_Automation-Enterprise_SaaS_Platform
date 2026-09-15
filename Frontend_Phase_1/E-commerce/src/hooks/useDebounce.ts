import { useEffect, useState } from "react";

/**
 * Returns a debounced version of `value` that only updates after
 * `delay` ms have elapsed without the value changing. Used to avoid
 * running expensive work (filtering, network requests) on every keystroke.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
