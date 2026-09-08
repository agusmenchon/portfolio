export function scrollToId(id: string) {
  // No `behavior` option on purpose: it inherits the CSS `scroll-behavior`,
  // which globals.css flips to `auto` under `prefers-reduced-motion: reduce`.
  document.getElementById(id)?.scrollIntoView();
}
