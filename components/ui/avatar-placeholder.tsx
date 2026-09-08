const SIZE_CLASSES = {
  lg: "h-28 w-28",
  sm: "h-14 w-14",
} as const;

const ICON_SIZE_CLASSES = {
  lg: "h-9 w-9",
  sm: "h-5 w-5",
} as const;

export function AvatarPlaceholder({
  size = "lg",
  label = "Placeholder de foto de perfil",
  className = "",
  decorative = false,
}: {
  size?: "lg" | "sm";
  label?: string;
  className?: string;
  /** Drops the img role/label so purely ornamental instances aren't announced. */
  decorative?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-border text-muted ${SIZE_CLASSES[size]} ${className}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        className={ICON_SIZE_CLASSES[size]}
        aria-hidden
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
      </svg>
    </div>
  );
}
