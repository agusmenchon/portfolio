export function AvatarPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-border text-muted ${className}`}
      role="img"
      aria-label="Placeholder de foto de perfil"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        className="h-9 w-9"
        aria-hidden
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
      </svg>
    </div>
  );
}
