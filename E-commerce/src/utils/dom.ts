/** Smoothly scrolls to an element by its DOM id. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}
